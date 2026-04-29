import { Body, Controller, Delete, Get, Logger, Post, Put, Query } from "@nestjs/common";
import { CandidateDTO, NewCandidateRequestDTO, UpdateCandidateRequestDTO } from "./candidates.dto";
import { CandidatesService } from "./candidates.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller()
export class CandidatesController {
    logger = new Logger('CandidatesController');

    constructor(
        private readonly candidatesService: CandidatesService,
    ) { }

    @Get("/candidate/:candidateId")
    @ApiOperation({
        summary: 'Find Candidate by candidateId.',
        description: `Find Candidate by candidateId.`
    })
    @ApiOkResponse({
        description: 'Successfully GET response CandidateDTO.',
        type: CandidateDTO,
    })
    async getCandidateById(@Query('candidateId') candidateId: string): Promise<CandidateDTO> {
        return await this.candidatesService.getCandidateById(candidateId);
    }

    @Post("/candidate")
    @ApiOperation({
        summary: 'Create new Candidate.',
        description: `Create new Candidate with email address and phone number.`
    })
    @ApiOkResponse({
        description: 'Successfully POST response CandidateDTO.',
        type: CandidateDTO,
    })
    async newCandidate(@Body() requestBody: NewCandidateRequestDTO): Promise<CandidateDTO> {
        return await this.candidatesService.createCandidate(requestBody.name, requestBody.emailAddress, requestBody.phoneNumber);
    }

    @Put("/candidate")
    @ApiOperation({
        summary: 'Update Candidate Details.',
        description: `Update Candidate with fullName, emailAddress, phoneNumber.`
    })
    @ApiOkResponse({
        description: 'Successfully PUT response CandidateDTO.',
        type: CandidateDTO,
    })
    async updateCandidateDetails(@Body() requestBody: UpdateCandidateRequestDTO): Promise<CandidateDTO> {
        return await this.candidatesService.updateCandidate(requestBody.candidateId, requestBody.fullName, requestBody.emailAddress, requestBody.phoneNumber);
    }

    @Delete("/candidate/:candidateId")
    async deleteCandidate(@Query('candidateId') candidateId: string): Promise<void> {
        return await this.candidatesService.deleteCandidate(candidateId);
    }
}