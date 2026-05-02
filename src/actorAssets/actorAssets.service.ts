import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { CandidatesService } from "../candidates/candidates.service";

@Injectable()
export class ActorAssetsService {
    @Inject(CandidatesService) protected readonly candidatesService: CandidatesService;

    protected async validateActor(actorId: string) {
        await this.candidatesService.validateCandidateId(actorId);
    }
}