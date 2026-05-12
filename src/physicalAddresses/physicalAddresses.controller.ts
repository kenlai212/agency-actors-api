import { Body, Controller, Post, Put } from "@nestjs/common";
import { PhysicalAddressesService } from "./physicalAddresses.service";
import { DocumentLinkedAssetsController } from "../actorAssets/documentLinkedAssets.controller";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { NewPhysicalAddressRequestDTO, PhysicalAddressDTO, UpdatePhysicalAddressRequestDTO } from "./physicalAddresses.dtos";

@Controller("/physical-addresses")
export class PhysicalAddressesController extends DocumentLinkedAssetsController {
    constructor(
        private readonly physicalAddressesService: PhysicalAddressesService
    ) {
        super(physicalAddressesService);
    }

    @Post("/")
    @ApiOperation({
        summary: 'Create new Physical Address.',
        description: `New Physical Address must tie to an actor.`
    })
    @ApiCreatedResponse({
        description: `Successfully POST response ${PhysicalAddressDTO.name}.`,
        type: NewPhysicalAddressRequestDTO
    })
    async newAsset(@Body() dto: NewPhysicalAddressRequestDTO) {
        return this.assetsService.createAsset(dto);
    }

    @Put("/")
    @ApiOperation({
        summary: 'Update Physical Address',
        description: `Update Physical Address Issue Document`
    })
    @ApiOkResponse({
        description: `Successfully POST response ${PhysicalAddressDTO.name}`,
        type: PhysicalAddressDTO,
    })
    async updateAsset(@Body() body: UpdatePhysicalAddressRequestDTO): Promise<PhysicalAddressDTO> {
        return this.physicalAddressesService.updateAsset(body);
    }
}