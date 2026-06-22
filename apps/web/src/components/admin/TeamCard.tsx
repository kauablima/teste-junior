import { Users, Edit2, Trash2 } from 'lucide-react'
import { type TeamResponseSchema } from '@teste-junior/shared'
import { Button } from '@/components/ui/button'

interface TeamCardProps {
    team: TeamResponseSchema
    onEdit: () => void
    onDelete: () => void
}

export default function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
    return (
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-[18px] py-4 bg-[var(--color-surface)] border border-[var(--color-border-soft)] rounded-[14px] shadow-[var(--shadow-xs)] overflow-hidden">
             <div className="flex-none h-10 w-10 rounded-full bg-[var(--color-accent-weak)] text-[var(--color-accent)] flex items-center justify-center">
                 <Users size={18} />
             </div>

            <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold tracking-[-0.01em] text-[var(--color-ink)] truncate">{team.name}</p>
                <p className="text-[13px] text-[var(--color-ink-2)] truncate">Divisão {team.division}</p>
            </div>

            <div className="hidden sm:flex flex-col gap-0.5 min-w-[100px]">
                <span className="text-[10.5px] font-bold tracking-[0.06em] text-[var(--color-ink-3)] uppercase">Estado</span>
                <span className="text-[13px] font-bold text-[var(--color-ink)] uppercase">{team.state}</span>
            </div>

            <div className="flex gap-2 flex-none">
                 <Button
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                    className="flex-none bg-[var(--color-surface)]"
                    title="Editar"
                >
                    <Edit2 size={16} className="text-[var(--color-ink-2)]" />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onDelete}
                    className="flex-none bg-[var(--color-surface)] hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                    title="Remover"
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        </div>
    )
}
