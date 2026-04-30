import { BadRequestException, Inject, Injectable, Logger } from "@nestjs/common";
import { ActorType } from "./actorAttribute.entity";
import { CandidatesService } from "../candidates/candidates.service";

@Injectable()
export class ActorAttributeService {
    @Inject(CandidatesService) protected readonly candidatesService: CandidatesService;

    protected async validateActor(actorType: ActorType, actorId: string) {
        switch (actorType) {
            case "CANDIDATE":
                await this.candidatesService.validateCandidateId(actorId);
                break;
            case "AGENT":
                //todo: implement validate agentId
                break;
            default:
                throw new BadRequestException(`Unknow actorType: ${actorType}`);
        }
    }
}