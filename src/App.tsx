import { useState } from 'react'
import { BrandSelect } from './components/brand-select'
import { KpiCard } from './components/kpi-card'
import { AdminPageHeader } from './components/admin-page-header'
import { InfoTooltip } from './components/info-tooltip'
import { CopyButton } from './components/copy-button'
import { Pagination } from './components/pagination'
import { Modal } from './components/modal'
import { DatePicker, type DateRange } from './components/date-picker'
import { FileUploadButton } from './components/file-upload-button'
import { Considerations, ConsiderationsContent } from './components/considerations'
import { ChartCard } from './components/chart-card'
import { Input } from './components/input'
import { Label } from './components/label'
import { Textarea } from './components/textarea'
import { DataTable, type Column } from './components/data-table'
import { Tabs } from './components/tabs'
import { ToastProvider, useToast } from './components/toast'
import { DropdownMenu } from './components/dropdown-menu'

interface Reparador {
  id: string
  nome: string
  cidade: string
  status: string
}

const reparadores: Reparador[] = [
  { id: '1', nome: 'Oficina Brasil SP', cidade: 'São Paulo', status: 'Ativo' },
  { id: '2', nome: 'Auto Center RJ', cidade: 'Rio de Janeiro', status: 'Ativo' },
  { id: '3', nome: 'Mecânica Sul', cidade: 'Porto Alegre', status: 'Pendente' },
]

const tableColumns: Column<Reparador>[] = [
  { key: 'nome', header: 'Nome', sortable: true, accessor: (r) => r.nome },
  { key: 'cidade', header: 'Cidade', sortable: true, accessor: (r) => r.cidade },
  { key: 'status', header: 'Status' },
]

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, color: '#18328A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, borderBottom: '1px solid #E5E7EB', paddingBottom: 8 }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        {children}
      </div>
    </section>
  )
}

