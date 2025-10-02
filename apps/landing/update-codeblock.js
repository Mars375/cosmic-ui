#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Début de la mise à jour automatique des composants CodeBlock...\n');

// Trouver tous les fichiers avec des composants CodeBlock locaux
const findFilesWithLocalCodeBlock = () => {
  try {
    const result = execSync('find app/docs -name "*.tsx" -exec grep -l "const CodeBlock" {} +', {
      encoding: 'utf8',
      cwd: process.cwd()
    });
    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.log('Aucun fichier avec composant CodeBlock local trouvé.');
    return [];
  }
};

// Fonction pour remplacer le contenu d'un fichier
const updateFile = (filePath) => {
  console.log(`📝 Mise à jour de ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remplacer l'import et supprimer la définition locale du composant CodeBlock
  const codeBlockDefinitionRegex = /const CodeBlock = \(\{[\s\S]*?\};\s*/g;
  content = content.replace(codeBlockDefinitionRegex, '');

  // 2. Ajouter l'import du nouveau composant si pas déjà présent
  if (!content.includes("import { CodeBlock } from '../../../components/code-block'")) {
    const importRegex = /(import.*from.*['"];?\s*)/;
    const match = content.match(importRegex);
    if (match) {
      content = content.replace(
        match[0],
        match[0] + "import { CodeBlock } from '../../../components/code-block';\n"
      );
    }
  }

  // 3. Remplacer les utilisations de CodeBlock avec onCopy par le nouveau format
  // Pattern pour CodeBlock avec onCopy
  const codeBlockWithOnCopyRegex = /<CodeBlock\s+onCopy=\{\(\)\s*=>\s*copyToClipboard\([^)]*\)\}>/g;
  content = content.replace(codeBlockWithOnCopyRegex, '<CodeBlock language="typescript" showPackageManager={false}>');

  // Pattern pour CodeBlock avec onCopy et handleCopy
  const codeBlockWithHandleCopyRegex = /<CodeBlock\s+onCopy=\{\(\)\s*=>\s*handleCopy\([^)]*\)\}>/g;
  content = content.replace(codeBlockWithHandleCopyRegex, '<CodeBlock language="typescript" showPackageManager={false}>');

  // 4. Remplacer les commandes d'installation npm par pnpm
  content = content.replace(/npm install @cosmic-ui\/ui/g, 'pnpm add @cosmic-ui/ui');

  // 5. Supprimer les fonctions copyToClipboard et handleCopy inutilisées
  const copyToClipboardRegex = /const copyToClipboard = \([^)]*\) => \{[\s\S]*?\};\s*/g;
  content = content.replace(copyToClipboardRegex, '');

  const handleCopyRegex = /const handleCopy = \([^)]*\) => \{[\s\S]*?\};\s*/g;
  content = content.replace(handleCopyRegex, '');

  // 6. Supprimer les états copiedStates inutilisés
  const copiedStatesRegex = /const \[copiedStates, setCopiedStates\] = useState<Record<string, boolean>>\(\{\}\);\s*/g;
  content = content.replace(copiedStatesRegex, '');

  // 7. Nettoyer les lignes vides multiples
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${filePath} mis à jour avec succès`);
};

// Fonction principale
const main = () => {
  const files = findFilesWithLocalCodeBlock();

  if (files.length === 0) {
    console.log('🎉 Aucun fichier à mettre à jour. Tous les composants CodeBlock sont déjà centralisés !');
    return;
  }

  console.log(`📋 ${files.length} fichiers trouvés avec des composants CodeBlock locaux :`);
  files.forEach(file => console.log(`   - ${file}`));
  console.log('');

  // Mettre à jour chaque fichier
  files.forEach(updateFile);

  console.log(`\n🎉 Mise à jour terminée ! ${files.length} fichiers ont été mis à jour.`);
  console.log('📝 Tous les composants CodeBlock locaux ont été remplacés par le composant centralisé.');
};

// Exécuter le script
main();

// Supprimer le script après exécution
console.log('\n🗑️  Suppression du script automatique...');
setTimeout(() => {
  try {
    fs.unlinkSync(__filename);
    console.log('✅ Script supprimé avec succès');
  } catch (error) {
    console.log('⚠️  Impossible de supprimer le script automatiquement');
  }
}, 1000);