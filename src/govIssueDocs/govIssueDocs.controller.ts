import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";

@Controller("gov-issue-doc")
export class GovIssueDocsController extends ActorAssetsController {

    @Post("/")
    async uploadGovernmentId(@Body() newGovernmentIdRequest: NewGovIssueDocRequestDTO): Promise<GovIssueDocDTO> {
        return new GovIssueDocDTO();
    }

    @Get("/:candidateId")
    async getGovernmentId(): Promise<Array<GovIssueDocDTO>> {
        return [new GovIssueDocDTO()];
    }
}