function ToastTrigger() {
  const { show } = useToast()
  return (
    <button
      onClick={() => show('Ação concluída com sucesso!', 'success')}
      style={{ background: '#00B7A4', color: '#00134E', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
    >
      Disparar notificação
    </button>
  )
}

export default function App() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null })
  const [page, setPage] = useState(1)
  const [ipp, setIpp] = useState(5)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <ToastProvider>
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px', fontFamily: 'Figtree, sans-serif' }}>
      <header style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 28, fontWeight: 700, color: '#00134E', margin: 0 }}>Oficina Brasil — Design System</p>
        <p style={{ fontSize: 14, color: '#5B6270', marginTop: 4 }}>
          Sandbox de teste interativo. Clique, digite, abra os popovers — são os componentes reais, não uma captura de tela.
        </p>
      </header>

      <Section title="Cabeçalho e métricas">
        <div style={{ width: '100%' }}>
          <AdminPageHeader color="azul" title="Gestão de Clientes" subtitle="Cadastro, produtos e permissões de acesso" />
        </div>
        <KpiCard title="Respostas totais" value="1.284" subtitle="+12% vs período anterior" icon={<span>↗</span>} iconColor="green" />
        <ChartCard title="Acessos por dia">
          <div style={{ height: 80, background: '#eee', borderRadius: 8, width: 220 }} />
        </ChartCard>
      </Section>

      <Section title="Entradas e seleção">
        <div>
          <p style={{ fontSize: 12, color: '#5B6270', marginBottom: 6 }}>Select com busca sem acento — digite "sao"</p>
          <BrandSelect
            options={[
              { label: 'São Paulo', value: 'sp' },
              { label: 'Rio de Janeiro', value: 'rj' },
              { label: 'Belo Horizonte', value: 'bh' },
              { label: 'Salvador', value: 'sv' },
            ]}
            value={null}
            onChange={() => {}}
            placeholder="Selecione uma cidade"
          />
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#5B6270', marginBottom: 6 }}>Período — clique para abrir o calendário</p>
          <DatePicker value={range} onChange={setRange} />
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#5B6270', marginBottom: 6 }}>Upload de arquivo</p>
          <FileUploadButton onFileSelect={() => {}} />
        </div>
      </Section>

      <Section title="Feedback e ações">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: '#00134E' }}>Taxa de conclusão</span>
          <InfoTooltip message="Percentual de reparadores que concluíram o treinamento" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 13, color: '#00134E', fontFamily: 'monospace' }}>oficinabrasil.com.br/x9k2</span>
          <CopyButton value="https://oficinabrasil.com.br/x9k2" />
        </div>
        <button
          onClick={() => setModalOpen(true)}
          style={{ background: '#18328A', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Abrir modal de confirmação
        </button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirmar exclusão">
          Esta ação remove o banner de todas as campanhas ativas. Não dá para desfazer.
        </Modal>
      </Section>

      <Section title="Formulário">
        <div style={{ width: 320 }}>
          <Label htmlFor="nome-teste" required>Nome</Label>
          <Input id="nome-teste" placeholder="Nome do reparador" />
        </div>
        <div style={{ width: 320 }}>
          <Label htmlFor="email-teste" required>Email</Label>
          <Input id="email-teste" type="email" placeholder="email@exemplo.com" error="Formato de email inválido" />
        </div>
        <div style={{ width: 320 }}>
          <Label htmlFor="obs-teste">Observações</Label>
          <Textarea id="obs-teste" placeholder="Detalhes adicionais" helperText="Opcional" />
        </div>
      </Section>

      <Section title="Tabela de dados">
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: 12, color: '#5B6270', marginBottom: 6 }}>Clique em "Nome" ou "Cidade" para ordenar</p>
          <DataTable columns={tableColumns} data={reparadores} rowKey={(r) => r.id} />
        </div>
      </Section>

      <Section title="Navegação">
        <div style={{ width: '100%' }}>
          <Pagination currentPage={page} totalItems={100} itemsPerPage={ipp} onPageChange={setPage} onItemsPerPageChange={setIpp} />
        </div>
      </Section>

      <Section title="Abas e menus">
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: 12, color: '#5B6270', marginBottom: 6 }}>Tabs — use as setas ← → do teclado depois de clicar numa aba</p>
          <Tabs
            items={[
              { key: 'geral', label: 'Geral', content: <p style={{ fontSize: 13, color: '#5B6270' }}>Conteúdo da aba Geral</p> },
              { key: 'seguranca', label: 'Segurança', content: <p style={{ fontSize: 13, color: '#5B6270' }}>Conteúdo da aba Segurança</p> },
              { key: 'notif', label: 'Notificações', content: <p style={{ fontSize: 13, color: '#5B6270' }}>Conteúdo da aba Notificações</p> },
            ]}
          />
        </div>
        <div>
          <p style={{ fontSize: 12, color: '#5B6270', marginBottom: 6 }}>Menu suspenso — setas ↑↓, Enter, Escape</p>
          <DropdownMenu
            trigger={<span style={{ padding: '8px 14px', border: '1px solid #ddd', borderRadius: 8, display: 'inline-block', fontSize: 13 }}>Ações ▾</span>}
            items={[
              { key: 'editar', label: 'Editar', onSelect: () => {} },
              { key: 'duplicar', label: 'Duplicar', onSelect: () => {} },
              { key: 'excluir', label: 'Excluir', onSelect: () => {}, destructive: true },
            ]}
          />
        </div>
        <ToastTrigger />
      </Section>

      <Section title="Bloco de análise">
        <div style={{ width: '100%' }}>
          <Considerations>
            <ConsiderationsContent about="Sobre o alcance">A campanha atingiu 38% da base ativa no período, com pico na segunda semana.</ConsiderationsContent>
            <ConsiderationsContent about="Sobre o engajamento">A taxa de cliques ficou acima da média histórica, puxada pelos estados do Sudeste.</ConsiderationsContent>
          </Considerations>
        </div>
      </Section>
    </div>
    </ToastProvider>
  )
}
