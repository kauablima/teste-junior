interface AvatarLetterProps {
    name: string
    size?: 'sm' | 'default' | 'lg'
}

export default function AvatarLetter({ name, size = 'default' }: AvatarLetterProps) {
    const initial = name ? name.charAt(0).toUpperCase() : '?'
    
    const sizeClasses = {
        sm: 'h-8 w-8 text-[12px]',
        default: 'h-10 w-10 text-[15px]',
        lg: 'h-12 w-12 text-[18px]',
    }

    return (
        <div 
            className={`flex-none ${sizeClasses[size]} rounded-full bg-[var(--color-brand)] text-white flex items-center justify-center font-bold`}
        >
            {initial}
        </div>
    )
}
