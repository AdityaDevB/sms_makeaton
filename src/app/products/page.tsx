import { ArrowRight, BookOpen, Check, Plus, Store, Users, type LucideIcon } from 'lucide-react'
import { SiteHeader } from '@/components/landing/site-header'
import { SiteFooter } from '@/components/landing/site-footer'
import { ClosingCta } from '@/components/landing/closing-cta'
import { Container } from '@/components/landing/container'
import { CtaLink } from '@/components/landing/cta-link'
import {
  YEARLY_DISCOUNT_PERCENT,
  addons,
  formatPrice,
  plans,
  pricePerMonth,
  products,
} from '@/lib/catalog'

export const metadata = { title: 'Products — Brightloop Software' }

const icons: Record<string, LucideIcon> = {
  books: BookOpen,
  counter: Store,
  teams: Users,
}

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Title band */}
        <section className="on-dark navy-bg text-white">
          <Container className="py-16 md:py-24">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-sky">Product catalogue</p>
            <h1 className="display-1 mt-4 max-w-3xl">Pick the products your business runs on.</h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70">
              Every product is a subscription. Choose monthly or yearly billing, and save {YEARLY_DISCOUNT_PERCENT}% when you
              pay yearly.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {products.map((product) => {
                const Icon = icons[product.slug]
                return (
                  <a
                    key={product.slug}
                    href={`#${product.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm hover:border-white hover:bg-white/10"
                  >
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                    {product.name.replace('Brightloop ', '')}
                  </a>
                )
              })}
              <a
                href="#addons"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm hover:border-white hover:bg-white/10"
              >
                <Plus className="size-4" strokeWidth={1.75} aria-hidden />
                Add-ons
              </a>
            </div>
          </Container>
        </section>

        {/* One row per product */}
        <section className="py-16 md:py-24">
          <Container className="space-y-8">
            {products.map((product) => {
              const Icon = icons[product.slug]
              const includedIn = plans.filter((plan) => plan.productSlugs.includes(product.slug))
              return (
                <article
                  key={product.slug}
                  id={product.slug}
                  className="scroll-mt-24 grid overflow-hidden rounded-3xl border border-line bg-white lg:grid-cols-12"
                >
                  <div className="p-7 sm:p-10 lg:col-span-7">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-white">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <h2 className="display-2 mt-6">{product.name}</h2>
                    <p className="mt-3 max-w-xl text-lg text-ink-soft">{product.summary}</p>

                    <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex gap-3 text-[0.95rem]">
                          <Check className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2} aria-hidden />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {product.variants && (
                      <p className="mt-8 rounded-lg bg-canvas px-4 py-3 text-sm text-ink-soft">
                        <span className="mr-1.5 font-semibold text-ink">Variants.</span>
                        {product.variants}
                      </p>
                    )}
                  </div>

                  <aside className="border-t border-line bg-canvas p-7 sm:p-10 lg:col-span-5 lg:border-l lg:border-t-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Included in</p>
                    <ul className="mt-4 space-y-3">
                      {includedIn.map((plan) => (
                        <li
                          key={plan.id}
                          className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-4 py-3"
                        >
                          <div>
                            <p className="font-semibold">{plan.name}</p>
                            <p className="text-xs text-ink-soft">
                              {formatPrice(pricePerMonth(plan.monthly, 'yearly'))} / month billed yearly
                            </p>
                          </div>
                          <p className="tabular-nums">
                            <span className="text-2xl font-semibold tracking-[-0.03em]">{formatPrice(plan.monthly)}</span>
                            <span className="text-sm text-ink-soft"> / mo</span>
                          </p>
                        </li>
                      ))}
                    </ul>
                    <CtaLink href={`/signup?product=${product.slug}`} size="lg" className="mt-6 w-full">
                      Subscribe
                      <ArrowRight className="size-4" aria-hidden />
                    </CtaLink>
                  </aside>
                </article>
              )
            })}
          </Container>
        </section>

        {/* Add-ons */}
        <section id="addons" className="scroll-mt-24 border-y border-line bg-white py-16 md:py-24">
          <Container>
            <h2 className="display-2">Add-ons you can switch on and off</h2>
            <p className="mt-3 max-w-2xl text-ink-soft">Available on the Business and Company plans.</p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {addons.map((addon) => (
                <li key={addon.id} className="rounded-2xl border border-line p-5">
                  <p className="font-semibold">{addon.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{addon.note}</p>
                  <p className="mt-5 tabular-nums">
                    <span className="text-2xl font-semibold tracking-[-0.03em]">+{formatPrice(addon.monthly)}</span>
                    <span className="text-sm text-ink-soft"> / month</span>
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* Comparison table */}
        <section className="py-16 md:py-24">
          <Container>
            <h2 className="display-2">Which plan includes what</h2>
            <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white">
              <table className="w-full min-w-[560px] text-left text-[0.95rem]">
                <thead>
                  <tr className="border-b border-line bg-canvas">
                    <th className="px-5 py-4 font-medium text-ink-soft">Product</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="px-5 py-4 font-semibold">
                        {plan.name}
                        <span className="block text-sm font-normal tabular-nums text-ink-soft">
                          {formatPrice(plan.monthly)} / month
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.slug} className="border-b border-line last:border-0">
                      <td className="px-5 py-4 font-medium">{product.name}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="px-5 py-4">
                          {plan.productSlugs.includes(product.slug) ? (
                            <Check className="size-5 text-blue" strokeWidth={2} aria-label="Included" />
                          ) : (
                            <span className="text-ink-soft" aria-label="Not included">–</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  )
}