import { CalendarClock, LayoutDashboard, Puzzle, ReceiptText, SlidersHorizontal, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from './container'
import { SectionHeading } from './section-heading'

const benefits: { icon: LucideIcon; title: string; body: string; span: string }[] = [
  {
    icon: SlidersHorizontal,
    title: 'Flexible subscription plans',
    body: 'Start with one product or the whole suite, and move between plans as your business changes.',
    span: 'lg:col-span-2',
  },
  {
    icon: CalendarClock,
    title: 'Monthly and yearly billing',
    body: 'Pay month to month, or pay yearly and save. Invoices go out on the same day each cycle.',
    span: 'lg:col-span-2',
  },
  {
    icon: Puzzle,
    title: 'Variants and add-ons',
    body: 'Pick the variant that matches your setup, then add only the extras you need.',
    span: 'lg:col-span-2',
  },
  {
    icon: ReceiptText,
    title: 'Transparent invoices and payment tracking',
    body: 'Every invoice shows its lines and tax. See at a glance what is paid and what is still owing.',
    span: 'lg:col-span-3',
  },
  {
    icon: LayoutDashboard,
    title: 'A self-service customer portal',
    body: 'Manage subscriptions, download invoices and update your details without waiting on a reply.',
    span: 'lg:col-span-3',
  },
]

export function Why() {
  return (
    <section id="about" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <SectionHeading
            className="lg:col-span-6"
            eyebrow="Why Brightloop"
            title="Software you can start small with and grow into."
          />
          <p className="fade-up text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8 lg:self-end">
            Brightloop Software designs, builds and supports Books, Counter and Teams in-house, and sells them directly to
            businesses on simple subscriptions. One account, one invoice, and a portal that keeps it all in view.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className={cn(
                'fade-up group rounded-2xl border border-line bg-white p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_30px_50px_-36px_rgba(10,26,63,0.4)]',
                benefit.span,
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-canvas text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
                <benefit.icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em]">{benefit.title}</h3>
              <p className="mt-2 text-ink-soft">{benefit.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
