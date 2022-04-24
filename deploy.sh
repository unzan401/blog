
set -e

npm run docs:build

cd docs/.vuepress/dist



git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:unzan401/blog.git master:gh-pages

cd -