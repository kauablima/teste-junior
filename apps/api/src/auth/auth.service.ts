import { PrismaService } from "@/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService{
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async login(email: string, password: string): Promise<string> {
        const admin = await this.prisma.adminsys.findUnique({ where: { email }});

        if(!admin) throw new UnauthorizedException('E-mail inválido');

        const validation = await bcrypt.compare(password, admin.password);

        if(!validation) throw new UnauthorizedException('Senha inválida');

        return this.jwtService.sign({ email: admin.email });
    }
}