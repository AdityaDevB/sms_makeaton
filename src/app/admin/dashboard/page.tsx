
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react'

const stats = [
  {
    label: 'Total customers',
    value: '248',
    change: '+12.8%',
    description: 'Compared to last month',
    icon: Users,
    positive: true,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'Active subscriptions',
    value: '186',
    change: '+8.2%',
    description: 'Compared to last month',
    icon: Package,
    positive: true,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: 'Monthly recurring revenue',
    value: '$8,420',
    change: '+14.6%',
    description: 'Compared to last month',
    icon: CircleDollarSign,
    positive: true,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    label: 'Pending invoices',
    value: '12',
    change: '3 overdue',
    description: 'Requires attention',
    icon: CreditCard,
    positive: false,
    color: 'bg-amber-50 text-amber-600',
  },
]

const revenue = [
  { month: 'May', value: 48 },
  { month: 'Jun', value: 62 },
  { month: 'Jul', value: 55 },
  { month: 'Aug', value: 75 },
  { month: 'Sep', value: 68 },
  { month: 'Oct', value: 92 },
]

const recentCustomers = [
  {
    name: 'Arjun Menon',
    email: 'arjun@example.com',
    plan: 'Business',
    date: 'Oct 30, 2026',
    status: 'Active',
    initials: 'AM',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    plan: 'Starter',
    date: 'Oct 29, 2026',
    status: 'Active',
    initials: 'PS',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Rahul Nair',
    email: 'rahul@example.com',
    plan: 'Company',
    date: 'Oct 28, 2026',
    status: 'Pending',
    initials: 'RN',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    name: 'Ananya Das',
    email: 'ananya@example.com',
    plan: 'Business',
    date: 'Oct 27, 2026',
    status: 'Active',
    initials: 'AD',
    color: 'bg-pink-100 text-pink-700',
  },
]

const activities = [
  {
    title: 'New subscription created',
    detail: 'Arjun Menon subscribed to Business',
    time: '25 minutes ago',
    icon: Package,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Payment received',
    detail: 'Payment of $25.00 received',
    time: '1 hour ago',
    icon: CheckCircle2,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'New customer registered',
    detail: 'Priya Sharma created an account',
    time: '3 hours ago',
    icon: Users,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'Invoice awaiting payment',
    detail: 'Invoice #INV-1024 is pending',
    time: '5 hours ago',
    icon: Clock3,
    color: 'bg-amber-50 text-amber-600',
  },
]

