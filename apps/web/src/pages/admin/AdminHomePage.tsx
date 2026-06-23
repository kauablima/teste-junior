import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, LogOut, Search, Plus } from 'lucide-react'
import { type ParticipantResponseSchema, type TeamResponseSchema } from '@teste-junior/shared'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { getParticipants } from '@/service/participant'
import { getTeams, deleteTeam } from '@/service/team'
import { logout } from '@/service/auth'
import { Button } from '@/components/ui/button'
import PanelHeader from '@/components/layout/PanelHeader'
import StatPill from '@/components/admin/StatPill'
import ParticipantCard from '@/components/admin/ParticipantCard'
import TeamCard from '@/components/admin/TeamCard'
import TeamModal from '@/components/admin/TeamModal'
import IconInput from '@/components/ui/icon-input'

export default function AdminHomePage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<'participants' | 'teams'>('participants')
    const [participants, setParticipants] = useState<ParticipantResponseSchema[]>([])
    const [pTotal, setPTotal] = useState(0)
    const [pPage, setPPage] = useState(1)
    const [search, setSearch] = useState('')
    const [teams, setTeams] = useState<TeamResponseSchema[]>([])
    const [tTotal, setTTotal] = useState(0)
    const [tPage, setTPage] = useState(1)
    const [selectedTeam, setSelectedTeam] = useState<TeamResponseSchema | null | undefined>(undefined)

    const limit = 10

    const fetchParticipants = useCallback(async (q?: string, p = 1) => {
        try {
            const data = await getParticipants(q, p, limit)
            setParticipants(data.data ?? [])
            setPTotal(data.total || 0)
            setPPage(data.page || 1)
        } catch {
            navigate('/admin/login')
        }
    }, [navigate])

    const fetchTeams = useCallback(async (p = 1) => {
        try {
            const data = await getTeams(p, limit)
            setTeams(Array.isArray(data) ? data : (data || []))
            setTTotal(Array.isArray(data) ? data.length : (data|| 0))
            setTPage(p)
        } catch {
            navigate('/admin/login')
        }
    }, [navigate])

    useEffect(() => {
        if (activeTab === 'participants') {
            fetchParticipants(search, pPage)
        } else {
            fetchTeams(tPage)
        }
    }, [activeTab, fetchParticipants, fetchTeams, search, pPage, tPage])

    async function handleLogout() {
        await logout()
        toast.success('Sessão encerrada')
        navigate('/admin/login')
    }

    async function handleDeleteTeam(id: string) {
        if (!window.confirm('Tem certeza que deseja remover este time?')) return
        try {
            await deleteTeam(id)
            toast.success('Time removido com sucesso')
            fetchTeams(tPage)
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Erro ao remover time'
            toast.error(msg)
        }
    }

    return (
        <div className="min-h-screen bg-(--color-bg) flex flex-col">
            <PanelHeader
                subtitle="ADMIN SUITE · GESTÃO"
                actions={
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleLogout}
                        className="text-[13.5px] font-semibold"
                    >
                        <LogOut size={15} className="mr-1" />
                        Logout
                    </Button>
                }
            />

            <div className="flex-1 overflow-y-auto p-4 sm:p-[26px_32px_40px]">
                <div className="max-w-[1180px] mx-auto">

                    <div className="flex gap-4 mb-6 border-b border-(--color-border-soft)">
                        <button
                            onClick={() => setActiveTab('participants')}
                            className={`pb-3 px-1 text-[15px] font-bold transition-colors ${
                                activeTab === 'participants' 
                                ? 'text-(--color-brand)] border-b-2 border-(--color-brand)]' 
                                : 'text-(--color-ink-3)] hover:text-(--color-ink-2)]'
                            }`}
                        >
                            Participantes
                        </button>
                        <button
                            onClick={() => setActiveTab('teams')}
                            className={`pb-3 px-1 text-[15px] font-bold transition-colors ${
                                activeTab === 'teams' 
                                ? 'text-(--color-brand) border-b-2 border-(--color-brand)' 
                                : 'text-(--color-ink-3) hover:text-(--color-ink-2)'
                            }`}
                        >
                            Times
                        </button>
                    </div>

                    {activeTab === 'participants' ? (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                                <div className="grid grid-cols-2 gap-3 sm:contents">
                                    <StatPill value={pTotal} label="Total de participantes" />
                                </div>
                                <div className="w-full sm:max-w-[360px] sm:ml-auto">
                                    <IconInput
                                        icon={Search}
                                        placeholder="Buscar por nome, CPF ou e-mail…"
                                        value={search}
                                        onChange={(e: any) => {
                                            setSearch(e.target.value)
                                            setPPage(1)
                                        }}
                                        className="bg-(--color-surface)]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                {participants.length === 0 ? (
                                    <p className="py-8 text-center text-[13.5px] text-(--color-ink-3)">Nenhum participante encontrado.</p>
                                ) : (
                                    participants.map((p) => (
                                        <ParticipantCard key={p.id} participant={p} onView={() => alert(JSON.stringify(p, null, 2))} />
                                    ))
                                )}
                            </div>
                            
                            {Math.ceil(pTotal / limit) > 1 && (
                                <Pagination 
                                    page={pPage} 
                                    totalPages={Math.ceil(pTotal / limit)} 
                                    setPage={setPPage} 
                                />
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                                <StatPill value={tTotal} label="Times cadastrados" />
                                <Button onClick={() => setSelectedTeam(null)}>
                                    <Plus size={16} className="mr-2" />
                                    Novo Time
                                </Button>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                {teams.length === 0 ? (
                                    <p className="py-8 text-center text-[13.5px] text-(--color-ink-3)">Nenhum time encontrado.</p>
                                ) : (
                                    teams.map((t) => (
                                        <TeamCard 
                                            key={t.id} 
                                            team={t} 
                                            onEdit={() => setSelectedTeam(t)}
                                            onDelete={() => handleDeleteTeam(t.id)}
                                        />
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {selectedTeam !== undefined && (
                <TeamModal 
                    team={selectedTeam} 
                    onClose={() => setSelectedTeam(undefined)} 
                    onSuccess={() => fetchTeams(tPage)}
                />
            )}
        </div>
    )
}

function Pagination({ page, totalPages, setPage }: { page: number, totalPages: number, setPage: (p: number) => void }) {
    return (
        <div className="flex items-center justify-between mt-5">
            <span className="text-[13px] text-(--color-ink-3)">
                Página {page} de {totalPages}
            </span>
            <div className="flex gap-1.5">
                <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    <ChevronLeft size={15} />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    <ChevronRight size={15} />
                </Button>
            </div>
        </div>
    )
}
