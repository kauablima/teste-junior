import { Prisma } from "@/generated/prisma/client";
import { PrismaService } from "@/prisma/prisma.service";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateParticipantSchema } from "@teste-junior/shared";

@Injectable()
export class ParticipantService {
  constructor(
    private prisma: PrismaService
  ) { }


  async create(dto: CreateParticipantSchema) {
    try {
      const participant = await this.prisma.participant.create({
        data: dto,
        include: { team: true },
      })
      return participant
    } catch (error) {
      const err = error as any;
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        const field = (err.meta?.target as string[])?.[0]
        throw new ConflictException(
          field === 'cpf' ? 'CPF já cadastrado' : 'E-mail já cadastrado'
        )
      }

      throw error

    }
  }

  async findOne(id: string) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      include: { team: true }
    })

    if (!participant) throw new NotFoundException('Participante não encontrado')
    return participant
  }

  async findAll(search?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where = search
      ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { cpf: { contains: search } },
          { email: { contains: search, mode: 'insensitive' as const } },
        ],
      }
      : undefined;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.participant.findMany({
        where,
        skip,
        take: limit,
        include: { team: true },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.participant.count({ where }),
    ])

    return { data, total, page, limit };
  }

}

