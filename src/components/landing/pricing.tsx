import { Check, Plus } from 'lucide-react'
import { addons, products } from '@/lib/catalog'
import { Container } from './container'
import { CtaLink } from './cta-link'
import { MockWindow } from './mock-window'
import { SectionHeading } from './section-heading'

const points = [
  'Start with one product or the whole suite.',
  'Add users, locations and support only when you need them.',
  'Your price updates the moment your choices change.',
]

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-line bg-white py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Pricing"
              title="Pricing that follows your needs."
              description="There is no fixed price list. Your price is built from the products you choose, how many people use them, and any add-ons you want on top. Change your mind later and it adjusts with you."
            />

            <ul className="fade-up mt-8 space-y-3 text-[0.95rem]">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2} aria-hidden />
                  {point}
                </li>
              ))}
            </ul>

            <div className="fade-up mt-10 flex flex-wrap items-center gap-3">
              <CtaLink href="/signup" variant="solid" size="lg">
                Get started
              </CtaLink>
              <CtaLink href="/signup" variant="outline" size="lg">
                Talk to us about your setup
              </CtaLink>
            </div>
          </div>

          <div className="fade-up lg:col-span-7">
            <MockWindow address="brightloop.app/your-plan">
              <div className="space-y-7 bg-white p-6 sm:p-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">Example plan</p>
                  <p className="mt-1 text-xl font-semibold tracking-[-0.02em]">Built around a small shop</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Products</p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-3">
                    {products.map((product, index) => {
                      const selected = index < 2
                      return (
                        <li
                          key={product.slug}
                          className={
                            selected
                              ? 'flex items-center gap-2.5 rounded-xl border border-blue/40 bg-blue/5 px-3.5 py-3 text-sm font-medium'
                              : 'flex items-center gap-2.5 rounded-xl border border-line px-3.5 py-3 text-sm text-ink-soft'
                          }
                        >
                          <span
                            aria-hidden
                            className={
                              selected
                                ? 'flex size-4 shrink-0 items-center justify-center rounded-full bg-blue text-white'
                                : 'size-4 shrink-0 rounded-full border border-line-strong'
                            }
                          >
                            {selected && <Check className="size-2.5" strokeWidth={3} />}
                          </span>
                          {product.name.replace('Brightloop ', '')}
                        </li>
                      )
                    })}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium">Team size</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div aria-hidden className="relative h-1.5 flex-1 rounded-full bg-line">
                      <span className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-blue" />
                      <span className="absolute left-[40%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue bg-white shadow-sm" />
                    </div>
                    <span className="text-sm tabular-nums text-ink-soft">12 users</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Add-ons</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {addons.map((addon, index) => (
                      <li
                        key={addon.id}
                        className={
                          index === 0 || index === 1
                            ? 'inline-flex items-center gap-1.5 rounded-full border border-blue/40 bg-blue/5 px-3 py-1.5 text-sm font-medium'
                            : 'inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-ink-soft'
                        }
                      >
                        {index === 0 || index === 1 ? (
                          <Check className="size-3.5 text-blue" strokeWidth={2.5} aria-hidden />
                        ) : (
                          <Plus className="size-3.5" strokeWidth={2} aria-hidden />
                        )}
                        {addon.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-4 rounded-xl bg-canvas px-4 py-3.5 text-sm">
                  <span className="text-ink-soft">Your price</span>
                  <span className="font-medium">Calculated from your choices</span>
                </div>
              </div>
            </MockWindow>
            <p className="mt-4 text-center text-xs text-ink-soft">An example of how a plan comes together.</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
