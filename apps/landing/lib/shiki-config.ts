import { createHighlighter } from 'shiki';

// Configuration optimisée pour Shiki
export const shikiConfig = {
  themes: ['github-light', 'github-dark'],
  langs: [
    'bash',
    'typescript',
    'javascript',
    'tsx',
    'jsx',
    'css',
    'json',
    'python',
    'react',
    'sql',
    'html',
    'markdown',
    'yaml',
    'dockerfile',
    'git',
    'diff',
  ],
};

// Instance singleton du highlighter
let highlighter: Awaited<ReturnType<typeof createHighlighter>> | null = null;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: shikiConfig.themes,
      langs: shikiConfig.langs,
    });
  }
  return highlighter;
}

// Fonction utilitaire pour obtenir le thème selon le mode
export function getTheme(isDark: boolean): string {
  return isDark ? 'github-dark' : 'github-light';
}

// Fonction pour vérifier si un langage est supporté
export function isLanguageSupported(lang: string): boolean {
  return shikiConfig.langs.includes(lang);
}

// Fonction pour obtenir la liste des langages supportés
export function getSupportedLanguages(): string[] {
  return [...shikiConfig.langs];
}
