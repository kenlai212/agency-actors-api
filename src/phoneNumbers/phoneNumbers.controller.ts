import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FindPhoneNumberRequestDTO, NewPhoneNumberRequestDTO, PhoneNumberDTO } from "./phoneNumbers.dtos";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { PhoneNumbersService } from "./phoneNumber.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.controller";

@Controller("/phone-numbers")
export class PhoneNumbersController extends ActorAssetsController {
    constructor(
        private readonly phoneNumbersService: PhoneNumbersService
    ) {
        super(phoneNumbersService);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Phone Number.',
        description: `New Phone Number must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${PhoneNumberDTO.name}.`,
        type: NewPhoneNumberRequestDTO
    })
    async newAsset(@Body() dto: NewPhoneNumberRequestDTO) {
        return this.assetsService.createAsset(dto);
    }

    @Get("/")
    @ApiOperation({
        summary: 'Find Asset.',
        description: `Search by assetId, returns single asset record`
    })
    @ApiOkResponse({
        description: 'Successfully GET response ActorAssetDTO.',
        type: PhoneNumberDTO,
    })
    async searchAssets(@Query() query: FindPhoneNumberRequestDTO): Promise<PhoneNumberDTO> {
        return await this.phoneNumbersService.findPhoneNumber(query);
    }
}