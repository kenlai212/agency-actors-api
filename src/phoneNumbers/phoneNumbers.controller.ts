import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreatePhoneNumberRequestDTO, PhoneNumberDTO, SearchPhoneNumberDTO } from "./phoneNumbers.dtos";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { PhoneNumbersService } from "./phoneNumber.service";

@Controller("/phone-numbers")
export class PhoneNumbersController {
    constructor(
        private readonly phoneNumbersService: PhoneNumbersService
    ) { }

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

    @Delete("/:assetId")
    @ApiOperation({
        summary: 'Delete Phone Numbers belonging to an Actor'
    })
    @ApiOkResponse({
        description: 'DELETE response a successfull message',
        type: String,
    })
    async deletePhoneNumber(@Param("assetId") assetId: string): Promise<string> {
        return await this.phoneNumbersService.deleteAsset(assetId);
    }

}