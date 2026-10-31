
'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  Pause,
  Play,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react'

type SubscriptionStatus = 'Active' | 'Paused' | 'Cancelled'

type Subscription = {
  id: number
  name: string
  description: string
  plan: string
  price: number
  cycle: 'Monthly' | 'Yearly'
  nextBilling: string
  status: SubscriptionStatus
  color: string
  initials: string
}

const initialSubscriptions: Subscription[] = [
  {
    id: 1,
    name: 'Brightloop Books',
    description: 'Bookkeeping and invoicing',
    plan: 'Starter',
    price: 10,
    cycle: 'Monthly',
    nextBilling: 'November 15, 2026',
    status: 'Active',
    color: 'bg-blue-50 text-blue-700',
    initials: 'BK',
  },
  {
    id: 2,
    name: 'Brightloop Counter',
    description: 'Point of sale and stock control',
    plan: 'Business',
    price: 25,
    cycle: 'Monthly',
    nextBilling: 'November 15, 2026',
    status: 'Active',
    color: 'bg-indigo-50 text-indigo-700',
    initials: 'CT',
  },
]

function StatusBadge({ status }: { status: SubscriptionStatus }) {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    Paused: 'bg-amber-50 text-amber-700 ring-amber-200',
    Cancelled: 'bg-slate-100 text-slate-600 ring-slate-200',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-500' : status === 'Paused' ? 'bg-amber-500' : 'bg-slate-400'}`} />
      {status}
    </span>
  )
}

