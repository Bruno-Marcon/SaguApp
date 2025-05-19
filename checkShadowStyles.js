const fs = require('fs');
const path = require('path');

// Pasta raiz onde está seu código (ajustada para 'src')
const baseDir = './src';

const SHADOW_PROPS = ['shadowOffset', 'shadowColor', 'shadowOpacity', 'shadowRadius', 'elevation'];

function searchInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let found = false;

  lines.forEach((line, index) => {
    SHADOW_PROPS.forEach((prop) => {
      const pattern = new RegExp(`[^a-zA-Z]${prop}\\s*=[^=]`, 'g');
      if (pattern.test(line)) {
        if (!found) {
          console.log(`\n❌ Estilo incorreto em: ${filePath}`);
          found = true;
        }
        console.log(`   → Linha ${index + 1}: ${line.trim()}`);
      }
    });
  });
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(tsx|jsx)$/.test(fullPath)) {
      searchInFile(fullPath);
    }
  });
}

// Início da varredura
walkDir(baseDir);
