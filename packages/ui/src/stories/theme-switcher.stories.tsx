import type { Meta, StoryObj } from '@storybook/react';
import { ThemeSwitcher, useTheme } from '../components/theme-switcher';
import { useState } from 'react';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ThemeSwitcherDemo() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Theme Switcher</h2>
        <p className="text-white/70">Composant pour changer le thème de l'application</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Variantes</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Bouton (cycle)</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="button"
                showLabel={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Dropdown</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="dropdown"
                showLabel={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Toggle</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="toggle"
                showLabel={true}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Tailles</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Petit</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="button"
                size="sm"
                showLabel={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Moyen</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="button"
                size="md"
                showLabel={true}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Grand</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="button"
                size="lg"
                showLabel={true}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Sans label</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Bouton</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="button"
                showLabel={false}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Dropdown</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="dropdown"
                showLabel={false}
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-white/70 mb-2">Toggle</h4>
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                variant="toggle"
                showLabel={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-cosmic-surface/50 rounded-lg">
        <h4 className="text-sm font-medium text-white mb-2">Thème actuel</h4>
        <p className="text-white/70">
          {currentTheme === 'light' && 'Clair'}
          {currentTheme === 'dark' && 'Sombre'}
          {currentTheme === 'system' && 'Système'}
        </p>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <ThemeSwitcherDemo />,
};

export const ButtonVariant: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Variante bouton</h3>
          <p className="text-white/70 text-sm">Cliquez pour faire défiler les thèmes</p>
        </div>

        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          variant="button"
          showLabel={true}
        />
      </div>
    );
  },
};

export const DropdownVariant: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Variante dropdown</h3>
          <p className="text-white/70 text-sm">Cliquez pour ouvrir le menu déroulant</p>
        </div>

        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          variant="dropdown"
          showLabel={true}
        />
      </div>
    );
  },
};

export const ToggleVariant: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>('system');

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Variante toggle</h3>
          <p className="text-white/70 text-sm">Sélectionnez directement le thème souhaité</p>
        </div>

        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          variant="toggle"
          showLabel={true}
        />
      </div>
    );
  },
};

export const WithHook: Story = {
  render: () => {
    const { theme, changeTheme, isDark } = useTheme();

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Avec hook useTheme</h3>
          <p className="text-white/70 text-sm">Utilisation du hook pour gérer le thème</p>
        </div>

        <div className="space-y-4">
          <ThemeSwitcher
            currentTheme={theme}
            onThemeChange={changeTheme}
            variant="dropdown"
            showLabel={true}
          />

          <div className="p-4 bg-cosmic-surface/50 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">État du thème</h4>
            <div className="space-y-1 text-sm text-white/70">
              <p>Thème actuel: {theme}</p>
              <p>Mode sombre: {isDark ? 'Oui' : 'Non'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
