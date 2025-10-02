'use client';

import * as React from 'react';
import { useState } from 'react';
import { Switch } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';

export default function SwitchPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Switch</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant switch pour les options on/off et les paramètres binaires. 
          Parfait pour les préférences utilisateur et les configurations.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Installation
        </h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Usage basique
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <Switch 
                  id="notifications-switch"
                  label="Notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
                <Switch 
                  id="dark-mode-switch"
                  label="Mode sombre"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
                <Switch 
                  id="auto-save-switch"
                  label="Sauvegarde automatique"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
                <Switch 
                  id="disabled-switch"
                  label="Option désactivée"
                  disabled
                  checked={false}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/SwitchExample.tsx"
              showPackageManager={false}
            >
              {`export default function SwitchExample() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-4">
      <Switch 
        id="notifications-switch"
        label="Notifications"
        checked={notifications}
        onCheckedChange={setNotifications}
      />
      <Switch 
        id="dark-mode-switch"
        label="Mode sombre"
        checked={darkMode}
        onCheckedChange={setDarkMode}
      />
      <Switch 
        id="auto-save-switch"
        label="Sauvegarde automatique"
        checked={autoSave}
        onCheckedChange={setAutoSave}
      />
      <Switch 
        id="disabled-switch"
        label="Option désactivée"
        disabled
        checked={false}
      />
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Exemples interactifs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Exemples interactifs</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Panneau de paramètres</h3>
            <p className="text-muted-foreground">Switches avec feedback visuel et état persistant.</p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Préférences générales</h4>
                  <Switch 
                    id="notifications-interactive"
                    label="Notifications push"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                  <Switch 
                    id="dark-mode-interactive"
                    label="Mode sombre"
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                  />
                  <Switch 
                    id="auto-save-interactive"
                    label="Sauvegarde automatique"
                    checked={autoSave}
                    onCheckedChange={setAutoSave}
                  />
                </div>
                
                <div className="mt-4 p-3 bg-background rounded border">
                  <h4 className="text-sm font-medium mb-2">État actuel :</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground">
                    <li>Notifications : {notifications ? "✅ Activées" : "❌ Désactivées"}</li>
                    <li>Mode sombre : {darkMode ? "✅ Activé" : "❌ Désactivé"}</li>
                    <li>Sauvegarde auto : {autoSave ? "✅ Activée" : "❌ Désactivée"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/InteractiveSwitch.tsx" showPackageManager={false}>
{`export default function InteractiveSwitch() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Préférences générales</h4>
        <Switch 
          id="notifications-interactive"
          label="Notifications push"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <Switch 
          id="dark-mode-interactive"
          label="Mode sombre"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
        <Switch 
          id="auto-save-interactive"
          label="Sauvegarde automatique"
          checked={autoSave}
          onCheckedChange={setAutoSave}
        />
      </div>
      
      <div className="mt-4 p-3 bg-background rounded border">
        <h4 className="text-sm font-medium mb-2">État actuel :</h4>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li>Notifications : {notifications ? "✅ Activées" : "❌ Désactivées"}</li>
          <li>Mode sombre : {darkMode ? "✅ Activé" : "❌ Désactivé"}</li>
          <li>Sauvegarde auto : {autoSave ? "✅ Activée" : "❌ Désactivée"}</li>
        </ul>
      </div>
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
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
                <td className="border border-border px-4 py-3 font-mono text-sm">checked</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">État du switch (contrôlé)</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onCheckedChange</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(checked: boolean) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors du changement d'état</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">label</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Texte du label associé</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">disabled</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Désactive le switch</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">id</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Identifiant unique pour l'accessibilité</td>
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

      {/* Conseils d'utilisation */}
      <div className="mb-12">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
            💡 Conseils d'utilisation
          </h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
            <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">label</code> pour une meilleure accessibilité</li>
            <li>• Préférez Switch pour les options binaires (on/off)</li>
            <li>• Utilisez Checkbox pour les sélections multiples</li>
            <li>• Ajoutez un <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">id</code> unique pour chaque switch</li>
            <li>• Groupez les switches liés dans des sections logiques</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
