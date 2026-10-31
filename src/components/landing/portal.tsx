import { Container } from './container'
import { PortalPreview } from './portal-preview'
import { SectionHeading } from './section-heading'

export function Portal() {
  return (
    <section id="portal" className="on-dark navy-bg py-24 text-white md:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Customer portal"
          title="Your subscriptions, invoices and payments, all in one place."
          description="Sign in to see what you subscribe to, what has been billed and what has been paid. No emails back and forth."
        />
        <div className="fade-up mt-14 md:mt-16">
          <PortalPreview />
        </div>
      </Container>
    </section>
  )
}
