#!/bin/bash

mkdir -p optimizados

for file in *.pdf; do
  gs -sDEVICE=pdfwrite \
     -dCompatibilityLevel=1.4 \
     -dPDFSETTINGS=/ebook \
     -dNOPAUSE \
     -dQUIET \
     -dBATCH \
     -sOutputFile="optimizados/$file" \
     "$file"

  echo "Comprimido: $file"
done