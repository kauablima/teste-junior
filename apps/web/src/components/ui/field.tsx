import { Label } from '@/components/ui/label'

interface FieldProps {
    label: string
    required?: boolean
    error?: string
    children: React.ReactNode
    htmlFor?: string
}

export default function Field({ label, required, error, children, htmlFor }: FieldProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={htmlFor}>
                {label}
                {required && <span className="text-[var(--color-danger)] ml-0.5">*</span>}
            </Label>
            {children}
            {error && <p className="text-[12.5px] text-[var(--color-danger)]">{error}</p>}
        </div>
    )
}
