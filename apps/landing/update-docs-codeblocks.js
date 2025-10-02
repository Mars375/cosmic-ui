import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fonction pour détecter si le contenu est du terminal/bash
function isTerminalCode(content) {
  const terminalPatterns = [
    /^(pnpm|npm|yarn|bun)\s+/,
    /^(git|cd|ls|mkdir|rm|cp|mv)\s+/,
    /^(curl|wget)\s+/,
    /^(echo|cat|grep|find)\s+/,
    /^#\s*!/,
    /^\$/
  ];

  const lines = content.split('\n');
  return lines.some(line =>
    terminalPatterns.some(pattern => pattern.test(line.trim()))
  );
}

// Fonction pour déterminer le langage
function detectLanguage(content, filePath) {
  if (isTerminalCode(content)) {
    return 'bash';
  }

  // Détection basée sur le contenu
  if (content.includes('import ') || content.includes('export ') || content.includes('function ') || content.includes('const ') || content.includes('let ')) {
    if (content.includes('jsx') || content.includes('<') && content.includes('>')) {
      return 'typescript';
    }
    return 'typescript';
  }

  if (content.includes('{') && content.includes('}') && content.includes('"')) {
    return 'json';
  }

  if (content.includes('@media') || content.includes('background:') || content.includes('color:')) {
    return 'css';
  }

  return 'typescript'; // par défaut
}

// Fonction pour extraire le chemin de fichier
function extractFilePath(content, existingFilePath) {
  if (existingFilePath) {
    return existingFilePath;
  }

  // Patterns pour détecter les chemins de fichiers
  const pathPatterns = [
    /components\/[^"'\s]+\.(tsx?|jsx?)/,
    /app\/[^"'\s]+\.(tsx?|jsx?)/,
    /lib\/[^"'\s]+\.(tsx?|jsx?)/,
    /[^"'\s]+\.(tsx?|jsx?|json|css|md)/
  ];

  for (const pattern of pathPatterns) {
    const match = content.match(pattern);
    if (match) {
      return match[0];
    }
  }

  return 'components/Example.tsx'; // par défaut
}

// Fonction pour convertir un bloc de code en CodeBlock
function convertToCodeBlock(content, language, filePath, showPackageManager = true) {
  const isTerminal = isTerminalCode(content);

  if (isTerminal) {
    return `<CodeBlock filePath="${filePath}">${content}</CodeBlock>`;
  } else {
    return `<CodeBlock language="${language}" filePath="${filePath}" showPackageManager={false}>
${content}
</CodeBlock>`;
  }
}

// Fonction pour traiter un fichier
function processFile(filePath) {
  console.log(`Traitement de ${filePath}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern pour détecter les blocs de code existants avec syntaxe manuelle
  const codeBlockPattern = /<div className="bg-white dark:bg-black rounded-lg p-2 font-mono text-sm overflow-x-auto w-full">([\s\S]*?)<\/div>/g;

  content = content.replace(codeBlockPattern, (match, codeContent) => {
    // Extraire le contenu du code
    const codeLines = codeContent.match(/<div className="flex" data-line>[\s\S]*?<\/div>/g);
    if (!codeLines) return match;

    let extractedCode = '';
    codeLines.forEach(line => {
      // Extraire le texte du code (ignorer les numéros de ligne et la coloration)
      const textMatch = line.match(/<div className="flex-1">([\s\S]*?)<\/div>/);
      if (textMatch) {
        let lineText = textMatch[1]
          .replace(/<span[^>]*>([^<]*)<\/span>/g, '$1')
          .replace(/&nbsp;/g, ' ')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .trim();

        if (lineText) {
          extractedCode += lineText + '\n';
        }
      }
    });

    if (extractedCode.trim()) {
      const language = detectLanguage(extractedCode);
      const filePath = extractFilePath(extractedCode);
      const newCodeBlock = convertToCodeBlock(extractedCode.trim(), language, filePath);
      modified = true;
      return newCodeBlock;
    }

    return match;
  });

  // Pattern pour les blocs de code simples avec <code>
  const simpleCodePattern = /<div className="bg-muted p-4 rounded-lg">\s*<code className="text-sm">([^<]+)<\/code>\s*<\/div>/g;

  content = content.replace(simpleCodePattern, (match, codeContent) => {
    const trimmedContent = codeContent.trim();
    if (trimmedContent) {
      const language = detectLanguage(trimmedContent);
      const filePath = extractFilePath(trimmedContent);
      const newCodeBlock = convertToCodeBlock(trimmedContent, language, filePath);
      modified = true;
      return newCodeBlock;
    }
    return match;
  });

  // Pattern pour les blocs de code dans les sections d'installation
  const installCodePattern = /<div className="border border-border rounded-lg overflow-hidden">([\s\S]*?)<\/div>/g;

  content = content.replace(installCodePattern, (match, blockContent) => {
    // Vérifier si c'est un bloc d'installation avec des onglets
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

console.log('Début du traitement des pages de documentation...\n');

walkDirectory(docsDir, (filePath) => {
  processedCount++;
  if (processFile(filePath)) {
    modifiedCount++;
  }
});

console.log(`\nTraitement terminé !`);
console.log(`Pages traitées: ${processedCount}`);
console.log(`Pages modifiées: ${modifiedCount}`);
