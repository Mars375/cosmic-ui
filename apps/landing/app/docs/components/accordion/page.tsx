'use client';

import * as React from 'react';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { ChevronDown, Plus, Minus, HelpCircle, Settings, User, Bell } from 'lucide-react';

export default function AccordionPage() {
  const [openItems, setOpenItems] = useState<string[]>(['item-1']);

  const handleValueChange = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Accordion</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant accordéon pour organiser le contenu en sections pliables. 
          Parfait pour les FAQ, les paramètres et l'organisation de contenu.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Qu'est-ce que CosmicUI ?</AccordionTrigger>
                <AccordionContent>
                  CosmicUI est une bibliothèque de composants React moderne et accessible, 
                  construite avec Tailwind CSS et Radix UI.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Comment l'installer ?</AccordionTrigger>
                <AccordionContent>
                  Vous pouvez installer CosmicUI avec pnpm, npm ou yarn en utilisant 
                  la commande : pnpm add cosmic-ui-mars
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Est-ce gratuit ?</AccordionTrigger>
                <AccordionContent>
                  Oui, CosmicUI est entièrement gratuit et open source sous licence MIT.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/AccordionExample.tsx" showPackageManager={false}>
{`import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'cosmic-ui-mars';

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Qu'est-ce que CosmicUI ?</AccordionTrigger>
    <AccordionContent>
      CosmicUI est une bibliothèque de composants React moderne et accessible, 
      construite avec Tailwind CSS et Radix UI.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Comment l'installer ?</AccordionTrigger>
    <AccordionContent>
      Vous pouvez installer CosmicUI avec pnpm, npm ou yarn en utilisant 
      la commande : pnpm add cosmic-ui-mars
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Types d'accordéon */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Types d'accordéon</h2>
        <div className="space-y-8">
          {/* Single */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Single (un seul ouvert)</h3>
              <p className="text-muted-foreground">Un seul élément peut être ouvert à la fois.</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="single-1">
                  <AccordionTrigger>Section 1</AccordionTrigger>
                  <AccordionContent>
                    Contenu de la section 1. Quand cette section s'ouvre, 
                    les autres se ferment automatiquement.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="single-2">
                  <AccordionTrigger>Section 2</AccordionTrigger>
                  <AccordionContent>
                    Contenu de la section 2. Seule une section peut être ouverte à la fois.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="single-3">
                  <AccordionTrigger>Section 3</AccordionTrigger>
                  <AccordionContent>
                    Contenu de la section 3. Parfait pour les FAQ et les paramètres.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/SingleAccordion.tsx" showPackageManager={false}>
{`export default function App\docs\components\accordion\page.tsxExample() {
  <Accordion type="single" collapsible className="w-full">
  <AccordionItem value="single-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Contenu de la section 1. Quand cette section s'ouvre, 
      les autres se ferment automatiquement.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="single-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Contenu de la section 2. Seule une section peut être ouverte à la fois.
    </AccordionContent>
  </AccordionItem>
</Accordion>
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Multiple */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Multiple (plusieurs ouverts)</h3>
              <p className="text-muted-foreground">Plusieurs éléments peuvent être ouverts simultanément.</p>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="multiple-1">
                  <AccordionTrigger>Section 1</AccordionTrigger>
                  <AccordionContent>
                    Contenu de la section 1. Cette section peut rester ouverte 
                    même si d'autres sections s'ouvrent.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="multiple-2">
                  <AccordionTrigger>Section 2</AccordionTrigger>
                  <AccordionContent>
                    Contenu de la section 2. Parfait pour organiser du contenu 
                    sans contraintes d'ouverture.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="multiple-3">
                  <AccordionTrigger>Section 3</AccordionTrigger>
                  <AccordionContent>
                    Contenu de la section 3. Idéal pour les guides et tutoriels.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/MultipleAccordion.tsx" showPackageManager={false}>
{`export default function App\docs\components\accordion\page.tsxExample() {
  <Accordion type="multiple" className="w-full">
  <AccordionItem value="multiple-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Contenu de la section 1. Cette section peut rester ouverte 
      même si d'autres sections s'ouvrent.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="multiple-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Contenu de la section 2. Parfait pour organiser du contenu 
      sans contraintes d'ouverture.
    </AccordionContent>
  </AccordionItem>
</Accordion>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Avec icônes */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Avec icônes</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemples</h3>
            <p className="text-muted-foreground">Accordéon avec icônes personnalisées pour améliorer la navigation.</p>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="icon-1">
                <AccordionTrigger className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Questions fréquentes
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Comment créer un compte ?</p>
                    <p>• Comment réinitialiser mon mot de passe ?</p>
                    <p>• Comment contacter le support ?</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="icon-2">
                <AccordionTrigger className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Paramètres
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Préférences de compte</p>
                    <p>• Paramètres de confidentialité</p>
                    <p>• Notifications</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="icon-3">
                <AccordionTrigger className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profil
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Informations personnelles</p>
                    <p>• Photo de profil</p>
                    <p>• Historique d'activité</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/AccordionWithIcons.tsx" showPackageManager={false}>
{`import { HelpCircle, Settings, User } from 'lucide-react';

<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="icon-1">
    <AccordionTrigger className="flex items-center gap-2">
      <HelpCircle className="w-4 h-4" />
      Questions fréquentes
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>• Comment créer un compte ?</p>
        <p>• Comment réinitialiser mon mot de passe ?</p>
        <p>• Comment contacter le support ?</p>
      </div>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="icon-2">
    <AccordionTrigger className="flex items-center gap-2">
      <Settings className="w-4 h-4" />
      Paramètres
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>• Préférences de compte</p>
        <p>• Paramètres de confidentialité</p>
        <p>• Notifications</p>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Accordéon interactif */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Accordéon interactif</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <p className="text-muted-foreground">Accordéon avec état contrôlé et icônes personnalisées.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Éléments ouverts : {openItems.length}</span>
                <span>• {openItems.join(', ')}</span>
              </div>
              <Accordion 
                type="multiple" 
                value={openItems}
                onValueChange={handleValueChange}
                className="w-full"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </span>
                    {openItems.includes('item-1') ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications email</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications push</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications SMS</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Paramètres
                    </span>
                    {openItems.includes('item-2') ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mode sombre</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Langue</span>
                        <select className="text-sm border rounded px-2 py-1">
                          <option>Français</option>
                          <option>English</option>
                        </select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profil
                    </span>
                    {openItems.includes('item-3') ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm block mb-1">Nom</label>
                        <input type="text" placeholder="Votre nom" className="w-full text-sm border rounded px-2 py-1" />
                      </div>
                      <div>
                        <label className="text-sm block mb-1">Email</label>
                        <input type="email" placeholder="votre@email.com" className="w-full text-sm border rounded px-2 py-1" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/InteractiveAccordion.tsx" showPackageManager={false}>
{`export default function App\docs\components\accordion\page.tsxExample() {
  const [openItems, setOpenItems] = useState<string[]>(['item-1']);

const handleValueChange = (value: string) => {
  setOpenItems(prev => 
    prev.includes(value) 
      ? prev.filter(item => item !== value)
      : [...prev, value]
  );
};

<Accordion 
  type="multiple" 
  value={openItems}
  onValueChange={handleValueChange}
  className="w-full"
>
  <AccordionItem value="item-1">
    <AccordionTrigger className="flex items-center justify-between">
      <span className="flex items-center gap-2">
        <Bell className="w-4 h-4" />
        Notifications
      </span>
      {openItems.includes('item-1') ? (
        <Minus className="w-4 h-4" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Notifications email</span>
          <input type="checkbox" defaultChecked className="rounded" />
        </div>
        {/* ... autres options */}
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Accordion</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">type</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'single' | 'multiple'</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'single'</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Type d'accordéon</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">collapsible</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Permet de fermer tous les éléments</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string | string[]</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur contrôlée</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">onValueChange</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(value: string | string[]) => void</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Fonction appelée lors du changement</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">AccordionItem, AccordionTrigger, AccordionContent</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                    <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur unique de l'élément (AccordionItem)</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-3 font-mono text-sm">className</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                    <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Classes CSS supplémentaires</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">type="single"</code> pour les FAQ et paramètres</li>
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">type="multiple"</code> pour organiser du contenu</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">icônes</code> pour améliorer la navigation</li>
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">collapsible</code> pour permettre de tout fermer</li>
          <li>• Contrôlez l'état avec <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">value</code> et <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">onValueChange</code></li>
        </ul>
      </div>
    </div>
  );
}