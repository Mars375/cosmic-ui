import Link from 'next/link';

const components = [
  {
    name: 'A11y Helpers',
    href: '/docs/components/a11y-helpers',
    description: "Composants d'accessibilité et helpers",
  },
  {
    name: 'Accordion',
    href: '/docs/components/accordion',
    description: 'Composant accordéon pliable',
  },
  {
    name: 'AIAssistant',
    href: '/docs/components/ai-assistant',
    description: 'Assistant IA intégré',
  },
  {
    name: 'Alert',
    href: '/docs/components/alert',
    description: "Messages d'alerte et notifications",
  },
  {
    name: 'Auth Pages',
    href: '/docs/components/auth-pages',
    description: "Pages d'authentification",
  },
  {
    name: 'Avatar',
    href: '/docs/components/avatar',
    description: 'Composant avatar utilisateur',
  },
  {
    name: 'Badge',
    href: '/docs/components/badge',
    description: 'Badges et étiquettes',
  },
  {
    name: 'Breadcrumbs',
    href: '/docs/components/breadcrumbs',
    description: "Fil d'Ariane de navigation",
  },
  {
    name: 'Button',
    href: '/docs/components/button',
    description: 'Boutons et actions',
  },
  {
    name: 'CalendarDatePicker',
    href: '/docs/components/calendar-date-picker',
    description: 'Sélecteur de date avec calendrier',
  },
  {
    name: 'Card',
    href: '/docs/components/card',
    description: 'Cartes et conteneurs',
  },
  {
    name: 'ChatWidget',
    href: '/docs/components/chat-widget',
    description: 'Widget de chat intégré',
  },
  {
    name: 'ChartsFilters',
    href: '/docs/components/charts-filters',
    description: 'Filtres pour graphiques',
  },
  {
    name: 'Checkbox',
    href: '/docs/components/checkbox',
    description: 'Cases à cocher',
  },
  {
    name: 'CodeBlock',
    href: '/docs/components/code-block',
    description: 'Bloc de code interactif avec copie et thème',
  },
  {
    name: 'CommandPalette',
    href: '/docs/components/command-palette',
    description: 'Palette de commandes',
  },
  {
    name: 'DashboardLayout',
    href: '/docs/components/dashboard-layout',
    description: 'Mise en page de tableau de bord',
  },
  {
    name: 'DataTable',
    href: '/docs/components/data-table',
    description: 'Tableaux de données avancés',
  },
  {
    name: 'Debug Panel',
    href: '/docs/components/debug-panel',
    description: 'Panneau de débogage',
  },
  {
    name: 'Divider',
    href: '/docs/components/divider',
    description: 'Séparateurs et lignes',
  },
  {
    name: 'Drawer',
    href: '/docs/components/drawer',
    description: 'Tiroir latéral',
  },
  {
    name: 'Dropdown Menu',
    href: '/docs/components/dropdown-menu',
    description: 'Menus déroulants',
  },
  {
    name: 'FileExplorer',
    href: '/docs/components/file-explorer',
    description: 'Explorateur de fichiers',
  },
  {
    name: 'FileUpload',
    href: '/docs/components/file-upload',
    description: 'Upload de fichiers',
  },
  {
    name: 'FormRHF',
    href: '/docs/components/form-rhf',
    description: 'Formulaires avec React Hook Form',
  },
  {
    name: 'HeatmapCalendar',
    href: '/docs/components/heatmap-calendar',
    description: 'Calendrier heatmap',
  },
  {
    name: 'I18n Switcher',
    href: '/docs/components/i18n-switcher',
    description: 'Sélecteur de langue',
  },
  {
    name: 'Input',
    href: '/docs/components/input',
    description: 'Champs de saisie',
  },
  {
    name: 'InputMask',
    href: '/docs/components/input-mask',
    description: 'Champs avec masque de saisie',
  },
  {
    name: 'InputOTP',
    href: '/docs/components/input-otp',
    description: 'Champ OTP (One-Time Password)',
  },
  {
    name: 'KanbanBoard',
    href: '/docs/components/kanban-board',
    description: 'Tableau Kanban',
  },
  {
    name: 'KpiCard',
    href: '/docs/components/kpi-card',
    description: "Cartes d'indicateurs clés",
  },
  {
    name: 'LineChart',
    href: '/docs/components/line-chart',
    description: 'Graphiques linéaires',
  },
  {
    name: 'MarkdownRenderer',
    href: '/docs/components/markdown-renderer',
    description: 'Rendu Markdown',
  },
  {
    name: 'Modal',
    href: '/docs/components/modal',
    description: 'Modales et dialogues',
  },
  {
    name: 'NavigationMenu',
    href: '/docs/components/navigation-menu',
    description: 'Menus de navigation',
  },
  {
    name: 'NotificationsCenter',
    href: '/docs/components/notifications-center',
    description: 'Centre de notifications',
  },
  {
    name: 'Pagination',
    href: '/docs/components/pagination',
    description: 'Pagination',
  },
  {
    name: 'PieChart',
    href: '/docs/components/pie-chart',
    description: 'Graphiques en secteurs',
  },
  {
    name: 'Popover',
    href: '/docs/components/popover',
    description: 'Popovers et tooltips',
  },
  {
    name: 'PricingTable',
    href: '/docs/components/pricing-table',
    description: 'Tableaux de tarification',
  },
  {
    name: 'Progress Bar',
    href: '/docs/components/progress-bar',
    description: 'Barres de progression',
  },
  {
    name: 'Radio Group',
    href: '/docs/components/radio-group',
    description: 'Groupes de boutons radio',
  },
  {
    name: 'RichTextEditor',
    href: '/docs/components/rich-text-editor',
    description: 'Éditeur de texte riche',
  },
  {
    name: 'Select',
    href: '/docs/components/select',
    description: 'Listes déroulantes',
  },
  {
    name: 'Sidebar',
    href: '/docs/components/sidebar',
    description: 'Barre latérale',
  },
  {
    name: 'Skeleton',
    href: '/docs/components/skeleton',
    description: 'Placeholders de chargement',
  },
  {
    name: 'Slider',
    href: '/docs/components/slider',
    description: 'Curseurs et sliders',
  },
  {
    name: 'Sparkline',
    href: '/docs/components/sparkline',
    description: 'Mini-graphiques',
  },
  {
    name: 'Spinner',
    href: '/docs/components/spinner',
    description: 'Indicateurs de chargement',
  },
  {
    name: 'StepWizard',
    href: '/docs/components/step-wizard',
    description: 'Assistant étape par étape',
  },
  {
    name: 'Switch',
    href: '/docs/components/switch',
    description: 'Interrupteurs',
  },
  {
    name: 'Table',
    href: '/docs/components/table',
    description: 'Tableaux de base',
  },
  { name: 'Tabs', href: '/docs/components/tabs', description: 'Onglets' },
  {
    name: 'TeamManagement',
    href: '/docs/components/team-management',
    description: "Gestion d'équipe",
  },
  {
    name: 'Textarea',
    href: '/docs/components/textarea',
    description: 'Zones de texte',
  },
  {
    name: 'ThemeSwitcher',
    href: '/docs/components/theme-switcher',
    description: 'Sélecteur de thème',
  },
  {
    name: 'Timeline',
    href: '/docs/components/timeline',
    description: 'Chronologie',
  },
  {
    name: 'Toast',
    href: '/docs/components/toast',
    description: 'Notifications toast',
  },
  {
    name: 'Tooltip',
    href: '/docs/components/tooltip',
    description: 'Infobulles',
  },
  {
    name: 'Topbar',
    href: '/docs/components/topbar',
    description: 'Barre supérieure',
  },
  {
    name: 'UserProfile',
    href: '/docs/components/user-profile',
    description: 'Profil utilisateur',
  },
];

