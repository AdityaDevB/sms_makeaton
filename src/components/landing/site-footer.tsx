import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { products } from '@/lib/catalog'
import { contactDetails, legalLinks, navLinks } from '@/lib/site'
import { Container } from './container'
import { Wordmark } from './logo'

const columns = [
  { title: 'Navigate', links: navLinks },
  {
    title: 'Products',
    links: [...products.map((product) => ({ label: product.name, href: '#products' })), { label: 'Pricing', href: '#pricing' }],
  },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-line bg-white pb-8 pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              Business software on flexible subscriptions, for shops and companies of every size.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">{column.title}</h2>
                <ul className="mt-5 space-y-3 text-[0.93rem]">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="link-slide">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ink-soft">Contact</h2>
              <ul className="mt-5 space-y-3 text-[0.93rem]">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={1.75} aria-hidden />
                  <a href={`mailto:${contactDetails.email}`} className="link-slide break-all">
                    {contactDetails.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={1.75} aria-hidden />
                  <span>{contactDetails.phone}</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-blue" strokeWidth={1.75} aria-hidden />
                  <address className="not-italic">
                    {contactDetails.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Brightloop Software. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="link-slide">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