export default function CustomerSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [cancelId, setCancelId] = useState<number | null>(null)
  const [notice, setNotice] = useState('')

  const activeCount = subscriptions.filter((item) => item.status === 'Active').length
  const pausedCount = subscriptions.filter((item) => item.status === 'Paused').length
  const totalMonthly = subscriptions
    .filter((item) => item.status === 'Active')
    .reduce((total, item) => total + (item.cycle === 'Monthly' ? item.price : item.price / 12), 0)

  function updateStatus(id: number, status: SubscriptionStatus) {
    setSubscriptions((current) =>
      current.map((item) => item.id === id ? { ...item, status } : item)
    )
    setNotice(
      status === 'Paused'
        ? 'Subscription paused successfully.'
        : status === 'Active'
          ? 'Subscription is now active.'
          : 'Subscription cancelled successfully.'
    )
    setCancelId(null)
    window.setTimeout(() => setNotice(''), 3500)
  }

  function renewSubscription(id: number) {
    setSubscriptions((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: 'Active', nextBilling: 'December 15, 2026' }
          : item
      )
    )
    setNotice('Renewal recorded in demo mode. Your subscription is active.')
    window.setTimeout(() => setNotice(''), 3500)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0b1530]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-[250px] shrink-0 flex-col border-r border-[#e1e6f0] bg-white px-5 py-7 lg:flex">
          <Link href="/" className="mb-10 flex items-center gap-2.5 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a1a3f] text-white">
              <Sparkles size={19} />
            </div>
            <span className="text-xl font-bold tracking-tight">brightloop</span>
          </Link>

          <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Workspace
          </div>

          <nav className="space-y-1">
            <Link href="/customer/dashboard" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#0a1a3f]">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link href="/customer/subscriptions" className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-[#2b5bea]">
              <Package size={18} />
              Subscriptions
              <span className="ml-auto rounded-md bg-blue-100 px-2 py-0.5 text-[10px]">{subscriptions.length}</span>
            </Link>
            <Link href="/customer/billing" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#0a1a3f]">
              <CreditCard size={18} />
              Billing & invoices
            </Link>
            <Link href="/customer/settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#0a1a3f]">
              <Settings size={18} />
              Account settings
            </Link>
          </nav>

          <div className="mt-auto">
            <div className="mb-5 rounded-2xl bg-[#0a1a3f] p-4 text-white">
              <ShieldCheck size={21} className="mb-3 text-sky-300" />
              <p className="text-sm font-semibold">Your account, protected.</p>
              <p className="mt-1 text-xs leading-5 text-blue-100/70">
                Manage your software subscriptions in one secure place.
              </p>
            </div>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50">
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          {/* Header */}
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e1e6f0] bg-white/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="lg:hidden">
              <Link href="/" className="text-lg font-bold tracking-tight">brightloop</Link>
            </div>
            <div className="hidden text-sm text-slate-400 lg:block">
              Customer portal <ChevronRight size={14} className="mx-1 inline" /> <span className="font-semibold text-[#0b1530]">Subscriptions</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 sm:inline-flex">
                Demo mode
              </span>
              <button aria-label="Notifications" className="relative rounded-xl border border-[#e1e6f0] p-2.5 text-slate-500 hover:bg-slate-50">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1a3f] text-xs font-bold text-white">
                AC
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold">Alex Customer</p>
                <p className="text-[10px] text-slate-400">Customer account</p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Page heading */}
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <Link href="/customer/dashboard" className="hover:text-blue-600">Dashboard</Link>
                  <ChevronRight size={13} />
                  <span className="text-slate-600">Subscriptions</span>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your subscriptions</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Manage your Brightloop products and billing preferences.
                </p>
              </div>
              <Link href="/products" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2b5bea] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#1e45c2]">
                Explore products <ArrowUpRight size={16} />
              </Link>
            </div>

            {/* Notification */}
            {notice && (
              <div role="status" className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                <CheckCircle2 size={18} />
                {notice}
                <button onClick={() => setNotice('')} className="ml-auto rounded-lg p-1 hover:bg-emerald-100" aria-label="Dismiss notification">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Active subscriptions</span>
                  <span className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><CheckCircle2 size={17} /></span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">{activeCount}</p>
                <p className="mt-1 text-xs text-slate-400">Currently running</p>
              </div>
              <div className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Paused subscriptions</span>
                  <span className="rounded-lg bg-amber-50 p-2 text-amber-600"><Pause size={17} /></span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">{pausedCount}</p>
                <p className="mt-1 text-xs text-slate-400">Temporarily on hold</p>
              </div>
              <div className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Monthly recurring total</span>
                  <span className="rounded-lg bg-blue-50 p-2 text-blue-600"><CreditCard size={17} /></span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">${totalMonthly.toFixed(2)}</p>
                <p className="mt-1 text-xs text-slate-400">Based on active subscriptions</p>
              </div>
            </div>

            {/* Subscription list */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">All subscriptions</h2>
                <p className="mt-1 text-xs text-slate-400">{subscriptions.length} products in your account</p>
              </div>
              <Link href="/customer/billing" className="inline-flex items-center gap-1 text-xs font-semibold text-[#2b5bea] hover:underline">
                View billing <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <article key={subscription.id} className="overflow-hidden rounded-2xl border border-[#e1e6f0] bg-white shadow-sm shadow-slate-900/[0.02] transition hover:shadow-md">
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${subscription.color}`}>
                          {subscription.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-semibold">{subscription.name}</h3>
                            <StatusBadge status={subscription.status} />
                          </div>
                          <p className="text-sm text-slate-500">{subscription.description}</p>
                          <p className="mt-2 text-xs text-slate-400">Plan: <span className="font-semibold text-slate-600">{subscription.plan}</span></p>
                        </div>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-2xl font-semibold tracking-tight">${subscription.price}<span className="text-sm font-normal text-slate-400">/{subscription.cycle === 'Monthly' ? 'mo' : 'yr'}</span></p>
                        <p className="mt-1 text-xs text-slate-400">{subscription.cycle} billing</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 rounded-xl bg-[#f7f9fc] p-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <CalendarDays size={17} className="shrink-0 text-slate-400" />
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Next billing date</p>
                          <p className="mt-0.5 text-xs font-semibold text-slate-700">{subscription.nextBilling}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CreditCard size={17} className="shrink-0 text-slate-400" />
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Billing amount</p>
                          <p className="mt-0.5 text-xs font-semibold text-slate-700">${subscription.price} {subscription.cycle.toLowerCase()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {subscription.status === 'Active' && (
                        <>
                          <button onClick={() => renewSubscription(subscription.id)} className="inline-flex items-center gap-2 rounded-lg bg-[#2b5bea] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1e45c2]">
                            <RefreshCw size={14} /> Renew
                          </button>
                          <button onClick={() => updateStatus(subscription.id, 'Paused')} className="inline-flex items-center gap-2 rounded-lg border border-[#e1e6f0] px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
                            <Pause size={14} /> Pause
                          </button>
                          <button onClick={() => setCancelId(subscription.id)} className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                            <XCircle size={14} /> Cancel
                          </button>
                        </>
                      )}
                      {subscription.status === 'Paused' && (
                        <>
                          <button onClick={() => updateStatus(subscription.id, 'Active')} className="inline-flex items-center gap-2 rounded-lg bg-[#2b5bea] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1e45c2]">
                            <Play size={14} /> Resume subscription
                          </button>
                          <button onClick={() => setCancelId(subscription.id)} className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                            <XCircle size={14} /> Cancel
                          </button>
                        </>
                      )}
                      {subscription.status === 'Cancelled' && (
                        <button onClick={() => renewSubscription(subscription.id)} className="inline-flex items-center gap-2 rounded-lg bg-[#2b5bea] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1e45c2]">
                          <RefreshCw size={14} /> Reactivate subscription
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Help panel */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#2b5bea] shadow-sm">
                  <CircleHelp size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Need help with a subscription?</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Our support team can help with plans, renewals and billing questions.</p>
                </div>
              </div>
              <a href="mailto:support@brightloop.com" className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#2b5bea] hover:underline">
                Contact support <ArrowUpRight size={14} />
              </a>
            </div>

            <footer className="mt-10 flex flex-col gap-2 border-t border-[#e1e6f0] pt-6 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Brightloop Software. All rights reserved.</p>
              <div className="flex gap-5">
                <a href="mailto:support@brightloop.com" className="hover:text-slate-600">Help & support</a>
                <Link href="/" className="hover:text-slate-600">Back to website</Link>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Cancellation confirmation */}
      {cancelId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#06112b]/50 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCancelId(null)
        }}>
          <div role="dialog" aria-modal="true" aria-labelledby="cancel-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <XCircle size={22} />
            </div>
            <h2 id="cancel-title" className="text-lg font-semibold">Cancel this subscription?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to cancel {subscriptions.find((item) => item.id === cancelId)?.name}? You can reactivate it later in this demo.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button onClick={() => setCancelId(null)} className="rounded-xl border border-[#e1e6f0] px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Keep subscription
              </button>
              <button onClick={() => updateStatus(cancelId, 'Cancelled')} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
                Yes, cancel it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
