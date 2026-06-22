import { Module } from "@nestjs/common";
import { ParticipantService } from "./participants.service";
import { ParticipantController } from "./participants.controller";

@Module({
    controllers: [ParticipantController],
    providers: [ParticipantService],
    exports: [ParticipantService],
})
export class ParticipantsModule { }