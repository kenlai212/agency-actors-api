import { Body, Controller, Post } from "@nestjs/common";
import { CertificationDTO, NewCertificationRequestDTO } from "./certifications.dtos";
import { CertificationsService } from "./certifications.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";
import { UploadDocumentRequestDTO } from "../actorAssets/documentLinkedAssets.dtos";

@Controller("/certifications")
export class CertificationsController extends ActorAssetsController {
    constructor(
        private readonly certificationsService: CertificationsService
    ) {
        super(certificationsService)
    }

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
        return await this.certificationsService.uploadDocument(body.assetId, body.documentBase64);
    }
}