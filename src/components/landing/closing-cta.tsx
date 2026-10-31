import { Container } from './container'
import { CtaLink } from './cta-link'

export function ClosingCta() {
  return (
    <section className="px-5 pb-24 sm:px-8 md:pb-32">
      <div className="on-dark navy-bg relative mx-auto max-w-[1200px] overflow-hidden rounded-3xl px-6 py-16 text-white sm:px-12 md:py-20">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 size-80 rounded-full border border-white/10" />
        <div className="relative grid items-end gap-10 lg:grid-cols-12">
          <h2 className="display-2 fade-up lg:col-span-7">Ready to find the Brightloop plan that fits your business?</h2>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-white/70">Create an account in a minute. Choose a plan, and your first invoice follows on its own.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CtaLink href="/signup" variant="light" size="lg">
                Sign up
              </CtaLink>
              <CtaLink href="/products" variant="outline-light" size="lg">
                Explore Products
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}