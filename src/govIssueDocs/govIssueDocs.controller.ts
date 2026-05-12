import { Body, Controller, Post, Put } from "@nestjs/common";
import { GovIssueDocsService } from "./govIssueDocs.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO, UpdateGovIssueDocRequestDTO } from "./govIssueDocs.dtos";

@Controller("gov-issue-docs")
export class GovIssueDocsController extends DocumentLinkedAssetsController {
    constructor(
        private readonly govIssueDocsService: GovIssueDocsService
    ) {
        super(govIssueDocsService);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Goverment Issue Document.',
        description: `New Goverment Issue Document must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${GovIssueDocDTO.name}.`,
        type: NewGovIssueDocRequestDTO
    })
    async newAsset(@Body() dto: NewGovIssueDocRequestDTO) {
        return this.assetsService.createAsset(dto);
    }

    @Put("/")
    @ApiOperation({
        summary: 'Update Goverment Issue Document',
        description: `Update Goverment Issue Document`
    })
    @ApiOkResponse({
        description: `Successfully POST response ${GovIssueDocDTO.name}`,
        type: GovIssueDocDTO,
    })
    async updateAsset(@Body() body: UpdateGovIssueDocRequestDTO): Promise<GovIssueDocDTO> {
        return this.govIssueDocsService.updateAsset(body);
    }
}