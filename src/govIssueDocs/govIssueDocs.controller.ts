import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";
import { ActorAssetsController, DocumentLinkedAssetsController } from "../actorAssets/actorAssets.contorller";

@Controller("gov-issue-doc")
export class GovIssueDocsController extends DocumentLinkedAssetsController {

    @Post("/")
    async uploadGovernmentId(@Body() newGovernmentIdRequest: NewGovIssueDocRequestDTO): Promise<GovIssueDocDTO> {
        return new GovIssueDocDTO();
    }
}