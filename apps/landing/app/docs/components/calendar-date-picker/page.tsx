'use client';

import { useState } from 'react';
import { CalendarDatePicker } from '@cosmic-ui/components';

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

export default function CalendarDatePickerPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
        <p className="text-lg text-cosmic-muted-foreground mb-8">
          Un composant de sélection de date avec calendrier interactif et
          navigation par mois.
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
                <div className="text-center">
                  <h3 className="text-sm font-medium mb-4">
                    Sélectionnez une date
                  </h3>
                  <CalendarDatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                  />
                  {selectedDate && (
                    <p className="text-xs text-cosmic-muted-foreground mt-2">
                      Date sélectionnée :{' '}
                      {selectedDate.toLocaleDateString('fr-FR')}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { CalendarDatePicker } from '@cosmic-ui/components';
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
        <p className="text-xs text-cosmic-muted-foreground mt-2">
          Date sélectionnée : {selectedDate.toLocaleDateString('fr-FR')}
        </p>
      )}
    </div>
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { CalendarDatePicker } from '@cosmic-ui/components';
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
        <p className="text-xs text-cosmic-muted-foreground mt-2">
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
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant CalendarDatePicker est déjà inclus dans le package
              @cosmic-ui/components.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/components`, 'install')
              }
            >
              {`npm install @cosmic-ui/components`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour permettre la sélection de dates.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { CalendarDatePicker } from '@cosmic-ui/components';

<CalendarDatePicker
  value={selectedDate}
  onChange={setSelectedDate}
/>`,
                  'usage'
                )
              }
            >
              {`import { CalendarDatePicker } from '@cosmic-ui/components';

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
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-2">Date de début</h3>
                    <CalendarDatePicker
                      value={startDate}
                      onChange={setStartDate}
                    />
                    {startDate && (
                      <p className="text-xs text-cosmic-muted-foreground mt-1">
                        {startDate.toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium mb-2">Date de fin</h3>
                    <CalendarDatePicker value={endDate} onChange={setEndDate} />
                    {endDate && (
                      <p className="text-xs text-cosmic-muted-foreground mt-1">
                        {endDate.toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Date de début
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
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Date de début
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
/>`}
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
