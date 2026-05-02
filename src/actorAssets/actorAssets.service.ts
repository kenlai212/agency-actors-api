import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";

@Injectable()
export class ActorAssetsService {
    @Inject(AgencyActorsService) protected readonly agencyActorsService: AgencyActorsService;

    protected async validateActor(actorId: string) {
        await this.agencyActorsService.validateActorId(actorId);
    }
}