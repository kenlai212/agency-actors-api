import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AgencyActorReadDTO, FindAgencyActorReadRequestDTO } from "./agencyActorsRead.dtos";
import { AgencyActorsReadService } from "./agencyActorsRead.service";
import { AuthGuard } from "../auth.guard";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("agency-actors-read")
export class AgencyActorsReadController {
    constructor(
        private readonly agencyActorsReadService: AgencyActorsReadService,
    ) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get("/")
    @ApiOperation({
        summary: 'Find Agency Actor',
        description: `Find Agency Actor by providing actor's Type and ID`
    })
    @ApiOkResponse({
        description: 'Successfully GET response AgencyActoryDTO.',
        type: AgencyActorReadDTO,
    })
    async findAgencyActor(@Query() query: FindAgencyActorReadRequestDTO): Promise<AgencyActorReadDTO> {
        return await this.agencyActorsReadService.findActor(query.actorId);
    }
}