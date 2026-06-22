import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    placeholder?: string
    options: { value: string; label: string }[]
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, placeholder, options, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={cn(
                    'flex w-full rounded-[10px] border border-[var(--color-border-strong)] bg-[var(--color-surface)]',
                    'px-3 h-[46px] text-[14.5px] text-[var(--color-ink)]',
                    'outline-none transition-colors cursor-pointer appearance-none',
                    'focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20',
                    'disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        )
    }
)
Select.displayName = 'Select'

export { Select }
