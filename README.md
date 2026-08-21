# Oficina Brasil — Design System (sandbox de teste)

Ambiente isolado (Vite + React + Tailwind) para testar os 12 componentes
reais do design system interativamente no navegador — não é o projeto de
produção, é só pra clicar, testar e validar antes de migrar pro
repositório de verdade.

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado (18 ou mais recente).

```bash
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

## O que você vai ver

Uma página única com os 12 componentes organizados por seção:
- **Cabeçalho e métricas** — AdminPageHeader, KpiCard, ChartCard
- **Entradas e seleção** — Select (busca sem acento, tente digitar "sao"),
  DatePicker (clique para abrir o calendário), FileUploadButton
- **Feedback e ações** — InfoTooltip (passe o mouse), CopyButton (clique
  para copiar), Modal (clique no botão para abrir)
- **Navegação** — Pagination (funcional, muda a página de verdade)
- **Bloco de análise** — Considerations

Todos os componentes são os arquivos reais de `src/components/` — a mesma
fonte de verdade usada no restante do projeto, não uma reconstrução.

## Estrutura

```
src/
├── App.tsx              # página de teste (não faz parte do design system em si)
├── globals.css          # tokens da marca (cores, contraste) — igual ao do projeto real
├── main.tsx
└── components/
    ├── icons.tsx         # ícones compartilhados (reais da marca + genéricos de UI)
    ├── admin-page-header.tsx
    ├── brand-select.tsx
    ├── chart-card.tsx
    ├── considerations.tsx
    ├── copy-button.tsx
    ├── date-picker.tsx
    ├── file-upload-button.tsx
    ├── info-tooltip.tsx
    ├── kpi-card.tsx
    ├── logo-cutout.tsx
    ├── modal.tsx
    ├── pagination.tsx
    └── visually-hidden-input.tsx
```

## O que NÃO está aqui

- Não é a estrutura final do Next.js (esse sandbox usa Vite só para teste
  rápido) — a migração para o repositório real segue os Prompts 1-3
  adaptados, não este projeto.
- `VisuallyHiddenInput` não aparece visualmente na página de teste — é
  proposital, o componente existe pra ser invisível (usado dentro do
  `FileUploadButton`).
- Assets de logo/ícones da marca completos estão em `../assets/` no zip
  do design system principal, não duplicados aqui.
