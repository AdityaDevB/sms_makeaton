
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, UserRound, LayoutDashboard } from 'lucide-react';
import { navLinks } from '@/lib/site';
import { Container } from './container';
import { CtaLink } from './cta-link';
import { Wordmark } from './logo';
import { getHeaderUser } from '@/app/actions/headerUser';

type HeaderUser = {
  name: string;
  role: string;
};

export function SiteHeader() {
  const pathname = usePathname();

  const [user, setUser] = useState<HeaderUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;

    setChecked(false);

    getHeaderUser()
      .then((result) => {
        if (active) {
          setUser(result);
        }
      })
      .catch((error) => {
        console.error('Could not load header user:', error);
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setChecked(true);
      });

    return () => {
      active = false;
    };
  }, [pathname]);

  const dashboardHref =
    user?.role === 'ADMIN' ? '/admin/dashboard' : '/customer/dashboard';

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line/70 bg-white/70 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-8">
        <Wordmark />

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 md:flex lg:ml-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-slide text-[0.93rem] text-ink-soft hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          {checked && (
            user ? (
              <details className="relative hidden sm:block">
                <summary
                  aria-label="Profile menu"
                  className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-line-strong bg-white hover:bg-gray-50"
                >
                  <UserRound className="size-5" />
                </summary>

                <div className="absolute right-0 top-full z-50 mt-3 w-52 rounded-xl border border-line bg-white p-2 shadow-lg">
                  <div className="border-b border-line px-3 py-2">
                    <p className="truncate text-sm font-semibold text-ink">
                      {user.name || 'My Account'}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {user.role === 'ADMIN' ? 'Administrator' : 'Customer'}
                    </p>
                  </div>

                  <Link
                    href={dashboardHref}
                    className="mt-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-gray-50"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </div>
              </details>
            ) : (
              <>
                <CtaLink
                  href="/login"
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  Log in
                </CtaLink>

                <CtaLink href="/signup" size="sm">
                  Sign up
                </CtaLink>
              </>
            )
          )}

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
                  <a
                    key={link.href}
                    href={link.href}
                    className="border-b border-line py-3.5 text-base"
                  >
                    {link.label}
                  </a>
                ))}

                {checked && (
                  user ? (
                    <Link
                      href={dashboardHref}
                      className="flex items-center gap-3 py-3.5 text-base font-medium text-blue"
                    >
                      <UserRound className="size-5" />
                      My Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link href="/login" className="py-3.5 text-base font-medium text-blue">
                        Log in
                      </Link>
                      <Link href="/signup" className="py-3.5 text-base font-medium text-blue">
                        Sign up
                      </Link>
                    </>
                  )
                )}
              </Container>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
