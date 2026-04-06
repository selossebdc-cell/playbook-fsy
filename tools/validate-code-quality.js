#!/usr/bin/env node
/**
 * Validate Code Quality - Validation stricte du code généré contre les specs
 *
 * Usage:
 *   node tools/validate-code-quality.js <task-file>     # Valide une task spécifique
 *   node tools/validate-code-quality.js --all           # Valide toutes les tasks complétées
 *   node tools/validate-code-quality.js --gate4         # Mode Gate 4 (intégration)
 *
 * Mode: STRICT (bloque si non-conformité critique)
 *
 * Exit codes:
 *   0 = PASS (toutes validations OK)
 *   1 = ERROR (erreur d'exécution)
 *   2 = FAIL (non-conformité détectée)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getTasksDir } from './lib/factory-state.js';
import { getValidationThresholds } from './lib/project-config.js';

// Configuration STRICT - loaded from project-config.json
let _cachedConfig = null;
function getConfig() {
  if (_cachedConfig) return _cachedConfig;

  const thresholds = getValidationThresholds();
  _cachedConfig = {
    coverageThreshold: thresholds.codeQuality?.testCoverage ?? 80,
    branchCoverageThreshold: thresholds.codeQuality?.branchCoverage ?? 75,
    functionCoverageThreshold: thresholds.codeQuality?.functionCoverage ?? 85,
    strictTypes: thresholds.codeQuality?.typescriptStrict !== false,
    specComplianceRequired: true,
    blockOnCritical: true
  };
  return _cachedConfig;
}

/**
 * Charge et parse un fichier markdown
 */
