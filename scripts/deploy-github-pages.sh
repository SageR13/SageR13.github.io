#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY="$ROOT/.gh-pages-deploy"
REPO="https://github.com/SageR13/SageR13.github.io.git"

cd "$ROOT"
npm run build

rm -rf "$DEPLOY"
mkdir -p "$DEPLOY"

rsync -a "$ROOT/dist/" "$DEPLOY/" \
  --exclude 'blockVid/blink.mp4' \
  --exclude 'blockVid/trail.mp4' \
  --exclude 'blockVid/rockOnRaccon.mp4'

cp "$DEPLOY/index.html" "$DEPLOY/404.html"

cd "$DEPLOY"
git init
git checkout -b main
git add -A
git commit -m "Deploy updated portfolio site."

if git ls-remote "$REPO" main >/dev/null 2>&1; then
  git remote add origin "$REPO"
  git fetch origin main --depth 1
  git push origin main --force-with-lease
else
  git remote add origin "$REPO"
  git push -u origin main
fi

echo "Deployed to https://sager13.github.io"
