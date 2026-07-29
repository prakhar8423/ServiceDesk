import { formatDistanceToNow } from 'date-fns'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PriorityLabel } from '@/components/status-badge'
import { STATUSES, STATUS_LABELS } from '@/lib/tickets'
import type { Status, Ticket } from '@/lib/tickets'

interface TicketTableProps {
  tickets: Ticket[]
  onStatusChange: (id: string, status: Status) => void
}

export function TicketTable({ tickets, onStatusChange }: TicketTableProps) {
  if (tickets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-border px-6 py-14 text-center">
        <p className="font-medium text-foreground">No tickets match your filters</p>
        <p className="text-sm text-muted-foreground">
          Try a different status tab or clear the search to see the full queue.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[96px]">Ticket</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="hidden lg:table-cell">Opened</TableHead>
            <TableHead className="w-[168px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id} className="transition-colors">
              <TableCell className="font-mono text-xs text-muted-foreground">{ticket.id}</TableCell>
              <TableCell>
                <div className="font-medium text-foreground">{ticket.subject}</div>
                <div className="text-xs text-muted-foreground">{ticket.requester}</div>
              </TableCell>
              <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                {ticket.category}
              </TableCell>
              <TableCell>
                <PriorityLabel priority={ticket.priority} />
              </TableCell>
              <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <Select
                  value={ticket.status}
                  onValueChange={(value) => onStatusChange(ticket.id, value as Status)}
                >
                  <SelectTrigger className="ml-auto w-[150px]" aria-label={`Status for ${ticket.id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {STATUS_LABELS[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
