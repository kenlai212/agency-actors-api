import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ActorAssetsService } from "./actorAssets.service";
import { DocumentLinkedAssetDTO } from "./documentLinkedAssets.dtos";
import { DocumentLinkedAsset } from "./documentLinkedAsset.entity";
import { UpdateAssetRequestDTO } from "./actorAssets.dtos";

export abstract class DocumentLinkedAssetsService<T extends DocumentLinkedAsset, K extends DocumentLinkedAssetDTO> extends ActorAssetsService<T, K> {
    constructor(
        protected readonly repository: Repository<T>
    ) {
        super(repository)
    }

    async uploadDocument(assetId: string, uploadedDocumentId: string): Promise<K> {
        let asset = await this.repository.findOneBy({ assetId } as any)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateUploadedDocumentId() not available");
            });

        if (!asset)
            throw new NotFoundException(`Asset with id ${assetId} not found`);

        asset.uploadedDocumentId = uploadedDocumentId;

        asset = await this.repository.save(asset)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateUploadedDocumentId() not available");
            });

        return this.entityToDTO(asset);
    }

    async updateAsset(dto: UpdateAssetRequestDTO): Promise<K> {
        let entity: T = await this.updateAssetDtoToEntity(dto);

        entity = await this.repository.save(entity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateAsset() not available");
            });

        return this.entityToDTO(entity);
    }

    abstract updateAssetDtoToEntity(dto: UpdateAssetRequestDTO): Promise<T>
}