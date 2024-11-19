#!/bin/bash

# 定义根目录和输出文件
root_dir="docs"
output_file="permalinks.txt"
base_url="https://dingyuqi.com"

# 创建或清空 output_file
> "$output_file"

# 遍历 docs 文件夹下的所有子文件夹和文件
find "$root_dir" -type d -name ".vuepress" -prune -o -type f -name "*.md" | while read -r file; do
  # 使用 grep 查找文件中的 permalink，并在前面加上 base_url
  if [ -f "$file" ]; then  # 确保只对文件执行 grep
    grep -oP '^permalink:\s*\K.*' "$file" | while read -r permalink; do
      echo "$base_url$permalink" >> "$output_file"
    done
  fi
done

echo "Permalinks have been extracted and formatted to $output_file"
