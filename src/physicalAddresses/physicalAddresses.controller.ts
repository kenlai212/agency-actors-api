import { Body, Controller, Post } from "@nestjs/common";
import { DocumentLinkedAssetsController } from "../actorAssets/actorAssets.contorller";
import { PhysicalAddressesService } from "./physicalAddresses.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CreateNewPhysicalAddressRequestDTO, PhysicalAddressDTO } from "./physicalAddresses.dtos";

@Controller("/physical-addresses")
export class PhysicalAddressesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly physicalAddressesService: PhysicalAddressesService
    ) {
        super(physicalAddressesService);
    }

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