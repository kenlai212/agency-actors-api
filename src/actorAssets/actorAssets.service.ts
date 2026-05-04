import { BadRequestException, Inject, InternalServerErrorException, Logger } from "@nestjs/common";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";
import { ActorAssetDTO } from "./actorAssets.dtos";
import { ObjectLiteral, Repository } from "typeorm";
import { ActorAsset, DocumentLinkedAsset } from "./actorAsset.entity";

export abstract class ActorAssetsService<T extends ActorAsset, K extends ActorAssetDTO> {
    @Inject(AgencyActorsService) protected readonly agencyActorsService: AgencyActorsService;

    constructor(
        protected readonly repository: Repository<T>
    ) { }

    protected async validateActor(actorId: string) {
        await this.agencyActorsService.validateActorId(actorId);
    }

    async searchAssets(actorId?: string, assetId?: string) {
        if (!actorId && !assetId)
            throw new BadRequestException(`Must provide either one of actorId or assetId`);

        let whereClause = {}
        if (actorId)
            whereClause = { ...whereClause, actorId }
        else
            whereClause = { ...whereClause, assetId }

        const assets = await this.repository.find({ where: whereClause })
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("findCertifications() not available");
            });

        let dtos: Array<K> = [];
        for (const item of assets) {
            dtos.push(this.entityToDTO(item));
        }

        return dtos;
    }

    async deleteAsset(assetId: string) {
        const asset = await this.repository.findOneBy({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        if (!asset) {
            throw new BadRequestException("Certification with ID " + assetId + " not found");
        }

        await this.repository.delete({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("deleteAsset() not available");
            });

        const msg = `Successfully deleted ${assetId}`;
        console.log(msg);
        return msg
    }

    abstract entityToDTO(entity: T): K
}

export abstract class DocumentLinkedAssetsService<T extends DocumentLinkedAsset, K extends ActorAssetDTO> extends ActorAssetsService<T, K> {
    constructor(
        protected readonly repository: Repository<T>
    ) {
        super(repository)
    }

    async uploadDocument(assetId: string, documentBase64: string): Promise<K> {
        let asset = await this.repository.findOne({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("uploadDocument() not available");
            });

        if (!asset)
            throw new BadRequestException(`Invvalid assetId: ${assetId}`);

        const documentIdentifier = await this.callExternalDocumentStorageService(documentBase64);

        asset.documentIdentifier = documentIdentifier;

        asset = await this.repository.save(asset)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("uploadDocument() not available");
            });

        return this.entityToDTO(asset);
    }

    async callExternalDocumentStorageDeleteService(documentId: string): Promise<string> {
        return "Successfully deleted";
    }

    async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }
}