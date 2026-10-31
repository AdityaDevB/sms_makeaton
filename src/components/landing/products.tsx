import { ArrowRight, BookOpen, Check, Store, Users, type LucideIcon } from 'lucide-react'
import { formatPrice, products, startingPlan } from '@/lib/catalog'
import { Container } from './container'
import { CtaLink } from './cta-link'
import { SectionHeading } from './section-heading'

const icons: Record<string, LucideIcon> = {
  books: BookOpen,
  counter: Store,
  teams: Users,
}

export function Products() {
  return (
    <section id="products" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="Products"
          title="Three products, built to work together."
          description="Use one on its own or combine them. Every product runs on the same account and the same invoice."
        />

        <div className="mt-14 grid gap-5 md:mt-16 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = icons[product.slug]
            const plan = startingPlan(product)
            return (
              <article
                key={product.slug}
                className="fade-up group flex flex-col rounded-2xl border border-line bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_30px_50px_-34px_rgba(10,26,63,0.4)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-blue">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">{product.name}</h3>
                <p className="mt-3 text-ink-soft">{product.summary}</p>

                <ul className="mt-6 space-y-2.5 text-[0.93rem]">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={2} aria-hidden />
                      {feature}
                    </li>
                  ))}
                </ul>

                {product.variants && (
                  <p className="mt-6 rounded-lg bg-canvas px-3.5 py-2.5 text-[0.85rem] text-ink-soft">
                    <span className="mr-1.5 font-semibold text-ink">Variants.</span>
                    {product.variants}
                  </p>
                )}

                <div className="mt-auto pt-8">
                  <div className="flex items-baseline justify-between gap-3 border-t border-line pt-5">
                    <p className="text-sm text-ink-soft">Starting from</p>
                    <p className="tabular-nums">
                      <span className="text-3xl font-semibold tracking-[-0.03em]">{formatPrice(plan.monthly)}</span>
                      <span className="text-sm text-ink-soft"> / month</span>
                    </p>
                  </div>
                  <p className="mt-1 text-right text-xs text-ink-soft">On the {plan.name} plan</p>
                  <CtaLink href={`/signup?product=${product.slug}`} variant="outline" className="mt-5 w-full">
                    Subscribe
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </CtaLink>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
