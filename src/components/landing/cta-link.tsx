import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  solid: 'bg-blue text-white shadow-[0_8px_20px_-10px_rgba(43,91,234,0.8)] hover:bg-blue-deep',
  navy: 'bg-navy text-white hover:bg-navy-soft',
  outline: 'border border-line-strong bg-white text-ink hover:border-navy',
  light: 'bg-white text-navy hover:bg-canvas',
  'outline-light': 'border border-white/30 text-white hover:border-white hover:bg-white/5',
} as const

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
} as const

type CtaLinkProps = React.ComponentProps<typeof Link> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export function CtaLink({ variant = 'solid', size = 'md', className, ...props }: CtaLinkProps) {
  return (
    <Link
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,box-shadow,transform] duration-200 hover:-translate-y-px',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
