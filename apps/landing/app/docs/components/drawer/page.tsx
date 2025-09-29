'use client';

import { useState } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { X, Settings, User, Bell } from 'lucide-react';

const CodeBlock = ({
  children,
  onCopy,
}: {
  children: string;
  onCopy: () => void;
}) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-4 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};

export default function DrawerPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cosmic-background text-cosmic-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Drawer</h1>
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-cosmic-muted-foreground mb-8">
          Un composant de tiroir coulissant pour afficher du contenu
          supplémentaire.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full flex items-center justify-center">
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                  <DrawerTrigger asChild>
                    <Button>Ouvrir le tiroir</Button>
                  </DrawerTrigger>
                  <DrawerContent side="right" className="w-80">
                    <DrawerHeader>
                      <DrawerTitle>Paramètres</DrawerTitle>
                      <DrawerDescription>
                        Configurez vos préférences ici.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4" />
                        <span>Profil</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Settings className="w-4 h-4" />
                        <span>Paramètres</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Bell className="w-4 h-4" />
                        <span>Notifications</span>
                      </div>
                    </div>
                    <DrawerFooter>
                      <Button className="w-full">Sauvegarder</Button>
                      <DrawerClose asChild>
                        <Button variant="outline" className="w-full">
                          Annuler
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { User, Settings, Bell } from 'lucide-react';
import { useState } from 'react';

export function MyDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>Ouvrir le tiroir</Button>
      </DrawerTrigger>
      <DrawerContent side="right" className="w-80">
        <DrawerHeader>
          <DrawerTitle>Paramètres</DrawerTitle>
          <DrawerDescription>
            Configurez vos préférences ici.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4" />
            <span>Profil</span>
          </div>
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4" />
            <span>Paramètres</span>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </div>
        </div>
        <DrawerFooter>
          <Button className="w-full">Sauvegarder</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Annuler
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { User, Settings, Bell } from 'lucide-react';
import { useState } from 'react';

export function MyDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>Ouvrir le tiroir</Button>
      </DrawerTrigger>
      <DrawerContent side="right" className="w-80">
        <DrawerHeader>
          <DrawerTitle>Paramètres</DrawerTitle>
          <DrawerDescription>
            Configurez vos préférences ici.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4" />
            <span>Profil</span>
          </div>
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4" />
            <span>Paramètres</span>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </div>
        </div>
        <DrawerFooter>
          <Button className="w-full">Sauvegarder</Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Annuler
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant Drawer est déjà inclus dans le package
              @cosmic-ui/ui.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/ui`, 'install')
              }
            >
              {`npm install @cosmic-ui/ui`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour créer des tiroirs coulissants.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { Drawer, DrawerTrigger, DrawerContent } from '@cosmic-ui/ui';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Ouvrir</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <div className="p-4">Contenu du tiroir</div>
  </DrawerContent>
</Drawer>`,
                  'usage'
                )
              }
            >
              {`import { Drawer, DrawerTrigger, DrawerContent } from '@cosmic-ui/ui';

<Drawer>
  <DrawerTrigger asChild>
    <Button>Ouvrir</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <div className="p-4">Contenu du tiroir</div>
  </DrawerContent>
</Drawer>`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Variantes</h2>

          {/* Variants Preview */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowCodeVariants(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Tiroir gauche</h3>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button size="sm">Gauche</Button>
                      </DrawerTrigger>
                      <DrawerContent side="left" className="w-64">
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Menu</h3>
                          <p className="text-sm text-cosmic-muted-foreground">
                            Contenu du menu
                          </p>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Tiroir bas</h3>
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button size="sm">Bas</Button>
                      </DrawerTrigger>
                      <DrawerContent side="bottom" className="h-64">
                        <div className="p-4">
                          <h3 className="font-medium mb-2">Actions</h3>
                          <p className="text-sm text-cosmic-muted-foreground">
                            Actions rapides
                          </p>
                        </div>
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Tiroir gauche
<Drawer>
  <DrawerTrigger asChild>
    <Button>Gauche</Button>
  </DrawerTrigger>
  <DrawerContent side="left" className="w-64">
    <div className="p-4">
      <h3 className="font-medium mb-2">Menu</h3>
      <p className="text-sm text-cosmic-muted-foreground">
        Contenu du menu
      </p>
    </div>
  </DrawerContent>
</Drawer>

// Tiroir bas
<Drawer>
  <DrawerTrigger asChild>
    <Button>Bas</Button>
  </DrawerTrigger>
  <DrawerContent side="bottom" className="h-64">
    <div className="p-4">
      <h3 className="font-medium mb-2">Actions</h3>
      <p className="text-sm text-cosmic-muted-foreground">
        Actions rapides
      </p>
    </div>
  </DrawerContent>
</Drawer>

// Tiroir haut
<Drawer>
  <DrawerTrigger asChild>
    <Button>Haut</Button>
  </DrawerTrigger>
  <DrawerContent side="top" className="h-48">
    <div className="p-4">
      <h3 className="font-medium mb-2">Notifications</h3>
      <p className="text-sm text-cosmic-muted-foreground">
        Vos notifications
      </p>
    </div>
  </DrawerContent>
</Drawer>`,
                        'variants'
                      )
                    }
                  >
                    {`// Tiroir gauche
<Drawer>
  <DrawerTrigger asChild>
    <Button>Gauche</Button>
  </DrawerTrigger>
  <DrawerContent side="left" className="w-64">
    <div className="p-4">
      <h3 className="font-medium mb-2">Menu</h3>
      <p className="text-sm text-cosmic-muted-foreground">
        Contenu du menu
      </p>
    </div>
  </DrawerContent>
</Drawer>

// Tiroir bas
<Drawer>
  <DrawerTrigger asChild>
    <Button>Bas</Button>
  </DrawerTrigger>
  <DrawerContent side="bottom" className="h-64">
    <div className="p-4">
      <h3 className="font-medium mb-2">Actions</h3>
      <p className="text-sm text-cosmic-muted-foreground">
        Actions rapides
      </p>
    </div>
  </DrawerContent>
</Drawer>

// Tiroir haut
<Drawer>
  <DrawerTrigger asChild>
    <Button>Haut</Button>
  </DrawerTrigger>
  <DrawerContent side="top" className="h-48">
    <div className="p-4">
      <h3 className="font-medium mb-2">Notifications</h3>
      <p className="text-sm text-cosmic-muted-foreground">
        Vos notifications
      </p>
    </div>
  </DrawerContent>
</Drawer>`}
                  </CodeBlock>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
