'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ClientWrapper } from './components/client-wrapper';
import { KpiCard } from '../../../packages/ui/src/components/kpi-card';
import { LineChart } from '../../../packages/ui/src/components/line-chart';
import { PieChart } from '../../../packages/ui/src/components/pie-chart';
import { ChatWidget } from '../../../packages/ui/src/components/chat-widget';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '../../../packages/ui/src/components/table';
import { CalendarDatePicker } from '../../../packages/ui/src/components/calendar-date-picker';
import { Switch as UISwitch } from '../../../packages/ui/src/components/switch';
import { Card } from '../../../packages/ui/src/components/card';
import { Input } from '../../../packages/ui/src/components/input';
import { Button } from '../../../packages/ui/src/components/button';
import { Topbar } from '../../../packages/ui/src/components/topbar';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../../packages/ui/src/components/select';

export default function Home() {
  const tabs = [
    { id: 'examples', label: 'Exemples' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'playground', label: 'Playground' },
    { id: 'auth', label: 'Authentification' },
  ] as const;
  const [active, setActive] =
    React.useState<(typeof tabs)[number]['id']>('examples');
  const router = useRouter();

  return (
    <ClientWrapper>
      <main className="container max-w-[1400px] px-4 mx-auto">
      {/* Work in Progress Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
              <svg className="h-4 w-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                Work in Progress
              </h3>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Cette bibliothèque est en cours de développement. La documentation est temporairement indisponible.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span>En développement actif</span>
          </div>
        </div>
      </div>
      
      <section className="py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">CosmicUI</h1>
        <p className="mx-auto mb-6 max-w-3xl text-lg text-muted-foreground">
          Une bibliothèque de composants React + Tailwind, moderne et
          accessible, pour construire des applications SaaS rapidement.
        </p>
        <div className="mb-4 flex items-center justify-center gap-3">
          <Button 
            onClick={() => alert('La documentation est temporairement indisponible pendant la finalisation.')}
            className="opacity-50 cursor-not-allowed"
            disabled
          >
            Commencer
          </Button>
          <Button variant="outline" onClick={() => setActive('examples')}>
            Voir les composants
          </Button>
        </div>
        <div className="mx-auto mb-4 flex w-full max-w-xl items-center justify-center gap-1.5 rounded-md border border-input bg-background p-1 px-2 overflow-hidden text-sm">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={
                'rounded-full px-5 py-2 transition-colors ' +
                (active === t.id
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm text-left">
          {active === 'examples' && <ExamplesPanel />}
          {active === 'dashboard' && <DashboardPanel />}
          {active === 'tasks' && <TasksPanel />}
          {active === 'playground' && <PlaygroundPanel />}
          {active === 'auth' && <AuthPanel />}
        </div>
      </section>
      </main>
    </ClientWrapper>
  );
}

function ExamplesPanel() {
  const [cookiesStrict, setCookiesStrict] = React.useState(true);
  const [cookiesFunctional, setCookiesFunctional] = React.useState(false);

  // Paiement
  const [cardName, setCardName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cardExpiry, setCardExpiry] = React.useState('');
  const [cardCvc, setCardCvc] = React.useState('');
  const fmtNum = (v: string) =>
    v
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  const fmtExp = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length <= 2 ? d : `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  const pieData = [
    { name: 'Starter', value: 35, color: '#6366f1' },
    { name: 'Pro', value: 50, color: '#22c55e' },
    { name: 'Entreprise', value: 15, color: '#eab308' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2 lg:grid-cols-12">
      {/* KPI Cards */}
      <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard
          label="Revenu total"
          value="$15,231.89"
          delta={20.1}
          deltaDirection="up"
          helperText="M-1"
        />
        <KpiCard
          label="Abonnements"
          value={2350}
          delta={180.1}
          deltaDirection="up"
          helperText="M-1"
        />
        <KpiCard
          label="Churn"
          value={'2,1%'}
          delta={0.3}
          deltaDirection="down"
          helperText="M-1"
        />
      </div>

      {/* Charts */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-6">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-muted-foreground">
            Évolution du revenu
          </h3>
          <span className="text-xs text-muted-foreground">Jan → Juil</span>
        </div>
        <LineChart
          data={[
            { m: 'Jan', v: 48, g: 50 },
            { m: 'Fév', v: 40, g: 52 },
            { m: 'Mar', v: 44, g: 54 },
            { m: 'Avr', v: 34, g: 56 },
            { m: 'Mai', v: 28, g: 58 },
            { m: 'Juin', v: 36, g: 60 },
            { m: 'Juil', v: 20, g: 62 },
          ]}
          xKey="m"
          series={[
            { dataKey: 'v', color: '#6366f1', name: 'Revenu' },
            { dataKey: 'g', color: '#22c55e', name: 'Objectif' },
          ]}
          height={260}
          showXLabels
          xLabelFormatter={(v: any) => String(v)}
          showYLabels
          yLabelFormatter={(v: number) => `${Math.round(v)}k`}
          yTicks={4}
        />
      </div>
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-3">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Activité (sélection de date)
        </h3>
        <CalendarDatePicker />
      </div>
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-3">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Répartition des revenus
        </h3>
        <PieChart data={pieData} height={200} />
        <div className="mt-3 flex flex-col gap-2 text-xs text-muted-foreground">
          {pieData.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: d.color }}
              />
              <span>
                {d.name} — {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Table Paiements */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-8">
        <div className="mb-2 text-xl font-semibold">Paiements</div>
        <Table>
          <Thead>
            <Tr>
              <Th className="w-10">#</Th>
              <Th>Statut</Th>
              <Th>Email</Th>
              <Th>Montant</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[
              ['Succès', 'ken99@example.com', '316,00 $'],
              ['Succès', 'abe45@example.com', '242,00 $'],
              ['En traitement', 'monserrat44@example.com', '837,00 $'],
              ['Échec', 'carmella@example.com', '721,00 $'],
              ['En attente', 'jason78@example.com', '450,00 $'],
              ['Succès', 'sarah23@example.com', '1 280,00 $'],
            ].map((row, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                <Td>{row[0]}</Td>
                <Td>{row[1]}</Td>
                <Td>{row[2]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {/* Chat */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-4">
        <ChatWidget
          agent={{ id: '1', name: 'Support', status: 'online' }}
          messages={[
            {
              id: '1',
              content: 'Bonjour, comment puis‑je vous aider ?',
              sender: 'agent',
              timestamp: new Date(),
            },
            {
              id: '2',
              content: 'J’ai un problème avec mon compte.',
              sender: 'user',
              timestamp: new Date(),
            },
          ]}
          onSendMessage={() => {}}
        />
      </div>

      {/* Paramètres cookies (Switch lib) */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-6">
        <div className="text-xl font-semibold">Paramètres des cookies</div>
        <div className="text-sm text-muted-foreground">
          Gérez vos préférences de cookies.
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-md border border-input p-4">
            <div className="mb-1 flex items-center justify-between">
              <div>
                <div className="font-medium">Strictement nécessaires</div>
                <p className="text-sm text-muted-foreground">
                  Indispensables au bon fonctionnement du site.
                </p>
              </div>
              <UISwitch
                checked={cookiesStrict}
                onCheckedChange={() => setCookiesStrict(v => !v)}
              />
            </div>
          </div>
          <div className="rounded-md border border-input p-4">
            <div className="mb-1 flex items-center justify-between">
              <div>
                <div className="font-medium">Fonctionnels</div>
                <p className="text-sm text-muted-foreground">
                  Permettent d’offrir des fonctionnalités personnalisées.
                </p>
              </div>
              <UISwitch
                checked={cookiesFunctional}
                onCheckedChange={() => setCookiesFunctional(v => !v)}
              />
            </div>
          </div>
          <Button variant="outline" className="h-10">
            Enregistrer les préférences
          </Button>
        </div>
      </div>

      {/* Signaler un problème (Select, Input, Button lib) */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-6">
        <div className="text-xl font-semibold">Signaler un problème</div>
        <div className="grid gap-3 md:grid-cols-2 mt-4">
          <div>
            <label className="mb-1 block text-sm">Domaine</label>
            <Select defaultValue="billing">
              <SelectTrigger>
                <SelectValue placeholder="Choisir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="billing">Facturation</SelectItem>
                <SelectItem value="dashboard">Tableau de bord</SelectItem>
                <SelectItem value="auth">Authentification</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-sm">Sévérité</label>
            <Select defaultValue="s2">
              <SelectTrigger>
                <SelectValue placeholder="Sévérité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s1">S1</SelectItem>
                <SelectItem value="s2">S2</SelectItem>
                <SelectItem value="s3">S3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-3 grid gap-3">
          <div>
            <label className="mb-1 block text-sm">Objet</label>
            <Input placeholder="J’ai besoin d’aide pour…" />
          </div>
          <div>
            <label className="mb-1 block text-sm">Description</label>
            <textarea
              className="min-h-[140px] w-full rounded-md border border-input bg-background p-3 text-sm"
              placeholder="Ajoutez toute information utile."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline">Annuler</Button>
            <Button>Envoyer</Button>
          </div>
        </div>
      </div>

      {/* Paiement par carte (Inputs lib) */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-8">
        <div className="text-xl font-semibold">Payer par carte</div>
        <div className="grid gap-3 mt-4">
          <div>
            <label className="mb-1 block text-sm">Titulaire</label>
            <Input
              value={cardName}
              onChange={e => setCardName(e.target.value)}
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Numéro de carte</label>
            <Input
              value={cardNumber}
              onChange={e => setCardNumber(fmtNum(e.target.value))}
              placeholder="1234 1234 1234 1234"
              inputMode="numeric"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-[1fr_120px]">
            <div>
              <label className="mb-1 block text-sm">Expiration (MM/AA)</label>
              <Input
                value={cardExpiry}
                onChange={e => setCardExpiry(fmtExp(e.target.value))}
                placeholder="MM/AA"
                inputMode="numeric"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">CVC</label>
              <Input
                value={cardCvc}
                onChange={e =>
                  setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))
                }
                placeholder="CVC"
                inputMode="numeric"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline">Annuler</Button>
            <Button>Payer 49,00 €</Button>
          </div>
        </div>
      </div>

      {/* Créer un compte (Inputs + Buttons lib) */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-4">
        <div className="text-2xl font-semibold">Créer un compte</div>
        <div className="mt-4 grid gap-3">
          <Input placeholder="votre@email.com" />
          <Input type="password" placeholder="Mot de passe" />
          <Button>Créer le compte</Button>
        </div>
      </div>
    </div>
  );
}

function DashboardPanel() {
  return (
    <div className="text-left">
      {/* Mini mise en page dashboard: topbar + sidebar */}
      <div className="mb-4 rounded-lg border border-border">
        <Topbar
          logo={<span className="font-semibold">CosmicUI Finance</span>}
          search={<Input placeholder="Rechercher…" className="max-w-sm" />}
          actions={<Button variant="outline">Nouveau</Button>}
        />
        <div className="grid grid-cols-12">
          <aside className="col-span-3 border-r border-border p-4 hidden md:block">
            <nav className="space-y-1 text-sm">
              {[
                'Aperçu',
                'Revenus',
                'Dépenses',
                'Clients',
                'Abonnements',
                'Paramètres',
              ].map(it => (
                <button
                  key={it}
                  className="block w-full rounded px-3 py-2 text-left hover:bg-muted"
                >
                  {it}
                </button>
              ))}
            </nav>
          </aside>
          <section className="col-span-12 md:col-span-9 p-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
              <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                <KpiCard
                  label="MRR"
                  value="$42,310"
                  delta={5.2}
                  deltaDirection="up"
                  helperText="vs M-1"
                />
                <KpiCard
                  label="Utilisateurs actifs"
                  value={12890}
                  delta={-1.8}
                  deltaDirection="down"
                  helperText="7j"
                />
                <KpiCard
                  label="Taux de conversion"
                  value="3,9%"
                  delta={0.6}
                  deltaDirection="up"
                  helperText="vs M-1"
                />
                <KpiCard
                  label="Tickets ouverts"
                  value={72}
                  delta={12}
                  deltaDirection="up"
                  helperText="support"
                />
              </div>

              <div className="rounded-xl border border-border bg-card p-4 shadow-sm lg:col-span-12">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Trafic et revenus
                  </h3>
                  <span className="text-xs text-muted-foreground">12 sem.</span>
                </div>
                <LineChart
                  data={Array.from({ length: 12 }).map((_, i) => ({
                    w: `S${i + 1}`,
                    v: 20 + Math.sin(i / 2) * 10 + i * 2,
                    g: 25 + i * 2,
                  }))}
                  xKey="w"
                  series={[
                    { dataKey: 'v', color: '#6366f1', name: 'Revenu' },
                    { dataKey: 'g', color: '#22c55e', name: 'Objectif' },
                  ]}
                  height={320}
                  showXLabels
                  showYLabels
                  yTicks={4}
                />
              </div>

              {/* Section "Revenus par segment" supprimée */}

              <div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-12">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xl font-semibold">Activité récente</div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 jours</SelectItem>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="90">90 jours</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">Exporter</Button>
                  </div>
                </div>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Événement</Th>
                      <Th>Utilisateur</Th>
                      <Th>Montant</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {[
                      [
                        '2025-09-20',
                        'Paiement',
                        'marie@example.com',
                        '+49,00 €',
                      ],
                      [
                        '2025-09-20',
                        'Upgrade plan',
                        'luc@example.com',
                        '+199,00 €',
                      ],
                      [
                        '2025-09-19',
                        'Remboursement',
                        'zoe@example.com',
                        '-49,00 €',
                      ],
                      [
                        '2025-09-18',
                        'Nouvel abonné',
                        'paul@example.com',
                        '+19,00 €',
                      ],
                      ['2025-09-18', 'Ticket support', 'lea@example.com', '—'],
                      [
                        '2025-09-17',
                        'Paiement',
                        'alex@example.com',
                        '+99,00 €',
                      ],
                      ['2025-09-17', 'Annulation', 'sam@example.com', '—'],
                      [
                        '2025-09-16',
                        'Upgrade plan',
                        'nina@example.com',
                        '+199,00 €',
                      ],
                      [
                        '2025-09-15',
                        'Remboursement',
                        'tom@example.com',
                        '-19,00 €',
                      ],
                      [
                        '2025-09-15',
                        'Nouvel abonné',
                        'eva@example.com',
                        '+19,00 €',
                      ],
                    ].map((row, i) => (
                      <Tr key={i}>
                        <Td>{row[0]}</Td>
                        <Td>{row[1]}</Td>
                        <Td>{row[2]}</Td>
                        <Td>{row[3]}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TasksPanel() {
  const allTasks = React.useMemo(
    () => [
      {
        id: 1,
        title: 'Améliorer la conversion',
        status: 'Ouverte',
        priority: 'Haute',
        assignee: 'Marie',
        due: '2025-10-01',
      },
      {
        id: 2,
        title: 'Corriger bug paiement',
        status: 'En cours',
        priority: 'Critique',
        assignee: 'Luc',
        due: '2025-09-30',
      },
      {
        id: 3,
        title: 'Rédiger release notes',
        status: 'Terminée',
        priority: 'Basse',
        assignee: 'Zoé',
        due: '2025-09-25',
      },
      {
        id: 4,
        title: 'Mettre à jour docs',
        status: 'Ouverte',
        priority: 'Moyenne',
        assignee: 'Paul',
        due: '2025-10-05',
      },
      {
        id: 5,
        title: 'Revoir pricing',
        status: 'Bloquée',
        priority: 'Haute',
        assignee: 'Eva',
        due: '2025-10-03',
      },
      {
        id: 6,
        title: 'Optimiser requêtes DB',
        status: 'En cours',
        priority: 'Moyenne',
        assignee: 'Tom',
        due: '2025-10-12',
      },
      {
        id: 7,
        title: 'Améliorer onboarding',
        status: 'Ouverte',
        priority: 'Basse',
        assignee: 'Nina',
        due: '2025-10-08',
      },
      {
        id: 8,
        title: 'Refactor module export',
        status: 'Ouverte',
        priority: 'Moyenne',
        assignee: 'Alex',
        due: '2025-10-11',
      },
      {
        id: 9,
        title: 'Redesign page pricing',
        status: 'En cours',
        priority: 'Haute',
        assignee: 'Sam',
        due: '2025-10-15',
      },
      {
        id: 10,
        title: 'Audit accessibilité',
        status: 'Ouverte',
        priority: 'Moyenne',
        assignee: 'Lea',
        due: '2025-10-20',
      },
    ],
    []
  );
  const [tasks, setTasks] = React.useState(allTasks);
  const [q, setQ] = React.useState('');
  const [status, setStatus] = React.useState<
    'all' | 'Ouverte' | 'En cours' | 'Terminée' | 'Bloquée'
  >('all');
  const [priority, setPriority] = React.useState<
    'all' | 'Basse' | 'Moyenne' | 'Haute' | 'Critique'
  >('all');
  const [page, setPage] = React.useState(1);
  const pageSize = 5;

  const [sortBy, setSortBy] = React.useState<
    'due' | 'priority' | 'status' | 'title'
  >('due');
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const toggleSort = (key: 'due' | 'priority' | 'status' | 'title') => {
    setSortBy(prev => (prev === key ? prev : key));
    setSortDir(prev =>
      sortBy === key ? (prev === 'asc' ? 'desc' : 'asc') : 'asc'
    );
  };

  const filtered = tasks.filter(
    t =>
      (status === 'all' || t.status === status) &&
      (priority === 'all' || t.priority === priority) &&
      (q.trim() === '' ||
        t.title.toLowerCase().includes(q.toLowerCase()) ||
        t.assignee.toLowerCase().includes(q.toLowerCase()))
  );
  const sorted = React.useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let va: any = a[sortBy];
      let vb: any = b[sortBy];
      if (sortBy === 'due') {
        va = new Date(a.due).getTime();
        vb = new Date(b.due).getTime();
      }
      if (typeof va === 'string' && typeof vb === 'string') {
        va = va.toLowerCase();
        vb = vb.toLowerCase();
      }
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortBy, sortDir]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = sorted.slice((page - 1) * pageSize, page * pageSize);

  const statusChip = (s: string) => {
    const map: Record<string, string> = {
      Ouverte:
        'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20',
      'En cours':
        'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
      Terminée:
        'bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/20',
      Bloquée: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20',
    };
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${map[s] || ''}`}
      >
        {s}
      </span>
    );
  };

  return (
    <div className="text-left">
      <div className="mb-4 rounded-lg border border-border">
        <Topbar
          logo={<span className="font-semibold">Task Center</span>}
          search={
            <Input
              value={q}
              onChange={e => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="Rechercher une tâche…"
              className="max-w-sm"
            />
          }
          actions={
            <Button onClick={() => alert('Nouvelle tâche')}>
              Nouvelle tâche
            </Button>
          }
        />
        {selected.size > 0 && (
          <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/60 px-3 py-2 text-sm">
            <span className="text-muted-foreground">
              {selected.size} sélectionnée(s)
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelected(new Set())}
              >
                Annuler
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setTasks(prev => prev.filter(t => !selected.has(t.id)));
                  setSelected(new Set());
                }}
              >
                Supprimer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setTasks(prev =>
                    prev.map(t =>
                      selected.has(t.id) ? { ...t, status: 'Terminée' } : t
                    )
                  );
                  setSelected(new Set());
                }}
              >
                Marquer terminé
              </Button>
            </div>
          </div>
        )}
        <div className="p-3 flex flex-wrap items-center gap-3 border-b border-border">
          <Select
            value={status === 'all' ? undefined : (status as any)}
            onValueChange={v => {
              setStatus((v as any) || 'all');
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Statut: Tous" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ouverte">Ouverte</SelectItem>
              <SelectItem value="En cours">En cours</SelectItem>
              <SelectItem value="Terminée">Terminée</SelectItem>
              <SelectItem value="Bloquée">Bloquée</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={priority === 'all' ? undefined : (priority as any)}
            onValueChange={v => {
              setPriority((v as any) || 'all');
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[170px]">
              <SelectValue placeholder="Priorité: Toutes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Basse">Basse</SelectItem>
              <SelectItem value="Moyenne">Moyenne</SelectItem>
              <SelectItem value="Haute">Haute</SelectItem>
              <SelectItem value="Critique">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="p-4">
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <input
                    type="checkbox"
                    aria-label="Tout sélectionner"
                    onChange={e => {
                      const checked = e.currentTarget.checked;
                      const ns = new Set<number>();
                      if (checked) current.forEach(t => ns.add(t.id));
                      setSelected(ns);
                    }}
                  />
                </Th>
                <Th>#</Th>
                <Th>
                  <button
                    className="hover:underline"
                    onClick={() => toggleSort('title')}
                  >
                    Tâche
                  </button>
                </Th>
                <Th>
                  <button
                    className="hover:underline"
                    onClick={() => toggleSort('status')}
                  >
                    Statut
                  </button>
                </Th>
                <Th>
                  <button
                    className="hover:underline"
                    onClick={() => toggleSort('priority')}
                  >
                    Priorité
                  </button>
                </Th>
                <Th>Assigné</Th>
                <Th>
                  <button
                    className="hover:underline"
                    onClick={() => toggleSort('due')}
                  >
                    Échéance
                  </button>
                </Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {current.map((t, i) => (
                <Tr key={t.id}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={selected.has(t.id)}
                      onChange={e => {
                        const ns = new Set(selected);
                        if (e.currentTarget.checked) ns.add(t.id);
                        else ns.delete(t.id);
                        setSelected(ns);
                      }}
                    />
                  </Td>
                  <Td>{(page - 1) * pageSize + i + 1}</Td>
                  <Td>{t.title}</Td>
                  <Td>{statusChip(t.status)}</Td>
                  <Td>{t.priority}</Td>
                  <Td>{t.assignee}</Td>
                  <Td>{t.due}</Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button variant="ghost" size="sm">
                        …
                      </Button>
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Page {page} / {totalPages} — {filtered.length} tâches
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Précédent
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Suivant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaygroundPanel() {
  const [count, setCount] = React.useState(0);
  return (
    <div className="grid gap-6 text-left">
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Boutons
        </h3>
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          Inputs
        </h3>
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Votre nom" />
          <Input placeholder="Email" />
          <Select defaultValue="pro">
            <SelectTrigger>
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter">Starter</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Entreprise</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-3">
            <UISwitch id="demo" label="Activer" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">
          État local
        </h3>
        <div className="flex items-center gap-3">
          <Button onClick={() => setCount(c => c - 1)} variant="outline">
            -
          </Button>
          <span className="min-w-10 text-center">{count}</span>
          <Button onClick={() => setCount(c => c + 1)}>+</Button>
        </div>
      </div>
    </div>
  );
}

function AuthPanel() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const isEmail = /.+@.+\..+/.test(email);
    if (!isEmail) {
      setError('Adresse email invalide.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    // Demo: pas d’appel réseau, on simule
    alert(`Connexion\nEmail: ${email}\nRemember: ${remember ? 'oui' : 'non'}`);
  };

  return (
    <div className="flex w-full items-center justify-center py-6">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-left shadow-sm">
        <h2 className="mb-1 text-2xl font-semibold">Se connecter</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Accédez à votre compte pour gérer vos abonnements et vos paiements.
        </p>
        <form className="grid gap-3" onSubmit={onSubmit}>
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Mot de passe</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UISwitch
                id="remember"
                checked={remember}
                onCheckedChange={() => setRemember(v => !v)}
                label="Se souvenir de moi"
              />
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          {error ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-2 text-sm text-destructive-foreground">
              {error}
            </div>
          ) : null}
          <Button type="submit" className="w-full">
            Se connecter
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          <span>ou continuer avec</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="w-full">
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M21.35 11.1h-9.18v2.95h5.27c-.23 1.49-1.59 4.36-5.27 4.36-3.17 0-5.76-2.62-5.76-5.85 0-3.23 2.59-5.85 5.76-5.85 1.81 0 3.02.77 3.71 1.44l2.53-2.44C16.98 4.4 15.06 3.5 12.17 3.5 7.31 3.5 3.39 7.42 3.39 12.26c0 4.84 3.92 8.74 8.78 8.74 5.06 0 8.41-3.55 8.41-8.55 0-.57-.06-1-.14-1.35z" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <svg
              className="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .5a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2c-3.34.73-4.05-1.6-4.05-1.6-.55-1.39-1.35-1.76-1.35-1.76-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.27 1.86 1.27 1.08 1.86 2.84 1.33 3.53 1.02.11-.8.42-1.33.76-1.63-2.67-.3-5.48-1.34-5.48-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.33 3.3 1.23a11.4 11.4 0 016 0c2.29-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 .5z" />
            </svg>
            GitHub
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Pas encore de compte ?{' '}
          <a href="#" className="text-primary hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}

