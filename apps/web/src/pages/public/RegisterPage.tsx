import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { createParticipantSchema, type CreateParticipantInput, type TeamResponseSchema } from '@teste-junior/shared'
import { createParticipant } from '@/service/participant'
import { getTeams } from '@/service/team'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { User, IdCard, Mail, CheckCircle, Lock, Calendar, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import CenteredScreen from '@/components/layout/CenteredScreen'
import BrandLogo from '@/components/brand/BrandLogo'
import Field from '@/components/ui/field'
import IconInput from '@/components/ui/icon-input'
import { Select } from '@/components/ui/select'

function formatCpf(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14)
}

function formatPhone(value: string) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
        .slice(0, 15)
}

function formatDate(value: string) {
    let v = value.replace(/[^\d\/]/g, '')
    if (v.length > 2 && v[2] !== '/') v = v.slice(0, 2) + '/' + v.slice(2)
    if (v.length > 5 && v[5] !== '/') v = v.slice(0, 5) + '/' + v.slice(5)
    return v.slice(0, 10)
}

export default function RegisterPage() {
    const [teams, setTeams] = useState<TeamResponseSchema[]>([])
    const [submitted, setSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<CreateParticipantInput>({
        resolver: zodResolver(createParticipantSchema),
    })

    useEffect(() => {
        getTeams(1, 100)
            .then((r) => setTeams(Array.isArray(r) ? r : []))
            .catch(() => toast.error('Falha ao carregar times'))
    }, [])

    async function onSubmit(data: CreateParticipantInput) {
        try {
            await createParticipant(data)
            setSubmitted(true)
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Erro ao enviar cadastro'
            toast.error(Array.isArray(msg) ? msg.join(', ') : msg)
        }
    }

    if (submitted) {
        return (
            <CenteredScreen maxWidth={480}>
                <div className="flex flex-col items-center mb-6">
                    <BrandLogo subtitle="CADASTRO PÚBLICO" />
                </div>
                <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-soft)] shadow-[var(--shadow-card)] p-10 text-center space-y-3">
                    <div className="flex justify-center">
                        <CheckCircle className="h-12 w-12 text-[var(--color-ok)]" />
                    </div>
                    <h1 className="text-[22px] font-extrabold text-[var(--color-ink)]">Cadastro realizado!</h1>
                    <p className="text-[14px] text-[var(--color-ink-3)]">Seus dados foram enviados com sucesso.</p>
                </div>
            </CenteredScreen>
        )
    }

    return (
        <CenteredScreen maxWidth={480}>
            <div className="flex flex-col items-center mb-6">
                <BrandLogo subtitle="CADASTRO PÚBLICO" />
            </div>

            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-soft)] shadow-[var(--shadow-card)] overflow-hidden">
                <div className="px-5 sm:px-8 pt-7 pb-5 border-b border-[var(--color-border-soft)]"
                    style={{ background: 'linear-gradient(180deg, var(--color-surface-2) 0%, var(--color-surface) 100%)' }}>
                    <h1 className="text-[22px] font-extrabold text-[var(--color-ink)]">Cadastro de Participante</h1>
                    <p className="text-[13.5px] text-[var(--color-ink-3)] mt-1">
                        Preencha seus dados abaixo. Campos com <span className="text-[var(--color-danger)]">*</span> são obrigatórios.
                    </p>
                </div>

                <div className="px-5 sm:px-8 py-7">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px]">
                        <Field label="Nome completo" required htmlFor="name" error={errors.name?.message}>
                            <IconInput
                                id="name"
                                icon={User}
                                placeholder="Seu nome completo"
                                {...register('name')}
                            />
                        </Field>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <Field label="CPF" required htmlFor="cpf" error={errors.cpf?.message}>
                                <IconInput
                                    id="cpf"
                                    icon={IdCard}
                                    mono
                                    placeholder="000.000.000-00"
                                    {...register('cpf')}
                                    onChange={(e: any) => setValue('cpf', formatCpf(e.target.value), { shouldValidate: true })}
                                />
                            </Field>
                            <Field label="Telefone" required htmlFor="phone" error={errors.phone?.message}>
                                <IconInput
                                    id="phone"
                                    icon={Phone}
                                    placeholder="(00) 00000-0000"
                                    {...register('phone')}
                                    onChange={(e: any) => setValue('phone', formatPhone(e.target.value), { shouldValidate: true })}
                                />
                            </Field>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <Field label="Data de Nascimento" required htmlFor="birthDate" error={errors.birthDate?.message}>
                                <IconInput
                                    id="birthDate"
                                    icon={Calendar}
                                    placeholder="DD/MM/AAAA"
                                    {...register('birthDate')}
                                    onChange={(e: any) => setValue('birthDate', formatDate(e.target.value), { shouldValidate: true })}
                                />
                            </Field>

                            <Field label="Time do Coração" required error={errors.teamId?.message}>
                                <Select
                                    placeholder="Selecione um time..."
                                    options={teams.map(t => ({ value: t.id, label: t.name }))}
                                    {...register('teamId')}
                                />
                            </Field>
                        </div>

                        <Field label="E-mail" required htmlFor="email" error={errors.email?.message}>
                            <IconInput
                                id="email"
                                icon={Mail}
                                type="email"
                                placeholder="voce@email.com"
                                {...register('email')}
                            />
                        </Field>

                        <Field label="Observações" htmlFor="observations" error={errors.observations?.message}>
                            <Textarea
                                id="observations"
                                rows={4}
                                placeholder="Algo que devemos saber? (opcional)"
                                {...register('observations')}
                            />
                        </Field>

                        <Button
                            type="submit"
                            className="w-full h-[46px] mt-1"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar cadastro'}
                        </Button>

                        <div className="flex justify-center pt-1">
                            <Link
                                to="/admin/login"
                                className="flex items-center gap-1.5 text-[12px] text-[var(--color-ink-3)] hover:text-[var(--color-ink)] transition-colors"
                            >
                                <Lock className="h-3 w-3" />
                                Área administrativa
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </CenteredScreen>
    )
}
