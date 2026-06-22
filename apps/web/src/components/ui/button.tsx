import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive'
type ButtonSize = 'default' | 'sm' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
    default:
        'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]',
    outline:
        'border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-ink-2)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-ink)]',
    ghost:
        'bg-transparent text-[var(--color-ink-2)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-ink)]',
    destructive:
        'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
}

const sizeClasses: Record<ButtonSize, string> = {
    default: 'h-10 px-4 text-[14.5px]',
    sm: 'h-8 px-3 text-[13px]',
    lg: 'h-12 px-6 text-[15px]',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-[10px] font-semibold',
                    'transition-colors duration-150 cursor-pointer',
                    'disabled:pointer-events-none disabled:opacity-50',
                    variantClasses[variant],
                    sizeClasses[size],
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button }
