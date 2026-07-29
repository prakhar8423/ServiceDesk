interface Stat {
  label: string
  value: number
  hint: string
}

export function StatsRow({ stats }: { stats: Stat[] }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card px-5 py-4">
          <dt className="text-sm text-muted-foreground">{stat.label}</dt>
          <dd className="mt-2 font-heading text-3xl font-semibold tabular-nums text-foreground">
            {stat.value}
          </dd>
          <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
        </div>
      ))}
    </dl>
  )
}
