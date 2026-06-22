import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(ConfigService) config: ConfigService) {
        const secret = config.get<string>('JWT_SECRET')
        if (!secret) throw new Error('JWT_SECRET não definido no .env')

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.token ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: secret,
        })
    }

    async validate(payload: {email: string}){
        return {email: payload.email}
    }
}