import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreatePhoneNumberRequestDTO, PhoneNumberDTO, SearchPhoneNumberDTO } from "./phoneNumbers.dtos";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { PhoneNumbersService } from "./phoneNumber.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";

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
    async createPhoneNumber(@Body() body: CreatePhoneNumberRequestDTO): Promise<PhoneNumberDTO> {
        return await this.phoneNumbersService.createNewPhoneNumber(body.actorId, body.countryCode, body.numberString, body.phoneNumberType)
    }

    @Get("/")
    @ApiOperation({
        summary: 'Search Phone Numbers belonging to an Actor',
        description: `If actorId is provided, the search will be limited to that Actor, if the phone number is provided, the search will be limited to the phone number record`
    })
    @ApiOkResponse({
        description: 'Successfully GET response array PhoneNumberDTO.',
        type: PhoneNumberDTO,
    })
    async searchPhoneNumbers(@Query() query: SearchPhoneNumberDTO): Promise<PhoneNumberDTO[]> {
        return await this.phoneNumbersService.searchPhoneNuber(query.actorId, query.countryCode, query.numberString);
    }

}