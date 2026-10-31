
export type BillingCycle = 'monthly' | 'yearly'

export const YEARLY_DISCOUNT_PERCENT = 20
export const PRICES_ARE_PLACEHOLDERS = true
export const CURRENCY = 'INR'

export type Product = {
  slug: string
  name: string
  summary: string
  features: string[]
  variants?: string
}

export type Plan = {
  id: string
  name: string
  tagline: string
  monthly: number
  productSlugs: string[]
  includes: string[]
  featured?: boolean
}

export type Addon = {
  id: string
  name: string
  note: string
  monthly: number
}

export const products: Product[] = [
  {
    slug: 'books',
    name: 'Brightloop Books',
    summary: 'Bookkeeping and invoicing for small teams, so you always know what you are owed and what you owe.',
    features: [
      'Invoicing and expense tracking',
      'Bank reconciliation',
      'Tax-ready reports',
      'Multi-user access',
    ],
  },
  {
    slug: 'counter',
    name: 'Brightloop Counter',
    summary: 'Point of sale and stock control for shops, from the first sale of the day to the final count.',
    features: [
      'Fast checkout and receipts',
      'Live stock counts',
      'Daily sales summaries',
      'Works with supported terminals',
    ],
    variants: 'Choose your terminal brand. The price adjusts to match.',
  },
  {
    slug: 'teams',
    name: 'Brightloop Teams',
    summary: 'Staff records, leave and rotas for companies with a lot of people to look after.',
    features: [
      'Staff records in one place',
      'Leave and absence tracking',
      'Rotas and shift planning',
      'Permissions by role',
    ],
    variants: 'Choose your country pack for local leave rules.',
  },
]

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For a single shop or a small team.',
    monthly: 950,
    productSlugs: ['books'],
    includes: [
      'Brightloop Books',
      'Up to 3 users',
      'Invoices and payment history',
      'Email support',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For teams that need more than one product.',
    monthly: 2400,
    productSlugs: ['books', 'counter'],
    featured: true,
    includes: [
      'Brightloop Books and Counter',
      'Up to 15 users',
      'Product variants',
      'Add-ons available',
      'Priority email support',
    ],
  },
  {
    id: 'company',
    name: 'Company',
    tagline: 'For larger companies with many users.',
    monthly: 5700,
    productSlugs: ['books', 'counter', 'teams'],
    includes: [
      'Books, Counter and Teams',
      'Unlimited users',
      'Product variants',
      'Add-ons available',
      'A named contact and onboarding call',
    ],
  },
]

export const addons: Addon[] = [
  {
    id: 'users',
    name: 'Extra users',
    note: 'A pack of 10 more seats.',
    monthly: 475,
  },
  {
    id: 'export',
    name: 'Accountant export',
    note: 'A weekly file for your accountant.',
    monthly: 950,
  },
  {
    id: 'phone',
    name: 'Phone support',
    note: 'Weekdays, 8am to 6pm.',
    monthly: 1425,
  },
  {
    id: 'location',
    name: 'Extra location',
    note: 'One more shop or office.',
    monthly: 1900,
  },
]

export function yearlyTotal(monthly: number) {
  return Math.round(
    monthly * 12 * (1 - YEARLY_DISCOUNT_PERCENT / 100)
  )
}

export function pricePerMonth(monthly: number, cycle: BillingCycle) {
  return cycle === 'monthly'
    ? monthly
    : Math.round(yearlyTotal(monthly) / 12)
}

export function startingPlan(product: Product) {
  return plans
    .filter((plan) => plan.productSlugs.includes(product.slug))
    .reduce((cheapest, plan) =>
      plan.monthly < cheapest.monthly ? plan : cheapest
    )
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount)
}
