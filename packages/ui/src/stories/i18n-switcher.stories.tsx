import type { Meta, StoryObj } from '@storybook/react';
import { I18nSwitcher, useI18n, COMMON_LANGUAGES } from '../components/i18n-switcher';
import { useState } from 'react';

const meta: Meta<typeof I18nSwitcher> = {
  title: 'Components/I18nSwitcher',
  component: I18nSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLanguages = [
  COMMON_LANGUAGES[0], // French
  COMMON_LANGUAGES[1], // English
  COMMON_LANGUAGES[2], // Spanish
  COMMON_LANGUAGES[3], // German
  COMMON_LANGUAGES[4], // Italian
];

function I18nSwitcherDemo() {
  const [currentLanguage, setCurrentLanguage] = useState('fr');

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">I18n Switcher</h2>
        <p className="text-white/70">Composant pour changer la langue de l'application</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Variantes</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Dropdown (par défaut)</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                showFlag={true}
                showNativeName={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Bouton (cycle)</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="button"
                showFlag={true}
                showNativeName={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Select</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="select"
                showFlag={true}
                showNativeName={true}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Options d'affichage</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Avec drapeau et nom natif</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                showFlag={true}
                showNativeName={true}
                showCode={false}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Avec code de langue</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                showFlag={true}
                showNativeName={true}
                showCode={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Sans drapeau</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                showFlag={false}
                showNativeName={true}
                showCode={false}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Nom anglais</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                showFlag={true}
                showNativeName={false}
                showCode={false}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Tailles</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Petit</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                size="sm"
                showFlag={true}
                showNativeName={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Moyen</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                size="md"
                showFlag={true}
                showNativeName={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Grand</h4>
              <I18nSwitcher
                languages={sampleLanguages}
                currentLanguage={currentLanguage}
                onLanguageChange={setCurrentLanguage}
                variant="dropdown"
                size="lg"
                showFlag={true}
                showNativeName={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-cosmic-surface/50 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">Langue actuelle</h4>
        <p className="text-white/70">
          {sampleLanguages.find((lang) => lang.code === currentLanguage)?.nativeName || 'Inconnue'}
        </p>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <I18nSwitcherDemo />,
};

export const DropdownVariant: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState('fr');

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Variante dropdown</h3>
          <p className="text-white/70 text-sm">
            Menu déroulant avec toutes les langues disponibles
          </p>
        </div>

        <I18nSwitcher
          languages={sampleLanguages}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          variant="dropdown"
          showFlag={true}
          showNativeName={true}
        />
      </div>
    );
  },
};

export const ButtonVariant: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState('fr');

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Variante bouton</h3>
          <p className="text-white/70 text-sm">Cliquez pour faire défiler les langues</p>
        </div>

        <I18nSwitcher
          languages={sampleLanguages}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          variant="button"
          showFlag={true}
          showNativeName={true}
        />
      </div>
    );
  },
};

export const SelectVariant: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState('fr');

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Variante select</h3>
          <p className="text-white/70 text-sm">Liste déroulante native du navigateur</p>
        </div>

        <I18nSwitcher
          languages={sampleLanguages}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          variant="select"
          showFlag={true}
          showNativeName={true}
        />
      </div>
    );
  },
};

export const WithHook: Story = {
  render: () => {
    const { language, changeLanguage } = useI18n();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Avec hook useI18n</h3>
          <p className="text-white/70 text-sm">Utilisation du hook pour gérer la langue</p>
        </div>

        <div className="space-y-4">
          <I18nSwitcher
            languages={sampleLanguages}
            currentLanguage={language}
            onLanguageChange={changeLanguage}
            variant="dropdown"
            showFlag={true}
            showNativeName={true}
          />

          <div className="p-4 bg-cosmic-surface/50 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">État de la langue</h4>
            <div className="space-y-1 text-sm text-white/70">
              <p>Code: {language}</p>
              <p>Nom: {sampleLanguages.find((lang) => lang.code === language)?.nativeName}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const AllLanguages: Story = {
  render: () => {
    const [currentLanguage, setCurrentLanguage] = useState('fr');

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Toutes les langues</h3>
          <p className="text-white/70 text-sm">Liste complète des langues supportées</p>
        </div>

        <I18nSwitcher
          languages={COMMON_LANGUAGES}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          variant="dropdown"
          showFlag={true}
          showNativeName={true}
          showCode={true}
        />
      </div>
    );
  },
};
