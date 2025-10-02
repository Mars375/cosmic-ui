'use client';

import * as React from 'react';
import { useState } from 'react';
import { CalendarDatePicker } from 'cosmic-ui-mars';
import { CodeBlock } from '../../../components/code-block';

export default function CalendarDatePickerPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
          <h1 className="text-4xl font-bold">CalendarDatePicker</h1>
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
        <p className="text-lg text-gray-600 dark:text-gray-400-foreground mb-8">
          Un composant de sélection de date avec calendrier interactif et
          navigation par mois.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`export default function App\docs\components\calendarDatePicker\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }
}`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`export default function App\docs\components\calendarDatePicker\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
              }
}`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-sm font-medium mb-4">
                    Sélectionnez une date
                  </h3>
                  <CalendarDatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                  />
                  {selectedDate && (
                    <p className="text-xs text-gray-600 dark:text-gray-400-foreground mt-2">
                      Date sélectionnée :{' '}
                      {selectedDate.toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full">
                <CodeBlock showPackageManager={false} language="typescript" filePath="components/Example.tsx">
        {`import { CalendarDatePicker } from 'cosmic-ui-mars';
import * as React from 'react';
import { useState } from 'react';

export function MyCalendarDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="text-center">
      <h3 className="text-sm font-medium mb-4">
        Sélectionnez une date
      </h3>
      <CalendarDatePicker
        value={selectedDate}
        onChange={setSelectedDate}
      />
      {selectedDate && (
        <p className="text-xs text-gray-600 dark:text-gray-400-foreground mt-2">
          Date sélectionnée : {selectedDate.toLocaleDateString('fr-FR')}
        </p>
      )}
    </div>
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
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Le composant CalendarDatePicker est déjà inclus dans le package
              cosmic-ui-mars.
            </p>
            <CodeBlock filePath="package.json">{`pnpm add cosmic-ui-mars`}</CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400-foreground mb-4">
              Utilisez le composant pour permettre la sélection de dates.
            </p>
            <CodeBlock showPackageManager={false} language="typescript" filePath="components/Example.tsx">
        {`import { CalendarDatePicker } from 'cosmic-ui-mars';

<CalendarDatePicker
  value={selectedDate}
  onChange={setSelectedDate}
/>`}
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
                className={`export default function App\docs\components\calendarDatePicker\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
                  !showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }
}`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`export default function App\docs\components\calendarDatePicker\page.tsxExample() {
  px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-gray-900 dark:text-white hover:bg-cosmic-border/80'
                }
}`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-gray-200 dark:border-gray-700 rounded-lg p-2 min-h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-6">
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-2">Date de début</h3>
                    <CalendarDatePicker
                      value={startDate}
                      onChange={setStartDate}
                    />
                    {startDate && (
                      <p className="text-xs text-gray-600 dark:text-gray-400-foreground mt-1">
                        {startDate.toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-2">Date de fin</h3>
                    <CalendarDatePicker value={endDate} onChange={setEndDate} />
                    {endDate && (
                      <p className="text-xs text-gray-600 dark:text-gray-400-foreground mt-1">
                        {endDate.toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <CodeBlock language="typescript" filePath="components/Example.tsx" showPackageManager={false}>
        {`export default function App\docs\components\calendarDatePicker\page.tsxExample() {
  // Date de début
<CalendarDatePicker
  value={startDate}
  onChange={setStartDate}
/>

// Date de fin
<CalendarDatePicker
  value={endDate}
  onChange={setEndDate}
/>

// Avec date par défaut
<CalendarDatePicker
  value={new Date()}
  onChange={setSelectedDate}
/>

// Avec validation de plage
<CalendarDatePicker
  value={selectedDate}
  onChange={(date) => {
    if (date && date > new Date()) {
      setSelectedDate(date);
    }
  }}
/>
}`}
                  </CodeBlock>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelles fonctionnalités */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Fonctionnalités avancées</h2>
        
        {/* Sélecteurs d'année et de mois */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Avec sélecteurs d'année et de mois</h3>
            <p className="text-muted-foreground">Navigation rapide avec des sélecteurs déroulants.</p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="flex justify-center">
                <CalendarDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  showYearSelector={true}
                  showMonthSelector={true}
                  minYear={2020}
                  maxYear={2030}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/AdvancedCalendar.tsx" showPackageManager={false}>
{`export default function AdvancedCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <CalendarDatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      showYearSelector={true}
      showMonthSelector={true}
      minYear={2020}
      maxYear={2030}
    />
  );
}`}
            </CodeBlock>
          </div>
        </div>

        {/* Navigation simplifiée */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Navigation simplifiée</h3>
            <p className="text-muted-foreground">Sans sélecteurs, navigation par boutons uniquement.</p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="flex justify-center">
                <CalendarDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  showYearSelector={false}
                  showMonthSelector={false}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/SimpleCalendar.tsx" showPackageManager={false}>
{`export default function SimpleCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <CalendarDatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      showYearSelector={false}
      showMonthSelector={false}
    />
  );
}`}
            </CodeBlock>
          </div>
        </div>

        {/* Plage d'années limitée */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Plage d'années limitée</h3>
            <p className="text-muted-foreground">Restriction de la navigation à une plage d'années spécifique.</p>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="flex justify-center">
                <CalendarDatePicker
                  value={selectedDate}
                  onChange={setSelectedDate}
                  minYear={2024}
                  maxYear={2026}
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/LimitedCalendar.tsx" showPackageManager={false}>
{`export default function LimitedCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <CalendarDatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      minYear={2024}
      maxYear={2026}
    />
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
                <td className="border border-border px-4 py-3 font-mono text-sm">value</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Date | null</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">null</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Date sélectionnée</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onChange</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(date: Date) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback appelé lors de la sélection</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showYearSelector</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">true</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Affiche le sélecteur d'année</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showMonthSelector</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">true</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Affiche le sélecteur de mois</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">minYear</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">1900</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Année minimum sélectionnable</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">maxYear</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">number</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">2100</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Année maximum sélectionnable</td>
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
          <li>• Utilisez <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">showYearSelector</code> pour permettre la navigation rapide entre les années</li>
          <li>• Les boutons <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">‹‹</code> et <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">››</code> permettent de naviguer par année</li>
          <li>• Le bouton <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">Aujourd'hui</code> permet de revenir rapidement à la date actuelle</li>
          <li>• Limitez la plage d'années avec <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">minYear</code> et <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">maxYear</code> pour des cas d'usage spécifiques</li>
          <li>• Les dates hors du mois courant sont grisées et désactivées</li>
        </ul>
      </div>
    </div>
  );
}
