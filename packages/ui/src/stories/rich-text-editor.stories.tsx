import type { Meta, StoryObj } from '@storybook/react';
import { RichTextEditor, SimpleTextEditor } from '../components/rich-text-editor';
import { useState } from 'react';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleContent = `
<h1>Guide d'utilisation</h1>
<p>Ce guide vous explique comment utiliser <strong>CosmicUI</strong> pour créer des interfaces modernes.</p>

<h2>Installation</h2>
<p>Pour installer CosmicUI, utilisez la commande suivante :</p>

<blockquote>
  <p>npm install @cosmic-ui/ui</p>
</blockquote>

<h2>Composants disponibles</h2>

<h3>Boutons</h3>
<p>Les boutons supportent plusieurs variantes :</p>

<ul>
  <li><code>primary</code> - Bouton principal</li>
  <li><code>secondary</code> - Bouton secondaire</li>
  <li><code>outline</code> - Bouton avec bordure</li>
  <li><code>ghost</code> - Bouton transparent</li>
</ul>

<h3>Formulaires</h3>
<p>Les composants de formulaire incluent :</p>

<ol>
  <li><strong>Input</strong> - Champs de saisie</li>
  <li><strong>Select</strong> - Listes déroulantes</li>
  <li><strong>Checkbox</strong> - Cases à cocher</li>
  <li><strong>Radio</strong> - Boutons radio</li>
</ol>

<p>Pour plus d'informations, consultez la <a href="https://cosmic-ui.dev/docs">documentation complète</a>.</p>
`;

function RichTextEditorDemo() {
  const [content, setContent] = useState(sampleContent);

  return (
    <div className="w-full max-w-4xl p-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Rich Text Editor</h3>
        <p className="text-white/70 text-sm">
          Utilisez la barre d'outils pour formater votre texte. Raccourcis clavier : Ctrl+B (gras),
          Ctrl+I (italique), Ctrl+U (souligné).
        </p>
      </div>

      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Commencez à écrire votre contenu..."
        minHeight={300}
        maxHeight={500}
      />

      <div className="mt-4 p-4 bg-cosmic-surface/50 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">HTML généré :</h4>
        <pre className="text-xs text-white/70 overflow-x-auto">{content}</pre>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <RichTextEditorDemo />,
};

export const SimpleEditor: Story = {
  render: () => {
    const [content, setContent] = useState("<p>Éditeur simple sans barre d'outils...</p>");

    return (
      <div className="w-full max-w-2xl p-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Simple Text Editor</h3>
          <p className="text-white/70 text-sm">
            Éditeur de texte simple sans barre d'outils. Utilisez les raccourcis clavier pour
            formater.
          </p>
        </div>

        <SimpleTextEditor
          value={content}
          onChange={setContent}
          placeholder="Tapez votre texte ici..."
          minHeight={200}
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => (
    <div className="w-full max-w-4xl p-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Mode lecture seule</h3>
        <p className="text-white/70 text-sm">
          Le contenu est affiché en mode lecture seule, sans possibilité d'édition.
        </p>
      </div>

      <RichTextEditor value={sampleContent} readOnly={true} minHeight={300} />
    </div>
  ),
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <div className="w-full max-w-2xl p-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Placeholder personnalisé</h3>
          <p className="text-white/70 text-sm">Éditeur avec un placeholder personnalisé.</p>
        </div>

        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Rédigez votre article ici... Utilisez la barre d'outils pour formater votre texte."
          minHeight={250}
        />
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const [content1, setContent1] = useState('<p>Petit éditeur...</p>');
    const [content2, setContent2] = useState('<p>Éditeur de taille moyenne...</p>');
    const [content3, setContent3] = useState('<p>Grand éditeur...</p>');

    return (
      <div className="p-8 space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Petit éditeur</h3>
          <RichTextEditor
            value={content1}
            onChange={setContent1}
            placeholder="Petit éditeur..."
            minHeight={100}
            maxHeight={150}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Éditeur moyen</h3>
          <RichTextEditor
            value={content2}
            onChange={setContent2}
            placeholder="Éditeur de taille moyenne..."
            minHeight={200}
            maxHeight={300}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Grand éditeur</h3>
          <RichTextEditor
            value={content3}
            onChange={setContent3}
            placeholder="Grand éditeur..."
            minHeight={400}
            maxHeight={600}
          />
        </div>
      </div>
    );
  },
};

export const WithoutToolbar: Story = {
  render: () => {
    const [content, setContent] = useState("<p>Éditeur sans barre d'outils...</p>");

    return (
      <div className="w-full max-w-2xl p-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">Sans barre d'outils</h3>
          <p className="text-white/70 text-sm">
            Éditeur sans barre d'outils. Utilisez les raccourcis clavier pour formater.
          </p>
        </div>

        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="Tapez votre texte ici..."
          toolbar={false}
          minHeight={200}
        />
      </div>
    );
  },
};
