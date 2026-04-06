#!/bin/bash
# Test runner for Playbook FSY
# This project uses a single HTML file with no npm dependencies.
# Tests verify the structure and content of index.html.

set -e

PASS=0
FAIL=0
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
INDEX="$PROJECT_DIR/index.html"

assert() {
  local desc="$1"
  local result="$2"
  if [ "$result" = "true" ]; then
    echo "  PASS: $desc"
    PASS=$((PASS + 1))
  else
    echo "  FAIL: $desc"
    FAIL=$((FAIL + 1))
  fi
}

echo "=== Playbook FSY — Test Suite ==="
echo ""

# Test: index.html exists
echo "[Structure]"
assert "index.html exists" "$([ -f "$INDEX" ] && echo true || echo false)"

# Test: File size under 100KB
SIZE=$(wc -c < "$INDEX" | tr -d ' ')
# Note: < 100KB is an objective, not mandatory (TASK-0012 DoD)
if [ "$SIZE" -lt 102400 ]; then
  assert "index.html < 100KB (actual: ${SIZE}B)" "true"
else
  echo "  INFO: index.html is ${SIZE}B (goal: <100KB, not blocking)"
fi

# Test: CDN Supabase present
echo ""
echo "[CDN]"
assert "Supabase JS CDN present" "$(grep -q 'cdn.jsdelivr.net/npm/@supabase/supabase-js@2' "$INDEX" && echo true || echo false)"

# Test: Google Fonts present
assert "Google Fonts present" "$(grep -q 'fonts.googleapis.com' "$INDEX" && echo true || echo false)"

# Test: Design tokens
echo ""
echo "[Design Tokens]"
assert "CSS var --fsy-terracotta" "$(grep -q '\-\-fsy-terracotta' "$INDEX" && echo true || echo false)"
assert "CSS var --fsy-creme" "$(grep -q '\-\-fsy-creme' "$INDEX" && echo true || echo false)"
assert "CSS var --fsy-teal" "$(grep -q '\-\-fsy-teal' "$INDEX" && echo true || echo false)"

# Test: 4 sections commentees
echo ""
echo "[Architecture]"
assert "Section DOMAIN present" "$(grep -q 'SECTION: DOMAIN' "$INDEX" && echo true || echo false)"
assert "Section APPLICATION present" "$(grep -q 'SECTION: APPLICATION' "$INDEX" && echo true || echo false)"
assert "Section INFRASTRUCTURE present" "$(grep -q 'SECTION: INFRASTRUCTURE' "$INDEX" && echo true || echo false)"
assert "Section UI present" "$(grep -q 'SECTION: UI' "$INDEX" && echo true || echo false)"

# Test: Domain functions
echo ""
echo "[Domain Functions]"
assert "calculateAbsoluteDate defined" "$(grep -q 'function calculateAbsoluteDate' "$INDEX" && echo true || echo false)"
assert "calculateProgress defined" "$(grep -q 'function calculateProgress' "$INDEX" && echo true || echo false)"
assert "getStepStatus defined" "$(grep -q 'function getStepStatus' "$INDEX" && echo true || echo false)"
assert "filterTasksByOwner defined" "$(grep -q 'function filterTasksByOwner' "$INDEX" && echo true || echo false)"
assert "sortStepsByDate defined" "$(grep -q 'function sortStepsByDate' "$INDEX" && echo true || echo false)"
assert "buildGanttData defined" "$(grep -q 'function buildGanttData' "$INDEX" && echo true || echo false)"
assert "instantiateTemplate defined" "$(grep -q 'function instantiateTemplate' "$INDEX" && echo true || echo false)"
assert "duplicateProcess defined" "$(grep -q 'function duplicateProcess' "$INDEX" && echo true || echo false)"

# Test: No Supabase/DOM in Domain
echo ""
echo "[Boundary Compliance]"
# Extract Domain section and check for supabase/document references
DOMAIN_SECTION=$(sed -n '/SECTION: DOMAIN/,/SECTION: APPLICATION/p' "$INDEX")
assert "Domain has no supabase reference" "$(echo "$DOMAIN_SECTION" | grep -v 'supabase.createClient' | grep -v 'supabaseClient' | grep -cq 'supabase\.' && echo false || echo true)"
# Check for document.getElementById/querySelector/createElement (DOM manipulation), not text containing 'document'
assert "Domain has no DOM manipulation" "$(echo "$DOMAIN_SECTION" | grep -q 'document\.\(getElementById\|querySelector\|createElement\|body\|addEventListener\)' && echo false || echo true)"

