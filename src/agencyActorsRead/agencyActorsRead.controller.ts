import { Controller, Get, Query } from "@nestjs/common";
import { AgencyActorReadDTO, FindAgencyActorReadRequestDTO } from "./agencyActorsRead.dtos";
import { AgencyActorsReadService } from "./agencyActorsRead.service";

@Controller("agency-actors-read")
export class AgencyActorsReadController {
    constructor(
        private readonly agencyActorsReadService: AgencyActorsReadService,
    ) { }

    @Get("/")
    async findAgencyActor(@Query() query: FindAgencyActorReadRequestDTO): Promise<AgencyActorReadDTO> {
        return await this.agencyActorsReadService.findActor(query.actorId);
    }
}