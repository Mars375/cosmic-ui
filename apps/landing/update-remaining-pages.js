import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour traiter un fichier
function processFile(filePath) {
  console.log(`Traitement de ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Ajouter l'import CodeBlock s'il n'existe pas
  if (!content.includes('import { CodeBlock }')) {
    // Trouver la ligne d'import de @cosmic-ui/ui
    const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+['"]@cosmic-ui\/ui['"];?/);
    if (importMatch) {
      const newImport = `import { CodeBlock } from '../../../components/code-block';`;
      content = content.replace(importMatch[0], importMatch[0] + '\n' + newImport);
      modified = true;
    }
  }

  // Remplacer les blocs de code simples
  const simpleCodePattern = /<div className="bg-muted p-4 rounded-lg">\s*<code className="text-sm">([^<]+)<\/code>\s*<\/div>/g;

  content = content.replace(simpleCodePattern, (match, codeContent) => {
    const trimmedContent = codeContent.trim();
    if (trimmedContent.includes('npm install') || trimmedContent.includes('pnpm add') || trimmedContent.includes('yarn add')) {
      const newCodeBlock = `<CodeBlock filePath="package.json">${trimmedContent}</CodeBlock>`;
      modified = true;
      return newCodeBlock;
    } else if (trimmedContent.includes('import') || trimmedContent.includes('export')) {
      const newCodeBlock = `<CodeBlock language="typescript" filePath="components/Example.tsx" showPackageManager={false}>
{${JSON.stringify(trimmedContent)}}
</CodeBlock>`;
      modified = true;
      return newCodeBlock;
    }
    return match;
  });

  // Remplacer les blocs d'installation avec onglets
  const installBlockPattern = /<div className="border border-border rounded-lg overflow-hidden">([\s\S]*?)<\/div>/g;

  content = content.replace(installBlockPattern, (match, blockContent) => {
    if (blockContent.includes('packageManager') || blockContent.includes('pnpm') || blockContent.includes('npm')) {
      const codeMatch = blockContent.match(/<code>([\s\S]*?)<\/code>/);
      if (codeMatch) {
        const codeContent = codeMatch[1].trim();
        if (codeContent) {
          const newCodeBlock = `<CodeBlock filePath="package.json">${codeContent}</CodeBlock>`;
          modified = true;
          return newCodeBlock;
        }
      }
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${filePath} mis à jour`);
    return true;
  }

  return false;
}

// Fonction pour parcourir récursivement les dossiers
function walkDirectory(dir, callback) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDirectory(filePath, callback);
    } else if (file.endsWith('.tsx') && file === 'page.tsx') {
      callback(filePath);
    }
  });
}

// Traitement principal
const docsDir = path.join(__dirname, 'app', 'docs');
let processedCount = 0;
let modifiedCount = 0;

console.log('Début du traitement des pages de documentation restantes...\n');

walkDirectory(docsDir, (filePath) => {
  processedCount++;
  if (processFile(filePath)) {
    modifiedCount++;
  }
});

console.log(`\nTraitement terminé !`);
console.log(`Pages traitées: ${processedCount}`);
console.log(`Pages modifiées: ${modifiedCount}`);
