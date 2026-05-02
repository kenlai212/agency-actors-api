import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { CreateNewEmailAddressRequestDTO, EmailAddressDTO, SearchEmailAddressesRequestDTO, SetDefaultEmailAddressRequestDTO } from "./emailAddresses.dtos";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EmailAdddressesService } from "./emailAddresses.service";

@Controller("/email-addresses")
export class EmailAddressesController {
    constructor(
        private readonly emailAddressesService: EmailAdddressesService
    ) { }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Email Address for an Actor',
        description: `Email Address must be unique for each Actor.`
    })
    @ApiOkResponse({
        description: 'Successfully PUT response EmailAddressDTO.',
        type: EmailAddressDTO,
    })
    async createNewEmailAddress(@Body() body: CreateNewEmailAddressRequestDTO): Promise<EmailAddressDTO> {
        return await this.emailAddressesService.createNewEmailAddress(body.actorId, body.addressString, body.isPrimary);
    }

    @Get("/")
    @ApiOperation({
        summary: 'Search all Email Addresses belonging to an Actor',
        description: `If actorId is provided, the search will be limited to that Actor, if addressString is provided, the search will be limited to that address`
    })
    @ApiOkResponse({
        description: 'Successfully GET response and array of EmailAddressDTOs.',
        type: EmailAddressDTO,
    })
    async searchEmailAddresses(@Query() query: SearchEmailAddressesRequestDTO): Promise<EmailAddressDTO[]> {
        return [];
    }

    @Delete("/:emailAddressId")
    @ApiOperation({
        summary: 'Delete an Email Address for an Actor'
    })
    @ApiOkResponse({
        description: 'Successfully DELETE response a successful message',
        type: String,
    })
    async deleteEmailAddress(@Param("emailAddressId") EmailAddressId: string): Promise<string> {
        return "Successfully deleted email address"
    }

    async setDefaultEmailAddress(@Body() body: SetDefaultEmailAddressRequestDTO): Promise<EmailAddressDTO[]> {
        return [];
    }
}