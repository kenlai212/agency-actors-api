import { Body, Controller, Post } from "@nestjs/common";
import { PhysicalAddressesService } from "./physicalAddresses.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { CreateNewPhysicalAddressRequestDTO, PhysicalAddressDTO } from "./physicalAddresses.dtos";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { PhysicalAddress } from "./physicalAddress.entity";

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
    async createNewPhysicalAddress(@Body() dto: CreateNewPhysicalAddressRequestDTO): Promise<PhysicalAddressDTO> {
        let entity = new PhysicalAddress();
        entity.actorId = dto.actorId;
        entity.addressType = dto.addressType;

        if (dto.addressLine1)
            entity.addressLine1 = dto.addressLine1;

        if (dto.addressLine2)
            entity.addressLine2 = dto.addressLine2;

        if (dto.addressLine3)
            entity.addressLine3 = dto.addressLine3;

        if (dto.addressLine4)
            entity.addressLine4 = dto.addressLine4;

        if (dto.addressLine5)
            entity.addressLine5 = dto.addressLine5;

        return await this.physicalAddressesService.createAsset(entity);
    }
}