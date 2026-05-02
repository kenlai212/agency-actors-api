import { Body, Controller, Get, Logger, Post, Query } from "@nestjs/common";
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

    @Post("/candidate")
    @ApiOperation({
        summary: 'Create new Agency Actor',
        description: `Create new Agency Actor with email address and phone number.`
    })
    @ApiOkResponse({
        description: 'Successfully POST response AgencyActorDTO.',
        type: AgencyActorDTO,
    })
    async newCandidate(@Body() requestBody: NewAgencyActorRequestDTO): Promise<AgencyActorDTO> {
        return await this.agencyActorsService.createAgencyActor(requestBody.name, requestBody.emailAddress, requestBody.phoneNumber);
    }
}