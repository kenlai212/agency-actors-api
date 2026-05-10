import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PhysicalAddressesService } from "./physicalAddresses.service";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CreateNewPhysicalAddressRequestDTO, PhysicalAddressDTO } from "./physicalAddresses.dtos";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { AuthGuard } from "../auth.guard";

@Controller("/physical-addresses")
export class PhysicalAddressesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly physicalAddressesService: PhysicalAddressesService
    ) {
        super(physicalAddressesService);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Post("/")
    @ApiOperation({
        summary: 'Create new Physical Address for an Actor'
    })
    @ApiOkResponse({
        description: 'Successfully POST response PhysicalAddressDTO.',
        type: PhysicalAddressDTO,
    })
    async createNewPhysicalAddress(@Body() body: CreateNewPhysicalAddressRequestDTO): Promise<PhysicalAddressDTO> {
        return await this.physicalAddressesService.createNewPhysicalAddress(body);
    }
}