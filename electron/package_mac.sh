#!/bin/bash
echo "开始清空旧项目"
rm -rf ./ltpp-x64-installer\(v1.0.0\).exe
rm -rf ./ltpp-ia32-installer\(v1.0.0\).exe
rm -rf ./ltpp-arm64-installer\(v1.0.0\).exe
rm -rf ./ltpp-x64-cache
rm -rf ./ltpp-ia32-cache
rm -rf ./ltpp-arm64-cache
rm -rf ./out
rm -rf ./output
echo "旧项目清空完成！"
# mac
echo "构建mac！"
mkdir -p ./output/mac
yarn run build:mac
mv ./out/* ./output/mac
rm -rf ./out
