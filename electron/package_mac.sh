#!/bin/bash
echo "开始清空旧项目"
rm -rf ./ltpp-x64-cache
rm -rf ./ltpp-ia32-cache
rm -rf ./ltpp-arm64-cache
rm -rf ./out
echo "旧项目清空完成！"
# mac
echo "构建mac！"
yarn run build:mac
echo "Press Enter to continue..."
read -n 1;
