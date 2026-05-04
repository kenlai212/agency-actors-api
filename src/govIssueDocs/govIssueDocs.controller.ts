import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";

@Controller("gov-issue-doc")
export class GovIssueDocsController {
    @Post("/")
    async uploadGovernmentId(@Body() newGovernmentIdRequest: NewGovIssueDocRequestDTO): Promise<GovIssueDocDTO> {
        return new GovIssueDocDTO();
    }

    @Delete("/:assetId")
    async deleteGovernmentId(): Promise<void> {
        return;
    }

    @Get("/:candidateId")
    async getGovernmentId(): Promise<Array<GovIssueDocDTO>> {
        return [new GovIssueDocDTO()];
    }
}