export const STATUSES = ['open', 'in_progress', 'resolved'] as const
export type Status = (typeof STATUSES)[number]

export const PRIORITIES = ['low', 'medium', 'high', 'critical'] as const
export type Priority = (typeof PRIORITIES)[number]

export const CATEGORIES = ['Hardware', 'Software', 'Network', 'Access', 'Email'] as const
export type Category = (typeof CATEGORIES)[number]

export interface Ticket {
  id: string
  subject: string
  requester: string
  category: Category
  priority: Priority
  status: Status
  createdAt: string
}

export const STATUS_LABELS: Record<Status, string> = {
  open: 'Open',
  in_progress: 'In progress',
  resolved: 'Resolved',
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

// Chart tokens by priority — consistent meaning everywhere.
export const PRIORITY_CHART: Record<Priority, string> = {
  low: 'var(--chart-2)',
  medium: 'var(--chart-1)',
  high: 'var(--chart-3)',
  critical: 'var(--chart-4)',
}

export const TICKET_SEED: Ticket[] = [
  { id: 'INC-1042', subject: 'Laptop will not boot after update', requester: 'Dana Whitfield', category: 'Hardware', priority: 'critical', status: 'open', createdAt: '2026-07-29T08:12:00Z' },
  { id: 'INC-1041', subject: 'Cannot access shared finance drive', requester: 'Marcus Lee', category: 'Access', priority: 'high', status: 'in_progress', createdAt: '2026-07-29T07:40:00Z' },
  { id: 'INC-1040', subject: 'Outlook stuck syncing on mobile', requester: 'Priya Nair', category: 'Email', priority: 'medium', status: 'open', createdAt: '2026-07-28T16:05:00Z' },
  { id: 'INC-1039', subject: 'VPN drops every few minutes', requester: 'Tom Alvarez', category: 'Network', priority: 'high', status: 'open', createdAt: '2026-07-28T14:22:00Z' },
  { id: 'INC-1038', subject: 'Design app license expired', requester: 'Sara Kim', category: 'Software', priority: 'medium', status: 'in_progress', createdAt: '2026-07-28T11:10:00Z' },
  { id: 'INC-1037', subject: 'New hire needs CRM access', requester: 'Jordan Ellis', category: 'Access', priority: 'low', status: 'resolved', createdAt: '2026-07-27T09:30:00Z' },
  { id: 'INC-1036', subject: 'Printer on 3rd floor offline', requester: 'Amelia Cross', category: 'Hardware', priority: 'low', status: 'resolved', createdAt: '2026-07-27T08:15:00Z' },
  { id: 'INC-1035', subject: 'Password reset for payroll portal', requester: 'Ben Carter', category: 'Access', priority: 'medium', status: 'resolved', createdAt: '2026-07-26T13:48:00Z' },
  { id: 'INC-1034', subject: 'Wi-Fi weak in east conference room', requester: 'Lena Ortiz', category: 'Network', priority: 'low', status: 'open', createdAt: '2026-07-26T10:02:00Z' },
  { id: 'INC-1033', subject: 'Spreadsheet macros blocked', requester: 'Hugo Bennett', category: 'Software', priority: 'high', status: 'in_progress', createdAt: '2026-07-25T15:20:00Z' },
  { id: 'INC-1032', subject: 'Docking station not charging', requester: 'Yara Fahmy', category: 'Hardware', priority: 'medium', status: 'open', createdAt: '2026-07-25T09:11:00Z' },
  { id: 'INC-1031', subject: 'Phishing email reported', requester: 'Owen Park', category: 'Email', priority: 'critical', status: 'in_progress', createdAt: '2026-07-24T17:55:00Z' },
]
