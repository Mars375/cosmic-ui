'use client';

import * as React from 'react';
import { useState } from 'react';
import { Input, ValidationState } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { Button } from 'cosmic-ui-mars';
import { Eye, EyeOff, Search, Mail, Lock, User, Phone, Calendar } from 'lucide-react';

export default function InputPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Input</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant input polyvalent pour la saisie de texte. 
          Supporte les icônes, les états d'erreur et de validation.
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
            <div className="space-y-4">
              <Input placeholder="Saisissez votre texte..." />
              <Input placeholder="Input désactivé" disabled />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/InputExample.tsx" showPackageManager={false}>
{`import { Input } from 'cosmic-ui-mars';

<div className="space-y-4">
  <Input placeholder="Saisissez votre texte..." />
  <Input placeholder="Input désactivé" disabled />
</div>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Types d'inputs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Types d'inputs</h2>
        <div className="space-y-8">
          {/* Input avec icône */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Avec icône</h3>
              <p className="text-muted-foreground">Input avec icône pour améliorer la compréhension.</p>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="Rechercher..." className="pl-10" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input placeholder="email@exemple.com" className="pl-10" />
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/InputWithIcons.tsx" showPackageManager={false}>
{`import { Search, Mail } from 'lucide-react';

<div className="space-y-4">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
    <Input placeholder="Rechercher..." className="pl-10" />
  </div>
  <div className="relative">
    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
    <Input placeholder="email@exemple.com" className="pl-10" />
  </div>
</div>`}
              </CodeBlock>
            </div>
          </div>

          {/* Input avec bouton */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Avec bouton</h3>
              <p className="text-muted-foreground">Input avec bouton d'action intégré.</p>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Saisissez votre email..." className="flex-1" />
                  <Button>S'abonner</Button>
                </div>
                <div className="relative">
                  <Input placeholder="Mot de passe" type={showPassword ? "text" : "password"} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/InputWithButton.tsx" showPackageManager={false}>
{`export default function App\docs\components\input\page.tsxExample() {
  const [showPassword, setShowPassword] = useState(false);

<div className="space-y-4">
  <div className="flex gap-2">
    <Input placeholder="Saisissez votre email..." className="flex-1" />
    <Button>S'abonner</Button>
  </div>
  <div className="relative">
    <Input placeholder="Mot de passe" type={showPassword ? "text" : "password"} />
    <Button
      variant="ghost"
      size="sm"
      className="absolute right-2 top-1/2 transform -translate-y-1/2"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </Button>
  </div>
</div>
}`}
              </CodeBlock>
            </div>
          </div>

          {/* Input avec label */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Avec label</h3>
              <p className="text-muted-foreground">Input avec label et description.</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nom complet</label>
                  <Input placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input placeholder="jean@exemple.com" type="email" />
                  <p className="text-xs text-muted-foreground">Nous ne partagerons jamais votre email.</p>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/InputWithLabel.tsx" showPackageManager={false}>
{`export default function App\docs\components\input\page.tsxExample() {
  <div className="space-y-4">
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">Nom complet</label>
    <Input placeholder="Jean Dupont" />
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">Email</label>
    <Input placeholder="jean@exemple.com" type="email" />
    <p className="text-xs text-muted-foreground">Nous ne partagerons jamais votre email.</p>
  </div>
</div>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* États d'erreur */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">États d'erreur</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemples</h3>
            <p className="text-muted-foreground">Input avec états d'erreur et de validation.</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email invalide</label>
                <Input 
                  placeholder="email@exemple.com" 
                  className="border-red-500 focus:border-red-500 focus:ring-red-500" 
                  defaultValue="email-invalide"
                />
                <p className="text-xs text-red-500">Veuillez saisir une adresse email valide.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mot de passe</label>
                <Input 
                  placeholder="Mot de passe" 
                  type="password"
                  className="border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500"
                />
                <p className="text-xs text-yellow-600">Le mot de passe doit contenir au moins 8 caractères.</p>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/InputError.tsx" showPackageManager={false}>
{`export default function App\docs\components\input\page.tsxExample() {
  <div className="space-y-4">
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">Email invalide</label>
    <Input 
      placeholder="email@exemple.com" 
      className="border-red-500 focus:border-red-500 focus:ring-red-500" 
      defaultValue="email-invalide"
    />
    <p className="text-xs text-red-500">Veuillez saisir une adresse email valide.</p>
  </div>
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">Mot de passe</label>
    <Input 
      placeholder="Mot de passe" 
      type="password"
      className="border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500"
    />
    <p className="text-xs text-yellow-600">Le mot de passe doit contenir au moins 8 caractères.</p>
  </div>
</div>
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Formulaire complet */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Formulaire complet</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <p className="text-muted-foreground">Formulaire avec différents types d'inputs.</p>
            <div className="space-y-6 p-6 border rounded-lg bg-muted/30">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Jean Dupont" 
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="jean@exemple.com" 
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="+33 1 23 45 67 89" 
                    type="tel"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date de naissance</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="JJ/MM/AAAA" 
                    type="date"
                    className="pl-10"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                  />
                </div>
              </div>
              <Button className="w-full">Créer le compte</Button>
            </div>
          </div>
          <div>
            <CodeBlock language="typescript" filePath="components/CompleteForm.tsx" showPackageManager={false}>
{`export default function App\docs\components\input\page.tsxExample() {
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  date: ''
});

const handleInputChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

<div className="space-y-6 p-6 border rounded-lg bg-muted/30">
  <div className="space-y-2">
    <label className="text-sm font-medium text-foreground">Nom complet</label>
    <div className="relative">
      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input 
        placeholder="Jean Dupont" 
        className="pl-10"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
    </div>
  </div>
  {/* ... autres champs */}
  <Button className="w-full">Créer le compte</Button>
</div>
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Validation et règles */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Validation et règles</h2>
        
        {/* Input avec label et validation */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Champs obligatoires avec validation</h3>
            <p className="text-muted-foreground">Inputs avec labels, validation et messages d'erreur.</p>
            <div className="p-6 bg-muted/30 rounded-lg border space-y-4">
              <Input
                id="email-required"
                label="Email"
                placeholder="votre@email.com"
                rules={{ required: true, email: true }}
                helperText="Nous ne partagerons jamais votre email"
              />
              <Input
                id="password-required"
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                rules={{ required: true, minLength: 8 }}
                helperText="Minimum 8 caractères"
              />
              <Input
                id="phone"
                label="Téléphone"
                placeholder="06 12 34 56 78"
                rules={{ 
                  required: false,
                  pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
                }}
                helperText="Format: 06 12 34 56 78 (optionnel)"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/ValidationInputs.tsx" showPackageManager={false}>
{`export default function ValidationInputs() {
  return (
    <div className="space-y-4">
      <Input
        id="email-required"
        label="Email"
        placeholder="votre@email.com"
        rules={{ required: true, email: true }}
        helperText="Nous ne partagerons jamais votre email"
      />
      <Input
        id="password-required"
        label="Mot de passe"
        type="password"
        placeholder="••••••••"
        rules={{ required: true, minLength: 8 }}
        helperText="Minimum 8 caractères"
      />
      <Input
        id="phone"
        label="Téléphone"
        placeholder="06 12 34 56 78"
        rules={{ 
          required: false,
          pattern: /^(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4}$/
        }}
        helperText="Format: 06 12 34 56 78 (optionnel)"
      />
    </div>
  );
}`}
            </CodeBlock>
          </div>
        </div>

        {/* Validation personnalisée */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Validation personnalisée</h3>
            <p className="text-muted-foreground">Règles de validation personnalisées avec callbacks.</p>
            <div className="p-6 bg-muted/30 rounded-lg border space-y-4">
              <Input
                id="username"
                label="Nom d'utilisateur"
                placeholder="monpseudo"
                rules={{
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  custom: (value) => {
                    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                      return 'Seuls les lettres, chiffres et _ sont autorisés';
                    }
                    if (value.toLowerCase().includes('admin')) {
                      return 'Le nom ne peut pas contenir "admin"';
                    }
                    return null;
                  }
                }}
                helperText="3-20 caractères, lettres, chiffres et _ uniquement"
              />
              <Input
                id="age"
                label="Âge"
                type="number"
                placeholder="25"
                rules={{
                  required: true,
                  number: true,
                  custom: (value) => {
                    const age = parseInt(value);
                    if (age < 13) return 'Vous devez avoir au moins 13 ans';
                    if (age > 120) return 'Âge invalide';
                    return null;
                  }
                }}
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/CustomValidation.tsx" showPackageManager={false}>
{`export default function CustomValidation() {
  return (
    <div className="space-y-4">
      <Input
        id="username"
        label="Nom d'utilisateur"
        placeholder="monpseudo"
        rules={{
          required: true,
          minLength: 3,
          maxLength: 20,
          custom: (value) => {
            if (!/^[a-zA-Z0-9_]+$/.test(value)) {
              return 'Seuls les lettres, chiffres et _ sont autorisés';
            }
            if (value.toLowerCase().includes('admin')) {
              return 'Le nom ne peut pas contenir "admin"';
            }
            return null;
          }
        }}
        helperText="3-20 caractères, lettres, chiffres et _ uniquement"
      />
      <Input
        id="age"
        label="Âge"
        type="number"
        placeholder="25"
        rules={{
          required: true,
          number: true,
          custom: (value) => {
            const age = parseInt(value);
            if (age < 13) return 'Vous devez avoir au moins 13 ans';
            if (age > 120) return 'Âge invalide';
            return null;
          }
        }}
      />
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
                <td className="border border-border px-4 py-3 font-mono text-sm">type</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'text' | 'email' | 'password' | 'tel' | 'date' | 'number'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">'text'</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Type de l'input</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">placeholder</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Texte d'aide</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">disabled</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Désactive l'input</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Valeur contrôlée</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onChange</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(e: ChangeEvent) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Fonction appelée lors du changement</td>
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
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">labels</code> pour améliorer l'accessibilité</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">icônes</code> pour clarifier le type de données attendu</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">placeholders</code> informatifs</li>
          <li>• Validez les données côté client et serveur</li>
          <li>• Affichez des messages d'erreur clairs et utiles</li>
          <li>• Utilisez les types appropriés (email, tel, date, etc.)</li>
        </ul>
      </div>
    </div>
  );
}