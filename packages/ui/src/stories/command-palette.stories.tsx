import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette, useCommandPalette } from '../components/command-palette';
import { Button } from '../components/button';

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleGroups = [
  {
    id: 'navigation',
    title: 'Navigation',
    items: [
      {
        id: 'dashboard',
        title: 'Aller au Dashboard',
        description: 'Accéder au tableau de bord principal',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
            />
          </svg>
        ),
        action: () => console.log('Navigate to dashboard'),
      },
      {
        id: 'settings',
        title: 'Paramètres',
        description: "Gérer les paramètres de l'application",
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ),
        action: () => console.log('Open settings'),
      },
    ],
  },
  {
    id: 'actions',
    title: 'Actions',
    items: [
      {
        id: 'new-project',
        title: 'Nouveau Projet',
        description: 'Créer un nouveau projet',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        ),
        action: () => console.log('Create new project'),
      },
      {
        id: 'export-data',
        title: 'Exporter les données',
        description: 'Télécharger les données en CSV',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
        action: () => console.log('Export data'),
      },
    ],
  },
  {
    id: 'help',
    title: 'Aide',
    items: [
      {
        id: 'documentation',
        title: 'Documentation',
        description: 'Consulter la documentation',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
        action: () => console.log('Open documentation'),
      },
      {
        id: 'support',
        title: 'Support',
        description: 'Contacter le support technique',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
            />
          </svg>
        ),
        action: () => console.log('Contact support'),
      },
    ],
  },
];

function CommandPaletteDemo() {
  const { isOpen, open, close } = useCommandPalette();

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Command Palette Demo</h2>
        <p className="text-white/70 mb-4">
          Appuyez sur <kbd className="px-2 py-1 bg-cosmic-border rounded text-sm">⌘K</kbd> ou
          cliquez sur le bouton pour ouvrir
        </p>
        <Button onClick={open}>Ouvrir Command Palette</Button>
      </div>

      <CommandPalette
        isOpen={isOpen}
        onClose={close}
        groups={sampleGroups}
        placeholder="Tapez une commande..."
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <CommandPaletteDemo />,
};

export const WithCustomPlaceholder: Story = {
  render: () => {
    const { isOpen, open, close } = useCommandPalette();

    return (
      <div className="p-8">
        <Button onClick={open} className="mb-4">
          Ouvrir avec placeholder personnalisé
        </Button>
        <CommandPalette
          isOpen={isOpen}
          onClose={close}
          groups={sampleGroups}
          placeholder="Recherchez des commandes, pages, ou actions..."
        />
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)} className="mb-4">
          Ouvrir (vide)
        </Button>
        <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} groups={[]} />
      </div>
    );
  },
};
