import { Body, Controller, Post, Put } from "@nestjs/common";
import { CertificationDTO, NewCertificationRequestDTO, UpdateCertificationRequestDTO } from "./certifications.dtos";
import { CertificationsService } from "./certifications.service";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { ActorAssetsController } from "../actorAssets/actorAssets.controller";

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
    @ApiCreatedResponse({
        description: `Successfully POST response ${CertificationDTO.name}.`,
        type: NewCertificationRequestDTO
    })
    async newAsset(@Body() dto: NewCertificationRequestDTO) {
        return this.assetsService.createAsset(dto);
    }

    @Put("/")
    @ApiOperation({
        summary: 'Update Certification.',
        description: `Update Certification`
    })
    @ApiOkResponse({
        description: 'Successfully POST response CertificationDTO.',
        type: CertificationDTO,
    })
    async updateAsset(@Body() body: UpdateCertificationRequestDTO): Promise<CertificationDTO> {
        return this.certificationsService.updateAsset(body);
    }
}