import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Status } from '@/lib/tickets'

const STORAGE_KEY = 'servicedesk-ui'

export type StatusFilter = Status | 'all'

interface TicketUiState {
  // Local overrides for a ticket's status, keyed by ticket id.
  statusOverrides: Record<string, Status>
  statusFilter: StatusFilter
  search: string
  setStatus: (id: string, status: Status) => void
  setStatusFilter: (filter: StatusFilter) => void
  setSearch: (search: string) => void
}

export const useTicketStore = create<TicketUiState>()(
  persist(
    (set) => ({
      statusOverrides: {},
      statusFilter: 'all',
      search: '',
      setStatus: (id, status) =>
        set((state) => ({ statusOverrides: { ...state.statusOverrides, [id]: status } })),
      setStatusFilter: (statusFilter) => set({ statusFilter }),
      setSearch: (search) => set({ search }),
    }),
    { name: STORAGE_KEY },
  ),
)
