import { Injectable } from "@nestjs/common";
import { PhysicalAddress } from "./physicalAddress.entity";
import { PhysicalAddressDTO } from "./physicalAddresses.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class PhysicalAddressesService extends DocumentLinkedAssetsService<PhysicalAddress, PhysicalAddressDTO> {
    constructor(
        @InjectRepository(PhysicalAddress)
        private readonly physicalAddressesRepository: Repository<PhysicalAddress>,
    ) {
        super(physicalAddressesRepository);
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