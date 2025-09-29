'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface MarkdownRendererProps {
  content: string;
  className?: string;
  components?: {
    h1?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    h2?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    h3?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    h4?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    h5?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    h6?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    p?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    ul?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    ol?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    li?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    blockquote?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    code?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    pre?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    a?: React.ComponentType<{ href: string; children: React.ReactNode; className?: string }>;
    strong?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    em?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    hr?: React.ComponentType<{ className?: string }>;
    table?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    thead?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    tbody?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    tr?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    th?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
    td?: React.ComponentType<{ children: React.ReactNode; className?: string }>;
  };
}

// Simple markdown parser
function parseMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Headers
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      elements.push(
        React.createElement(
          `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements,
          {
            key: `header-${i}`,
            id,
            className: twMerge(
              'font-bold text-white',
              level === 1 && 'text-3xl mb-4',
              level === 2 && 'text-2xl mb-3',
              level === 3 && 'text-xl mb-2',
              level === 4 && 'text-lg mb-2',
              level === 5 && 'text-base mb-1',
              level === 6 && 'text-sm mb-1'
            ),
          },
          text,
        ),
      );
      i++;
      continue;
    }

    // Code blocks
    if (line.startsWith('```')) {
      const language = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;

      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }

      elements.push(
        <pre
          key={`code-${i}`}
          className="bg-cosmic-surface border border-cosmic-border rounded-lg p-4 overflow-x-auto mb-4"
        >
          <code className={twMerge('text-sm text-white/90', language && `language-${language}`)}>
            {codeLines.join('\n')}
          </code>
        </pre>,
      );
      i++;
      continue;
    }

    // Blockquotes
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s*/, ''));
        i++;
      }

      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="border-l-4 border-cosmic-primary pl-4 py-2 mb-4 bg-cosmic-surface/50 rounded-r-lg"
        >
          {quoteLines.map((quoteLine, idx) => (
            <p key={idx} className="text-white/80 italic">
              {parseInlineMarkdown(quoteLine)}
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    // Lists
    if (line.match(/^[\s]*[-*+]\s/) || line.match(/^[\s]*\d+\.\s/)) {
      const listItems: React.ReactNode[] = [];
      const isOrdered = line.match(/^[\s]*\d+\.\s/);

      while (
        i < lines.length &&
        (lines[i].match(/^[\s]*[-*+]\s/) ||
          lines[i].match(/^[\s]*\d+\.\s/) ||
          lines[i].match(/^[\s]+\S/))
      ) {
        const listLine = lines[i];
        const match = listLine.match(/^[\s]*([-*+]|\d+\.)\s(.+)/);

        if (match) {
          const content = match[2];
          listItems.push(
            <li key={`li-${i}`} className="text-white/90 mb-1">
              {parseInlineMarkdown(content)}
            </li>,
          );
        }
        i++;
      }

      elements.push(
        React.createElement(
          isOrdered ? 'ol' : 'ul',
          {
            key: `list-${i}`,
            className: twMerge(
              'mb-4',
              isOrdered ? 'list-decimal list-inside' : 'list-disc list-inside',
            ),
          },
          listItems,
        ),
      );
      continue;
    }

    // Tables
    if (line.includes('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .split('|')
          .map((h) => h.trim())
          .filter((h) => h);
        const separator = tableLines[1]; // Skip separator line
        const rows = tableLines.slice(2).map((row) =>
          row
            .split('|')
            .map((cell) => cell.trim())
            .filter((cell) => cell),
        );

        elements.push(
          <table
            key={`table-${i}`}
            className="w-full border-collapse border border-cosmic-border rounded-lg mb-4"
          >
            <thead>
              <tr className="bg-cosmic-surface/50">
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="border border-cosmic-border px-4 py-2 text-left text-white font-medium"
                  >
                    {parseInlineMarkdown(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-cosmic-surface/30">
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="border border-cosmic-border px-4 py-2 text-white/90"
                    >
                      {parseInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>,
        );
      }
      continue;
    }

    // Horizontal rule
    if (line.match(/^[-*_]{3,}$/)) {
      elements.push(<hr key={`hr-${i}`} className="border-cosmic-border my-6" />);
      i++;
      continue;
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="text-white/90 mb-4 leading-relaxed">
          {parseInlineMarkdown(line)}
        </p>,
      );
    }

    i++;
  }

  return elements;
}

// Parse inline markdown (bold, italic, links, code)
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let currentIndex = 0;

  // Regex patterns for inline elements
  const patterns = [
    { regex: /\*\*(.*?)\*\*/g, type: 'bold' },
    { regex: /\*(.*?)\*/g, type: 'italic' },
    { regex: /`(.*?)`/g, type: 'code' },
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' },
  ];

  const matches: Array<{
    type: string;
    content: string;
    href?: string;
    start: number;
    end: number;
  }> = [];

  patterns.forEach(({ regex, type }) => {
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        type,
        content: match[1],
        href: match[2],
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  });

  // Sort matches by start position
  matches.sort((a, b) => a.start - b.start);

  matches.forEach((match, index) => {
    // Add text before match
    if (match.start > currentIndex) {
      const beforeText = text.slice(currentIndex, match.start);
      if (beforeText) {
        elements.push(beforeText);
      }
    }

    // Add the matched element
    switch (match.type) {
      case 'bold':
        elements.push(
          <strong key={`bold-${index}`} className="font-semibold text-white">
            {match.content}
          </strong>,
        );
        break;
      case 'italic':
        elements.push(
          <em key={`italic-${index}`} className="italic text-white/80">
            {match.content}
          </em>,
        );
        break;
      case 'code':
        elements.push(
          <code
            key={`code-${index}`}
            className="bg-cosmic-surface border border-cosmic-border rounded px-1 py-0.5 text-sm text-cosmic-primary"
          >
            {match.content}
          </code>,
        );
        break;
      case 'link':
        elements.push(
          <a
            key={`link-${index}`}
            href={match.href}
            className="text-cosmic-primary hover:text-cosmic-secondary underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {match.content}
          </a>,
        );
        break;
    }

    currentIndex = match.end;
  });

  // Add remaining text
  if (currentIndex < text.length) {
    const remainingText = text.slice(currentIndex);
    if (remainingText) {
      elements.push(remainingText);
    }
  }

  return elements.length > 0 ? elements : [text];
}

export function MarkdownRenderer({ content, className, components = {} }: MarkdownRendererProps) {
  const parsedContent = React.useMemo(() => {
    return parseMarkdown(content);
  }, [content]);

  return <div className={twMerge('prose prose-invert max-w-none', className)}>{parsedContent}</div>;
}

// Hook for markdown content
export function useMarkdown(content: string) {
  return React.useMemo(() => {
    return parseMarkdown(content);
  }, [content]);
}
