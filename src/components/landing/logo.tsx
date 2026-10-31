import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Brightloop Software home"
      className={cn('inline-flex items-center gap-2.5 text-ink', className)}
    >
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
        <rect width="30" height="30" rx="8" className="fill-navy" />
        <circle cx="15" cy="15" r="6.5" stroke="white" strokeWidth="2.2" />
        <circle cx="21.5" cy="8.5" r="2.6" className="fill-sky" />
      </svg>
      <span className="text-[1.05rem] font-semibold tracking-[-0.02em]">
        Brightloop <span className="hidden font-normal text-ink-soft sm:inline">Software</span>
      </span>
    </Link>
  )
}
