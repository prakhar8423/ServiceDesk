import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { PRIORITIES, PRIORITY_CHART, PRIORITY_LABELS } from '@/lib/tickets'
import type { Priority } from '@/lib/tickets'

export function PriorityChart({ counts }: { counts: Record<Priority, number> }) {
  const data = PRIORITIES.map((priority) => ({
    priority,
    label: PRIORITY_LABELS[priority],
    count: counts[priority],
  }))
  const hasData = data.some((d) => d.count > 0)

  if (!hasData) {
    return (
      <p className="flex h-[180px] items-center justify-center text-sm text-muted-foreground">
        No open tickets to break down.
      </p>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        />
        <YAxis
          allowDecimals={false}
          tickLine={false}
          axisLine={false}
          width={32}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56}>
          {data.map((entry) => (
            <Cell key={entry.priority} fill={PRIORITY_CHART[entry.priority]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
