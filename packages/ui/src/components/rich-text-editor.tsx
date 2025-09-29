'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  toolbar?: boolean;
  minHeight?: number;
  maxHeight?: number;
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Commencez à écrire...',
  className,
  readOnly = false,
  toolbar = true,
  minHeight = 200,
  maxHeight = 500,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  // Initialize editor content
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline');
          break;
      }
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const insertLink = () => {
    const url = prompt("Entrez l'URL du lien:");
    if (url) {
      execCommand('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt("Entrez l'URL de l'image:");
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const ToolbarButton = ({
    onClick,
    children,
    title,
    active = false,
  }: {
    onClick: () => void;
    children: React.ReactNode;
    title: string;
    active?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={twMerge(
        'p-2 rounded hover:bg-cosmic-border/50 transition-colors',
        active ? 'bg-cosmic-primary text-white' : 'text-white/70 hover:text-white',
      )}
    >
      {children}
    </button>
  );

  return (
    <div className={twMerge('border border-cosmic-border rounded-lg overflow-hidden', className)}>
      {/* Toolbar */}
      {toolbar && !readOnly && (
        <div className="flex items-center space-x-1 p-2 border-b border-cosmic-border bg-cosmic-surface/50">
          {/* Text formatting */}
          <div className="flex items-center space-x-1">
            <ToolbarButton onClick={() => execCommand('bold')} title="Gras (Ctrl+B)">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton onClick={() => execCommand('italic')} title="Italique (Ctrl+I)">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 4h4M8 20h4M12 4l-2 16"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton onClick={() => execCommand('underline')} title="Souligné (Ctrl+U)">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 4v12M18 4v12M4 8h16M4 16h16"
                />
              </svg>
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-cosmic-border" />

          {/* Lists */}
          <div className="flex items-center space-x-1">
            <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="Liste à puces">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="Liste numérotée">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-cosmic-border" />

          {/* Links and media */}
          <div className="flex items-center space-x-1">
            <ToolbarButton onClick={insertLink} title="Insérer un lien">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton onClick={insertImage} title="Insérer une image">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-cosmic-border" />

          {/* Text alignment */}
          <div className="flex items-center space-x-1">
            <ToolbarButton onClick={() => execCommand('justifyLeft')} title="Aligner à gauche">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton onClick={() => execCommand('justifyCenter')} title="Centrer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M8 10h8M4 14h16M8 18h8"
                />
              </svg>
            </ToolbarButton>

            <ToolbarButton onClick={() => execCommand('justifyRight')} title="Aligner à droite">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-cosmic-border" />

          {/* Clear formatting */}
          <ToolbarButton onClick={() => execCommand('removeFormat')} title="Supprimer le formatage">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </ToolbarButton>
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={twMerge(
          'p-4 text-white/90 focus:outline-none overflow-y-auto',
          isFocused && 'ring-2 ring-cosmic-primary ring-offset-2 ring-offset-cosmic-background',
          readOnly && 'cursor-default',
        )}
        style={{
          minHeight: `${minHeight}px`,
          maxHeight: `${maxHeight}px`,
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {/* Placeholder */}
      {!value && (
        <div className="absolute top-4 left-4 text-white/50 pointer-events-none">{placeholder}</div>
      )}

      {/* Styles */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        [contenteditable] h1 {
          font-size: 1.875rem;
          font-weight: bold;
          margin: 1rem 0;
        }

        [contenteditable] h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0.75rem 0;
        }

        [contenteditable] h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }

        [contenteditable] p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        [contenteditable] ul,
        [contenteditable] ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }

        [contenteditable] li {
          margin: 0.25rem 0;
        }

        [contenteditable] blockquote {
          border-left: 4px solid #6c5ce7;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
        }

        [contenteditable] a {
          color: #6c5ce7;
          text-decoration: underline;
        }

        [contenteditable] a:hover {
          color: #00d1b2;
        }

        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
}

// Simple text editor without toolbar
export function SimpleTextEditor({
  value = '',
  onChange,
  placeholder = 'Commencez à écrire...',
  className,
  readOnly = false,
  minHeight = 150,
}: Omit<RichTextEditorProps, 'toolbar' | 'maxHeight'>) {
  return (
    <RichTextEditor
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      readOnly={readOnly}
      toolbar={false}
      minHeight={minHeight}
    />
  );
}
