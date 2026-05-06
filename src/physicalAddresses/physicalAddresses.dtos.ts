import { CreateNewDocumentLinkedAssetRequestDTO, DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { PhysicalAddressType } from "./physicalAddress.entity";

export class PhysicalAddressDTO extends DocumentLinkedAssetDTO {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    addressType: PhysicalAddressType;
}

export class CreateNewPhysicalAddressRequestDTO extends CreateNewDocumentLinkedAssetRequestDTO {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    addressType: PhysicalAddressType;
}