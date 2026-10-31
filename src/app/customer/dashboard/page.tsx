
'use client'

import Link from 'next/link'
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react'

const subscriptions = [
  {
    name: 'Brightloop Books',
    description: 'Business bookkeeping and invoicing',
    plan: 'Starter',
    price: '$10',
    billing: 'Monthly',
    nextBilling: 'November 15, 2026',
    color: 'bg-blue-50 text-blue-600',
    icon: FileText,
  },
  {
    name: 'Brightloop Counter',
    description: 'Point of sale and inventory management',
    plan: 'Business',
    price: '$25',
    billing: 'Monthly',
    nextBilling: 'November 15, 2026',
    color: 'bg-violet-50 text-violet-600',
    icon: Package,
  },
]

const invoices = [
  {
    id: 'INV-2026-0042',
    date: 'October 15, 2026',
    product: 'Brightloop Books',
    amount: '$10.00',
    status: 'Paid',
  },
  {
    id: 'INV-2026-0041',
    date: 'October 15, 2026',
    product: 'Brightloop Counter',
    amount: '$25.00',
    status: 'Paid',
  },
  {
    id: 'INV-2026-0038',
    date: 'September 15, 2026',
    product: 'Brightloop Books',
    amount: '$10.00',
    status: 'Paid',
  },
]

const payments = [
  {
    id: 'PAY-829104',
    date: 'October 15, 2026',
    method: 'Card ending in 4242',
    amount: '$35.00',
    status: 'Successful',
  },
  {
    id: 'PAY-821567',
    date: 'September 15, 2026',
    method: 'Card ending in 4242',
    amount: '$35.00',
    status: 'Successful',
  },
]

