import { Injectable } from "@nestjs/common";
import { PhysicalAddress } from "./physicalAddress.entity";
import { NewPhysicalAddressRequestDTO, PhysicalAddressDTO, UpdatePhysicalAddressRequestDTO } from "./physicalAddresses.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Injectable()
export class PhysicalAddressesService extends DocumentLinkedAssetsService<PhysicalAddress, PhysicalAddressDTO> {
    constructor(
        @InjectRepository(PhysicalAddress)
        private readonly physicalAddressesRepository: Repository<PhysicalAddress>,
    ) {
        super(physicalAddressesRepository);
    }

    async updateAssetDtoToEntity(dto: UpdatePhysicalAddressRequestDTO): Promise<PhysicalAddress> {
        let entity = await this.validateAssetId(dto.assetId);

        if (dto.addressType)
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

        return entity;
    }

    async createNewAssetDtoToEntity(dto: NewPhysicalAddressRequestDTO): Promise<PhysicalAddress> {
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

        return entity;
    }

    entityToDTO(entity: PhysicalAddress): PhysicalAddressDTO {
        let dto = new PhysicalAddressDTO(entity);
        dto.addressLine1 = entity.addressLine1;
        dto.addressLine2 = entity.addressLine2;
        dto.addressLine3 = entity.addressLine3;
        dto.addressLine4 = entity.addressLine4;
        dto.addressLine5 = entity.addressLine5;
        dto.addressType = entity.addressType;
        return dto;
    }
}