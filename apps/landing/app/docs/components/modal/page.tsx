'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';
import { Button } from 'cosmic-ui-mars';
import {
  Star,
  Heart,
  Settings,
  User,
  Bell,
  Download,
  Share2,
  Trash2,
  Edit,
  Plus,
  Minus,
} from 'lucide-react';

export default function ModalPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Modal</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Un composant modal pour les dialogues et fenêtres contextuelles.
          Parfait pour les confirmations, formulaires et affichage de contenu
          détaillé.
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
              <Button onClick={() => setIsOpen(true)}>Ouvrir le modal</Button>
              <Modal open={isOpen} onOpenChange={setIsOpen}>
                <ModalHeader>
                  <ModalTitle>Titre du modal</ModalTitle>
                  <ModalDescription>
                    Description du contenu du modal.
                  </ModalDescription>
                </ModalHeader>
                <ModalContent>
                  <p>Contenu principal du modal.</p>
                </ModalContent>
                <ModalFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Annuler
                  </Button>
                  <Button onClick={() => setIsOpen(false)}>Confirmer</Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock
              language="typescript"
              filePath="components/ModalExample.tsx"
              showPackageManager={false}
            >
              {`export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Ouvrir le modal
      </Button>
      <Modal open={isOpen} onOpenChange={setIsOpen}>
        <ModalHeader>
          <ModalTitle>Titre du modal</ModalTitle>
          <ModalDescription>
            Description du contenu du modal.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <p>Contenu principal du modal.</p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Annuler
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Confirmer
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Variants
        </h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">
                Modal de confirmation de suppression
              </h3>
              <p className="text-muted-foreground">
                Modal pour les actions destructives avec style d'alerte.
              </p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  Supprimer l'élément
                </Button>
                <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                  <ModalHeader>
                    <ModalTitle className="text-destructive">
                      ⚠️ Supprimer l'élément
                    </ModalTitle>
                    <ModalDescription>
                      Cette action est irréversible. L'élément sera
                      définitivement supprimé.
                    </ModalDescription>
                  </ModalHeader>
                  <ModalContent>
                    <p className="text-sm">
                      Êtes-vous absolument sûr de vouloir supprimer cet élément
                      ? Cette action ne peut pas être annulée.
                    </p>
                  </ModalContent>
                  <ModalFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setIsDeleteOpen(false)}
                    >
                      Supprimer définitivement
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
            <div>
              <CodeBlock
                language="typescript"
                filePath="components/DeleteModal.tsx"
                showPackageManager={false}
              >
                {`export default function DeleteModal() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
        Supprimer l'élément
      </Button>
      <Modal open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <ModalHeader>
          <ModalTitle className="text-destructive">
            ⚠️ Supprimer l'élément
          </ModalTitle>
          <ModalDescription>
            Cette action est irréversible. L'élément sera définitivement supprimé.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <p className="text-sm">
            Êtes-vous absolument sûr de vouloir supprimer cet élément ? 
            Cette action ne peut pas être annulée.
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={() => setIsDeleteOpen(false)}>
            Supprimer définitivement
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Exemple avancé */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Exemple avancé
        </h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Modal avec formulaire
            </h3>
            <p className="text-muted-foreground">
              Modal contenant un formulaire avec validation.
            </p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <Button onClick={() => setIsConfirmOpen(true)}>
                Créer un compte
              </Button>
              <Modal open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <ModalHeader>
                  <ModalTitle>Créer un nouveau compte</ModalTitle>
                  <ModalDescription>
                    Remplissez les informations ci-dessous pour créer votre
                    compte.
                  </ModalDescription>
                </ModalHeader>
                <ModalContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        Nom d'utilisateur
                      </label>
                      <input
                        type="text"
                        placeholder="john.doe"
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Mot de passe
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                      />
                    </div>
                  </div>
                </ModalContent>
                <ModalFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirmOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button onClick={() => setIsConfirmOpen(false)}>
                    Créer le compte
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </div>
          <div>
            <CodeBlock
              language="typescript"
              filePath="components/FormModal.tsx"
              showPackageManager={false}
            >
              {`export default function FormModal() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsConfirmOpen(true)}>
        Créer un compte
      </Button>
      <Modal open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <ModalHeader>
          <ModalTitle>Créer un nouveau compte</ModalTitle>
          <ModalDescription>
            Remplissez les informations ci-dessous pour créer votre compte.
          </ModalDescription>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nom d'utilisateur</label>
              <input 
                type="text" 
                placeholder="john.doe"
                className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Mot de passe</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
            Annuler
          </Button>
          <Button onClick={() => setIsConfirmOpen(false)}>
            Créer le compte
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* API Reference */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">
          Référence API
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Défaut
                </th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  variant
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Style visuel du composant
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  size
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'sm' | 'default' | 'lg'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  'default'
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Taille du composant
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  disabled
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  boolean
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  false
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Désactive le composant
                </td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">
                  className
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  string
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  -
                </td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">
                  Classes CSS supplémentaires
                </td>
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
          <li>
            • Utilisez le variant{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              default
            </code>{' '}
            pour les cas standards
          </li>
          <li>
            • Le variant{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              destructive
            </code>{' '}
            pour les actions dangereuses
          </li>
          <li>
            • Ajoutez des{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              icônes
            </code>{' '}
            pour améliorer la compréhension
          </li>
          <li>
            • Utilisez l'état{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              disabled
            </code>{' '}
            pour les actions non disponibles
          </li>
          <li>
            • Respectez les{' '}
            <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">
              guidelines d'accessibilité
            </code>
          </li>
        </ul>
      </div>
    </div>
  );
}
