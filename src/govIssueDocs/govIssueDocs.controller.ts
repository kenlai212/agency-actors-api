import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";

@Controller()
export class GovIssueDocsController {
    @Post("/government-id")
    async uploadGovernmentId(@Body() newGovernmentIdRequest: NewGovIssueDocRequestDTO): Promise<GovIssueDocDTO> {
        return new GovIssueDocDTO();
    }

    @Delete("/government-id/:governmentId")
    async deleteGovernmentId(): Promise<void> {
        return;
    }

    @Get("/government-id/:candidateId")
    async getGovernmentId(): Promise<Array<GovIssueDocDTO>> {
        return [new GovIssueDocDTO()];
    }
}