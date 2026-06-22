import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { createTeamSchema, type CreateTeamInput, type TeamResponseSchema } from '@teste-junior/shared'
import { api } from '@/service/api'
import { Button } from '@/components/ui/button'
import Field from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { X } from 'lucide-react'

interface TeamModalProps {
    team?: TeamResponseSchema | null
    onClose: () => void
    onSuccess: () => void
}

const BRAZILIAN_STATES = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
].map(s => ({ value: s, label: s }))

export default function TeamModal({ team, onClose, onSuccess }: TeamModalProps) {
    const isEditing = !!team

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<CreateTeamInput>({
        resolver: zodResolver(createTeamSchema),
        defaultValues: {
            name: team?.name || '',
            state: team?.state || '',
            division: team?.division || '',
        }
    })

    useEffect(() => {
        if (team) {
            reset({
                name: team.name,
                state: team.state,
                division: team.division
            })
        }
    }, [team, reset])

    async function onSubmit(data: CreateTeamInput) {
        try {
            if (isEditing) {
                await api.patch(`/teams/${team.id}`, data)
                toast.success('Time atualizado com sucesso!')
            } else {
                await api.post('/teams', data)
                toast.success('Time criado com sucesso!')
            }
            onSuccess()
            onClose()
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Erro ao salvar time'
            toast.error(Array.isArray(msg) ? msg.join(', ') : msg)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[var(--color-surface)] w-full max-w-[420px] rounded-[20px] shadow-[var(--shadow-modal)] flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-soft)]">
                    <h2 className="text-[17px] font-bold text-[var(--color-ink)]">
                        {isEditing ? 'Editar Time' : 'Novo Time'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="h-8 w-8 rounded-full flex items-center justify-center text-[var(--color-ink-3)] hover:bg-[var(--color-surface-3)] hover:text-[var(--color-ink)] transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto">
                    <form id="team-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <Field label="Nome do Time" required htmlFor="name" error={errors.name?.message}>
                            <Input
                                id="name"
                                placeholder="Ex: Flamengo, São Paulo..."
                                {...register('name')}
                            />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                             <Field label="Estado" required htmlFor="state" error={errors.state?.message}>
                                <Select
                                    id="state"
                                    options={BRAZILIAN_STATES}
                                    placeholder="Selecione..."
                                    {...register('state')}
                                />
                            </Field>

                            <Field label="Divisão" required htmlFor="division" error={errors.division?.message}>
                                <Select
                                    id="division"
                                    options={[
                                        { value: '1', label: 'Série A' },
                                        { value: '2', label: 'Série B' },
                                        { value: '3', label: 'Série C' },
                                        { value: '4', label: 'Série D' },
                                    ]}
                                    placeholder="Selecione..."
                                    {...register('division')}
                                />
                            </Field>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-[var(--color-border-soft)] bg-[var(--color-surface-2)] rounded-b-[20px]">
                    <Button variant="ghost" onClick={onClose} type="button">
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        form="team-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar Time'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
