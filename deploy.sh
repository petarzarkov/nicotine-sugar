#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git checkout -b main
git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"
git config --local user.name "github-actions[bot]"
git add -A
git commit -m 'deploy'

git push -f https://github.com/petarzarkov/nicotine-sugar.git main:gh-pages


cd -