import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateNewEmailAddressRequestDTO, EmailAddressDTO, SearchEmailAddressesRequestDTO, SetLockEmailAddressRequestDTO } from "./emailAddresses.dtos";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EmailAdddressesService } from "./emailAddresses.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.contorller";

@Controller("/email-addresses")
export class EmailAddressesController extends ActorAssetsController {
    constructor(
        private readonly emailAddressesService: EmailAdddressesService
    ) {
        super(emailAddressesService)
    }

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
        return await this.emailAddressesService.createNewEmailAddress(body.actorId, body.addressString);
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
        return await this.emailAddressesService.searchEmailAddresses(query.actorId, query.addressString);
    }

    /*@Delete("/:assetId")
    @ApiOperation({
        summary: 'Delete an Email Address for an Actor'
    })
    @ApiOkResponse({
        description: 'Successfully DELETE response a successful message',
        type: String,
    })
    async deleteEmailAddress(@Param("assetId") assetId: string): Promise<string> {
        return await this.emailAddressesService.deleteAsset(assetId);
    }*/

    @Put("/lock-email-address")
    @ApiOperation({
        summary: 'Lock an Email Address for an Actor'
    })
    @ApiOkResponse({
        description: 'Successfully PUT response list of EmailAddressDTOs belonging to the actor',
        type: Array<EmailAddressDTO>,
    })
    async setLockEmailAddress(@Body() body: SetLockEmailAddressRequestDTO): Promise<EmailAddressDTO[]> {
        return await this.emailAddressesService.lockEmailAddress(body.actorId, body.addressString);
    }
}