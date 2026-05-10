#!/usr/bin/env bash
# 專案驗收：前端 typecheck + 建置、後端聯絡 API（curl）。
# 用法：於 repo 根目錄執行 `npm run verify`
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> 1/4 前端 typecheck"
npm run typecheck:frontend

echo "==> 2/4 後端 API（本機暫起，MAIL_DRY_RUN=1）"
VERIFY_PORT="${VERIFY_PORT:-3099}"
if PIDS="$(lsof -ti:"$VERIFY_PORT" 2>/dev/null)"; then
  echo "    釋放佔用埠 $VERIFY_PORT 的行程…"
  kill -9 $PIDS 2>/dev/null || true
  sleep 0.4
fi
(cd backend && PORT="$VERIFY_PORT" MAIL_DRY_RUN=1 CORS_ORIGINS=http://localhost:3000 node src/server.js) &
BACK_PID=$!
cleanup() { kill "$BACK_PID" 2>/dev/null || true; }
trap cleanup EXIT
sleep 1
if ! kill -0 "$BACK_PID" 2>/dev/null; then
  echo "FAIL: 後端未成功啟動（請檢查埠 $VERIFY_PORT）"
  exit 1
fi

echo "    GET /health"
H="$(curl -sS "http://127.0.0.1:${VERIFY_PORT}/health")"
echo "$H" | grep -q '"ok":true' || { echo "FAIL: health $H"; exit 1; }

echo "    POST /api/contact（合法）"
R="$(curl -sS -w '\n%{http_code}' -X POST "http://127.0.0.1:${VERIFY_PORT}/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"name":"驗證腳本","phone":"0912000111","email":"","summary":"npm run verify","privacyAccepted":true,"website":""}')"
CODE="${R##*$'\n'}"
BODY="${R%$'\n'*}"
test "$CODE" = "200" || { echo "FAIL: status $CODE body $BODY"; exit 1; }
echo "$BODY" | grep -q '"ok":true' || { echo "FAIL: body $BODY"; exit 1; }
echo "$BODY" | grep -q '"mail":"dry_run"' || { echo "FAIL: expected dry_run $BODY"; exit 1; }

echo "    POST honeypot（website 有值）"
R2="$(curl -sS -w '\n%{http_code}' -X POST "http://127.0.0.1:${VERIFY_PORT}/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"name":"","phone":"","email":"","summary":"","privacyAccepted":false,"website":"bot"}')"
CODE2="${R2##*$'\n'}"
BODY2="${R2%$'\n'*}"
test "$CODE2" = "200" || { echo "FAIL honeypot status $CODE2"; exit 1; }
echo "$BODY2" | grep -q '"accepted":true' || { echo "FAIL honeypot body $BODY2"; exit 1; }

echo "    POST 驗證失敗（400）"
R3="$(curl -sS -w '\n%{http_code}' -X POST "http://127.0.0.1:${VERIFY_PORT}/api/contact" \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3000" \
  -d '{"name":"","phone":"","email":"","summary":"","privacyAccepted":false,"website":""}')"
CODE3="${R3##*$'\n'}"
BODY3="${R3%$'\n'*}"
test "$CODE3" = "400" || { echo "FAIL validation status $CODE3 body $BODY3"; exit 1; }
echo "$BODY3" | grep -q 'validation_error' || { echo "FAIL validation body $BODY3"; exit 1; }

echo "    GET /api/instagram/stories"
IG="$(curl -sS "http://127.0.0.1:${VERIFY_PORT}/api/instagram/stories")"
echo "$IG" | grep -q '"ok":true' || { echo "FAIL ig $IG"; exit 1; }
echo "$IG" | grep -q '"stories"' || { echo "FAIL ig stories key $IG"; exit 1; }
echo "$IG" | grep -q '"source":"disabled"' || { echo "FAIL ig expected disabled without env $IG"; exit 1; }

echo "==> 3/4 關閉後端"
kill "$BACK_PID" 2>/dev/null || true
trap - EXIT
wait "$BACK_PID" 2>/dev/null || true

echo "==> 4/4 前端 production build（清空 .nuxt / .output）"
rm -rf frontend/.nuxt frontend/.output
NUXT_IGNORE_LOCK=1 npm run build:frontend

echo "    預渲染 /contact HTML 含關鍵字"
grep -q "聯繫本所" frontend/.output/public/contact/index.html || { echo "FAIL: prerendered contact page"; exit 1; }
grep -q "線上留言" frontend/.output/public/contact/index.html || { echo "FAIL: contact form section"; exit 1; }

echo "==> 全部通過"
