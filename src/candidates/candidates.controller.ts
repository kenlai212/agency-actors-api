import { Body, Controller, Delete, Get, Logger, Post, Put, Query } from "@nestjs/common";
import { CandidateDTO, NewCandidateRequestDTO, UpdateCandidateRequestDTO } from "./candidates.dto";
import { CandidatesService } from "./candidates.service";

@Controller()
export class CandidatesController {
    logger = new Logger('CandidatesController');

    constructor(
        private readonly candidatesService: CandidatesService,
    ) { }

    @Get("/candidate/:candidateId")
    async getCandidateById(@Query('candidateId') candidateId: string): Promise<CandidateDTO> {
        return await this.candidatesService.getCandidateById(candidateId);
    }

    @Post("/candidate")
    async newCandidate(@Body() requestBody: NewCandidateRequestDTO): Promise<CandidateDTO> {
        return await this.candidatesService.createCandidate(requestBody.name, requestBody.emailAddress, requestBody.phoneNumber);
    }

    @Put("/candidate")
    async updateCandidateDetails(@Body() requestBody: UpdateCandidateRequestDTO): Promise<CandidateDTO> {
        return await this.candidatesService.updateCandidate(requestBody.candidateId, requestBody.fullName, requestBody.emailAddress, requestBody.phoneNumber);
    }

    @Delete("/candidate/:candidateId")
    async deleteCandidate(@Query('candidateId') candidateId: string): Promise<void> {
        return await this.candidatesService.deleteCandidate(candidateId);
    }
}