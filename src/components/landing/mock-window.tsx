import { cn } from '@/lib/utils'

type StatusTone = 'active' | 'paid' | 'due' | 'neutral'

const toneStyles: Record<StatusTone, string> = {
  active: 'bg-success/10 text-success',
  paid: 'bg-success/10 text-success',
  due: 'bg-amber/15 text-[#9a6206]',
  neutral: 'bg-line text-ink-soft',
}

export function StatusBadge({ tone, children }: { tone: StatusTone; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.7rem] font-medium',
        toneStyles[tone],
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}

export function MockWindow({
  address,
  children,
  className,
}: {
  address: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-line bg-white shadow-[0_40px_70px_-36px_rgba(10,26,63,0.45),0_2px_6px_rgba(10,26,63,0.05)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-canvas px-4 py-2.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <div className="mx-auto w-full max-w-60 truncate rounded-md border border-line bg-white px-3 py-1 text-center text-[0.7rem] text-ink-soft">
          {address}
        </div>
        <span aria-hidden className="w-10" />
      </div>
      {children}
    </div>
  )
}
