import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    'flex w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)]',
                    'px-3 h-[46px] text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-3)]',
                    'outline-none transition-colors',
                    'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        )
    }
)
Input.displayName = 'Input'

export { Input }