function loadMarkdown(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Extrait les fichiers concernés d'une task
 * Supporte les variantes accentuees et non-accentuees
 */
function extractTaskScope(taskContent) {
  const scopeMatch = taskContent.match(/## Fichiers concern[ée]s[\s\S]*?(?=\n## [^#]|$)/);
  if (!scopeMatch) return [];

  const files = [];
  const lines = scopeMatch[0].split('\n');
  for (const line of lines) {
    const match = line.match(/^[-*]\s+`?([^`\n]+)`?/);
    if (match && match[1].includes('/')) {
      files.push(match[1].trim());
    }
  }
  return files;
}

/**
 * Extrait les tests attendus d'une task
 */
function extractExpectedTests(taskContent) {
  const testMatch = taskContent.match(/## Tests attendus[\s\S]*?(?=\n## [^#]|$)/);
  if (!testMatch) return [];

  const tests = [];
  const lines = testMatch[0].split('\n');
  for (const line of lines) {
    const match = line.match(/^[-*]\s+(.+)/);
    if (match) {
      tests.push(match[1].trim());
    }
  }
  return tests;
}

/**
 * Extrait les endpoints de api.md
 */
function extractApiEndpoints(apiSpec) {
  if (!apiSpec) return [];

  const endpoints = [];
  let match;
  const regex = /^###?\s+(GET|POST|PUT|DELETE|PATCH)\s+`?([^`\n]+)`?/gm;

  while ((match = regex.exec(apiSpec)) !== null) {
    endpoints.push({
      method: match[1],
      path: match[2].trim()
    });
  }
  return endpoints;
}

/**
 * Vérifie si un fichier source implémente un endpoint
 */
function checkEndpointImplementation(srcContent, endpoint) {
  // Patterns courants pour détecter les routes
  const patterns = [
    new RegExp(`['"\`]${endpoint.path}['"\`]`, 'i'),
    new RegExp(`\\.${endpoint.method.toLowerCase()}\\s*\\(`, 'i'),
    new RegExp(`@${endpoint.method}\\s*\\(.*${endpoint.path}`, 'i'),
    new RegExp(`router\\.${endpoint.method.toLowerCase()}`, 'i')
  ];

  return patterns.some(p => p.test(srcContent));
}

/**
 * Vérifie la conformité du code avec les specs API
 */
function validateApiCompliance(taskFiles, apiSpec) {
  const errors = [];
  const warnings = [];
  const endpoints = extractApiEndpoints(apiSpec);

  if (endpoints.length === 0) {
    return { errors, warnings, passed: true };
  }

  // Lire tous les fichiers src
  let allSrcContent = '';
  for (const file of taskFiles) {
    if (file.startsWith('src/') && fs.existsSync(file)) {
      allSrcContent += fs.readFileSync(file, 'utf-8') + '\n';
    }
  }

  // Vérifier chaque endpoint mentionné dans les specs
  for (const endpoint of endpoints) {
    // Vérifier si l'endpoint est dans le scope de la task
    const inScope = taskFiles.some(f =>
      f.includes('api') || f.includes('route') || f.includes('controller')
    );

    if (inScope && !checkEndpointImplementation(allSrcContent, endpoint)) {
      warnings.push(`Endpoint ${endpoint.method} ${endpoint.path} non détecté dans le code`);
    }
  }

  return {
    errors,
    warnings,
    passed: errors.length === 0
  };
}

/**
 * Vérifie que les tests attendus existent
 * Validation stricte: verifie les imports ET les describe/it blocks
 */
function validateTestCoverage(taskFiles, expectedTests) {
  const errors = [];
  const warnings = [];

  // Trouver les fichiers de test
  const testFiles = taskFiles.filter(f =>
    f.includes('test') || f.includes('spec')
  );

  if (testFiles.length === 0 && expectedTests.length > 0) {
    errors.push('Aucun fichier de test trouvé mais tests attendus dans la DoD');
    return { errors, warnings, passed: false };
  }

  // Lire le contenu des tests avec leur nom de fichier
  const testContents = [];
  for (const file of testFiles) {
    if (fs.existsSync(file)) {
      testContents.push({
        file,
        content: fs.readFileSync(file, 'utf-8')
      });
    }
  }

  // Vérifier chaque test attendu avec une validation stricte
  for (const expectedTest of expectedTests) {
    let found = false;
    let partialMatch = false;

    // Extraire le sujet principal du test (premier mot significatif)
    // Supprimer les prefixes markdown (checkbox, Test:, etc.)
    const cleaned = expectedTest
      .replace(/^\[[ x]\]\s*/i, '')
      .replace(/^(Test|test|verify|check|validate|ensure)[:\s]+/i, '');
    const subject = cleaned
      .split(/\s+/)[0]
      .toLowerCase()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Echapper les caracteres regex

    for (const { content } of testContents) {

      // Verification 1: Le fichier de test importe-t-il le module?
      // Patterns: import { X } from, import X from, require('X')
      const importPatterns = [
        new RegExp(`import\\s+.*${subject}.*\\s+from`, 'i'),
        new RegExp(`import\\s*{[^}]*${subject}[^}]*}\\s*from`, 'i'),
        new RegExp(`require\\s*\\(['""].*${subject}.*['"]\\)`, 'i')
      ];
      const hasImport = importPatterns.some(p => p.test(content));

      // Verification 2: Y a-t-il un describe/it/test block qui mentionne le sujet?
      const testBlockPatterns = [
        new RegExp(`describe\\s*\\(['""][^'"]*${subject}[^'"]*['"]`, 'i'),
        new RegExp(`it\\s*\\(['""][^'"]*${subject}[^'"]*['"]`, 'i'),
        new RegExp(`test\\s*\\(['""][^'"]*${subject}[^'"]*['"]`, 'i')
      ];
      const hasTestBlock = testBlockPatterns.some(p => p.test(content));

      // Verification stricte: IMPORT + TEST BLOCK requis
      if (hasImport && hasTestBlock) {
        found = true;
        break;
      }

      // Match partiel si au moins un des deux est present
      if (hasImport || hasTestBlock) {
        partialMatch = true;
      }
    }

    if (!found) {
      if (partialMatch) {
        warnings.push(`Test partiel pour "${expectedTest}" - verifier couverture complete`);
      } else {
        errors.push(`Test manquant: "${expectedTest}" - aucun test ne semble couvrir ce cas`);
      }
    }
  }

  return {
    errors,
    warnings,
    passed: errors.length === 0
  };
}

/**
 * Vérifie les types TypeScript (si applicable)
 */
function validateTypeScript(taskFiles) {
  const errors = [];
  const warnings = [];

  // Vérifier si c'est un projet TypeScript
  const hasTsFiles = taskFiles.some(f => f.endsWith('.ts') || f.endsWith('.tsx'));
  const hasTsConfig = fs.existsSync('tsconfig.json');

  if (!hasTsFiles || !hasTsConfig) {
    return { errors, warnings, passed: true, skipped: true };
  }

  // Exécuter tsc --noEmit sur les fichiers
  try {
    execSync('npx tsc --noEmit', {
      stdio: 'pipe',
      encoding: 'utf-8',
      timeout: 30000
    });
  } catch (error) {
    // Parser les erreurs TypeScript
    const output = error.stdout || error.stderr || '';
    const tsErrors = output.split('\n').filter(l => l.includes('error TS'));

    if (tsErrors.length > 0) {
      errors.push(`${tsErrors.length} erreur(s) TypeScript détectée(s)`);
      // Ajouter les 5 premières erreurs comme détails
      tsErrors.slice(0, 5).forEach(e => {
        warnings.push(e.trim().substring(0, 200));
      });
    }
  }

  return {
    errors,
    warnings,
    passed: errors.length === 0
  };
}

/**
 * Vérifie la couverture de code (lines, branches, functions)
 * Lance automatiquement vitest --coverage si le rapport n'existe pas.
 */
function validateCoverageThreshold() {
  const errors = [];
  const warnings = [];
  const config = getConfig();
  const summaryPath = 'coverage/coverage-summary.json';

  // Skip coverage entirely if all thresholds are 0 (e.g., n8n workflow projects)
  if (config.coverageThreshold === 0 && config.branchCoverageThreshold === 0 && config.functionCoverageThreshold === 0) {
    return { errors, warnings, passed: true, skipped: true, reason: 'All coverage thresholds set to 0' };
  }

  // Si pas de rapport, tenter de le generer automatiquement
  if (!fs.existsSync(summaryPath)) {
    console.log('   ⏳ Rapport de couverture absent, lancement automatique...');
    try {
      execSync('npx vitest run --coverage', {
        stdio: 'pipe',
        encoding: 'utf-8',
        timeout: 120000
      });
    } catch (e) {
      // Les tests peuvent echouer mais le rapport peut quand meme etre genere
      if (!fs.existsSync(summaryPath)) {
        errors.push('Impossible de generer le rapport de couverture (vitest run --coverage a echoue)');
        return { errors, warnings, passed: false };
      }
    }
  }

  // Lire le rapport
  let coverage;
  try {
    coverage = JSON.parse(fs.readFileSync(summaryPath, 'utf-8'));
  } catch (e) {
    errors.push(`Erreur lecture ${summaryPath}: ${e.message}`);
    return { errors, warnings, passed: false };
  }

  const total = coverage.total || {};

  // Verifier les 3 metriques
  const checks = [
    { name: 'Lines', pct: total.lines?.pct, threshold: config.coverageThreshold },
    { name: 'Branches', pct: total.branches?.pct, threshold: config.branchCoverageThreshold },
    { name: 'Functions', pct: total.functions?.pct, threshold: config.functionCoverageThreshold }
  ];

  for (const check of checks) {
    if (check.pct == null) {
      warnings.push(`Metrique ${check.name} non disponible dans le rapport`);
      continue;
    }
    if (check.pct < check.threshold) {
      errors.push(`Couverture ${check.name} insuffisante: ${check.pct.toFixed(1)}% (minimum: ${check.threshold}%)`);
    }
  }

  return {
    errors,
    warnings,
    passed: errors.length === 0,
    coverage: {
      lines: total.lines?.pct ?? null,
      branches: total.branches?.pct ?? null,
      functions: total.functions?.pct ?? null
    }
  };
}

/**
 * Valide une task complète
 */
async function validateTask(taskFile) {
  console.log(`\n🔍 Validation: ${path.basename(taskFile)}\n`);

  // Charger la task
  const taskContent = loadMarkdown(taskFile);
  if (!taskContent) {
    console.error(`❌ Task non trouvée: ${taskFile}`);
    return { passed: false, critical: true };
  }

  // Extraire les infos de la task
  const taskScope = extractTaskScope(taskContent);
  const expectedTests = extractExpectedTests(taskContent);

  console.log(`   Fichiers scope: ${taskScope.length}`);
  console.log(`   Tests attendus: ${expectedTests.length}`);

  // Charger les specs
  const apiSpec = loadMarkdown('docs/specs/api.md');

  // Résultats de validation
  const results = {
    api: { passed: true, errors: [], warnings: [] },
    tests: { passed: true, errors: [], warnings: [] },
    types: { passed: true, errors: [], warnings: [], skipped: false },
    coverage: { passed: true, errors: [], warnings: [], skipped: false }
  };

  // 1. Validation conformité API
  if (apiSpec) {
    console.log('   📋 Vérification conformité API...');
    results.api = validateApiCompliance(taskScope, apiSpec);
  }

  // 2. Validation tests
  console.log('   🧪 Vérification tests attendus...');
  results.tests = validateTestCoverage(taskScope, expectedTests);

  // 3. Validation TypeScript
  console.log('   📝 Vérification TypeScript...');
  results.types = validateTypeScript(taskScope);

  // 4. Validation couverture
  console.log('   📊 Vérification couverture...');
  results.coverage = validateCoverageThreshold();

  // Compiler le rapport
  const allErrors = [
    ...results.api.errors,
    ...results.tests.errors,
    ...results.types.errors,
    ...results.coverage.errors
  ];

  const allWarnings = [
    ...results.api.warnings,
    ...results.tests.warnings,
    ...results.types.warnings,
    ...results.coverage.warnings
  ];

  // Afficher le résultat
  console.log('');

  if (allErrors.length > 0) {
    console.log('❌ ERREURS CRITIQUES:');
    allErrors.forEach(e => console.log(`   - ${e}`));
  }

  if (allWarnings.length > 0) {
    console.log('⚠️  AVERTISSEMENTS:');
    allWarnings.forEach(w => console.log(`   - ${w}`));
  }

  const passed = allErrors.length === 0;

  if (passed) {
    console.log('✅ Validation PASS');
  } else {
    console.log('❌ Validation FAIL (mode STRICT)');
  }

  return {
    passed,
    critical: allErrors.length > 0,
    errors: allErrors,
    warnings: allWarnings,
    results
  };
}

/**
 * Mode Gate 4 - Validation globale avant QA
 *
 * Strategie d'optimisation :
 *   - TypeScript (tsc --noEmit) et couverture (vitest --coverage)
 *     sont des validations GLOBALES → executees UNE SEULE FOIS
 *   - API compliance et tests attendus sont PER-TASK (lecture fichiers, rapide)
 */
async function validateGate4() {
  console.log('\n🔍 Gate 4 - Validation Code Quality (Mode STRICT)\n');
  console.log('═'.repeat(50));

  // Trouver toutes les tasks (versionné)
  const tasksDir = getTasksDir();
  if (!fs.existsSync(tasksDir)) {
    console.error(`❌ Dossier tasks non trouvé: ${tasksDir}`);
    process.exit(1);
  }

  const taskFiles = fs.readdirSync(tasksDir)
    .filter(f => f.match(/^TASK-\d{4}/))
    .sort()
    .map(f => path.join(tasksDir, f));

  console.log(`Tasks à valider: ${taskFiles.length}\n`);

  const globalErrors = [];
  const globalWarnings = [];

  // --- Validations GLOBALES (une seule fois) ---

  // 1. TypeScript
  console.log('📝 Vérification TypeScript (global)...');
  const tsResult = validateTypeScript(
    taskFiles.flatMap(f => {
      const content = loadMarkdown(f);
      return content ? extractTaskScope(content) : [];
    })
  );
  if (!tsResult.passed && !tsResult.skipped) {
    globalErrors.push(...tsResult.errors);
    globalWarnings.push(...tsResult.warnings);
    console.log(`   ❌ ${tsResult.errors.length} erreur(s) TypeScript\n`);
  } else if (tsResult.skipped) {
    console.log('   ⚠️  TypeScript skip (pas de .ts/.tsx ou tsconfig)\n');
  } else {
    console.log('   ✅ TypeScript OK\n');
  }

  // 2. Couverture
  console.log('📊 Vérification couverture (global)...');
  const covResult = validateCoverageThreshold();
  if (!covResult.passed) {
    globalErrors.push(...covResult.errors);
    globalWarnings.push(...covResult.warnings);
    console.log(`   ❌ ${covResult.errors.length} erreur(s) couverture\n`);
  } else {
    const cov = covResult.coverage || {};
    console.log(`   ✅ Couverture OK (L:${cov.lines?.toFixed(1) ?? '?'}% B:${cov.branches?.toFixed(1) ?? '?'}% F:${cov.functions?.toFixed(1) ?? '?'}%)\n`);
  }

  // --- Validations PER-TASK (rapides, lecture fichiers) ---

  let totalErrors = globalErrors.length;
  let totalWarnings = globalWarnings.length;
  const failedTasks = [];

  const apiSpec = loadMarkdown('docs/specs/api.md');

  for (const taskFile of taskFiles) {
    const taskName = path.basename(taskFile);
    const taskContent = loadMarkdown(taskFile);
    if (!taskContent) {
      totalErrors++;
      failedTasks.push(taskName);
      continue;
    }

    const taskScope = extractTaskScope(taskContent);
    const expectedTests = extractExpectedTests(taskContent);
    const taskErrors = [];
    const taskWarnings = [];

    // API compliance (lecture fichiers, rapide)
    if (apiSpec) {
      const apiResult = validateApiCompliance(taskScope, apiSpec);
      taskErrors.push(...apiResult.errors);
      taskWarnings.push(...apiResult.warnings);
    }

    // Tests attendus (lecture fichiers, rapide)
    // Si la couverture globale passe, les erreurs per-task deviennent des warnings
    // car le fuzzy matching peut manquer des correspondances (noms FR vs EN)
    const testResult = validateTestCoverage(taskScope, expectedTests);
    if (covResult.passed) {
      // Couverture globale OK: per-task test matching errors deviennent warnings
      taskWarnings.push(...testResult.errors);
    } else {
      taskErrors.push(...testResult.errors);
    }
    taskWarnings.push(...testResult.warnings);

    totalErrors += taskErrors.length;
    totalWarnings += taskWarnings.length;

    if (taskErrors.length > 0) {
      failedTasks.push(taskName);
      console.log(`   ❌ ${taskName}: ${taskErrors.join('; ')}`);
    }
  }

  // Rapport final
  console.log('\n' + '═'.repeat(50));
  console.log('RAPPORT FINAL - Code Quality Gate 4');
  console.log('═'.repeat(50));
  console.log(`Tasks validées: ${taskFiles.length - failedTasks.length}/${taskFiles.length}`);
  console.log(`Erreurs critiques: ${totalErrors}`);
  console.log(`Avertissements: ${totalWarnings}`);

  if (totalErrors > 0) {
    if (failedTasks.length > 0) {
      console.log(`\nTasks en échec:`);
      failedTasks.forEach(t => console.log(`   - ${t}`));
    }
    if (globalErrors.length > 0) {
      console.log(`\nErreurs globales:`);
      globalErrors.forEach(e => console.log(`   - ${e}`));
    }
    console.log('\n❌ Gate 4 FAIL (mode STRICT)');
    process.exit(2);
  }

  console.log('\n✅ Gate 4 PASS - Code Quality OK');
  process.exit(0);
}

// Main
const arg = process.argv[2];

if (!arg) {
  console.log('Usage:');
  console.log('  node tools/validate-code-quality.js <task-file>  # Valide une task');
  console.log('  node tools/validate-code-quality.js --gate4      # Mode Gate 4');
  console.log('');
  console.log('Mode: STRICT (bloque si non-conformité critique)');
  const config = getConfig();
  console.log(`  - Couverture Lines minimum: ${config.coverageThreshold}%`);
  console.log(`  - Couverture Branches minimum: ${config.branchCoverageThreshold}%`);
  console.log(`  - Couverture Functions minimum: ${config.functionCoverageThreshold}%`);
  console.log(`  - Types TypeScript: ${config.strictTypes ? 'requis' : 'optionnel'}`);
  console.log(`  - Conformité specs: ${config.specComplianceRequired ? 'requis' : 'optionnel'}`);
  process.exit(0);
}

if (arg === '--gate4' || arg === '--all') {
  validateGate4();
} else {
  validateTask(arg).then(result => {
    process.exit(result.passed ? 0 : 2);
  });
}
