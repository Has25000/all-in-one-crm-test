#!/usr/bin/env bash
# Publish the built site to the gh-pages branch.
#
# GitHub Pages can serve straight from a branch, which needs no Actions
# minutes — the free path when Actions is unavailable.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
WORKTREE="$(mktemp -d)"
trap 'git -C "$ROOT" worktree remove --force "$WORKTREE" 2>/dev/null || true' EXIT

cd "$ROOT"
npm run build:pages

if git show-ref --quiet refs/heads/gh-pages; then
  git worktree add "$WORKTREE" gh-pages
else
  git worktree add --detach "$WORKTREE"
  git -C "$WORKTREE" checkout --orphan gh-pages
fi

# Replace the branch contents wholesale so removed files do not linger.
find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +
cp -R dist/. "$WORKTREE"/
touch "$WORKTREE/.nojekyll"

git -C "$WORKTREE" add -A
if git -C "$WORKTREE" diff --cached --quiet; then
  echo "gh-pages is already up to date."
else
  git -C "$WORKTREE" commit -q -m "Deploy $(git rev-parse --short HEAD)"
  git -C "$WORKTREE" push -q origin gh-pages
  echo "Pushed to gh-pages."
fi
