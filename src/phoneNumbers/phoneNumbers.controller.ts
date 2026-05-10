import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { CreatePhoneNumberRequestDTO, FindPhoneNumberRequestDTO, PhoneNumberDTO } from "./phoneNumbers.dtos";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { PhoneNumbersService } from "./phoneNumber.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";
import { AuthGuard } from "../auth.guard";

@Controller("/phone-numbers")
export class PhoneNumbersController extends ActorAssetsController {
    constructor(
        private readonly phoneNumbersService: PhoneNumbersService
    ) {
        super(phoneNumbersService);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("/")
    @ApiOperation({
        summary: 'Create new Phone Number for an Actor',
        description: `Actor can have multiple phone numbers`
    })
    @ApiOkResponse({
        description: 'Successfully POST response PhoneNumberDTO.',
        type: PhoneNumberDTO,
    })
    async createPhoneNumber(@Body() body: CreatePhoneNumberRequestDTO): Promise<PhoneNumberDTO> {
        return await this.phoneNumbersService.createNewPhoneNumber(body.actorId, body.countryCode, body.numberString, body.phoneNumberType)
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
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