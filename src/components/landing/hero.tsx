import { ArrowRight, Check } from 'lucide-react'
import { Container } from './container'
import { CtaLink } from './cta-link'
import { DashboardMock } from './dashboard-mock'

const points = ['Monthly or yearly billing', 'Add-ons and variants', 'Self-service portal']

export function Hero() {
  return (
    <section className="hero-bg relative overflow-hidden border-b border-line">
      <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-16 pb-24 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="lg:col-span-6 lg:pr-4">
          <p
            className="rise mb-7 inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-3.5 py-1.5 text-[0.78rem] font-medium text-ink-soft"
            style={{ '--d': '0ms' } as React.CSSProperties}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-blue" />
            Books, Counter and Teams
          </p>
          <h1 className="rise display-1" style={{ '--d': '80ms' } as React.CSSProperties}>
            Business software on plans that <span className="text-blue">fit how you work.</span>
          </h1>
          <p
            className="rise mt-7 max-w-[34rem] text-lg leading-relaxed text-ink-soft"
            style={{ '--d': '170ms' } as React.CSSProperties}
          >
            Brightloop builds the tools businesses run on. Pick a product, choose monthly or yearly billing, and manage your
            subscriptions, invoices and payments from your own customer portal.
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '260ms' } as React.CSSProperties}>
            <CtaLink href="#products" size="lg">
              Explore Products
              <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
            </CtaLink>
            <CtaLink href="/signup" variant="outline" size="lg">
              Get Started
            </CtaLink>
          </div>
          <ul
            className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-ink-soft"
            style={{ '--d': '340ms' } as React.CSSProperties}
          >
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="size-4 text-blue" strokeWidth={2} aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="rise lg:col-span-6" style={{ '--d': '200ms' } as React.CSSProperties}>
          <DashboardMock />
        </div>
      </Container>
    </section>
  )
}
