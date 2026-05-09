import { Body, Controller, Post } from "@nestjs/common";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GovIssueDocsService } from "./govIssueDocs.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";

@Controller("gov-issue-docs")
export class GovIssueDocsController extends DocumentLinkedAssetsController {
    constructor(
        private readonly govIssueDocsService: GovIssueDocsService
    ) {
        super(govIssueDocsService);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Goverment Issue Document for an actor'
    })
    @ApiOkResponse({
        description: 'Successfully POST response GovIssueDocDTO.',
        type: GovIssueDocDTO,
    })
    async uploadGovernmentId(@Body() newGovIssueDocRequest: NewGovIssueDocRequestDTO): Promise<GovIssueDocDTO> {
        return await this.govIssueDocsService.createNewGovIssueDoc(newGovIssueDocRequest);
    }
}