function StatusBadge({ status }: { status: string }) {
  const styles =
    status === 'Active'
      ? 'bg-emerald-50 text-emerald-700'
      : status === 'Pending'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-red-50 text-red-700'

  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles}`}>
      {status}
    </span>
  )
}

export default function AdminDashboardPage() {
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
            Administration
          </div>

          <nav className="space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-[#2b5bea]"
            >
              <LayoutDashboard size={18} />
              Overview
            </Link>

            <Link
              href="/products"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#0a1a3f]"
            >
              <Package size={18} />
              Product catalogue
            </Link>

            <Link
              href="/customer/dashboard"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#0a1a3f]"
            >
              <Users size={18} />
              Customer portal
            </Link>
          </nav>

          <div className="mt-auto">
            <div className="mb-5 rounded-2xl bg-[#0a1a3f] p-4 text-white">
              <ShieldCheck size={21} className="mb-3 text-sky-300" />
              <p className="text-sm font-semibold">Admin workspace</p>
              <p className="mt-1 text-xs leading-5 text-blue-100/70">
                Monitor your products, customers and subscription business.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#e1e6f0] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1a3f] text-xs font-bold text-white">
                AD
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">Administrator</p>
                <p className="text-[10px] text-slate-400">Admin account</p>
              </div>
              <Settings size={16} className="ml-auto text-slate-400" />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">

          {/* Top navigation */}
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e1e6f0] bg-white/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
            <div>
              <p className="text-xs text-slate-400">Brightloop / Administration</p>
              <p className="text-sm font-semibold">Overview</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 sm:inline-flex">
                Demo data
              </span>
              <button
                aria-label="Notifications"
                className="relative rounded-xl border border-[#e1e6f0] p-2.5 text-slate-500 hover:bg-slate-50"
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500" />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1a3f] text-xs font-bold text-white">
                AD
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

            {/* Heading */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  <Sparkles size={12} />
                  Business overview
                </div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Good morning, Admin.
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Here&apos;s what&apos;s happening with your business today.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#e1e6f0] bg-white px-4 py-2.5 text-xs font-medium text-slate-600">
                <CalendarDays size={15} className="text-slate-400" />
                October 2026
              </div>
            </div>

            {/* Statistics */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm shadow-slate-900/[0.02]"
                  >
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">
                        {stat.label}
                      </span>
                      <span className={`rounded-xl p-2.5 ${stat.color}`}>
                        <Icon size={19} />
                      </span>
                    </div>

                    <p className="text-3xl font-semibold tracking-tight">
                      {stat.value}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          stat.positive ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {stat.positive ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        {stat.change}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {stat.description}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Revenue and subscription distribution */}
            <div className="mb-8 grid gap-5 xl:grid-cols-[1.6fr_1fr]">

              {/* Revenue chart */}
              <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 sm:p-6">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-semibold">Revenue overview</h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Monthly revenue performance
                    </p>
                  </div>
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
                    +14.6%
                  </span>
                </div>

                <div className="mb-5 flex items-end gap-3">
                  <p className="text-3xl font-semibold tracking-tight">$8,420</p>
                  <p className="mb-1 text-xs text-slate-400">This month</p>
                </div>

                <div className="flex h-[190px] items-end justify-between gap-3 border-b border-l border-[#e1e6f0] px-3 pb-0 pt-4">
                  {revenue.map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div className="flex h-full w-full items-end justify-center">
                        <div
                          className="w-full max-w-[46px] rounded-t-lg bg-gradient-to-t from-[#2b5bea] to-[#70a5ff] transition-opacity hover:opacity-80"
                          style={{ height: `${item.value}%` }}
                          title={`${item.month}: ${item.value}%`}
                        />
                      </div>
                      <span className="pb-2 text-[10px] font-medium text-slate-400">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-slate-400">
                  Illustrative revenue trend — demo data
                </p>
              </section>

              {/* Subscription distribution */}
              <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold">
                    Subscription distribution
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Customers by subscription plan
                  </p>
                </div>

                <div className="space-y-5">
                  {[
                    { name: 'Starter', count: 74, percent: 40, color: 'bg-blue-500' },
                    { name: 'Business', count: 83, percent: 45, color: 'bg-violet-500' },
                    { name: 'Company', count: 29, percent: 15, color: 'bg-sky-400' },
                  ].map((item) => (
                    <div key={item.name}>
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-semibold">{item.name}</span>
                        <span className="text-xs text-slate-500">
                          {item.count} customers
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <p className="mt-1 text-right text-[10px] text-slate-400">
                        {item.percent}%
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-xl bg-[#f7f9fc] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Package size={15} className="text-blue-600" />
                    186 active subscriptions
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    Across all Brightloop plans
                  </p>
                </div>
              </section>
            </div>

            {/* Customers and activity */}
            <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">

              {/* Recent customers */}
              <section className="min-w-0 overflow-hidden rounded-2xl border border-[#e1e6f0] bg-white">
                <div className="flex items-center justify-between border-b border-[#e1e6f0] p-5 sm:px-6">
                  <div>
                    <h2 className="text-base font-semibold">Recent customers</h2>
                    <p className="mt-1 text-xs text-slate-400">
                      Latest customer registrations
                    </p>
                  </div>
                  <Link
                    href="/customer/dashboard"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2b5bea] hover:underline"
                  >
                    Customer portal <ArrowRight size={13} />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] text-left">
                    <thead>
                      <tr className="border-b border-[#e1e6f0] bg-[#f9fafc] text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        <th className="px-5 py-3 sm:px-6">Customer</th>
                        <th className="px-4 py-3">Plan</th>
                        <th className="px-4 py-3">Joined</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCustomers.map((customer) => (
                        <tr
                          key={customer.email}
                          className="border-b border-[#e1e6f0] last:border-0"
                        >
                          <td className="px-5 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${customer.color}`}>
                                {customer.initials}
                              </div>
                              <div>
                                <p className="text-xs font-semibold">
                                  {customer.name}
                                </p>
                                <p className="mt-0.5 text-[10px] text-slate-400">
                                  {customer.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-xs font-medium text-slate-600">
                            {customer.plan}
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-500">
                            {customer.date}
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status={customer.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-[#e1e6f0] p-4 text-center">
                  <p className="text-[10px] text-slate-400">
                    Showing 4 of 248 demo customers
                  </p>
                </div>
              </section>

              {/* Activity feed */}
              <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold">Recent activity</h2>
                  <p className="mt-1 text-xs text-slate-400">
                    Latest updates across your business
                  </p>
                </div>

                <div className="space-y-5">
                  {activities.map((activity, index) => {
                    const Icon = activity.icon

                    return (
                      <div key={activity.title} className="flex gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activity.color}`}>
                          <Icon size={17} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold">
                            {activity.title}
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">
                            {activity.detail}
                          </p>
                          <p className="mt-1.5 text-[10px] text-slate-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 rounded-xl border border-[#e1e6f0] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <Wallet size={15} className="text-blue-600" />
                    Payment overview
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Payments received
                    </span>
                    <span className="text-sm font-semibold">$7,950</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Outstanding
                    </span>
                    <span className="text-sm font-semibold text-amber-600">
                      $470
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer */}
            <footer className="mt-10 flex flex-col gap-2 border-t border-[#e1e6f0] pt-6 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Brightloop Software. All rights reserved.</p>
              <p>Administration workspace · Demo overview</p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
