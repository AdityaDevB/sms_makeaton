import { SiteHeader } from '@/components/landing/site-header'
import { Hero } from '@/components/landing/hero'
import { Why } from '@/components/landing/why'
import { Products } from '@/components/landing/products'
import { Pricing } from '@/components/landing/pricing'
import { Portal } from '@/components/landing/portal'
import { ClosingCta } from '@/components/landing/closing-cta'
import { SiteFooter } from '@/components/landing/site-footer'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Why />
        <Products />
        <Pricing />
        <Portal />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  )
}