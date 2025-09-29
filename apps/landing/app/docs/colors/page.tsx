export default function ColorsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Système de couleurs
      </h1>

      <p className="text-foreground mb-8">
        CosmicUI utilise un système de couleurs sémantiques basé sur des
        variables CSS HSL. Ce système permet une personnalisation facile et une
        cohérence visuelle parfaite entre les modes clair et sombre.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Variables de couleurs
      </h2>

      <p className="text-foreground mb-6">
        Toutes les couleurs sont définies dans le fichier globals.css avec des
        variables CSS HSL pour une flexibilité maximale.
      </p>

      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        Palette de couleurs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Primaires</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary"></div>
              <span className="text-sm text-foreground">primary</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-primary-foreground border border-border"></div>
              <span className="text-sm text-foreground">
                primary-foreground
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Secondaires</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-secondary"></div>
              <span className="text-sm text-foreground">secondary</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-secondary-foreground border border-border"></div>
              <span className="text-sm text-foreground">
                secondary-foreground
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Accents</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-accent"></div>
              <span className="text-sm text-foreground">accent</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-accent-foreground border border-border"></div>
              <span className="text-sm text-foreground">accent-foreground</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Muted</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-muted"></div>
              <span className="text-sm text-foreground">muted</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-muted-foreground"></div>
              <span className="text-sm text-foreground">muted-foreground</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Destructif</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-destructive"></div>
              <span className="text-sm text-foreground">destructive</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-destructive-foreground border border-border"></div>
              <span className="text-sm text-foreground">
                destructive-foreground
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Bordures</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-border"></div>
              <span className="text-sm text-foreground">border</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-input"></div>
              <span className="text-sm text-foreground">input</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-12">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          🎨 Personnalisation
        </h3>
        <p className="text-blue-700 dark:text-blue-300">
          Vous pouvez personnaliser toutes ces couleurs en modifiant les
          variables CSS dans votre fichier globals.css. Le système HSL permet
          une cohérence parfaite entre les modes clair et sombre.
        </p>
      </div>
    </div>
  );
}
