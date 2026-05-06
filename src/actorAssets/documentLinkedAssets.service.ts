import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";
import { ActorAssetDTO } from "./actorAssets.dtos";
import { Repository } from "typeorm";
import { DocumentLinkedAsset } from "./actorAsset.entity";
import { ActorAssetsService } from "./actorAssets.service";
import { DocumentLinkedAssetDTO } from "./documentLinkedAssets.dtos";

export abstract class DocumentLinkedAssetsService<T extends DocumentLinkedAsset, K extends DocumentLinkedAssetDTO> extends ActorAssetsService<T, K> {
    constructor(
        protected readonly repository: Repository<T>
    ) {
        super(repository)
    }

    async uploadDocument(documentBase64: string, assetId?: string): Promise<K> {
        let asset: T;

        const documentIdentifier = await this.callExternalDocumentStorageService(documentBase64);

        if (assetId) {
            asset = await this.repository.findOne({ assetId } as any)
                .catch((error) => {
                    console.error(error);
                    throw new InternalServerErrorException("uploadDocument() not available");
                });
        }

        if (!asset)
            asset = await this.repository.save(asset)

        asset.documentIdentifier = documentIdentifier;

        asset = await this.repository.save(asset)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("uploadDocument() not available");
            });

        return this.entityToDTO(asset);
    }

    async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    async deleteAsset(assetId: string): Promise<string> {
        const asset = await this.repository.findOneBy({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        if (!asset) {
            throw new BadRequestException("Certification with ID " + assetId + " not found");
        }

        if (asset.documentIdentifier) {
            await this.repository.delete({ assetId } as any)
                .catch((error) => {
                    console.error(error);
                    throw new InternalServerErrorException("deleteAsset() not available");
                });

            await this.callExternalDocumentStorageDeleteService(asset.documentIdentifier);
        }

        const msg = `Successfully deleted ${assetId}`;
        console.log(msg);
        return msg
    }

    async callExternalDocumentStorageDeleteService(documentId: string): Promise<string> {
        return "Successfully deleted";
    }
}