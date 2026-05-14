import { Body, Controller, Post, Put } from "@nestjs/common";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { NationalityDTO, NewNationalityRequestDTO } from "./nationalities.dtos";
import { NationalitiesService } from "./nationalities.service";

@Controller("nationalities")
export class NationalitiesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly service: NationalitiesService
    ) {
        super(service)
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Nationality.',
        description: `New Nationality must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${NationalityDTO.name}.`,
        type: NationalityDTO
    })
    async newAsset(@Body() dto: NewNationalityRequestDTO) {
        return this.assetsService.createAsset(dto);
    }
}