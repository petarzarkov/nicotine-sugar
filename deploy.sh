#!/usr/bin/env sh

# abort on errors
set -e

# build
npm install
npm run build

# navigate into the build output directory
cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f https://github.com/petarzarkov/nicotine-sugar.git.git main:gh-pages

cd -