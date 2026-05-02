import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { CertificationDTO, NewCertificationRequestDTO, SearchCertificationsRequestDTO, UploadDocumentRequestDTO } from "./certifications.dtos";
import { CertificationsService } from "./certifications.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller("/certifications")
export class CertificationsController {
    constructor(
        private readonly certificationsService: CertificationsService
    ) { }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Certification.',
        description: `New Certification must tie to an actor.`
    })
    @ApiOkResponse({
        description: 'Successfully POST response CertificationDTO.',
        type: CertificationDTO,
    })
    async newCertification(@Body() body: NewCertificationRequestDTO): Promise<CertificationDTO> {
        return this.certificationsService.createCertification(
            body.actorId,
            body.authority,
            body.certificateName,
            body.certificateNumber,
            body.issueDate
        );
    }

    @Get("/")
    @ApiOperation({
        summary: 'Search Certification.',
        description: `Can search using Certification ID, or Actor Type + Actor ID`
    })
    @ApiOkResponse({
        description: 'Successfully POST response CandidateDTO.',
        type: CertificationDTO,
    })
    async searchCertifications(@Query() query: SearchCertificationsRequestDTO): Promise<Array<CertificationDTO>> {
        const certifications = await this.certificationsService.findCertifications(query.certificationId, query.actorId);

        if (certifications.length === 0) {
            throw new NotFoundException("No certifications found for actor ID: " + query.actorId);
        }

        return certifications;
    }

    @Delete("/:certificationId")
    @ApiOperation({
        summary: 'Delete Certification.',
        description: `Delete target Certification ID, this should trigger deletion of the document also`
    })
    @ApiOkResponse({
        description: 'Successfully Delete response successful message.',
        type: CertificationDTO,
    })
    async deleteCertificationById(@Param('certificationId') certificationId: string): Promise<string> {
        return await this.certificationsService.deleteCertification(certificationId);
    }

    @Post("/upload-document")
    @ApiOperation({
        summary: 'Upload the document image of the Certification',
        description: `This is store the document image to the document repository. The document identifier will be tag to the certification`
    })
    @ApiOkResponse({
        description: 'Successfully POST will response a CertificationDTO with documentIdentifier.',
        type: CertificationDTO,
    })
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<CertificationDTO> {
        return await this.certificationsService.uploadDocument(body.certificationId, body.documentBase64);
    }
}