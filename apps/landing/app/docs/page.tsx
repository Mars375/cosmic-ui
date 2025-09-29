export default function DocsHome() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Bienvenue dans CosmicUI
      </h1>

      <p className="text-lg text-foreground mb-8">
        CosmicUI est une bibliothèque de composants React moderne construite
        avec Tailwind CSS. Elle a été conçue pour créer rapidement des
        applications SaaS avec des interfaces utilisateur élégantes et
        cohérentes.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Pourquoi choisir CosmicUI ?
      </h2>

      <ul className="space-y-4 text-foreground mb-8">
        <li className="flex items-start">
          <span className="text-primary mr-3 mt-1">✨</span>
          <div>
            <strong className="text-foreground">
              Composants prêts à l'emploi
            </strong>
            <p className="text-muted-foreground mt-1">
              Plus de 30 composants soigneusement conçus pour vos applications
              SaaS
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-3 mt-1">🎨</span>
          <div>
            <strong className="text-foreground">Thème personnalisable</strong>
            <p className="text-muted-foreground mt-1">
              Système de thème basé sur des variables CSS pour une
              personnalisation facile
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-3 mt-1">🌙</span>
          <div>
            <strong className="text-foreground">Mode sombre natif</strong>
            <p className="text-muted-foreground mt-1">
              Support complet du mode sombre avec basculement automatique
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-3 mt-1">📱</span>
          <div>
            <strong className="text-foreground">Responsive par défaut</strong>
            <p className="text-muted-foreground mt-1">
              Tous les composants s'adaptent automatiquement à toutes les
              tailles d'écran
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-3 mt-1">⚡</span>
          <div>
            <strong className="text-foreground">Performance optimisée</strong>
            <p className="text-muted-foreground mt-1">
              Tree-shaking automatique et bundle optimisé pour de meilleures
              performances
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="text-primary mr-3 mt-1">🔧</span>
          <div>
            <strong className="text-foreground">TypeScript natif</strong>
            <p className="text-muted-foreground mt-1">
              Types complets pour une meilleure expérience de développement
            </p>
          </div>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Composants disponibles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-foreground mb-2">
            Interface de base
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Button</li>
            <li>• Input</li>
            <li>• Select</li>
            <li>• Switch</li>
            <li>• Card</li>
          </ul>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-foreground mb-2">Navigation</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Topbar</li>
            <li>• Sidebar</li>
            <li>• Breadcrumb</li>
            <li>• Tabs</li>
            <li>• Pagination</li>
          </ul>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-foreground mb-2">Données</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Table</li>
            <li>• LineChart</li>
            <li>• PieChart</li>
            <li>• KpiCard</li>
            <li>• ProgressBar</li>
          </ul>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-foreground mb-2">Feedback</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Alert</li>
            <li>• Badge</li>
            <li>• Tooltip</li>
            <li>• NotificationsCenter</li>
            <li>• Avatar</li>
          </ul>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-foreground mb-2">Layout</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• DashboardLayout</li>
            <li>• Modal</li>
            <li>• Drawer</li>
            <li>• Accordion</li>
            <li>• Collapsible</li>
          </ul>
        </div>

        <div className="p-4 border border-border rounded-lg bg-card">
          <h3 className="font-semibold text-foreground mb-2">Spécialisés</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• ChatWidget</li>
            <li>• CalendarDatePicker</li>
            <li>• HeatmapCalendar</li>
            <li>• FileUpload</li>
            <li>• CommandPalette</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Commencer avec CosmicUI
      </h2>

      <p className="text-foreground mb-6">
        Prêt à commencer ? Consultez notre guide d'installation pour intégrer
        CosmicUI dans votre projet React.
      </p>

      <div className="flex flex-wrap gap-4">
        <a
          href="/docs/installation"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Guide d'installation
        </a>
        <a
          href="/docs/theming"
          className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors"
        >
          Personnalisation des thèmes
        </a>
        <a
          href="/docs/components/button"
          className="inline-flex items-center px-4 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors"
        >
          Voir les composants
        </a>
      </div>
    </div>
  );
}
