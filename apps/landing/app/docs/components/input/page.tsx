import { Input } from '@/components/ui/input';

export default function InputDocs() {
  return (
    <>
      <h1>Input</h1>

      <p>
        Composant Input de CosmicUI. Field de saisie stylisé avec support du
        thème, validation et accessibilité.
      </p>

      <h2>Installation</h2>

      <pre>
        <code>{`import { Input } from '@cosmic-ui/ui';`}</code>
      </pre>

      <h2>Exemples de base</h2>

      <div className="space-y-6">
        <div>
          <h3 className="">Champ simple</h3>
          <div className="mt-2">
            <Input placeholder="Votre nom..." />
          </div>
          <pre className="mt-2">
            <code>{`<Input placeholder="Votre nom..." />`}</code>
          </pre>
        </div>

        <div>
          <h3 className="">Champ désactivé</h3>
          <div className="mt-2">
            <Input placeholder="Champ non éditable" disabled />
          </div>
          <pre className="mt-2">
            <code>{`<Input placeholder="Champ non éditable" disabled />`}</code>
          </pre>
        </div>

        <div>
          <h3 className="">Champ avec icône</h3>
          <div className="mt-2 relative">
            <Input placeholder="Rechercher..." className="pl-9" />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <pre className="mt-2">
            <code>{`<Input placeholder="Rechercher..." className="pl-9" />`}</code>
          </pre>
        </div>

        <div>
          <h3 className="">Label et aide</h3>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Adresse e-mail
            </label>
            <Input id="email" type="email" placeholder="vous@exemple.com" />
            <p className="text-xs text-muted-foreground">
              Nous ne partageons jamais votre e-mail avec des tiers.
            </p>
          </div>
          <pre className="mt-2">
            <code>{`<label htmlFor="email">Adresse e-mail</label>
<Input id="email" type="email" placeholder="vous@exemple.com" />
<p className="text-xs text-muted-foreground">
  Nous ne partageons jamais votre e-mail avec des tiers.
</p>`}</code>
          </pre>
        </div>
      </div>

      <h2>Types HTML5</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" placeholder="vous@exemple.com" />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-2">
          <label htmlFor="number" className="text-sm font-medium">
            Nombre
          </label>
          <Input id="number" type="number" placeholder="42" />
        </div>

        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-medium">
            Lien
          </label>
          <Input id="url" type="url" placeholder="https://exemple.com" />
        </div>

        <div className="space-y-2">
          <label htmlFor="tel" className="text-sm font-medium">
            Téléphone
          </label>
          <Input id="tel" type="tel" placeholder="+33 1 23 45 67 89" />
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="text-sm font-medium">
            Date
          </label>
          <Input id="date" type="date" />
        </div>
      </div>

      <h2>États d'erreur</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Erreur</h3>
          <div className="mt-2">
            <Input
              className="border-red-500 focus:ring-red-500"
              placeholder="Champ en erreur"
            />
          </div>
          <p className="mt-1 text-xs text-red-500">Ce champ est requis</p>
        </div>

        <div>
          <h3 className="text-sm font-medium">Succès</h3>
          <div className="mt-2">
            <Input
              className="border-green-500 focus:ring-green-500"
              value="email@valide.com"
            />
          </div>
          <p className="mt-1 text-xs text-green-500">Adresse e-mail valide</p>
        </div>
      </div>

      <h2>Props</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border p-3 text-left">Prop</th>
              <th className="border border-border p-3 text-left">Type</th>
              <th className="border border-border p-3 text-left">Défaut</th>
              <th className="border border-border p-3 text-left">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3">
                <code>type</code>
              </td>
              <td className="border border-border p-3">
                <code>
                  'text' | 'email' | 'password' | 'number' | 'tel' | 'url' |
                  'date' | 'time' | 'datetime-local'
                </code>
              </td>
              <td className="border border-border p-3">'text'</td>
              <td className="border border-border p-3">Type HTML5 du champ</td>
            </tr>
            <tr>
              <td className="border border-border p-3">
                <code>placeholder</code>
              </td>
              <td className="border border-border p-3">
                <code>string</code>
              </td>
              <td className="border border-border p-3">-</td>
              <td className="border border-border p-3">Texte d'exemple</td>
            </tr>
            <tr>
              <td className="border border-border p-3">
                <code>disabled</code>
              </td>
              <td className="border border-border p-3">
                <code>boolean</code>
              </td>
              <td className="border border-border p-3">false</td>
              <td className="border border-border p-3">Désactive le champ</td>
            </tr>
            <tr>
              <td className="border border-border p-3">
                <code>required</code>
              </td>
              <td className="border border-border p-3">
                <code>boolean</code>
              </td>
              <td className="border border-border p-3">false</td>
              <td className="border border-border p-3">
                Marque le champ comme requis
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Composant avec validation</h2>

      <pre>
        <code>{`import { useState } from 'react';
import { Input } from '@cosmic-ui/ui';

export function ValidatedInput({ 
  onValidate, 
  ...props 
}: {
  onValidate?: (value: string) => string | null;
} & InputHTMLAttributes<HTMLInputElement>) {
  const [error, setError] = useState<string | null>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const errorMessage = onValidate?.(value) || null;
    setError(errorMessage);
  };

  return (
    <div className="space-y-2">
      <Input
        {...props}
        onBlur={handleBlur}
        className={cn(
          error && 'border-red-500 focus:ring-red-500',
          props.className
        )}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Usage avec validation
<ValidatedInput
  placeholder="Mot de passe"
  type="password"
  onValidate={(value) => {
    if (value.length < 8) return 'Au moins 8 caractères';
    if (!/[A-Z]/.test(value)) return 'Au moins une majuscule';
    if (!/[0-9]/.test(value)) return 'Au moins un chiffre';
    return null;
  }}
/>`}</code>
      </pre>

      <h2>Accessibilité</h2>

      <ul>
        <li>✅ Support complet des lecteurs d'écran</li>
        <li>✅ Navigation au clavier optimisée</li>
        <li>✅ États focus visibles</li>
        <li>✅ Validation native et personnalisée</li>
        <li>✅ Labels associés automatiquement</li>
      </ul>

      <h2>Personnalisation</h2>

      <p>
        Personnalisez l'apparence avec les variables CSS ou les classes Tailwind
        :
      </p>

      <pre>
        <code>{`// Variables de thème pour l'input
:root {
  --input: 214.3 31.8% 91.4%;
  --input-foreground: 222.2 84% 4.9%;
  --ring: 221.2 83.2% 53.3%;
}

// Classes personnalisées pour un champ spécial
<Input 
  className="bg-gradient-to-r from-blue-50 to-purple-50 
             border-blue-200 focus:ring-blue-500" 
/>`}</code>
      </pre>
    </>
  );
}
