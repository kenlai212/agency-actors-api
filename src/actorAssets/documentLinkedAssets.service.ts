import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ActorAssetsService } from "./actorAssets.service";
import { DocumentLinkedAssetDTO } from "./documentLinkedAssets.dtos";
import { DocumentLinkedAsset } from "./documentLinkedAsset.entity";
import { UploadedDocumentsService } from "../uploadedDocuments/uploadedDocuments.service";
import { UploadedDocumentType } from "../uploadedDocuments/uploadedDocument.entity";

export abstract class DocumentLinkedAssetsService<T extends DocumentLinkedAsset, K extends DocumentLinkedAssetDTO> extends ActorAssetsService<T, K> {
    private readonly uploadedDocumentsService: UploadedDocumentsService

    constructor(
        protected readonly repository: Repository<T>
    ) {
        super(repository)
    }

    async uploadDocument(actorId: string, assetId: string, documentBase64: string, uploadedDocumentType: UploadedDocumentType): Promise<K> {
        let asset = await this.repository.findOneBy({ assetId } as any)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateUploadedDocumentId() not available");
            });

        if (!asset)
            throw new NotFoundException(`Asset with id ${assetId} not found`);

        const uploadedDocumentDTO = await this.uploadedDocumentsService.uploadNewDocument(actorId, uploadedDocumentType, documentBase64, assetId);

        asset.uploadedDocumentId = uploadedDocumentDTO.uploadedDocumentId;

        asset = await this.repository.save(asset)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateUploadedDocumentId() not available");
            });

        return this.entityToDTO(asset);
    }
}