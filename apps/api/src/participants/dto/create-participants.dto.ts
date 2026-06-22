import { createParticipantSchema } from "@teste-junior/shared";
import { createZodDto } from "nestjs-zod";

export class createParticipantsDto extends createZodDto(createParticipantSchema) {}