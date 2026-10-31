'use client'

import { useRef, useState } from 'react'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MockWindow, StatusBadge } from './mock-window'

const tabs = [
  {
    id: 'subscriptions',
    label: 'View and manage subscriptions',
    blurb: 'See every plan you hold, its status and what it includes.',
  },
  {
    id: 'renewals',
    label: 'Check upcoming renewals',
    blurb: 'Know what renews, when, and for how much.',
  },
  {
    id: 'invoices',
    label: 'View and download invoices',
    blurb: 'Every invoice, with tax shown, ready to download.',
  },
  {
    id: 'payments',
    label: 'Track payments and balances',
    blurb: 'See what you have paid and what is still outstanding.',
  },
  {
    id: 'addons',
    label: 'Manage add-ons and options',
    blurb: 'Switch add-ons on or off and review your product variants.',
  },
] as const

type TabId = (typeof tabs)[number]['id']

function PanelTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">{children}</p>
}

const panels: Record<TabId, React.ReactNode> = {
  subscriptions: (
    <>
      <PanelTitle>Your subscriptions</PanelTitle>
      <ul className="space-y-3">
        {[
          { name: 'Business plan', meta: 'Books and Counter. Billed monthly.', amount: '$25.00 / mo' },
          { name: 'Extra users', meta: 'Add-on. 10 more seats.', amount: '$5.00 / mo' },
        ].map((item) => (
          <li key={item.name} className="rounded-xl border border-line p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold tracking-tight">{item.name}</p>
                <p className="mt-0.5 text-[0.82rem] text-ink-soft">{item.meta}</p>
              </div>
              <StatusBadge tone="active">Active</StatusBadge>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[0.82rem]">
              <span className="font-medium tabular-nums">{item.amount}</span>
              <span className="flex gap-2 text-ink-soft">
                <span className="rounded-md border border-line px-2.5 py-1">Pause</span>
                <span className="rounded-md border border-line px-2.5 py-1">Close</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  ),
  renewals: (
    <>
      <PanelTitle>Coming up</PanelTitle>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {[
          { month: 'Nov', day: '14', name: 'Business plan', when: 'In 14 days', amount: '$25.00' },
          { month: 'Nov', day: '14', name: 'Extra users', when: 'In 14 days', amount: '$5.00' },
          { month: 'Dec', day: '02', name: 'Phone support', when: 'In 32 days', amount: '$15.00' },
        ].map((item) => (
          <li key={item.name} className="flex items-center gap-4 px-4 py-3.5">
            <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-lg bg-canvas leading-none">
              <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-blue">{item.month}</span>
              <span className="mt-1 text-base font-semibold tabular-nums">{item.day}</span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-[0.8rem] text-ink-soft">{item.when}</p>
            </div>
            <span className="text-[0.9rem] tabular-nums">{item.amount}</span>
          </li>
        ))}
      </ul>
    </>
  ),
  invoices: (
    <>
      <PanelTitle>Invoices</PanelTitle>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {[
          { number: 'INV-0128', date: '31 Oct 2026', amount: '$5.00', tone: 'due' as const, label: 'Due' },
          { number: 'INV-0127', date: '14 Oct 2026', amount: '$25.00', tone: 'paid' as const, label: 'Paid' },
          { number: 'INV-0126', date: '14 Sep 2026', amount: '$25.00', tone: 'paid' as const, label: 'Paid' },
          { number: 'INV-0125', date: '14 Aug 2026', amount: '$25.00', tone: 'paid' as const, label: 'Paid' },
        ].map((invoice) => (
          <li key={invoice.number} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[0.82rem] font-medium">{invoice.number}</p>
              <p className="text-[0.78rem] text-ink-soft">{invoice.date}</p>
            </div>
            <span className="text-[0.9rem] tabular-nums">{invoice.amount}</span>
            <StatusBadge tone={invoice.tone}>{invoice.label}</StatusBadge>
            <Download className="size-4 text-ink-soft" strokeWidth={1.75} aria-hidden />
          </li>
        ))}
      </ul>
    </>
  ),
  payments: (
    <>
      <div className="rounded-xl bg-navy p-5 text-white">
        <p className="text-[0.75rem] text-white/60">Outstanding balance</p>
        <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight">$5.00</p>
        <p className="mt-1 text-[0.8rem] text-white/60">1 invoice, due 14 Nov 2026</p>
      </div>
      <PanelTitle>
        <span className="mt-5 block">Payment history</span>
      </PanelTitle>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {[
          { date: '14 Oct 2026', method: 'Card ending 4821', amount: '$25.00' },
          { date: '14 Sep 2026', method: 'Card ending 4821', amount: '$25.00' },
        ].map((payment) => (
          <li key={payment.date} className="flex items-center gap-3 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-[0.9rem] font-medium">{payment.date}</p>
              <p className="text-[0.78rem] text-ink-soft">{payment.method}</p>
            </div>
            <span className="text-[0.9rem] tabular-nums">{payment.amount}</span>
            <StatusBadge tone="paid">Received</StatusBadge>
          </li>
        ))}
      </ul>
    </>
  ),
  addons: (
    <>
      <PanelTitle>Add-ons and options</PanelTitle>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {[
          { name: 'Extra users', note: '+$5.00 / month', on: true },
          { name: 'Accountant export', note: '+$10.00 / month', on: true },
          { name: 'Phone support', note: '+$15.00 / month', on: false },
          { name: 'Counter terminal: Model B', note: 'Variant, included', on: true },
        ].map((item) => (
          <li key={item.name} className="flex items-center gap-4 px-4 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-[0.8rem] text-ink-soft">{item.note}</p>
            </div>
            <span
              aria-hidden
              className={cn('relative h-5 w-9 shrink-0 rounded-full', item.on ? 'bg-blue' : 'bg-line-strong')}
            >
              <span className={cn('absolute top-0.5 size-4 rounded-full bg-white', item.on ? 'left-[1.1rem]' : 'left-0.5')} />
            </span>
          </li>
        ))}
      </ul>
    </>
  ),
}

export function PortalPreview() {
  const [active, setActive] = useState<TabId>('subscriptions')
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({})

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + tabs.length) % tabs.length
    setActive(tabs[next].id)
    buttons.current[tabs[next].id]?.focus()
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      <div role="tablist" aria-label="Customer portal features" aria-orientation="vertical" className="flex flex-col gap-1 lg:col-span-5">
        {tabs.map((tab, index) => {
          const selected = active === tab.id
          return (
            <button
              key={tab.id}
              ref={(node) => {
                buttons.current[tab.id] = node
              }}
              id={`portal-tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls="portal-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'rounded-xl border px-5 py-4 text-left transition-[background-color,border-color] duration-300',
                selected ? 'border-white/15 bg-white/10' : 'border-transparent hover:bg-white/5',
              )}
            >
              <span className={cn('block font-medium transition-colors', selected ? 'text-white' : 'text-white/70')}>
                {tab.label}
              </span>
              <span
                className={cn(
                  'grid transition-[grid-template-rows,opacity] duration-300',
                  selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                )}
              >
                <span className="overflow-hidden">
                  <span className="mt-1.5 block text-[0.92rem] text-white/60">{tab.blurb}</span>
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="lg:col-span-7">
        <MockWindow address="portal.brightloop.example">
          <div
            key={active}
            id="portal-panel"
            role="tabpanel"
            aria-labelledby={`portal-tab-${active}`}
            className="panel-in min-h-[24rem] p-5 sm:p-6"
          >
            {panels[active]}
          </div>
        </MockWindow>
        <p className="mt-3 text-xs text-white/50">Sample data.</p>
      </div>
    </div>
  )
}
