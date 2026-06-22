import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { JwtAuthGuard } from "@/auth/guards/jwt-auth.guard";
import { CreateTeamDto } from "./dto/create-teams.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";

@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.teamsService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTeamDto) {
    return this.teamsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeamDto) {
    return this.teamsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}