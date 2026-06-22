import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { loginSchema, type LoginType } from '@teste-junior/shared'
import { api } from '@/service/api'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import CenteredScreen from '@/components/layout/CenteredScreen'
import BrandLogo from '@/components/brand/BrandLogo'
import Field from '@/components/ui/field'
import IconInput from '@/components/ui/icon-input'

export default function LoginPage() {
    const navigate = useNavigate()
    const [showPwd, setShowPwd] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    })

    async function onSubmit(data: LoginType) {
        try {
            await api.post('/auth/login', data)
            navigate('/admin')
        } catch {
            toast.error('Credenciais inválidas')
        }
    }

    return (
        <CenteredScreen maxWidth={396}>
            <div className="flex items-center justify-between mb-5">
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors"
                >
                    <ArrowLeft size={15} />
                    Voltar
                </button>
                <BrandLogo subtitle="ADMIN SUITE" />
            </div>

            <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-soft)] shadow-[var(--shadow-card)] px-[30px] py-[28px]">
                <div className="flex items-center gap-2 mb-2.5">
                    <span className="h-[30px] w-[30px] rounded-lg bg-[var(--color-brand)] grid place-items-center flex-none">
                        <Lock size={15} className="text-white" />
                    </span>
                    <span className="text-[12px] font-bold tracking-[0.08em] text-[var(--color-ink)]">ACESSO RESTRITO</span>
                </div>

                <h1 className="text-[24px] font-extrabold text-[var(--color-ink)] mt-2.5 mb-1">Acesso Administrativo</h1>
                <p className="text-[14px] text-[var(--color-ink-2)] mb-6">Entre com suas credenciais para continuar.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <Field label="E-mail" required htmlFor="email" error={errors.email?.message}>
                        <IconInput
                            id="email"
                            icon={Mail}
                            type="email"
                            placeholder="voce@empresa.com"
                            {...register('email')}
                        />
                    </Field>

                    <Field label="Senha" required htmlFor="password" error={errors.password?.message}>
                        <div className="relative">
                            <IconInput
                                id="password"
                                icon={Lock}
                                type={showPwd ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPwd((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-3)] hover:text-[var(--color-ink-2)] transition-colors"
                                tabIndex={-1}
                            >
                                {showPwd ? <EyeOff size={19} /> : <Eye size={19} />}
                            </button>
                        </div>
                    </Field>

                    <Button
                        type="submit"
                        className="w-full h-[46px] mt-1"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>
            </div>

            <p className="text-center mt-4 text-[12.5px] text-[var(--color-ink-3)]">
                Desenvolvido por Kauã Lima © 2026
            </p>
        </CenteredScreen>
    )
}
