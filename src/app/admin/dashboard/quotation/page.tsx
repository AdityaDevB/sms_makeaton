
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  FileText,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  CalendarDays,
  Sparkles,
} from 'lucide-react'

import {
  addons,
  formatPrice,
  plans,
  products,
  yearlyTotal,
  type BillingCycle,
} from '@/lib/catalog'

type DiscountType = 'percentage' | 'fixed'

export default function QuotationsPage() {
  const [customerName, setCustomerName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')

  const [selectedPlanId, setSelectedPlanId] = useState(plans[0]?.id ?? '')
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  const [selectedAddons, setSelectedAddons] = useState<
    Record<string, number>
  >({})

  const [discountType, setDiscountType] =
    useState<DiscountType>('percentage')
  const [discountValue, setDiscountValue] = useState(0)
  const [taxPercentage, setTaxPercentage] = useState(18)

  const [validityDays, setValidityDays] = useState(15)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  const [quotationNumber] = useState(
    () => `QT-${Date.now().toString().slice(-8)}`
  )

  const selectedPlan = plans.find(
    (plan) => plan.id === selectedPlanId
  )

  const selectedAddonItems = addons.filter(
    (addon) => (selectedAddons[addon.id] ?? 0) > 0
  )

  const planAmount = selectedPlan
    ? billingCycle === 'yearly'
      ? yearlyTotal(selectedPlan.monthly)
      : selectedPlan.monthly
    : 0

  const addonAmount = selectedAddonItems.reduce((total, addon) => {
    const quantity = selectedAddons[addon.id] ?? 0
    const price =
      billingCycle === 'yearly'
        ? yearlyTotal(addon.monthly)
        : addon.monthly

    return total + price * quantity
  }, 0)

  const subtotal = planAmount + addonAmount

  const discountAmount = useMemo(() => {
    if (discountType === 'percentage') {
      return Math.min(
        subtotal,
        subtotal * Math.max(0, Math.min(100, discountValue)) / 100
      )
    }

    return Math.min(subtotal, Math.max(0, discountValue))
  }, [subtotal, discountType, discountValue])

  const taxableAmount = Math.max(0, subtotal - discountAmount)

  const taxAmount =
    taxableAmount * Math.max(0, taxPercentage) / 100

  const total = taxableAmount + taxAmount

  const today = new Date()
  const expiryDate = new Date(today)
  expiryDate.setDate(today.getDate() + validityDays)

  const dateLabel = today.toLocaleDateString('en-IN')
  const expiryLabel = expiryDate.toLocaleDateString('en-IN')

  function updateAddon(addonId: string, quantity: number) {
    setSelectedAddons((previous) => ({
      ...previous,
      [addonId]: Math.max(0, quantity),
    }))
  }

  function handlePrint() {
    if (!customerName.trim() || !customerEmail.trim()) {
      setError('Please enter the customer name and email before printing.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!selectedPlan) {
      setError('Please select a subscription plan.')
      return
    }

    setError('')
    window.print()
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#0b1530]">
      <header className="border-b border-[#e1e6f0] bg-white px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/dashboard"
              className="rounded-xl border border-[#e1e6f0] p-2 text-slate-500 transition hover:bg-slate-50"
              aria-label="Back to dashboard"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <p className="text-xs text-slate-400">
                Brightloop / Administration
              </p>
              <h1 className="text-lg font-semibold">
                Create quotation
              </h1>
            </div>
          </div>

          <span className="hidden rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 sm:inline-flex">
            Indicative pricing
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] space-y-6 px-5 py-8 sm:px-8 lg:px-10">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#2b5bea]">
              <Sparkles size={16} />
              Sales workspace
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#0a1a3f]">
              Prepare a quotation
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Configure a subscription offer and generate a quotation for your customer.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2b5bea] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/15 transition hover:bg-[#1e45c2]"
          >
            <Printer size={17} />
            Print quotation
          </button>
        </section>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Pricing notice:</strong> The catalogue currently marks its prices as placeholders. Verify the final prices before sending this quotation to a customer.
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="grid items-start gap-6 xl:grid-cols-[1fr_0.85fr]">
          <div className="space-y-6">
            {/* Customer information */}
            <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText size={19} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a1a3f]">
                    Customer information
                  </h3>
                  <p className="text-xs text-slate-400">
                    Enter the recipient's details.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Customer name *"
                  value={customerName}
                  onChange={setCustomerName}
                  placeholder="Enter customer name"
                />

                <Field
                  label="Company name"
                  value={companyName}
                  onChange={setCompanyName}
                  placeholder="Company or organisation"
                />

                <Field
                  label="Email address *"
                  value={customerEmail}
                  onChange={setCustomerEmail}
                  placeholder="customer@example.com"
                  type="email"
                />

                <Field
                  label="Phone number"
                  value={customerPhone}
                  onChange={setCustomerPhone}
                  placeholder="Phone number"
                />

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Billing address
                  </label>
                  <textarea
                    value={customerAddress}
                    onChange={(event) =>
                      setCustomerAddress(event.target.value)
                    }
                    rows={3}
                    placeholder="Enter billing address"
                    className="w-full rounded-xl border border-[#e1e6f0] px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </section>

            {/* Plan selection */}
            <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h3 className="font-semibold text-[#0a1a3f]">
                  Subscription plan
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Select the plan to include in the quotation.
                </p>
              </div>

              <div className="grid gap-3">
                {plans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id

                  return (
                    <button
                      type="button"
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`rounded-xl border p-4 text-left transition ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50/60 ring-2 ring-blue-100'
                          : 'border-[#e1e6f0] hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#0a1a3f]">
                              {plan.name}
                            </span>
                            {plan.featured && (
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                                Popular
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-xs text-slate-500">
                            {plan.tagline}
                          </p>

                          <p className="mt-3 text-xs text-slate-500">
                            Includes:{' '}
                            {plan.productSlugs
                              .map(
                                (slug) =>
                                  products.find((product) => product.slug === slug)?.name
                              )
                              .filter(Boolean)
                              .join(', ')}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-[#0a1a3f]">
                            {formatPrice(plan.monthly)}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            per month
                          </p>
                          {isSelected && (
                            <CheckCircle2
                              size={18}
                              className="ml-auto mt-2 text-blue-600"
                            />
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold text-slate-600">
                  Billing interval
                </label>

                <div className="grid grid-cols-2 gap-3">
                  {(['monthly', 'yearly'] as BillingCycle[]).map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => setBillingCycle(cycle)}
                      className={`rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition ${
                        billingCycle === cycle
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-[#e1e6f0] text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {cycle}
                      {cycle === 'yearly' && (
                        <span className="ml-2 text-[10px] text-emerald-600">
                          20% discount
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Add-ons */}
            <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h3 className="font-semibold text-[#0a1a3f]">
                  Additional services
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Select optional add-ons and quantities.
                </p>
              </div>

              <div className="space-y-3">
                {addons.map((addon) => {
                  const quantity = selectedAddons[addon.id] ?? 0

                  return (
                    <div
                      key={addon.id}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-[#e1e6f0] p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#0a1a3f]">
                          {addon.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {addon.note}
                        </p>
                        <p className="mt-2 text-xs font-semibold text-slate-600">
                          {formatPrice(addon.monthly)} / month
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <label
                          htmlFor={`addon-${addon.id}`}
                          className="text-xs text-slate-500"
                        >
                          Quantity
                        </label>

                        <input
                          id={`addon-${addon.id}`}
                          type="number"
                          min="0"
                          max="100"
                          value={quantity}
                          onChange={(event) =>
                            updateAddon(
                              addon.id,
                              Math.min(100, Math.max(0, Number(event.target.value) || 0))
                            )
                          }
                          className="w-20 rounded-lg border border-[#e1e6f0] px-3 py-2 text-sm outline-none focus:border-blue-400"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Adjustments */}
            <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-5 font-semibold text-[#0a1a3f]">
                Discount and tax
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Discount type
                  </label>
                  <select
                    value={discountType}
                    onChange={(event) =>
                      setDiscountType(event.target.value as DiscountType)
                    }
                    className="w-full rounded-xl border border-[#e1e6f0] bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed amount (₹)</option>
                  </select>
                </div>

                <Field
                  label="Discount value"
                  type="number"
                  value={String(discountValue)}
                  onChange={(value) =>
                    setDiscountValue(Math.max(0, Number(value) || 0))
                  }
                  placeholder="0"
                />

                <Field
                  label="Tax rate (%)"
                  type="number"
                  value={String(taxPercentage)}
                  onChange={(value) =>
                    setTaxPercentage(Math.max(0, Math.min(100, Number(value) || 0)))
                  }
                />

                <div>
                  <label className="mb-2 block text-xs font-semibold text-slate-600">
                    Validity
                  </label>
                  <select
                    value={validityDays}
                    onChange={(event) =>
                      setValidityDays(Number(event.target.value))
                    }
                    className="w-full rounded-xl border border-[#e1e6f0] bg-white px-4 py-3 text-sm outline-none focus:border-blue-400"
                  >
                    <option value={7}>7 days</option>
                    <option value={15}>15 days</option>
                    <option value={30}>30 days</option>
                    <option value={45}>45 days</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Notes */}
            <section className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="mb-3 font-semibold text-[#0a1a3f]">
                Additional notes
              </h3>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Add terms, conditions or other information for the customer..."
                className="w-full rounded-xl border border-[#e1e6f0] px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </section>
          </div>

          {/* Quotation preview */}
          <aside className="space-y-5 xl:sticky xl:top-6">
            <section
              id="quotation-preview"
              className="rounded-2xl border border-[#e1e6f0] bg-white p-5 shadow-sm sm:p-7 print:rounded-none print:border-0 print:shadow-none"
            >
              <div className="flex items-start justify-between gap-3 border-b border-[#e1e6f0] pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a1a3f] text-white">
                      <Sparkles size={18} />
                    </div>
                    <span className="text-lg font-bold text-[#0a1a3f]">
                      brightloop
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Brightloop Software
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold tracking-tight text-[#0a1a3f]">
                    QUOTATION
                  </p>
                  <p className="mt-1 text-xs font-semibold text-blue-600">
                    {quotationNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#e1e6f0] py-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Prepared for
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#0a1a3f]">
                    {customerName || 'Customer name'}
                  </p>
                  {companyName && (
                    <p className="mt-1 text-xs text-slate-500">
                      {companyName}
                    </p>
                  )}
                  <p className="mt-1 break-all text-xs text-slate-500">
                    {customerEmail || 'Customer email'}
                  </p>
                  {customerPhone && (
                    <p className="mt-1 text-xs text-slate-500">
                      {customerPhone}
                    </p>
                  )}
                  {customerAddress && (
                    <p className="mt-2 whitespace-pre-line text-xs text-slate-500">
                      {customerAddress}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Quotation date
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#0a1a3f]">
                    {dateLabel}
                  </p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Valid until
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#0a1a3f]">
                    {expiryLabel}
                  </p>
                </div>
              </div>

              <div className="py-5">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Quotation details
                </h4>

                <div className="space-y-4">
                  {selectedPlan && (
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0a1a3f]">
                          {selectedPlan.name} plan
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {selectedPlan.productSlugs
                            .map(
                              (slug) =>
                                products.find((product) => product.slug === slug)?.name
                            )
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                        <p className="mt-1 text-[10px] capitalize text-slate-400">
                          {billingCycle} subscription
                        </p>
                      </div>
                      <p className="whitespace-nowrap text-sm font-semibold text-[#0a1a3f]">
                        {formatPrice(planAmount)}
                      </p>
                    </div>
                  )}

                  {selectedAddonItems.map((addon) => {
                    const quantity = selectedAddons[addon.id] ?? 0
                    const price =
                      billingCycle === 'yearly'
                        ? yearlyTotal(addon.monthly)
                        : addon.monthly

                    return (
                      <div
                        key={addon.id}
                        className="flex justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-[#0a1a3f]">
                            {addon.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {quantity} × {formatPrice(price)}
                          </p>
                        </div>
                        <p className="whitespace-nowrap text-sm font-semibold">
                          {formatPrice(quantity * price)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-3 border-t border-[#e1e6f0] pt-5 text-sm">
                <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />

                <SummaryRow
                  label="Discount"
                  value={`− ${formatPrice(discountAmount)}`}
                  color="text-emerald-600"
                />

                <SummaryRow
                  label={`Tax (${taxPercentage}%)`}
                  value={formatPrice(taxAmount)}
                />

                <div className="flex items-end justify-between border-t border-[#e1e6f0] pt-4">
                  <div>
                    <p className="text-sm font-bold text-[#0a1a3f]">
                      Total payable
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {billingCycle === 'monthly'
                        ? 'Per month'
                        : 'For one year'}
                    </p>
                  </div>
                  <p className="text-2xl font-bold tracking-tight text-[#2b5bea]">
                    {formatPrice(total)}
                  </p>
                </div>
              </div>

              {notes && (
                <div className="mt-5 border-t border-[#e1e6f0] pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Notes and terms
                  </p>
                  <p className="mt-2 whitespace-pre-line text-xs leading-5 text-slate-600">
                    {notes}
                  </p>
                </div>
              )}

              <div className="mt-6 border-t border-[#e1e6f0] pt-4 text-center">
                <p className="text-[10px] text-slate-400">
                  Thank you for considering Brightloop Software.
                </p>
                <p className="mt-1 text-[10px] text-slate-400">
                  This quotation is subject to final confirmation.
                </p>
              </div>
            </section>

            <button
              onClick={handlePrint}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a1a3f] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#142d60]"
            >
              <Printer size={17} />
              Print / Save as PDF
            </button>

            <p className="text-center text-xs text-slate-400">
              Printing opens your browser's print dialog. Choose "Save as PDF" to export the quotation.
            </p>
          </aside>
        </div>
      </main>

      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          #quotation-preview,
          #quotation-preview * {
            visibility: visible;
          }

          #quotation-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 24px !important;
          }

          @page {
            size: A4;
            margin: 12mm;
          }
        }
      `}</style>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={type === 'number' ? 0 : undefined}
        className="w-full rounded-xl border border-[#e1e6f0] px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  )
}

function SummaryRow({
  label,
  value,
  color = 'text-slate-600',
}: {
  label: string
  value: string
  color?: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  )
}
