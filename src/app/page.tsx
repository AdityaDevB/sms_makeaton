import { ClosingCta } from '@/components/landing/closing-cta'
import { Hero } from '@/components/landing/hero'
import { Portal } from '@/components/landing/portal'
import { Pricing } from '@/components/landing/pricing'
import { Products } from '@/components/landing/products'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'
import { Why } from '@/components/landing/why'

export default function HomePage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <Hero />
        <Products />
        <Pricing />
        <Portal />
        <Why />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  )
}
