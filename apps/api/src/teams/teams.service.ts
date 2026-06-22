import { PrismaService } from "@/prisma/prisma.service";
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateTeamDto } from "./dto/create-teams.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const teams = await this.prisma.team.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: 'asc' },
    }) ;

    if (!teams) throw new ConflictException('Erro ao listar times');

    return teams;
  }

  async create(dto: CreateTeamDto) {
    const team = await this.prisma.team.create({ data: dto });
    if (!team) throw new ConflictException('Erro ao criar time');

    return team;
  }

  async update(id: string, dto: UpdateTeamDto) {
    const team = await this.prisma.team.update({ where: { id }, data: dto }); 
    if (!team) throw new ConflictException('Erro ao atualizar time');

    return team;
  }

  async remove(id: string) {
    const linked = await this.prisma.participant.count({ where: { teamId: id } });
    if (linked > 0) {
      throw new ConflictException('Não é possível remover um time com participantes vinculados.');
    }
    const team = await this.prisma.team.delete({ where: { id } });
    
    if (!team) throw new ConflictException('Erro ao deletar time');
    return team;
  }
}