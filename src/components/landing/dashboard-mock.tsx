import { CreditCard, FileText, LayoutDashboard, Puzzle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MockWindow, StatusBadge } from './mock-window'

const sidebar = [
  { label: 'Overview', icon: LayoutDashboard, active: true },
  { label: 'Subscriptions', icon: RefreshCw },
  { label: 'Invoices', icon: FileText },
  { label: 'Payments', icon: CreditCard },
  { label: 'Add-ons', icon: Puzzle },
]

const stats = [
  { label: 'Subscriptions', value: '2' },
  { label: 'Next renewal', value: '14 Nov' },
  { label: 'Outstanding', value: '$5.00' },
]

const subscriptions = [
  { name: 'Business plan', meta: 'Books and Counter, monthly', amount: '$25.00', tone: 'active' as const, label: 'Active' },
  { name: 'Extra users', meta: 'Add-on, 10 seats', amount: '$5.00', tone: 'active' as const, label: 'Active' },
]

const invoices = [
  { number: 'INV-0128', date: '31 Oct 2026', amount: '$5.00', tone: 'due' as const, label: 'Due' },
  { number: 'INV-0127', date: '14 Oct 2026', amount: '$25.00', tone: 'paid' as const, label: 'Paid' },
  { number: 'INV-0126', date: '14 Sep 2026', amount: '$25.00', tone: 'paid' as const, label: 'Paid' },
]

export function DashboardMock() {
  return (
    <figure aria-label="Example of the Brightloop customer portal" className="relative">
      <MockWindow address="portal.brightloop.example">
        <div className="flex">
          <aside className="hidden w-40 shrink-0 flex-col gap-1 border-r border-line bg-canvas/60 p-3 sm:flex">
            {sidebar.map((item) => (
              <span
                key={item.label}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[0.8rem]',
                  item.active ? 'bg-white font-medium text-ink shadow-sm ring-1 ring-line' : 'text-ink-soft',
                )}
              >
                <item.icon className={cn('size-4', item.active && 'text-blue')} strokeWidth={1.75} aria-hidden />
                {item.label}
              </span>
            ))}
          </aside>

          <div className="min-w-0 flex-1 space-y-4 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.7rem] text-ink-soft">Welcome back</p>
                <p className="text-[0.95rem] font-semibold tracking-tight">Harbor Hardware</p>
              </div>
              <span
                aria-hidden
                className="flex size-8 items-center justify-center rounded-full bg-navy text-[0.7rem] font-semibold text-white"
              >
                HH
              </span>
            </div>

            <dl className="grid grid-cols-3 gap-2.5">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-line bg-white p-3">
                  <dt className="truncate text-[0.68rem] text-ink-soft">{stat.label}</dt>
                  <dd className="mt-1 text-[1.05rem] font-semibold tabular-nums tracking-tight sm:text-lg">{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">Subscriptions</p>
              <ul className="divide-y divide-line rounded-xl border border-line">
                {subscriptions.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 px-3.5 py-2.5 text-[0.8rem]">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="truncate text-[0.72rem] text-ink-soft">{item.meta}</p>
                    </div>
                    <span className="tabular-nums">{item.amount}</span>
                    <StatusBadge tone={item.tone}>{item.label}</StatusBadge>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">Recent invoices</p>
              <ul className="divide-y divide-line rounded-xl border border-line">
                {invoices.map((invoice) => (
                  <li key={invoice.number} className="flex items-center gap-3 px-3.5 py-2.5 text-[0.8rem]">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[0.76rem] font-medium">{invoice.number}</p>
                      <p className="text-[0.72rem] text-ink-soft">{invoice.date}</p>
                    </div>
                    <span className="tabular-nums">{invoice.amount}</span>
                    <StatusBadge tone={invoice.tone}>{invoice.label}</StatusBadge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MockWindow>


    </figure>
  )
}
