import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/site'
import { Container } from './container'
import { CtaLink } from './cta-link'
import { Wordmark } from './logo'

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b border-line/70 bg-white/70 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-8">
        <Wordmark />

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex lg:ml-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="link-slide text-[0.93rem] text-ink-soft hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <CtaLink href="/login" variant="outline" size="sm" className="hidden sm:inline-flex">
            Log in
          </CtaLink>
          <CtaLink href="/signup" size="sm">
            Sign up
          </CtaLink>

          <details className="group md:hidden">
            <summary className="flex size-9 cursor-pointer list-none items-center justify-center rounded-lg border border-line-strong bg-white">
              <Menu className="size-5 group-open:hidden" strokeWidth={1.5} aria-hidden />
              <X className="hidden size-5 group-open:block" strokeWidth={1.5} aria-hidden />
              <span className="sr-only">Menu</span>
            </summary>
            <nav
              aria-label="Mobile"
              className="menu-panel absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_24px_30px_-24px_rgba(10,26,63,0.3)]"
            >
              <Container className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="border-b border-line py-3.5 text-base">
                    {link.label}
                  </a>
                ))}
                <Link href="/login" className="py-3.5 text-base font-medium text-blue">
                  Log in
                </Link>
              </Container>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  )
}
