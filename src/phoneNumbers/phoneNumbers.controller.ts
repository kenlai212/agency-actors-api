import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreatePhoneNumberRequestDTO, FindPhoneNumberRequestDTO, PhoneNumberDTO } from "./phoneNumbers.dtos";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { PhoneNumbersService } from "./phoneNumber.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";
import { PhoneNumber } from "./phoneNumber.entity";

@Controller("/phone-numbers")
export class PhoneNumbersController extends ActorAssetsController {
    constructor(
        private readonly phoneNumbersService: PhoneNumbersService
    ) {
        super(phoneNumbersService);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Phone Number for an Actor',
        description: `Actor can have multiple phone numbers`
    })
    @ApiOkResponse({
        description: 'Successfully POST response PhoneNumberDTO.',
        type: PhoneNumberDTO,
    })
    async createPhoneNumber(@Body() dto: CreatePhoneNumberRequestDTO): Promise<PhoneNumberDTO> {
        let entity = new PhoneNumber();
        entity.actorId = dto.actorId;

        await this.phoneNumbersService.validateUniquePhoneNumber(dto.countryCode, dto.numberString);
        entity.countryCode = dto.countryCode;
        entity.numberString = dto.numberString;

        entity.phoneNumberType = dto.phoneNumberType;

        return await this.phoneNumbersService.createAsset(entity);
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