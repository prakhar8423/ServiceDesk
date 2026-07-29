import { cn } from '@/lib/utils'
import { PRIORITY_LABELS, STATUS_LABELS } from '@/lib/tickets'
import type { Priority, Status } from '@/lib/tickets'

const STATUS_STYLES: Record<Status, string> = {
  open: 'bg-primary/10 text-primary',
  in_progress: 'bg-accent/15 text-accent-foreground',
  resolved: 'bg-muted text-muted-foreground',
}

const PRIORITY_STYLES: Record<Priority, string> = {
  low: 'text-muted-foreground',
  medium: 'text-foreground',
  high: 'text-accent-foreground',
  critical: 'text-destructive',
}

const PRIORITY_DOT: Record<Priority, string> = {
  low: 'bg-muted-foreground/50',
  medium: 'bg-[var(--chart-1)]',
  high: 'bg-[var(--chart-3)]',
  critical: 'bg-destructive',
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        STATUS_STYLES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  )
}

export function PriorityLabel({ priority }: { priority: Priority }) {
  return (
    <span className={cn('inline-flex items-center gap-2 text-sm font-medium', PRIORITY_STYLES[priority])}>
      <span className={cn('size-2 rounded-full', PRIORITY_DOT[priority])} aria-hidden />
      {PRIORITY_LABELS[priority]}
    </span>
  )
}
