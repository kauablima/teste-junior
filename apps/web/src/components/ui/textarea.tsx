import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                className={cn(
                    'flex w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)]',
                    'px-3 py-2.5 text-[14.5px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-3)]',
                    'outline-none transition-colors resize-none',
                    'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        )
    }
)
Textarea.displayName = 'Textarea'

export { Textarea }
