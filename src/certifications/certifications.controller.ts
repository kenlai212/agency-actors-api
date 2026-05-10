import { Body, Controller, Post, Put, UseGuards } from "@nestjs/common";
import { CertificationDTO, NewCertificationRequestDTO, UpdateCertificationRequestDTO } from "./certifications.dtos";
import { CertificationsService } from "./certifications.service";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";
import { AuthGuard } from "../auth.guard";

@Controller("/certifications")
export class CertificationsController extends ActorAssetsController {
    constructor(
        private readonly certificationsService: CertificationsService
    ) {
        super(certificationsService)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("/")
    @ApiOperation({
        summary: 'Create new Certification.',
        description: `New Certification must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: 'Successfully POST response CertificationDTO.',
        type: CertificationDTO,
    })
    async newCertification(@Body() body: NewCertificationRequestDTO): Promise<CertificationDTO> {
        return this.certificationsService.createCertification(body);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Put("/")
    @ApiOperation({
        summary: 'Update Certification.',
        description: `Update Certification`
    })
    @ApiOkResponse({
        description: 'Successfully POST response CertificationDTO.',
        type: CertificationDTO,
    })
    async updateCertification(@Body() body: UpdateCertificationRequestDTO): Promise<CertificationDTO> {
        return this.certificationsService.updateCertification(body);
    }
}