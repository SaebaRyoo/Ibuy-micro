#!/bin/bash

# 检查目标文件夹是否存在，如果不存在则创建
mkdir -p ./apps || if [[ ! -d ./apps ]]; then exit 1; fi

# 查找并复制所有的 .proto 文件到目标文件夹中的 protos 目录
find ./apps -mindepth 1 -maxdepth 1 -type d -exec sh -c 'mkdir -p "$0/protos" && cp ./protos/*.proto "$0/protos/"' {} \;

echo "copy successfully"
