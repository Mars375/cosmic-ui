'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { FormWithReactHookForm } from 'cosmic-ui-mars';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'cosmic-ui-mars';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'cosmic-ui-mars';
import { Checkbox } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { FileText } from 'lucide-react';

interface ExampleFormValues {
  name: string;
  email: string;
  role: string;
  agree: boolean;
}

export default function FormRHFPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleFormValues>({
    defaultValues: { name: '', email: '', role: 'user', agree: false },
  });

  const onSubmit: SubmitHandler<ExampleFormValues> = data => {
    console.log(data);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">FormRHF</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Formulaire avec React Hook Form pour la gestion d'état et la validation.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars react-hook-form</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <FormWithReactHookForm onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nom
                    </label>
                    <Input
                      {...register('name', { required: 'Le nom est requis' })}
                      placeholder="Votre nom"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      {...register('email', { 
                        required: 'L\'email est requis',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email invalide'
                        }
                      })}
                      placeholder="votre@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Rôle
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Utilisateur</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                        <SelectItem value="moderator">Modérateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree"
                      {...register('agree', { required: 'Vous devez accepter les conditions' })}
                    />
                    <label htmlFor="agree" className="text-sm text-foreground">
                      J'accepte les conditions d'utilisation
                    </label>
                  </div>
                  {errors.agree && (
                    <p className="text-red-500 text-sm">{errors.agree.message}</p>
                  )}

                  <Button type="submit" className="w-full">
                    Soumettre
                  </Button>
                </div>
              </FormWithReactHookForm>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/FormRHFExample.tsx" showPackageManager={false}>
{`import { FormWithReactHookForm } from 'cosmic-ui-mars';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';

interface FormValues {
  name: string;
  email: string;
}

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  defaultValues: { name: '', email: '' },
});

const onSubmit: SubmitHandler<FormValues> = data => {
  console.log(data);
};

<FormWithReactHookForm onSubmit={handleSubmit(onSubmit)}>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-2">Nom</label>
      <Input
        {...register('name', { required: 'Le nom est requis' })}
        placeholder="Votre nom"
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>
    
    <Button type="submit">Soumettre</Button>
  </div>
</FormWithReactHookForm>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Formulaire avec validation avancée</h3>
              <p className="text-muted-foreground">Formulaire avec règles de validation personnalisées.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <FormWithReactHookForm onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Mot de passe
                      </label>
                      <Input
                        type="password"
                        {...register('password', { 
                          required: 'Le mot de passe est requis',
                          minLength: {
                            value: 8,
                            message: 'Le mot de passe doit contenir au moins 8 caractères'
                          }
                        })}
                        placeholder="Mot de passe"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Valider
                    </Button>
                  </div>
                </FormWithReactHookForm>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/AdvancedValidationForm.tsx" showPackageManager={false}>
{`export default function App\docs\components\formRhf\page.tsxExample() {
  return <Input
  type="password"
  {...register('password', { 
    required: 'Le mot de passe est requis',
    minLength: {
      value: 8,
      message: 'Le mot de passe doit contenir au moins 8 caractères'
    }
  })}
  placeholder="Mot de passe"
/>;
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Formulaire avec valeurs par défaut</h3>
              <p className="text-muted-foreground">Formulaire pré-rempli avec des valeurs par défaut.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <FormWithReactHookForm onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom
                      </label>
                      <Input
                        {...register('name')}
                        placeholder="Votre nom"
                        defaultValue="John Doe"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Soumettre
                    </Button>
                  </div>
                </FormWithReactHookForm>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/DefaultValuesForm.tsx" showPackageManager={false}>
{`export default function App\docs\components\formRhf\page.tsxExample() {
  const { register, handleSubmit } = useForm<FormValues>({
  defaultValues: { 
    name: 'John Doe',
    email: 'john@example.com'
  },
});

<Input
  {...register('name')}
  placeholder="Votre nom"
/>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
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
                <td className="border border-border px-4 py-3 font-mono text-sm">onSubmit</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(data: any) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors de la soumission</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">className</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">string</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Classes CSS supplémentaires</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">children</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">ReactNode</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Contenu du formulaire</td>
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
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">React Hook Form</code> pour de meilleures performances</li>
          <li>• Définissez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">règles de validation</code> appropriées</li>
          <li>• Affichez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">messages d'erreur</code> clairs</li>
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">valeurs par défaut</code> quand c'est pertinent</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>
    </div>
  );
}