function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-[#e1e6f0] bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b border-[#e1e6f0] px-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a1a3f] text-white">
          <span className="text-lg font-bold">B</span>
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight text-[#0a1a3f]">
            Brightloop
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
            Customer portal
          </p>
        </div>
      </div>

      <div className="px-4 py-7">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
          Workspace
        </p>

        <nav className="space-y-1">
          <Link
            href="/customer/dashboard"
            className="flex items-center gap-3 rounded-xl bg-[#edf2ff] px-3 py-3 text-sm font-semibold text-[#2b5bea]"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/customer/subscriptions"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-[#0a1a3f]"
          >
            <Package size={18} />
            Subscriptions
          </Link>

          <Link
            href="/customer/billing"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-[#0a1a3f]"
          >
            <Wallet size={18} />
            Billing & invoices
          </Link>
        </nav>

        <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
          Account
        </p>

        <nav className="space-y-1">
          <Link
            href="/customer/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-[#0a1a3f]"
          >
            <Settings size={18} />
            Settings
          </Link>

          <a
            href="mailto:support@brightloop.com"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-[#0a1a3f]"
          >
            <CircleHelp size={18} />
            Help & support
          </a>
        </nav>
      </div>

      <div className="mt-auto border-t border-[#e1e6f0] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-[#f5f7fb] p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dce7ff] text-sm font-bold text-[#2b5bea]">
            C
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-[#0a1a3f]">
              Customer account
            </p>
            <p className="truncate text-xs text-gray-500">Demo profile</p>
          </div>
          <LogOut size={17} className="text-gray-400" />
        </div>
      </div>
    </aside>
  )
}

function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {children}
    </span>
  )
}

export default function CustomerDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0b1530]">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="min-w-0 flex-1">
          {/* Top navigation */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#e1e6f0] bg-white/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="flex items-center gap-3 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a1a3f] text-white">
                <span className="font-bold">B</span>
              </div>
              <span className="font-bold text-[#0a1a3f]">Brightloop</span>
            </div>

            <p className="hidden text-sm font-medium text-gray-500 lg:block">
              Customer Portal <span className="mx-2 text-gray-300">/</span>{' '}
              <span className="text-[#0a1a3f]">Dashboard</span>
            </p>

            <div className="ml-auto flex items-center gap-4">
              <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 sm:inline-flex">
                Demo mode
              </span>
              <button
                aria-label="Notifications"
                className="relative rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
              >
                <Bell size={19} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-blue-500" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce7ff] text-sm font-bold text-[#2b5bea]">
                C
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1450px] space-y-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* Welcome */}
            <section className="rise flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#2b5bea]">
                  <Sparkles size={16} />
                  Your business at a glance
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-[#0a1a3f] sm:text-4xl">
                  Welcome back!
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Here's an overview of your Brightloop account.
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#2b5bea] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/15 transition hover:-translate-y-0.5 hover:bg-[#1e45c2] sm:self-auto"
              >
                Explore products
                <ArrowUpRight size={17} />
              </Link>
            </section>

            {/* Account information */}
            <section className="rise rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:p-6" style={{ animationDelay: '80ms' }}>
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf2ff] text-xl font-bold text-[#2b5bea]">
                    C
                  </div>
                  <div>
                    <h2 className="font-semibold text-[#0a1a3f]">
                      Customer account
                    </h2>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Account information will appear here after login is connected.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Customer account
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: 'Active subscriptions',
                  value: '2',
                  note: 'Currently active',
                  icon: Package,
                  color: 'bg-blue-50 text-blue-600',
                },
                {
                  label: 'Upcoming billing',
                  value: '$35.00',
                  note: 'November 15, 2026',
                  icon: CalendarDays,
                  color: 'bg-violet-50 text-violet-600',
                },
                {
                  label: 'Total paid',
                  value: '$240.00',
                  note: 'Across all payments',
                  icon: Wallet,
                  color: 'bg-emerald-50 text-emerald-600',
                },
                {
                  label: 'Pending invoices',
                  value: '0',
                  note: 'No payments due',
                  icon: FileText,
                  color: 'bg-amber-50 text-amber-600',
                },
              ].map((stat, index) => {
                const Icon = stat.icon

                return (
                  <div
                    key={stat.label}
                    className="rise rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                        <Icon size={20} />
                      </div>
                      <ArrowUpRight size={17} className="text-gray-300" />
                    </div>
                    <p className="mt-5 text-sm font-medium text-gray-500">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-2xl font-semibold tracking-tight text-[#0a1a3f]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">{stat.note}</p>
                  </div>
                )
              })}
            </section>

            {/* Subscriptions */}
            <section id="subscriptions" className="rise space-y-4" style={{ animationDelay: '250ms' }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-[#0a1a3f]">
                    Active subscriptions
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your subscribed Brightloop products.
                  </p>
                </div>
                <Link
                  href="/customer/subscriptions"
                  className="hidden items-center gap-1 text-sm font-semibold text-[#2b5bea] transition hover:gap-2 sm:inline-flex"
                >
                  View all <ChevronRight size={17} />
                </Link>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {subscriptions.map((subscription) => {
                  const Icon = subscription.icon

                  return (
                    <div
                      key={subscription.name}
                      className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm transition duration-300 hover:shadow-md sm:p-6"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${subscription.color}`}>
                            <Icon size={22} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#0a1a3f]">
                              {subscription.name}
                            </h3>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {subscription.description}
                            </p>
                          </div>
                        </div>
                        <StatusBadge>Active</StatusBadge>
                      </div>

                      <div className="my-5 grid grid-cols-2 gap-4 border-y border-[#edf0f5] py-4">
                        <div>
                          <p className="text-xs text-gray-400">Current plan</p>
                          <p className="mt-1 text-sm font-semibold text-[#0a1a3f]">
                            {subscription.plan}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Billing amount</p>
                          <p className="mt-1 text-sm font-semibold text-[#0a1a3f]">
                            {subscription.price}
                            <span className="font-normal text-gray-400"> / month</span>
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-gray-400">Next billing date</p>
                          <p className="mt-1 flex items-center gap-2 text-sm font-medium text-[#0a1a3f]">
                            <CalendarDays size={15} className="text-gray-400" />
                            {subscription.nextBilling}
                          </p>
                        </div>
                      </div>

                      <Link
                        href="/customer/subscriptions"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b5bea] transition hover:gap-3"
                      >
                        Manage subscription <ArrowRight size={16} />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Invoice and payment history */}
            <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div id="billing" className="rise overflow-hidden rounded-2xl border border-[#e1e6f0] bg-white shadow-sm">
                <div className="flex items-center justify-between gap-3 border-b border-[#edf0f5] p-5 sm:px-6">
                  <div>
                    <h2 className="font-semibold text-[#0a1a3f]">Recent invoices</h2>
                    <p className="mt-1 text-xs text-gray-500">
                      Your latest billing documents.
                    </p>
                  </div>
                  <Link
                    href="/customer/billing"
                    className="text-sm font-semibold text-[#2b5bea] hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left">
                    <thead>
                      <tr className="bg-[#fafbfe] text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        <th className="px-6 py-3">Invoice</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-t border-[#edf0f5] text-sm transition hover:bg-[#fafbfe]"
                        >
                          <td className="px-6 py-4">
                            <p className="font-semibold text-[#0a1a3f]">
                              {invoice.id}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-400">
                              {invoice.product}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-500">
                            {invoice.date}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 font-medium text-[#0a1a3f]">
                            {invoice.amount}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                              <CheckCircle2 size={14} />
                              {invoice.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rise rounded-2xl border border-[#e1e6f0] bg-white shadow-sm">
                <div className="border-b border-[#edf0f5] p-5 sm:px-6">
                  <h2 className="font-semibold text-[#0a1a3f]">Recent payments</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Your latest payment activity.
                  </p>
                </div>

                <div className="divide-y divide-[#edf0f5] px-5 sm:px-6">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center gap-3 py-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <ArrowDownLeft size={19} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#0a1a3f]">
                          {payment.amount}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {payment.method}
                        </p>
                        <p className="mt-1 text-[11px] text-gray-400">
                          {payment.date}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-600">
                        {payment.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#edf0f5] p-5 sm:px-6">
                  <Link
                    href="/customer/billing"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#2b5bea] hover:gap-3"
                  >
                    View payment history <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </section>

            {/* Help banner */}
            <section className="rise relative overflow-hidden rounded-2xl bg-[#0a1a3f] p-6 text-white sm:flex sm:items-center sm:justify-between sm:p-8">
              <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
              <div className="relative">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-300">
                  <Sparkles size={16} />
                  We're here to help
                </div>
                <h2 className="text-xl font-semibold">
                  Need a hand with your account?
                </h2>
                <p className="mt-1 max-w-lg text-sm text-blue-100/70">
                  Get help with your subscriptions, invoices or Brightloop products.
                </p>
              </div>
              <a
                href="mailto:support@brightloop.com"
                className="relative mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0a1a3f] transition hover:-translate-y-0.5 hover:bg-blue-50 sm:mt-0"
              >
                Contact support <ArrowUpRight size={16} />
              </a>
            </section>

            <footer className="flex flex-col justify-between gap-2 border-t border-[#e1e6f0] pt-5 text-xs text-gray-400 sm:flex-row">
              <p>© 2026 Brightloop Software. All rights reserved.</p>
              <p>Customer Portal · Demo data</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
