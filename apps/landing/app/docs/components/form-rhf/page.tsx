'use client';

import { useState } from 'react';
import { FormWithReactHookForm } from '@cosmic-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@cosmic-ui/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cosmic-ui/react';
import { Checkbox } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';

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

interface ExampleFormValues {
  name: string;
  role: string;
  agree: boolean;
}

export default function FormRHFPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleFormValues>({
    defaultValues: { name: '', role: 'user', agree: false },
  });

  const onSubmit: SubmitHandler<ExampleFormValues> = data => {
    console.log(data);
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
          <h1 className="text-4xl font-bold">FormRHF</h1>
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
          Un composant de formulaire intégré avec React Hook Form pour la
          gestion des états et la validation.
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
              <div className="p-4 w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Nom
                    </label>
                    <Input
                      {...register('name', { required: true })}
                      placeholder="Jean Dupont"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <div className="mt-1 text-xs text-red-400">
                        Le nom est requis
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Rôle
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Utilisateur</SelectItem>
                        <SelectItem value="admin">Administrateur</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="agree" />
                    <label htmlFor="agree" className="text-sm">
                      J'accepte les conditions
                    </label>
                  </div>
                  <Button type="submit" className="w-full">
                    Soumettre
                  </Button>
                </form>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@cosmic-ui/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@cosmic-ui/react';
import { Checkbox } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';

interface FormValues {
  name: string;
  role: string;
  agree: boolean;
}

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ 
    defaultValues: { name: '', role: 'user', agree: false } 
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nom</label>
        <Input
          {...register('name', { required: true })}
          placeholder="Jean Dupont"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <div className="mt-1 text-xs text-red-400">
            Le nom est requis
          </div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Rôle</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Utilisateur</SelectItem>
            <SelectItem value="admin">Administrateur</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <label htmlFor="agree" className="text-sm">
          J'accepte les conditions
        </label>
      </div>
      <Button type="submit" className="w-full">
        Soumettre
      </Button>
    </form>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { useForm, SubmitHandler } from 'react-hook-form';
import { Input } from '@cosmic-ui/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@cosmic-ui/react';
import { Checkbox } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';

interface FormValues {
  name: string;
  role: string;
  agree: boolean;
}

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ 
    defaultValues: { name: '', role: 'user', agree: false } 
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Nom</label>
        <Input
          {...register('name', { required: true })}
          placeholder="Jean Dupont"
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <div className="mt-1 text-xs text-red-400">
            Le nom est requis
          </div>
        )}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Rôle</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">Utilisateur</SelectItem>
            <SelectItem value="admin">Administrateur</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <label htmlFor="agree" className="text-sm">
          J'accepte les conditions
        </label>
      </div>
      <Button type="submit" className="w-full">
        Soumettre
      </Button>
    </form>
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
              Le composant FormRHF nécessite React Hook Form en plus du package
              @cosmic-ui/react.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `npm install @cosmic-ui/react react-hook-form`,
                  'install'
                )
              }
            >
              {`npm install @cosmic-ui/react react-hook-form`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez React Hook Form avec les composants CosmicUI pour créer
              des formulaires robustes.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { useForm } from 'react-hook-form';
import { Input, Button } from '@cosmic-ui/react';

const { register, handleSubmit } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register('name')} />
  <Button type="submit">Soumettre</Button>
</form>`,
                  'usage'
                )
              }
            >
              {`import { useForm } from 'react-hook-form';
import { Input, Button } from '@cosmic-ui/react';

const { register, handleSubmit } = useForm();

<form onSubmit={handleSubmit(onSubmit)}>
  <Input {...register('name')} />
  <Button type="submit">Soumettre</Button>
</form>`}
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
                <div className="p-4 w-full space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Formulaire simple
                    </h3>
                    <form className="space-y-3">
                      <Input placeholder="Email" />
                      <Input placeholder="Mot de passe" type="password" />
                      <Button className="w-full">Connexion</Button>
                    </form>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Formulaire avec validation
                    </h3>
                    <form className="space-y-3">
                      <div>
                        <Input
                          placeholder="Nom requis"
                          className="border-red-500"
                        />
                        <div className="mt-1 text-xs text-red-400">
                          Ce champ est requis
                        </div>
                      </div>
                      <Button className="w-full">Soumettre</Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Formulaire simple
<form className="space-y-3">
  <Input placeholder="Email" />
  <Input placeholder="Mot de passe" type="password" />
  <Button className="w-full">Connexion</Button>
</form>

// Formulaire avec validation
const { register, formState: { errors } } = useForm();

<form className="space-y-3">
  <div>
    <Input
      {...register('name', { required: true })}
      placeholder="Nom requis"
      className={errors.name ? "border-red-500" : ""}
    />
    {errors.name && (
      <div className="mt-1 text-xs text-red-400">
        Ce champ est requis
      </div>
    )}
  </div>
  <Button className="w-full">Soumettre</Button>
</form>`,
                        'variants'
                      )
                    }
                  >
                    {`// Formulaire simple
<form className="space-y-3">
  <Input placeholder="Email" />
  <Input placeholder="Mot de passe" type="password" />
  <Button className="w-full">Connexion</Button>
</form>

// Formulaire avec validation
const { register, formState: { errors } } = useForm();

<form className="space-y-3">
  <div>
    <Input
      {...register('name', { required: true })}
      placeholder="Nom requis"
      className={errors.name ? "border-red-500" : ""}
    />
    {errors.name && (
      <div className="mt-1 text-xs text-red-400">
        Ce champ est requis
      </div>
    )}
  </div>
  <Button className="w-full">Soumettre</Button>
</form>`}
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
