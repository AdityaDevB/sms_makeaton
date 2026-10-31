
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDownToLine,
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
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
  Clock3,
  AlertCircle,
} from 'lucide-react'

type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'

type Invoice = {
  id: string
  product: string
  date: string
  dueDate: string
  amount: number
  status: InvoiceStatus
}

type Payment = {
  id: string
  description: string
  date: string
  method: string
  amount: number
  status: 'Successful' | 'Processing' | 'Failed'
}

const invoices: Invoice[] = [
  {
    id: 'INV-2026-001',
    product: 'Brightloop Books',
    date: 'Oct 15, 2026',
    dueDate: 'Oct 22, 2026',
    amount: 10,
    status: 'Paid',
  },
  {
    id: 'INV-2026-002',
    product: 'Brightloop Counter',
    date: 'Oct 15, 2026',
    dueDate: 'Oct 22, 2026',
    amount: 25,
    status: 'Paid',
  },
  {
    id: 'INV-2026-003',
    product: 'Brightloop Books',
    date: 'Sep 15, 2026',
    dueDate: 'Sep 22, 2026',
    amount: 10,
    status: 'Paid',
  },
  {
    id: 'INV-2026-004',
    product: 'Brightloop Counter',
    date: 'Nov 15, 2026',
    dueDate: 'Nov 22, 2026',
    amount: 25,
    status: 'Pending',
  },
  {
    id: 'INV-2026-005',
    product: 'Brightloop Teams',
    date: 'Sep 10, 2026',
    dueDate: 'Sep 17, 2026',
    amount: 60,
    status: 'Overdue',
  },
]

