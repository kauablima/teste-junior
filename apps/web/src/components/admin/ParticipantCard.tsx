import { Calendar, Phone } from 'lucide-react'
import { type ParticipantResponseSchema } from '@teste-junior/shared'
import AvatarLetter from '@/components/ui/avatar-letter'
import { Button } from '@/components/ui/button'

interface ParticipantCardProps {
    participant: ParticipantResponseSchema
    onView: () => void
}

export default function ParticipantCard({ participant, onView }: ParticipantCardProps) {
    const date = new Date(participant.createdAt).toLocaleDateString('pt-BR')
    
    return (
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-[18px] py-4 bg-[var(--color-surface)] border border-[var(--color-border-soft)] rounded-[14px] shadow-[var(--shadow-xs)] overflow-hidden">
            <AvatarLetter name={participant.name} />

            <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold tracking-[-0.01em] text-[var(--color-ink)] truncate">{participant.name}</p>
                <p className="text-[13px] text-[var(--color-ink-2)] truncate">{participant.email}</p>
            </div>

            <div className="hidden sm:flex flex-col gap-0.5 min-w-[138px]">
                <span className="text-[10.5px] font-bold tracking-[0.06em] text-[var(--color-ink-3)] uppercase">CPF</span>
                <span className="font-mono text-[13px] text-[var(--color-ink)]">{participant.cpf}</span>
            </div>

            <div className="hidden md:flex flex-col gap-0.5 min-w-[138px]">
                <span className="text-[10.5px] font-bold tracking-[0.06em] text-[var(--color-ink-3)] uppercase">Telefone</span>
                <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-ink)]">
                     <Phone size={14} className="text-[var(--color-ink-3)] flex-none" />
                    {participant.phone}
                </span>
            </div>

            <div className="hidden lg:flex flex-col gap-1 min-w-[118px]">
                <span className="text-[10.5px] font-bold tracking-[0.06em] text-[var(--color-ink-3)] uppercase">Cadastro</span>
                <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--color-ink-2)]">
                    <Calendar size={14} className="text-[var(--color-ink-3)] flex-none" />
                    {date}
                </span>
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={onView}
                className="flex-none bg-[var(--color-surface)] whitespace-nowrap"
            >
                Ver detalhes
            </Button>
        </div>
    )
}
