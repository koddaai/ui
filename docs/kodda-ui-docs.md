# kodda UI - Documentacao Completa

> Design System composto por componentes reutilizaveis e acessiveis, construido sobre shadcn/ui.

---

## Sumario

1. [Introducao](#introducao)
2. [Instalacao](#instalacao)
3. [Arquitetura](#arquitetura)
4. [CLI](#cli)
5. [Tokens](#tokens)
6. [Charts](#charts)
7. [Componentes Compostos](#componentes-compostos)
8. [Templates](#templates)
9. [Hooks](#hooks)

---

## Introducao

### Principios

- **Copy, don't install** — Componentes sao copiados para o projeto, nao importados como dependencia
- **3 camadas** — Primitivos (shadcn/ui) → Compostos (kodda) → Templates (paginas completas)
- **TypeScript-first** — Tipagem completa para todos os componentes e hooks
- **CLI-driven** — Instale e atualize via CLI

### Quick Start

```bash
npx @koddaai/ui init
npx @koddaai/ui add status-badge
```

```tsx
import { StatusBadge } from "@/components/kodda/status-badge"

export function Example() {
  return <StatusBadge status="active" label="Ativo" />
}
```

---

## Instalacao

### Pre-requisitos

O kodda UI e uma camada acima do shadcn/ui. Voce precisa de:

- **React 18+** e **Next.js 14+** (ou outro framework com suporte a RSC)
- **Tailwind CSS v4** configurado
- **shadcn/ui** ja inicializado no projeto (`npx shadcn@latest init`)

### Inicializar

```bash
npx @koddaai/ui init
```

O comando ira:

1. Detectar se shadcn/ui esta configurado
2. Validar dependencias base (react, tailwindcss)
3. Criar o arquivo `kodda.json` com a configuracao
4. Criar a estrutura de diretorios para componentes kodda

### Estrutura criada

```
seu-projeto/
├── components/
│   ├── ui/          # Primitivos shadcn/ui (ja existente)
│   └── kodda/       # Compostos kodda UI ← novo
├── hooks/           # Hooks kodda UI ← novo
├── tokens/          # Design tokens ← novo
└── kodda.json       # Configuracao ← novo
```

### Adicionar componentes

```bash
npx @koddaai/ui add status-badge
npx @koddaai/ui add data-table
npx @koddaai/ui add page-header
```

O CLI resolve dependencias automaticamente.

### Uso

```tsx
import { StatusBadge } from "@/components/kodda/status-badge"
import { DataTable } from "@/components/kodda/data-table"
import { PageHeader } from "@/components/kodda/page-header"
```

---

## Arquitetura

### Filosofia: Copy, Don't Install

Diferente de bibliotecas de componentes tradicionais, o kodda UI **copia** os componentes para o seu projeto:

- **Controle total** — Voce pode modificar qualquer componente
- **Zero breaking changes** — Atualizacoes sao opt-in via CLI
- **Sem acoplamento** — Nenhuma dependencia runtime do kodda
- **Diff** — Voce pode comparar sua versao local com o registry

### Modelo de 3 Camadas

```
┌─────────────────────────────────────────┐
│           Templates (kodda)             │
│   ListPage · DetailPage · FormPage      │
├─────────────────────────────────────────┤
│           Compostos (kodda)             │
│  DataTable · PageHeader · FilterBar     │
│  StatusBadge · ConfirmDialog · ...      │
├─────────────────────────────────────────┤
│          Primitivos (shadcn/ui)         │
│  Button · Input · Select · Table · ...  │
└─────────────────────────────────────────┘
```

#### Camada 1 — Primitivos (shadcn/ui)

Componentes atomicos sem logica de negocio. Sao instalados automaticamente como dependencias.

#### Camada 2 — Compostos (kodda)

Componentes que combinam multiplos primitivos para resolver padroes recorrentes:

- **DataTable** — Tabela com busca, filtros, paginacao, sorting, selecao e acoes
- **FilterBar** — Combina Input + Select + Popover + Calendar + Badge
- **PageHeader** — Combina Breadcrumb + Button

#### Camada 3 — Templates (kodda)

Paginas completas que compoem multiplos compostos:

- **ListPage** — PageHeader + DataTable + EmptyState
- **DetailPage** — PageHeader + Tabs + Sections
- **FormPage** — PageHeader + Form + ConfirmDialog

---

## CLI

### init

Inicializa o kodda UI no projeto.

```bash
npx @koddaai/ui init
```

Cria:
- `kodda.json` — arquivo de configuracao
- Diretorios para componentes, hooks e tokens

### add

Adiciona um ou mais componentes ao projeto.

```bash
npx @koddaai/ui add <componente>
npx @koddaai/ui add status-badge data-table page-header
```

O que acontece:
1. Resolve a arvore de dependencias (kodda → shadcn → npm)
2. Instala primitivos shadcn necessarios
3. Instala pacotes npm necessarios
4. Copia os arquivos do componente
5. Reescreve imports para os paths do projeto
6. Atualiza `kodda.json` com versao e hash

### list

Lista todos os componentes disponiveis no registry.

```bash
npx @koddaai/ui list
```

### diff

Mostra as diferencas entre a versao local e a versao do registry.

```bash
npx @koddaai/ui diff <componente>
npx @koddaai/ui diff --all
```

### update

Atualiza componentes para a versao mais recente.

```bash
npx @koddaai/ui update <componente>
npx @koddaai/ui update --all
npx @koddaai/ui update --all --force
npx @koddaai/ui update --all --dry-run
```

| Flag | Descricao |
|------|-----------|
| `--all` | Atualiza todos os componentes instalados |
| `--force` | Pula confirmacao |
| `--dry-run` | Mostra mudancas sem aplicar |

---

## Tokens

### Instalacao

```bash
npx @koddaai/ui add tokens
```

### Cores da Marca

| Cor | Hex | Token | Uso |
|-----|-----|-------|-----|
| Azul kodda | `#5B5BD6` | `kodda-blue` | Cor primaria, CTAs, destaques |
| Preto | `#000000` | `kodda-black` | Textos, fundos escuros |
| Branco | `#FDFDFB` | `kodda-white` | Fundos claros |
| Cinza | `#676767` | `kodda-gray` | Textos secundarios |

### Uso com Tailwind

```html
<button class="bg-primary text-primary-foreground">Acao principal</button>
<span class="text-muted-foreground">Texto secundario</span>
```

### Status Colors

Cores semanticas para indicar estados:

| Token | Uso | Light | Dark |
|-------|-----|-------|------|
| `--color-status-success` | Ativo, concluido | `oklch(0.72 0.19 142)` | `oklch(0.78 0.17 142)` |
| `--color-status-warning` | Pendente, alerta | `oklch(0.75 0.18 85)` | `oklch(0.8 0.16 85)` |
| `--color-status-error` | Erro, inativo | `oklch(0.63 0.24 25)` | `oklch(0.7 0.22 25)` |
| `--color-status-info` | Informativo | `oklch(0.7 0.15 250)` | `oklch(0.76 0.13 250)` |

### Chart Colors

Paleta de cores para graficos:

| Token | Uso |
|-------|-----|
| `--chart-1` | Kodda Blue - serie principal |
| `--chart-2` | Success Green - metricas positivas |
| `--chart-3` | Warning Yellow - alertas |
| `--chart-4` | Info Blue - dados informativos |
| `--chart-5` | Error Red - metricas negativas |
| `--chart-6` | Purple - serie secundaria |
| `--chart-7` | Teal - comparativos |
| `--chart-8` | Orange - destaque alternativo |

---

## Charts

### Instalacao

```bash
npx @koddaai/ui add chart
```

**Dependencias npm:** `recharts`

### Tipos de Graficos

| Tipo | Componente | Descricao |
|------|-----------|-----------|
| Bar | `<BarChart>` | Grafico de barras verticais |
| Line | `<LineChart>` | Grafico de linhas |
| Area | `<AreaChart>` | Grafico de area |
| Pie | `<PieChart>` | Grafico de pizza |

### Uso Basico

```tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { name: "Jan", value: 400 },
  { name: "Fev", value: 300 },
  { name: "Mar", value: 600 },
]

<BarChart data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="value" fill="var(--chart-1)" />
</BarChart>
```

### Dark Mode

Os charts usam CSS variables que se adaptam automaticamente ao tema.

---

## Componentes Compostos

### StatusBadge

Badge semantico com cores e icones para indicar status.

```bash
npx @koddaai/ui add status-badge
```

**Dependencias:** `badge` (shadcn/ui)

#### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `status` | `string` | — | Status semantico |
| `label` | `string` | Auto | Texto exibido |
| `size` | `"sm" \| "md"` | `"md"` | Tamanho |
| `icon` | `boolean` | `true` | Mostra icone |
| `statusConfig` | `Record` | — | Override de cores |

#### Status Built-in

| Status | Cor | Icone |
|--------|-----|-------|
| `active` | Success (verde) | ● |
| `inactive` | Error (vermelho) | ○ |
| `pending` | Warning (amarelo) | ◷ |
| `error` | Error (vermelho) | ✕ |
| `processing` | Info (azul) + spin | ↻ |
| `success` | Success (verde) | ✓ |
| `warning` | Warning (amarelo) | ⚠ |
| `info` | Info (azul) | ℹ |

#### Uso

```tsx
import { StatusBadge } from "@/components/kodda/status-badge"

<StatusBadge status="active" label="Ativo" />
<StatusBadge status="pending" label="Aguardando" />
<StatusBadge status="error" label="Falhou" />
```

---

### DataTable

Tabela de dados com busca, filtros, paginacao, sorting, selecao e acoes.

```bash
npx @koddaai/ui add data-table
```

**Dependencias npm:** `@tanstack/react-table`

#### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `columns` | `ColumnDef<TData>[]` | — | Definicao das colunas |
| `data` | `TData[]` | — | Dados da tabela |
| `searchKey` | `string` | — | Coluna para busca |
| `searchPlaceholder` | `string` | — | Placeholder da busca |
| `onSearch` | `(query: string) => void` | — | Busca server-side |
| `filterComponent` | `ReactNode` | — | Componente de filtros |
| `pagination` | `PaginationConfig` | — | Paginacao server-side |
| `selectable` | `boolean` | `false` | Habilita selecao |
| `bulkActions` | `BulkAction[]` | — | Acoes em lote |
| `rowActions` | `RowAction[]` | — | Acoes por linha |
| `isLoading` | `boolean` | `false` | Estado de loading |
| `onRefresh` | `() => void` | — | Botao de refresh |

#### Sub-componentes

| Componente | Responsabilidade |
|-----------|-----------------|
| `DataTableToolbar` | Busca, filtros, refresh |
| `DataTableColumnHeader` | Header com sorting |
| `DataTablePagination` | Navegacao de paginas |
| `DataTableActions` | Menu de acoes por linha |
| `DataTableBulkActions` | Acoes em lote |
| `DataTableEmpty` | Estado vazio |
| `DataTableLoading` | Skeleton loading |

#### Uso Completo

```tsx
<DataTable
  columns={columns}
  data={products}
  searchKey="name"
  searchPlaceholder="Buscar produtos..."
  onSearch={handleSearch}
  filterComponent={<FilterBar filters={filters} values={values} onChange={setValues} />}
  selectable
  bulkActions={[
    { label: "Arquivar", onClick: handleBulkArchive },
    { label: "Excluir", variant: "destructive", onClick: handleBulkDelete },
  ]}
  rowActions={[
    { label: "Editar", onClick: (row) => navigate(`/edit/${row.id}`) },
    { label: "Excluir", variant: "destructive", onClick: handleDelete },
  ]}
  pagination={{ page, perPage, total, totalPages }}
  onPageChange={setPage}
  onRefresh={refetch}
/>
```

---

### PageHeader

Cabecalho de pagina com titulo, breadcrumbs e acoes.

```bash
npx @koddaai/ui add page-header
```

**Dependencias:** `breadcrumb`, `button` (shadcn/ui)

#### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `title` | `string` | — | Titulo da pagina |
| `description` | `string` | — | Subtitulo |
| `breadcrumbs` | `BreadcrumbItem[]` | — | Trail de navegacao |
| `actions` | `ReactNode` | — | Acoes (botoes) |
| `backHref` | `string` | — | URL para botao voltar |

#### Uso

```tsx
<PageHeader
  title="Cobrancas"
  description="Gerencie as cobrancas do seu negocio"
  breadcrumbs={[
    { label: "Dashboard", href: "/" },
    { label: "Cobrancas" },
  ]}
  actions={
    <>
      <Button variant="outline">Exportar</Button>
      <Button>Nova Cobranca</Button>
    </>
  }
/>
```

---

### FilterBar

Barra de filtros reutilizavel com multiplos tipos.

```bash
npx @koddaai/ui add filter-bar
```

**Dependencias:** `input`, `select`, `popover`, `calendar`, `button`, `badge` (shadcn/ui)

#### Props

| Prop | Tipo | Default | Descricao |
|------|------|---------|-----------|
| `filters` | `FilterConfig[]` | — | Configuracao dos filtros |
| `values` | `Record<string, unknown>` | — | Valores atuais |
| `onChange` | `(values) => void` | — | Callback de mudanca |
| `onClear` | `() => void` | — | Limpar todos |

#### Tipos de Filtro

| Tipo | Componente | Descricao |
|------|-----------|-----------|
| `text` | Input | Campo de busca |
| `select` | Select | Selecao unica |
| `multi-select` | Popover + Checkboxes | Selecao multipla |
| `date-range` | Calendar | Intervalo de datas |
| `custom` | ReactNode | Componente personalizado |

#### Uso

```tsx
<FilterBar
  filters={[
    { key: "search", label: "Buscar", type: "text" },
    { key: "status", label: "Status", type: "select", options: statusOptions },
    { key: "date", label: "Data", type: "date-range" },
  ]}
  values={filterValues}
  onChange={setFilterValues}
  onClear={() => setFilterValues({})}
/>
```

---

### ConfirmDialog

Dialog de confirmacao com variantes de severidade.

```bash
npx @koddaai/ui add confirm-dialog
```

**Dependencias:** `alert-dialog`, `button` (shadcn/ui)

#### Uso

```tsx
<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Excluir registro"
  description="Esta acao nao pode ser desfeita."
  confirmLabel="Excluir"
  variant="destructive"
  onConfirm={handleDelete}
/>
```

---

### FormSection

Secao de formulario com grid responsivo.

```bash
npx @koddaai/ui add form-section
```

#### Uso

```tsx
<FormSection title="Dados Pessoais" description="Informacoes basicas">
  <Input label="Nome" />
  <Input label="Email" />
</FormSection>
```

---

### CurrencyInput

Input com formatacao automatica de moeda (BRL/USD).

```bash
npx @koddaai/ui add currency-input
```

#### Uso

```tsx
<CurrencyInput
  value={amount}
  onChange={setAmount}
  currency="BRL"
  placeholder="R$ 0,00"
/>
```

---

### NumberInput

Input numerico com formatacao de milhar e decimal configuravel.

```bash
npx @koddaai/ui add number-input
```

**Dependencias npm:** `react-number-format`

---

### EntityCombobox

Combobox generico com busca assincrona para entidades.

```bash
npx @koddaai/ui add entity-combobox
```

#### Uso

```tsx
<EntityCombobox
  value={selectedCustomer}
  onChange={setSelectedCustomer}
  onSearch={searchCustomers}
  placeholder="Buscar cliente..."
  displayKey="name"
/>
```

---

### AddressFormFields

Campos de endereco brasileiro com auto-lookup de CEP.

```bash
npx @koddaai/ui add address-form-fields
```

---

### EmptyState

Estado vazio com icone, titulo, descricao e acao.

```bash
npx @koddaai/ui add empty-state
```

#### Uso

```tsx
<EmptyState
  icon={<InboxIcon />}
  title="Nenhum resultado"
  description="Tente ajustar os filtros"
  actionLabel="Limpar filtros"
  onAction={clearFilters}
/>
```

---

### AppLayout

Layout de aplicacao com sidebar, header e conteudo responsivo.

```bash
npx @koddaai/ui add app-layout
```

**Dependencias kodda:** `app-sidebar`, `app-header`

---

### AppSidebar

Sidebar de navegacao colapsavel com icones, badges e toggle.

```bash
npx @koddaai/ui add app-sidebar
```

---

### AppHeader

Header de aplicacao com menu mobile, avatar e menu do usuario.

```bash
npx @koddaai/ui add app-header
```

---

### ThemeToggle

Toggle de tema claro/escuro/sistema com dropdown.

```bash
npx @koddaai/ui add theme-toggle
```

**Dependencias npm:** `next-themes`

---

### LocaleToggle

Seletor de idioma/locale com dropdown.

```bash
npx @koddaai/ui add locale-toggle
```

---

### RequirePermission

Gate de permissao com suporte a single/all/any e fallback AccessDenied.

```bash
npx @koddaai/ui add require-permission
```

#### Uso

```tsx
<RequirePermission permission="users.edit">
  <EditUserForm />
</RequirePermission>

<RequirePermission permissions={["admin", "manager"]} mode="any">
  <AdminPanel />
</RequirePermission>
```

---

### ExportModal

Modal de exportacao de dados com estados de progresso e download.

```bash
npx @koddaai/ui add export-modal
```

---

### ImportModal

Modal de importacao de dados.

```bash
npx @koddaai/ui add import-modal
```

---

### HeaderNotifications

Dropdown de notificacoes com badge, lista e time-ago.

```bash
npx @koddaai/ui add header-notifications
```

---

### OnboardingChecklist

Checklist de onboarding com tarefas, icones e status pendente/concluido.

```bash
npx @koddaai/ui add onboarding-checklist
```

---

### CopyCell

Celula com copy-to-clipboard, truncate e tooltip.

```bash
npx @koddaai/ui add copy-cell
```

---

### MultipleEmails

Campo dinamico para cadastro de multiplos e-mails.

```bash
npx @koddaai/ui add multiple-emails
```

---

### MultiplePhones

Campo dinamico para cadastro de multiplos telefones.

```bash
npx @koddaai/ui add multiple-phones
```

---

### MultipleWebsites

Campo dinamico para cadastro de multiplos websites.

```bash
npx @koddaai/ui add multiple-websites
```

---

### MultipleAddresses

Campo dinamico para cadastro de multiplos enderecos.

```bash
npx @koddaai/ui add multiple-addresses
```

---

### Landing Page Components

#### LandingNavbar

Barra de navegacao responsiva para landing pages.

```bash
npx @koddaai/ui add landing-navbar
```

#### LandingHero

Secao hero com headline, subheadline, CTAs e imagem.

```bash
npx @koddaai/ui add landing-hero
```

#### LandingFeatures

Grid de features com icones, titulos e descricoes.

```bash
npx @koddaai/ui add landing-features
```

#### LandingMetrics

Secao de metricas/estatisticas.

```bash
npx @koddaai/ui add landing-metrics
```

#### LandingCta

Secao de call-to-action.

```bash
npx @koddaai/ui add landing-cta
```

#### LandingFooter

Footer com logo, descricao, links e redes sociais.

```bash
npx @koddaai/ui add landing-footer
```

---

## Templates

### ListPage

Template de pagina de listagem completa.

```bash
npx @koddaai/ui add list-page
```

**Dependencias kodda:** `data-table`, `page-header`, `empty-state`

#### Props

| Prop | Tipo | Descricao |
|------|------|-----------|
| `title` | `string` | Titulo da pagina |
| `description` | `string` | Descricao |
| `breadcrumbs` | `BreadcrumbItem[]` | Trail de navegacao |
| `primaryAction` | `{ label, onClick }` | Botao principal |
| `columns` | `ColumnDef[]` | Colunas da tabela |
| `data` | `TData[]` | Dados |
| `filters` | `FilterConfig[]` | Configuracao de filtros |
| `pagination` | `PaginationConfig` | Paginacao server-side |
| `selectable` | `boolean` | Selecao de linhas |
| `bulkActions` | `BulkAction[]` | Acoes em lote |
| `rowActions` | `RowAction[]` | Acoes por linha |
| `emptyState` | `EmptyStateProps` | Estado vazio |

#### Uso

```tsx
<ListPage
  title="Cobrancas"
  description="Gerencie suas cobrancas"
  breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Cobrancas" }]}
  primaryAction={{ label: "Nova Cobranca", onClick: () => navigate("/new") }}
  columns={columns}
  data={charges}
  searchKey="name"
  rowActions={[
    { label: "Editar", onClick: (row) => navigate(`/edit/${row.id}`) },
  ]}
  pagination={{ page, perPage, total, totalPages }}
  emptyState={{
    title: "Nenhuma cobranca",
    description: "Crie sua primeira cobranca",
  }}
/>
```

---

### DetailPage

Template de pagina de detalhe com tabs opcionais.

```bash
npx @koddaai/ui add detail-page
```

**Dependencias kodda:** `page-header`

---

### FormPage

Template de pagina de formulario com barra sticky e guard de navegacao.

```bash
npx @koddaai/ui add form-page
```

**Dependencias kodda:** `page-header`, `confirm-dialog`

---

### PortalPage

Template de pagina de portal com cards de estatisticas e secoes agrupadas.

```bash
npx @koddaai/ui add portal-page
```

---

### ManageListPage

Template de pagina de listagem para area administrativa.

```bash
npx @koddaai/ui add manage-list-page
```

---

### ManageLoginPage

Template de pagina de login para area administrativa com Google OAuth.

```bash
npx @koddaai/ui add manage-login-page
```

---

### LandingPage

Template completo de landing page.

```bash
npx @koddaai/ui add landing-page
```

**Dependencias kodda:** `landing-navbar`, `landing-hero`, `landing-features`, `landing-metrics`, `landing-cta`, `landing-footer`

---

## Hooks

### useDataTable

Hook para gerenciar estado do DataTable com TanStack Table.

```bash
npx @koddaai/ui add use-data-table
```

**Dependencias npm:** `@tanstack/react-table`

#### API

```tsx
const { table, sorting, filtering, pagination, rowSelection } = useDataTable({
  data,
  columns,
  serverSide: false,
  defaultPageSize: 20,
})
```

#### Options

| Opcao | Tipo | Default | Descricao |
|-------|------|---------|-----------|
| `data` | `TData[]` | — | Dados da tabela |
| `columns` | `ColumnDef[]` | — | Definicao das colunas |
| `serverSide` | `boolean` | `false` | Modo server-side |
| `defaultPageSize` | `number` | `20` | Tamanho da pagina |

#### Return

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `table` | `Table<TData>` | Instancia TanStack Table |
| `sorting` | `SortingState` | Estado de ordenacao |
| `filtering` | `ColumnFiltersState` | Estado de filtros |
| `pagination` | `PaginationState` | Estado de paginacao |
| `rowSelection` | `RowSelectionState` | Linhas selecionadas |

---

### useFilters

Hook para gerenciar estado de filtros com URL sync.

```bash
npx @koddaai/ui add use-filters
```

#### Uso

```tsx
const { filters, setFilter, clearFilters, filtersAsParams } = useFilters({
  status: "all",
  search: "",
})
```

---

### usePagination

Hook para paginacao server-side.

```bash
npx @koddaai/ui add use-pagination
```

#### Uso

```tsx
const { page, perPage, setPage, setPerPage, paginationConfig } = usePagination({
  total: 100,
  defaultPerPage: 20,
})
```

---

### useDebounce

Hook de debounce generico.

```bash
npx @koddaai/ui add use-debounce
```

#### Uso

```tsx
const debouncedSearch = useDebounce(searchTerm, 300)

useEffect(() => {
  fetchResults(debouncedSearch)
}, [debouncedSearch])
```

---

## Registry

Todos os componentes estao disponiveis em:

```
https://raw.githubusercontent.com/koddaai/ui/main/registry/registry.json
```

### Categorias

| Categoria | Descricao |
|-----------|-----------|
| `token` | Design tokens (cores, espacamento, tipografia) |
| `composite` | Componentes compostos |
| `template` | Templates de paginas completas |
| `hook` | React hooks |

---

## Licenca

MIT — Clone, copie, modifique.

GitHub: https://github.com/koddaai/ui
