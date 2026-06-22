import { createTeamSchema } from "@teste-junior/shared";
import { createZodDto } from "nestjs-zod";

export class CreateTeamDto extends createZodDto(createTeamSchema){}