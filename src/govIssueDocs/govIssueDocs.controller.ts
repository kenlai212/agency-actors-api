import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GovIssueDocsService } from "./govIssueDocs.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { AuthGuard } from "../auth.guard";

@Controller("gov-issue-docs")
export class GovIssueDocsController extends DocumentLinkedAssetsController {
    constructor(
        private readonly govIssueDocsService: GovIssueDocsService
    ) {
        super(govIssueDocsService);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
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