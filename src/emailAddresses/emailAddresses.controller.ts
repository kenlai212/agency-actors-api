import { Body, Controller, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { NewEmailAddressRequestDTO, EmailAddressDTO, FindEmailAddressRequestDTO, SetDefaultEmailAddressRequestDTO, CheckExistingEmailAddressRequestDTO } from "./emailAddresses.dtos";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EmailAdddressesService } from "./emailAddresses.service";
import { ActorAssetsController } from "../actorAssets/actorAssets.controller";
import { AuthGuard } from "../auth.guard";

@Controller("/email-addresses")
export class EmailAddressesController extends ActorAssetsController {
    constructor(
        private readonly emailAddressesService: EmailAdddressesService
    ) {
        super(emailAddressesService)
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Email Address.',
        description: `New Email Address must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${EmailAddressDTO.name}.`,
        type: NewEmailAddressRequestDTO
    })
    async newAsset(@Body() dto: NewEmailAddressRequestDTO) {
        return this.assetsService.createAsset(dto);
    }

    @Put("/set-default")
    @ApiOperation({
        summary: 'Set default Email Address for an Actor'
    })
    @ApiOkResponse({
        description: 'Successfully PUT response list of EmailAddressDTOs belonging to the actor',
        type: Array<EmailAddressDTO>,
    })
    async setLockEmailAddress(@Body() body: SetDefaultEmailAddressRequestDTO): Promise<EmailAddressDTO[]> {
        return await this.emailAddressesService.setDdfault(body.actorId, body.addressString);
    }

    @Get("/")
    @ApiOperation({
        summary: 'Find Asset.',
        description: `Search by assetId, returns single asset record`
    })
    @ApiOkResponse({
        description: 'Successfully GET response ActorAssetDTO.',
        type: EmailAddressDTO,
    })
    async searchAssets(@Query() query: FindEmailAddressRequestDTO): Promise<EmailAddressDTO> {
        return await this.emailAddressesService.findEmailAddress(query);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Check if email address is existing',
        description: `Return Ture or false`
    })
    @ApiOkResponse({
        description: 'Successfully GET response boolen.',
        type: Boolean,
    })
    @Get("/check-existing")
    async validateUniqueEmailAddress(@Query() query: CheckExistingEmailAddressRequestDTO): Promise<boolean> {
        return await this.emailAddressesService.checkingExisting(query.addressString)
    }
}