# Test: Templates
echo ""
echo "[Templates]"
assert "TEMPLATES object defined" "$(grep -q 'const TEMPLATES' "$INDEX" && echo true || echo false)"
assert "Template T1 defined" "$(grep -q "id:.*'T1'" "$INDEX" && echo true || echo false)"
assert "Template T2 defined" "$(grep -q "id:.*'T2'" "$INDEX" && echo true || echo false)"
assert "Template T3 defined" "$(grep -q "id:.*'T3'" "$INDEX" && echo true || echo false)"
assert "Template T4 defined" "$(grep -q "id:.*'T4'" "$INDEX" && echo true || echo false)"
assert "Template T5a defined" "$(grep -q "id:.*'T5a'" "$INDEX" && echo true || echo false)"
assert "Template T5b defined" "$(grep -q "id:.*'T5b'" "$INDEX" && echo true || echo false)"
assert "Template T6 defined" "$(grep -q "id:.*'T6'" "$INDEX" && echo true || echo false)"
assert "Template T7 defined" "$(grep -q "id:.*'T7'" "$INDEX" && echo true || echo false)"
assert "Template T8 defined" "$(grep -q "id:.*'T8'" "$INDEX" && echo true || echo false)"
assert "Template T9 defined" "$(grep -q "id:.*'T9'" "$INDEX" && echo true || echo false)"
assert "Template T10 defined" "$(grep -q "id:.*'T10'" "$INDEX" && echo true || echo false)"

# Test: No "n8n" in templates (should use "automatisation")
assert "No 'n8n' term used" "$(grep -q 'n8n' "$INDEX" && echo false || echo true)"

# Test: Infrastructure
echo ""
echo "[Infrastructure]"
assert "db object defined" "$(grep -q 'var db = {' "$INDEX" && echo true || echo false)"
assert "db.processes.getAll" "$(grep -q 'processes:' "$INDEX" && echo true || echo false)"
assert "db.auth.signIn" "$(grep -q 'signInWithPassword' "$INDEX" && echo true || echo false)"
assert "Error messages in French" "$(grep -q 'Email ou mot de passe incorrect' "$INDEX" && echo true || echo false)"

# Test: Application
echo ""
echo "[Application]"
assert "appState defined" "$(grep -q 'var appState' "$INDEX" && echo true || echo false)"
assert "loadAllData defined" "$(grep -q 'async function loadAllData' "$INDEX" && echo true || echo false)"
assert "createProcess defined" "$(grep -q 'async function createProcess' "$INDEX" && echo true || echo false)"
assert "toggleStep defined" "$(grep -q 'async function toggleStep' "$INDEX" && echo true || echo false)"
assert "exportData defined" "$(grep -q 'async function exportData' "$INDEX" && echo true || echo false)"
assert "importData defined" "$(grep -q 'async function importData' "$INDEX" && echo true || echo false)"

# Test: UI
echo ""
echo "[UI]"
assert "Login form present" "$(grep -q 'id=\"login-email\"' "$INDEX" && echo true || echo false)"
assert "Logout button present" "$(grep -q 'id=\"btn-logout\"' "$INDEX" && echo true || echo false)"
assert "Process list container" "$(grep -q 'id=\"process-list\"' "$INDEX" && echo true || echo false)"
assert "Tasks list container" "$(grep -q 'id=\"tasks-list\"' "$INDEX" && echo true || echo false)"
assert "Gantt container" "$(grep -q 'id=\"gantt-container\"' "$INDEX" && echo true || echo false)"
assert "renderProcessList defined" "$(grep -q 'function renderProcessList' "$INDEX" && echo true || echo false)"
assert "renderProcessDetail defined" "$(grep -q 'function renderProcessDetail' "$INDEX" && echo true || echo false)"
assert "renderTasksList defined" "$(grep -q 'function renderTasksList' "$INDEX" && echo true || echo false)"
assert "renderGantt defined" "$(grep -q 'function renderGantt' "$INDEX" && echo true || echo false)"

# Test: CSS indicators
echo ""
echo "[CSS]"
assert "Status done class" "$(grep -q 'status-done' "$INDEX" && echo true || echo false)"
assert "Status overdue class" "$(grep -q 'status-overdue' "$INDEX" && echo true || echo false)"
assert "Status upcoming class" "$(grep -q 'status-upcoming' "$INDEX" && echo true || echo false)"
assert "@media print rules" "$(grep -q '@media print' "$INDEX" && echo true || echo false)"
assert "Responsive @media rules" "$(grep -q '@media (max-width: 768px)' "$INDEX" && echo true || echo false)"

# Test: No personal data
echo ""
echo "[Security]"
assert "No real email addresses" "$(grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' "$INDEX" | grep -v 'example\.\|test\.\|fonts\.\|googleapis\.\|gstatic\.\|jsdelivr\.\|supabase\.' | head -1 | wc -l | tr -d ' ' | grep -q '^0$' && echo true || echo false)"

# Summary
echo ""
echo "=== Results ==="
echo "PASS: $PASS"
echo "FAIL: $FAIL"
TOTAL=$((PASS + FAIL))
echo "TOTAL: $TOTAL"

if [ "$FAIL" -gt 0 ]; then
  echo ""
  echo "FAILED"
  exit 1
fi

echo ""
echo "ALL TESTS PASSED"
exit 0
