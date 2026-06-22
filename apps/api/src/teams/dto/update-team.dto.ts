import { createTeamSchema } from "@teste-junior/shared";
import { createZodDto } from "nestjs-zod";

export const updateTeamSchema = createTeamSchema.partial();
export class UpdateTeamDto extends createZodDto(updateTeamSchema) {}