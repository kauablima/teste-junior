import { Body, Controller, HttpCode, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Throttle } from "@nestjs/throttler";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(200)
    @Throttle({login: { ttl: 60_000, limit: 4 }})
    async login(@Body() dto: LoginDto, @Res({passthrough: true}) res: any ){ 
        const token = await this.authService.login(dto.email, dto.password);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 8 * 60 * 60 * 1000, 
        });
        return {email: dto.email};
    }

    @Post('logout')
    @HttpCode(200)
    @UseGuards(AuthGuard)
    logout(@Res({passthrough: true}) res: any) { 
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });
        return 'Logout realizado com sucesso';
    }
}