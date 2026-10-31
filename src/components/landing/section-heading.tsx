import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  description?: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, tone = 'light', className }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={cn('fade-up max-w-2xl', className)}>
      <p
        className={cn(
          'mb-5 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.14em]',
          dark ? 'text-sky' : 'text-blue',
        )}
      >
        <span aria-hidden className="size-1.5 rounded-full bg-current" />
        {eyebrow}
      </p>
      <h2 className={cn('display-2', dark ? 'text-white' : 'text-ink')}>{title}</h2>
      {description && (
        <p className={cn('mt-5 text-lg leading-relaxed', dark ? 'text-white/70' : 'text-ink-soft')}>{description}</p>
      )}
    </div>
  )
}
