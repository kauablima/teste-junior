interface BrandLogoProps {
    subtitle: string
}

export default function BrandLogo({ subtitle }: BrandLogoProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 flex-none">
                <div className="h-10 w-10 rounded-xl bg-[var(--color-brand)] flex items-center justify-center text-white font-bold text-xl">
                    A
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-[var(--color-accent)] rounded-sm border-2 border-white" />
            </div>
            <div>
                <p className="font-semibold leading-tight text-[var(--color-ink)]">Admin Suite</p>
                <p className="text-[11px] font-bold tracking-[0.1em] text-[var(--color-ink-3)] uppercase">{subtitle}</p>
            </div>
        </div>
    )
}
