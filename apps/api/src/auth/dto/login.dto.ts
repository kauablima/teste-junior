import { createZodDto } from "nestjs-zod";
import { loginSchema } from '@teste-junior/shared';
import { z } from 'zod';

export class LoginDto extends createZodDto(loginSchema){}
