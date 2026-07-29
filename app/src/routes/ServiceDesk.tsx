import { useMemo } from 'react'
import { LifeBuoy, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { StatsRow } from '@/components/stats-row'
import { PriorityChart } from '@/components/priority-chart'
import { TicketTable } from '@/components/ticket-table'
import { useData } from '@/lib/data'
import { useTicketStore } from '@/lib/store'
import type { StatusFilter } from '@/lib/store'
import { PRIORITIES, STATUSES, STATUS_LABELS, TICKET_SEED } from '@/lib/tickets'
import type { Priority, Status, Ticket } from '@/lib/tickets'

const STATUS_TABS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...STATUSES.map((status) => ({ value: status, label: STATUS_LABELS[status] })),
]

export default function ServiceDesk() {
  const { data: seed } = useData<Ticket[]>('tickets', 'seed', TICKET_SEED)
  const statusOverrides = useTicketStore((s) => s.statusOverrides)
  const statusFilter = useTicketStore((s) => s.statusFilter)
  const search = useTicketStore((s) => s.search)
  const setStatus = useTicketStore((s) => s.setStatus)
  const setStatusFilter = useTicketStore((s) => s.setStatusFilter)
  const setSearch = useTicketStore((s) => s.setSearch)

  const tickets = useMemo<Ticket[]>(
    () => (seed ?? []).map((t) => ({ ...t, status: statusOverrides[t.id] ?? t.status })),
    [seed, statusOverrides],
  )

  const stats = useMemo(() => {
    const byStatus = (status: Status) => tickets.filter((t) => t.status === status).length
    return [
      { label: 'Open tickets', value: byStatus('open'), hint: 'Awaiting first action' },
      { label: 'In progress', value: byStatus('in_progress'), hint: 'Being worked on' },
      { label: 'Resolved', value: byStatus('resolved'), hint: 'Closed this cycle' },
      {
        label: 'Critical & high',
        value: tickets.filter((t) => t.status !== 'resolved' && (t.priority === 'critical' || t.priority === 'high')).length,
        hint: 'Open, needs attention',
      },
    ]
  }, [tickets])

  const priorityCounts = useMemo(() => {
    const base = Object.fromEntries(PRIORITIES.map((p) => [p, 0])) as Record<Priority, number>
    for (const t of tickets) {
      if (t.status !== 'resolved') base[t.priority] += 1
    }
    return base
  }, [tickets])

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tickets
      .filter((t) => (statusFilter === 'all' ? true : t.status === statusFilter))
      .filter((t) =>
        q === ''
          ? true
          : `${t.id} ${t.subject} ${t.requester} ${t.category}`.toLowerCase().includes(q),
      )
  }, [tickets, statusFilter, search])

  function handleStatusChange(id: string, status: Status) {
    setStatus(id, status)
    toast.success(`${id} moved to ${STATUS_LABELS[status]}`)
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LifeBuoy className="size-5" aria-hidden />
          </span>
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              ServiceDesk
            </h1>
            <p className="text-sm text-muted-foreground">IT support ticket queue</p>
          </div>
        </div>
      </header>

      <section className="mt-8">
        <StatsRow stats={stats} />
      </section>

      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-sm font-semibold text-foreground">Open tickets by priority</h2>
        <p className="mb-3 text-xs text-muted-foreground">Excludes resolved tickets</p>
        <PriorityChart counts={priorityCounts} />
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
            <TabsList>
              {STATUS_TABS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tickets, people, categories"
              className="pl-9"
              aria-label="Search tickets"
            />
          </div>
        </div>

        <div className="mt-4">
          <TicketTable tickets={visible} onStatusChange={handleStatusChange} />
        </div>
      </section>
    </main>
  )
}
