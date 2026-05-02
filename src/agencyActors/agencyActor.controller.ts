import { Body, Controller, Delete, Get, Logger, Post, Query } from "@nestjs/common";
import { AgencyActorsService } from "./agencyActors.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { AgencyActorDTO, FindAgencyActorRequestDTO, NewAgencyActorRequestDTO } from "./agencyActors.dto";

@Controller("/agency-actors")
export class AgencyActorsController {
    logger = new Logger('AgencyActorsController');

    constructor(
        private readonly agencyActorsService: AgencyActorsService,
    ) { }

    @Get("/")
    @ApiOperation({
        summary: 'Find Agency Actor',
        description: `Find Agency Actor by providing actor's Type and ID`
    })
    @ApiOkResponse({
        description: 'Successfully GET response AgencyActoryDTO.',
        type: AgencyActorDTO,
    })
    async findAgencyActor(@Query() query: FindAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        return await this.agencyActorsService.findAgencyActor(query.actorType, query.actorId);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Agency Actor',
        description: `Create new Agency Actor`
    })
    @ApiOkResponse({
        description: 'Successfully POST response AgencyActorDTO.',
        type: AgencyActorDTO,
    })
    async newCandidate(@Body() requestBody: NewAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        return await this.agencyActorsService.createAgencyActor(requestBody.name);
    }

    @Delete("/:actorId")
    @ApiOperation({
        summary: 'Delete target Agency Actor',
        description: `Delete target Agency Actor, along with all it's assets`
    })
    @ApiOkResponse({
        description: 'Successfully DELETE response a successful message.',
        type: AgencyActorDTO,
    })
    async deleteAgencyActor(@Query('actorId') actorId: string): Promise<string> {
        return await this.agencyActorsService.deleteActor(actorId);
    }
}