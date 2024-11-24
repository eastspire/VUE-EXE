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
# linux
echo "构建linux！"
mkdir -p ./output/linux
yarn run build:linux
mv ./out/* ./output/linux
rm -rf ./out
echo "Press Enter to continue..."
read -n 1;
