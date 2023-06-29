#!usr/bin/env bash

#当发生错误中止脚本
set -e

cd dist

git config --global user.email "zhangsanplus@gmail.com"
git config --global user.name "zhangsanplus"

git init
git add -A
git commit -m 'deploy'

git push -f https://${access_token}@github.com/zhangsanplus/zhangsanplus.github.io master

echo 'deploy success'
cd -