const categories = {
  Formulaires: [
    'Input',
    'InputMask',
    'InputOTP',
    'Textarea',
    'Select',
    'Checkbox',
    'Radio Group',
    'Switch',
    'FormRHF',
  ],
  Navigation: [
    'Button',
    'Breadcrumbs',
    'NavigationMenu',
    'Sidebar',
    'Topbar',
    'Tabs',
    'Pagination',
  ],
  Affichage: [
    'Card',
    'Badge',
    'Avatar',
    'Divider',
    'Skeleton',
    'Spinner',
    'Progress Bar',
  ],
  Feedback: ['Alert', 'Toast', 'Modal', 'Popover', 'Tooltip', 'Drawer'],
  Données: [
    'Table',
    'DataTable',
    'KpiCard',
    'LineChart',
    'PieChart',
    'Sparkline',
  ],
  Layout: ['DashboardLayout', 'Auth Pages', 'PricingTable', 'TeamManagement'],
  Avancé: [
    'CommandPalette',
    'KanbanBoard',
    'FileExplorer',
    'FileUpload',
    'RichTextEditor',
    'StepWizard',
  ],
  Utilitaires: [
    'A11y Helpers',
    'CodeBlock',
    'ThemeSwitcher',
    'I18n Switcher',
    'Debug Panel',
    'MarkdownRenderer',
  ],
  Spécialisés: [
    'AIAssistant',
    'ChatWidget',
    'NotificationsCenter',
    'CalendarDatePicker',
    'HeatmapCalendar',
    'Timeline',
    'UserProfile',
    'ChartsFilters',
  ],
};

export default function ComponentsPage() {
  return (
    <div>
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6 text-foreground">Composants</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
          Découvrez tous les composants disponibles dans CosmicUI. Plus de 60
          composants prêts à l'emploi pour construire des interfaces modernes et
          accessibles.
        </p>
        <div className="flex gap-4">
          <Link href="/docs/installation">
            <button className="inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-transparent select-none bg-primary text-primary-foreground hover:brightness-110 h-10 px-4 text-sm rounded-lg">
              Commencer
            </button>
          </Link>
          <Link href="/docs/components/button">
            <button className="inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-transparent select-none border border-input text-foreground hover:bg-muted/60 dark:hover:bg-muted/40 h-10 px-4 text-sm rounded-lg">
              Premier composant
            </button>
          </Link>
        </div>
      </div>

      {/* Vue par catégories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Par catégorie
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categories).map(([category, componentNames]) => (
            <div
              key={category}
              className="border border-border rounded-lg bg-card p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {category}
              </h3>
              <div className="space-y-2">
                {componentNames.map(componentName => {
                  const component = components.find(
                    c => c.name === componentName
                  );
                  if (!component) return null;
                  return (
                    <Link
                      key={component.name}
                      href={component.href}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {component.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vue complète */}
      <div className="border-t border-border pt-12">
        <h2 className="text-3xl font-bold mb-8 text-foreground">
          Tous les composants
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {components.map(component => (
            <Link
              key={component.name}
              href={component.href}
              className="group block border border-border rounded-lg bg-card p-4 hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {component.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {component.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Statistiques */}
      <div className="border-t border-border pt-12 mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            CosmicUI en chiffres
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {components.length}+
              </div>
              <div className="text-muted-foreground">Composants</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                {Object.keys(categories).length}
              </div>
              <div className="text-muted-foreground">Catégories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Accessible</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