const payments: Payment[] = [
  {
    id: 'PAY-1024',
    description: 'Brightloop Books subscription',
    date: 'Oct 15, 2026',
    method: 'Visa ending in 4242',
    amount: 10,
    status: 'Successful',
  },
  {
    id: 'PAY-1023',
    description: 'Brightloop Counter subscription',
    date: 'Oct 15, 2026',
    method: 'Visa ending in 4242',
    amount: 25,
    status: 'Successful',
  },
  {
    id: 'PAY-1022',
    description: 'Brightloop Books subscription',
    date: 'Sep 15, 2026',
    method: 'UPI',
    amount: 10,
    status: 'Successful',
  },
]

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles = {
    Paid: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Overdue: 'bg-red-50 text-red-700',
  }

  const Icon = status === 'Paid'
    ? CheckCircle2
    : status === 'Pending'
      ? Clock3
      : AlertCircle

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[status]}`}>
      <Icon size={12} />
      {status}
    </span>
  )
}

function downloadInvoice(invoice: Invoice) {
  const content = [
    'BRIGHTLOOP SOFTWARE',
    'INVOICE',
    '',
    `Invoice number: ${invoice.id}`,
    `Invoice date: ${invoice.date}`,
    `Due date: ${invoice.dueDate}`,
    `Product: ${invoice.product}`,
    `Amount: $${invoice.amount.toFixed(2)}`,
    `Status: ${invoice.status}`,
    '',
    'Thank you for choosing Brightloop.',
    'This is a demonstration invoice.',
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `${invoice.id}.txt`
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  URL.revokeObjectURL(url)
}

export default function CustomerBillingPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [notice, setNotice] = useState('')

  const totalPaid = invoices
    .filter((invoice) => invoice.status === 'Paid')
    .reduce((total, invoice) => total + invoice.amount, 0)

  const outstanding = invoices
    .filter((invoice) => invoice.status === 'Pending' || invoice.status === 'Overdue')
    .reduce((total, invoice) => total + invoice.amount, 0)

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesFilter =
        activeFilter === 'All' || invoice.status === activeFilter

      const query = searchQuery.toLowerCase()
      const matchesSearch =
        invoice.id.toLowerCase().includes(query) ||
        invoice.product.toLowerCase().includes(query)

      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchQuery])

  function showNotice(message: string) {
    setNotice(message)
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

            <Link href="/customer/subscriptions" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-[#0a1a3f]">
              <Package size={18} />
              Subscriptions
            </Link>

            <Link href="/customer/billing" className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-[#2b5bea]">
              <CreditCard size={18} />
              Billing & invoices
            </Link>
          </nav>

          <div className="mt-auto">
            <div className="mb-5 rounded-2xl bg-[#0a1a3f] p-4 text-white">
              <ShieldCheck size={21} className="mb-3 text-sky-300" />
              <p className="text-sm font-semibold">Secure billing</p>
              <p className="mt-1 text-xs leading-5 text-blue-100/70">
                Keep track of your invoices and subscription payments.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[#e1e6f0] p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1a3f] text-xs font-bold text-white">
                AC
              </div>
              <div>
                <p className="text-xs font-semibold">Alex Customer</p>
                <p className="text-[10px] text-slate-400">Customer account</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">

          {/* Header */}
          <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-[#e1e6f0] bg-white/90 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
            <div>
              <p className="text-xs text-slate-400">Customer portal / Billing</p>
              <p className="text-sm font-semibold">Billing & invoices</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 sm:inline-flex">
                Demo mode
              </span>
              <button aria-label="Notifications" className="relative rounded-xl border border-[#e1e6f0] p-2.5 text-slate-500 hover:bg-slate-50">
                <Bell size={18} />
              </button>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1a3f] text-xs font-bold text-white">
                AC
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

            {/* Page heading */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
                <Link href="/customer/dashboard" className="hover:text-blue-600">Dashboard</Link>
                <ChevronRight size={13} />
                <span className="text-slate-600">Billing</span>
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Billing & invoices
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                View your payment history, track outstanding invoices and download billing records.
              </p>
            </div>

            {notice && (
              <div role="status" className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                <CheckCircle2 size={18} />
                {notice}
                <button onClick={() => setNotice('')} className="ml-auto" aria-label="Dismiss notification">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Billing summary */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Total paid</span>
                  <span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                    <CheckCircle2 size={19} />
                  </span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">${totalPaid.toFixed(2)}</p>
                <p className="mt-2 text-xs text-slate-400">Across paid invoices</p>
              </div>

              <div className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Outstanding balance</span>
                  <span className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                    <Wallet size={19} />
                  </span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">${outstanding.toFixed(2)}</p>
                <p className="mt-2 text-xs text-slate-400">Pending and overdue invoices</p>
              </div>

              <div className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Total invoices</span>
                  <span className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                    <FileText size={19} />
                  </span>
                </div>
                <p className="text-3xl font-semibold tracking-tight">{invoices.length}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {invoices.filter((invoice) => invoice.status === 'Paid').length} paid · {invoices.filter((invoice) => invoice.status !== 'Paid').length} awaiting payment
                </p>
              </div>
            </div>

            {/* Invoice table */}
            <section className="mb-8 overflow-hidden rounded-2xl border border-[#e1e6f0] bg-white shadow-sm">
              <div className="flex flex-col gap-4 border-b border-[#e1e6f0] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <h2 className="text-base font-semibold">Invoice history</h2>
                  <p className="mt-1 text-xs text-slate-400">Your billing documents and payment status</p>
                </div>

                <div className="relative w-full sm:max-w-[240px]">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search invoices..."
                    className="w-full rounded-xl border border-[#e1e6f0] bg-[#f9fafc] py-2.5 pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 border-b border-[#e1e6f0] px-5 py-3 sm:px-6">
                {['All', 'Paid', 'Pending', 'Overdue'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      activeFilter === filter
                        ? 'bg-[#0a1a3f] text-white'
                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="border-b border-[#e1e6f0] bg-[#f9fafc] text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      <th className="px-6 py-4">Invoice</th>
                      <th className="px-4 py-4">Product</th>
                      <th className="px-4 py-4">Date</th>
                      <th className="px-4 py-4">Due date</th>
                      <th className="px-4 py-4">Amount</th>
                      <th className="px-4 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-[#e1e6f0] last:border-0 transition hover:bg-slate-50/70">
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold">{invoice.id}</span>
                        </td>
                        <td className="px-4 py-4 text-xs text-slate-600">{invoice.product}</td>
                        <td className="px-4 py-4 text-xs text-slate-500">{invoice.date}</td>
                        <td className="px-4 py-4 text-xs text-slate-500">{invoice.dueDate}</td>
                        <td className="px-4 py-4 text-xs font-semibold">${invoice.amount.toFixed(2)}</td>
                        <td className="px-4 py-4"><StatusBadge status={invoice.status} /></td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              downloadInvoice(invoice)
                              showNotice(`Demo invoice ${invoice.id} downloaded as a text file.`)
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#e1e6f0] px-3 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <ArrowDownToLine size={13} />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredInvoices.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <FileText size={25} className="mx-auto mb-3 text-slate-300" />
                          <p className="text-sm font-semibold text-slate-600">No invoices found</p>
                          <p className="mt-1 text-xs text-slate-400">Try a different search or filter.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-[#e1e6f0] px-6 py-4">
                <p className="text-[10px] text-slate-400">
                  Showing {filteredInvoices.length} of {invoices.length} invoices · Demo records
                </p>
              </div>
            </section>

            {/* Payment history */}
            <section className="overflow-hidden rounded-2xl border border-[#e1e6f0] bg-white shadow-sm">
              <div className="border-b border-[#e1e6f0] p-5 sm:px-6">
                <h2 className="text-base font-semibold">Recent payments</h2>
                <p className="mt-1 text-xs text-slate-400">A record of your latest transactions</p>
              </div>

              <div className="divide-y divide-[#e1e6f0]">
                {payments.map((payment) => (
                  <div key={payment.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{payment.description}</p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          {payment.id} · {payment.date} · {payment.method}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <span className="text-sm font-semibold">${payment.amount.toFixed(2)}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                        <CheckCircle2 size={12} />
                        {payment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Help panel */}
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-white p-2.5 text-[#2b5bea] shadow-sm">
                  <CircleHelp size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Questions about a payment?</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Contact our support team if you need help with an invoice or transaction.
                  </p>
                </div>
              </div>
              <a href="mailto:support@brightloop.com" className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#2b5bea] hover:underline">
                Contact support <ArrowUpRight size={14} />
              </a>
            </div>

            <footer className="mt-10 flex flex-col gap-2 border-t border-[#e1e6f0] pt-6 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Brightloop Software. All rights reserved.</p>
              <Link href="/" className="hover:text-slate-600">Back to website</Link>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
