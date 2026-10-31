
'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  CreditCard,
  Info,
  Lock,
  Save,
  Trash2,
} from 'lucide-react'

import { SiteHeader } from '@/components/landing/site-header'
import { SiteFooter } from '@/components/landing/site-footer'

import {
  addons,
  formatPrice,
  plans,
  products,
  yearlyTotal,
  type Plan,
} from '@/lib/catalog'

const DRAFT_KEY = 'brightloop_checkout_draft'

type CheckoutDraft = {
  productSlug: string
  productName: string
  planId: string
  planName: string
  billingCycle: 'monthly' | 'yearly'
  addonIds: string[]
  variantPreference: string
  monthlySubtotal: number
  total: number
  savings: number
  savedAt: string
}

function SubscriptionContent() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('product')

  const product = products.find((item) => item.slug === productSlug)

  const availablePlans = useMemo(
    () => plans.filter((plan) => product && plan.productSlugs.includes(product.slug)),
    [product]
  )

  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [variantPreference, setVariantPreference] = useState('')
  const [savedDraft, setSavedDraft] = useState<CheckoutDraft | null>(null)
  const [saveMessage, setSaveMessage] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    if (availablePlans.length > 0) {
      setSelectedPlanId((current) =>
        availablePlans.some((plan) => plan.id === current)
          ? current
          : availablePlans[0].id
      )
    }
  }, [availablePlans])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFT_KEY)
      if (!stored) return

      const draft = JSON.parse(stored) as CheckoutDraft
      setSavedDraft(draft)

      if (draft.productSlug === productSlug) {
        if (availablePlans.some((plan) => plan.id === draft.planId)) {
          setSelectedPlanId(draft.planId)
        }

        setBillingCycle(draft.billingCycle)
        setSelectedAddons(draft.addonIds.filter((id) =>
          addons.some((addon) => addon.id === id)
        ))
        setVariantPreference(draft.variantPreference || '')
      }
    } catch {
      localStorage.removeItem(DRAFT_KEY)
    }
  }, [productSlug, availablePlans])

  const selectedPlan: Plan | undefined = availablePlans.find(
    (plan) => plan.id === selectedPlanId
  )

  const addonsAllowed =
    selectedPlan?.id === 'business' || selectedPlan?.id === 'company'

  useEffect(() => {
    if (!addonsAllowed) {
      setSelectedAddons([])
    }
  }, [addonsAllowed])

  const chosenAddons = addons.filter((addon) =>
    selectedAddons.includes(addon.id)
  )

  const addonMonthlyTotal = chosenAddons.reduce(
    (total, addon) => total + addon.monthly,
    0
  )

  const monthlySubtotal = (selectedPlan?.monthly || 0) + addonMonthlyTotal

  const total =
    billingCycle === 'yearly'
      ? yearlyTotal(monthlySubtotal)
      : monthlySubtotal

  const savings =
    billingCycle === 'yearly'
      ? monthlySubtotal * 12 - total
      : 0

  function resetConfirmation() {
    setConfirmed(false)
    setSaveMessage('')
  }

  function toggleAddon(id: string) {
    if (!addonsAllowed) return

    setSelectedAddons((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )

    resetConfirmation()
  }

  function saveCheckoutDraft() {
    if (!product || !selectedPlan) {
      setSaveMessage('Please select a valid product and plan.')
      return
    }

    const draft: CheckoutDraft = {
      productSlug: product.slug,
      productName: product.name,
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      billingCycle,
      addonIds: selectedAddons,
      variantPreference: variantPreference.trim(),
      monthlySubtotal,
      total,
      savings,
      savedAt: new Date().toISOString(),
    }

    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
      setSavedDraft(draft)
      setConfirmed(true)
      setSaveMessage('Your checkout configuration has been saved in this browser.')
    } catch {
      setSaveMessage('Unable to save your draft. Please check your browser storage settings.')
      setConfirmed(false)
    }
  }

  function clearCheckoutDraft() {
    try {
      localStorage.removeItem(DRAFT_KEY)
      setSavedDraft(null)
      setConfirmed(false)
      setSaveMessage('Saved checkout draft cleared.')
    } catch {
      setSaveMessage('Unable to clear the saved draft.')
    }
  }

  if (!product) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-[70vh] items-center justify-center bg-[#F3F6FA] px-6">
          <div className="animate-fade-up max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-[#142B50]">
              Product not found
            </h1>
            <p className="mt-3 text-gray-600">
              Please select a product from the Brightloop catalogue.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#142B50] px-5 py-3 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#203d69]"
            >
              <ArrowLeft size={17} />
              Browse products
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  if (!selectedPlan) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-[70vh] items-center justify-center bg-[#F3F6FA]">
          <p className="animate-pulse text-gray-600">
            Loading subscription options...
          </p>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen overflow-hidden bg-[#F3F6FA]">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">

          <div className="subscribe-enter mb-10">
            <Link
              href="/products"
              className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-[#315B91]"
            >
              <ArrowLeft size={16} />
              Back to products
            </Link>

            <p className="text-sm font-semibold uppercase tracking-wider text-[#315B91]">
              Subscription checkout
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#142B50] md:text-4xl">
              Configure your subscription
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600">
              Choose your plan, select additional services and customise your
              Brightloop subscription.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-3">

            <div className="space-y-7 lg:col-span-2">

              <section className="subscribe-section rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-bold text-[#142B50]">
                  Selected product
                </h2>

                <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-[#F3F6FA] p-5 transition-all duration-300 hover:bg-blue-50">
                  <div>
                    <h3 className="font-semibold text-[#142B50]">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {product.summary}
                    </p>
                  </div>
                  <Check className="size-6 shrink-0 text-green-600" />
                </div>
              </section>

              <section className="subscribe-section rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-bold text-[#142B50]">
                  Choose your plan
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {availablePlans.map((plan) => {
                    const selected = selectedPlanId === plan.id

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlanId(plan.id)
                          resetConfirmation()
                        }}
                        className={`relative rounded-xl border-2 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                          selected
                            ? 'border-[#315B91] bg-blue-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-[#9BB4D4]'
                        }`}
                      >
                        {plan.featured && (
                          <span className="absolute -top-3 right-4 rounded-full bg-[#315B91] px-3 py-1 text-xs font-semibold text-white">
                            Popular
                          </span>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#142B50]">
                            {plan.name}
                          </span>

                          <span
                            className={`flex size-6 items-center justify-center rounded-full border transition-all duration-300 ${
                              selected
                                ? 'scale-100 border-[#315B91] bg-[#315B91] text-white'
                                : 'scale-90 border-gray-300 text-transparent'
                            }`}
                          >
                            <Check size={15} />
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          {plan.tagline}
                        </p>

                        <p className="mt-4 text-2xl font-bold text-[#142B50]">
                          {formatPrice(plan.monthly)}
                          <span className="text-sm font-normal text-gray-500">
                            {' '}/ month
                          </span>
                        </p>

                        <ul className="mt-4 space-y-2">
                          {plan.includes.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm text-gray-600"
                            >
                              <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </button>
                    )
                  })}
                </div>
              </section>

              <section className="subscribe-section rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-bold text-[#142B50]">
                  Billing cycle
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {(['monthly', 'yearly'] as const).map((cycle) => {
                    const selected = billingCycle === cycle

                    return (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => {
                          setBillingCycle(cycle)
                          resetConfirmation()
                        }}
                        className={`rounded-xl border-2 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                          selected
                            ? 'border-[#315B91] bg-blue-50'
                            : 'border-gray-200 hover:border-[#9BB4D4]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-bold capitalize text-[#142B50]">
                            {cycle}
                          </p>

                          {cycle === 'yearly' && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              Save 20%
                            </span>
                          )}

                          {selected && (
                            <Check className="size-5 text-[#315B91]" />
                          )}
                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          {cycle === 'yearly'
                            ? 'Pay once a year and save.'
                            : 'Pay every month.'}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </section>

              {product.variants && (
                <section className="subscribe-section rounded-2xl border border-gray-200 bg-white p-6">
                  <h2 className="text-lg font-bold text-[#142B50]">
                    Product configuration
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    {product.variants}
                  </p>

                  <label
                    htmlFor="variant"
                    className="mt-5 block text-sm font-medium text-gray-700"
                  >
                    Your preferred variant or configuration
                  </label>

                  <input
                    id="variant"
                    type="text"
                    value={variantPreference}
                    onChange={(event) => {
                      setVariantPreference(event.target.value)
                      resetConfirmation()
                    }}
                    placeholder="Enter your preference"
                    maxLength={200}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:border-[#315B91] focus:ring-2 focus:ring-blue-100"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Variant options and additional prices will be configured later.
                  </p>
                </section>
              )}

              <section className="subscribe-section rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-[#142B50]">
                    Optional add-ons
                  </h2>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#315B91]">
                    {addons.length} available
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  Enhance your subscription with additional services.
                </p>

                {!addonsAllowed && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                    <Lock size={17} className="shrink-0" />
                    Upgrade to Business or Company to enable these add-ons.
                  </div>
                )}

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {addons.map((addon) => {
                    const checked = selectedAddons.includes(addon.id)

                    return (
                      <label
                        key={addon.id}
                        className={`flex items-start gap-3 rounded-xl border p-4 transition-all duration-300 ${
                          checked
                            ? 'border-[#315B91] bg-blue-50 shadow-sm'
                            : addonsAllowed
                              ? 'cursor-pointer border-gray-200 hover:-translate-y-1 hover:border-[#9BB4D4] hover:shadow-md'
                              : 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-70'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={!addonsAllowed}
                          onChange={() => toggleAddon(addon.id)}
                          className="mt-1 size-4 accent-[#315B91]"
                        />

                        <span className="flex-1">
                          <span className="block font-semibold text-[#142B50]">
                            {addon.name}
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            {addon.note}
                          </span>
                          <span className="mt-2 block text-sm font-semibold text-[#315B91]">
                            +{formatPrice(addon.monthly)} / month
                          </span>
                        </span>

                        {checked && (
                          <Check className="size-5 shrink-0 text-[#315B91]" />
                        )}
                      </label>
                    )
                  })}
                </div>
              </section>
            </div>

            <aside className="subscribe-summary h-fit rounded-2xl border border-gray-200 bg-white p-6 lg:sticky lg:top-6">
              <h2 className="text-xl font-bold text-[#142B50]">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-3">
                  <span className="text-sm text-gray-600">
                    {selectedPlan.name} plan
                  </span>
                  <span className="font-medium text-[#142B50]">
                    {formatPrice(selectedPlan.monthly)}
                  </span>
                </div>

                {chosenAddons.map((addon) => (
                  <div
                    key={addon.id}
                    className="flex justify-between gap-3 animate-fade-up"
                  >
                    <span className="text-sm text-gray-600">
                      {addon.name}
                    </span>
                    <span className="font-medium text-[#142B50]">
                      {formatPrice(addon.monthly)}
                    </span>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Monthly subtotal
                    </span>
                    <span className="font-semibold text-[#142B50]">
                      {formatPrice(monthlySubtotal)}
                    </span>
                  </div>

                  {billingCycle === 'yearly' && (
                    <>
                      <div className="mt-3 flex justify-between text-sm animate-fade-up">
                        <span className="text-green-700">
                          Yearly discount
                        </span>
                        <span className="font-medium text-green-700">
                          -{formatPrice(savings)}
                        </span>
                      </div>

                      <div className="mt-3 flex justify-between text-sm">
                        <span className="text-gray-600">
                          Billing period
                        </span>
                        <span className="text-gray-700">12 months</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-5">
                  <p className="text-sm text-gray-600">
                    {billingCycle === 'yearly' ? 'Yearly total' : 'Monthly total'}
                  </p>

                  <p
                    key={`${total}-${billingCycle}`}
                    className="mt-1 animate-price text-3xl font-bold text-[#142B50]"
                  >
                    {formatPrice(total)}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {billingCycle === 'yearly'
                      ? 'Billed once every year'
                      : 'Billed every month'}
                  </p>
                </div>

                <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                  <div className="flex gap-2">
                    <Info className="size-5 shrink-0" />
                    <p>
                      Tax is not included. Tax rates will be configured later.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={saveCheckoutDraft}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#142B50] px-5 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#203d69] hover:shadow-lg active:translate-y-0"
                >
                  <Save size={18} />
                  Save checkout draft
                </button>

                {saveMessage && (
                  <div
                    role="status"
                    className={`animate-fade-up rounded-lg border p-4 ${
                      confirmed
                        ? 'border-green-200 bg-green-50'
                        : 'border-amber-200 bg-amber-50'
                    }`}
                  >
                    <p className={`font-semibold ${
                      confirmed ? 'text-green-800' : 'text-amber-800'
                    }`}>
                      {confirmed ? 'Draft saved!' : 'Notice'}
                    </p>
                    <p className={`mt-1 text-sm ${
                      confirmed ? 'text-green-700' : 'text-amber-700'
                    }`}>
                      {saveMessage}
                    </p>
                    {confirmed && (
                      <p className="mt-2 text-xs text-green-700">
                        This is a local browser draft, not a database subscription or payment.
                      </p>
                    )}
                  </div>
                )}

                {savedDraft && (
                  <button
                    type="button"
                    onClick={clearCheckoutDraft}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Clear saved draft
                  </button>
                )}

                <p className="text-center text-xs text-gray-500">
                  Prices are currently placeholders.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />

      <style jsx global>{`
        .subscribe-enter {
          animation: subscribeFadeUp 0.65s ease-out both;
        }

        .subscribe-section {
          animation: subscribeFadeUp 0.65s ease-out both;
        }

        .subscribe-section:nth-child(1) {
          animation-delay: 0.08s;
        }

        .subscribe-section:nth-child(2) {
          animation-delay: 0.14s;
        }

        .subscribe-section:nth-child(3) {
          animation-delay: 0.2s;
        }

        .subscribe-section:nth-child(4) {
          animation-delay: 0.26s;
        }

        .subscribe-section:nth-child(5) {
          animation-delay: 0.32s;
        }

        .subscribe-summary {
          animation: subscribeFadeUp 0.7s ease-out 0.18s both;
        }

        .animate-fade-up {
          animation: subscribeFadeUp 0.35s ease-out both;
        }

        .animate-price {
          animation: priceChange 0.3s ease-out both;
        }

        @keyframes subscribeFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes priceChange {
          from {
            opacity: 0.35;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .subscribe-enter,
          .subscribe-section,
          .subscribe-summary,
          .animate-fade-up,
          .animate-price {
            animation: none !important;
          }

          .subscribe-section *,
          .subscribe-summary *,
          .subscribe-enter * {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  )
}

export default function SubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#F3F6FA] text-gray-600">
          Loading checkout...
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  )
}
