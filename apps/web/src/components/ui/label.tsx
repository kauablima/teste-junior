import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

const Label = forwardRef<
    HTMLLabelElement,
    React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
    <label
        ref={ref}
        className={cn('text-[13.5px] font-semibold text-[var(--color-ink-2)]', className)}
        {...props}
    />
))
Label.displayName = 'Label'

export { Label }
