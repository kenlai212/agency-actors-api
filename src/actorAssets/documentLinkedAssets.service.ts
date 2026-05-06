import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ActorAssetsService } from "./actorAssets.service";
import { DocumentLinkedAssetDTO } from "./documentLinkedAssets.dtos";
import { DocumentLinkedAsset } from "./documentLinkedAsset.entity";

export abstract class DocumentLinkedAssetsService<T extends DocumentLinkedAsset, K extends DocumentLinkedAssetDTO> extends ActorAssetsService<T, K> {
    constructor(
        protected readonly repository: Repository<T>
    ) {
        super(repository)
    }

    async updateUploadedDocumentId(assetId: string, uplodededDocumentId: string) {
        let asset = await this.repository.findOneBy({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("updateUploadedDocumentId() not available");
            });

        if (!asset)
            throw new NotFoundException(`Asset with id ${assetId} not found`);

        asset.uploadedDocumentId = uplodededDocumentId;

        asset = await this.repository.save(asset)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("updateUploadedDocumentId() not available");
            });

        return this.entityToDTO(asset);
    }
}