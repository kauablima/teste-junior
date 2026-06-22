import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { ParticipantService } from "./participants.service";
import { createParticipantsDto } from "./dto/create-participants.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('participants')
export class ParticipantController {
    constructor(private readonly participantService: ParticipantService) { }

    @Post()
    createParticipant(@Body() dto: createParticipantsDto){
        return this.participantService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(
        @Query('search') search?: string,
        @Query('page', new ParseIntPipe({ optional: true })) page?: number,
        @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    ) {
        return this.participantService.findAll(search, page, limit);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.participantService.findOne(id);
    }
}