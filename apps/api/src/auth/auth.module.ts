import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.get<string>('JWT_SECRET');
                const expiresIn = config.get<string>('JWT_EXPIRES_IN') || '2h';
                
                if(!secret) throw new Error('JWT_SECRET não definido')

                return {
                    secret,
                    signOptions: { expiresIn } as any
                }
            }
        })
    ],

    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy]
})
export class AuthModule{}