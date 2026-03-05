# @koddaai/ui

Design System da kodda. CLI + Registry inspirado no [shadcn/ui](https://ui.shadcn.com/).

Os componentes **não são instalados como pacote NPM**. São copiados para dentro de cada projeto via CLI, garantindo autonomia total para customização local.

## Quick Start

```bash
# Inicializar no seu projeto
npx @koddaai/ui init

# Adicionar componentes
npx @koddaai/ui add data-table
npx @koddaai/ui add list-page

# Listar componentes disponíveis
npx @koddaai/ui list
```

## Documentação

Documentação completa em [kodda.ai/docs](https://kodda.ai/docs).

## Componentes Disponíveis

### Compostos

| Componente | Descrição |
|------------|-----------|
| `data-table` | Tabela com filtros, paginação, sorting, seleção e ações |
| `page-header` | Cabeçalho de página com breadcrumbs e ações |
| `filter-bar` | Barra de filtros (text, select, multi-select, date-range) |
| `form-section` | Seção de formulário com grid responsivo |
| `confirm-dialog` | Dialog de confirmação com variantes |
| `status-badge` | Badge semântico de status |
| `empty-state` | Estado vazio com ícone, título e ação |
| `copy-cell` | Célula com copy-to-clipboard |
| `currency-input` | Input com formatação de moeda |
| `entity-combobox` | Combobox com busca assíncrona |
| `address-form-fields` | Campos de endereço BR com lookup de CEP |

### Templates

| Template | Descrição |
|----------|-----------|
| `list-page` | PageHeader + FilterBar + DataTable + EmptyState |
| `detail-page` | PageHeader + Tabs + Seções de detalhe |
| `form-page` | PageHeader + FormSections + Barra de ações sticky |

### Hooks

| Hook | Descrição |
|------|-----------|
| `use-data-table` | Estado do DataTable |
| `use-filters` | Estado de filtros com URL sync |
| `use-pagination` | Paginação server-side |
| `use-debounce` | Debounce genérico |

## CLI

```bash
npx @koddaai/ui init          # Inicializa projeto
npx @koddaai/ui add <nome>    # Adiciona componente
npx @koddaai/ui list          # Lista componentes
npx @koddaai/ui update <nome> # Atualiza componente
npx @koddaai/ui diff <nome>   # Mostra diferenças
```

## Requisitos

- Node.js 18+
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui inicializado

## Desenvolvimento

```bash
pnpm install
pnpm build
pnpm test
```

## License

MIT

---

## Inspiração

Este projeto foi inspirado na [Kobana UI](https://ui.kobana.com.br/) ([GitHub](https://github.com/universokobana/kobana-ui)).
