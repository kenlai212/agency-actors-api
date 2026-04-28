import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from "@nestjs/common";
import { CertificationDTO, FindCertificationsRequestDTO, NewCertificationRequestDTO, UploadLicenseRequestDTO } from "./certifications.dtos";
import { CertificationsService } from "./certifications.service";

@Controller()
export class CertificationsController {
    constructor(
        private readonly certificationsService: CertificationsService
    ) { }

    @Post("/certification")
    async newCertification(@Body() body: NewCertificationRequestDTO): Promise<CertificationDTO> {
        return this.certificationsService.createCertification(
            body.actorType,
            body.actorId,
            body.authority,
            body.certificateName,
            body.certificateNumber,
            body.startDate,
            body.endDate
        );
    }

    @Get("/certification")
    async getCertificationsByCandidateId(@Query() query: FindCertificationsRequestDTO): Promise<Array<CertificationDTO>> {
        const certifications = await this.certificationsService.findCertifications(query.actorType, query.actorId);

        if (certifications.length === 0) {
            throw new NotFoundException("No certifications found for actor ID: " + query.actorId);
        }

        return certifications;
    }

    @Delete("/certification/:certificationId")
    async deleteCertificationById(@Query('certificationId') certificationId: string): Promise<void> {
        await this.certificationsService.deleteCertification(certificationId);
    }

    @Post("/certification/upload-license")
    async uploadLicense(@Body() body: UploadLicenseRequestDTO): Promise<CertificationDTO> {
        return await this.certificationsService.uploadLicense(body.certificationId, body.documentBase64);
    }
}