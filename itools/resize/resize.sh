#!/bin/bash
# Usage: ./resize.sh <directory>

directory="$1"

for file in $(ls "$directory/")
do
  echo "convert \"$directory/$file\" -resize 800x600 \"$directory/small-$file\""
  convert "$directory/$file" -resize 800x600 "$directory/small-$file"
done
