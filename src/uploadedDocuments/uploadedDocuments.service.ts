import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StorageFacility, UploadedDocumentType, UploadedDocument } from "./uploadedDocument.entity";
import { Repository } from "typeorm";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";
import { UploadedDocumentDTO } from "./uploadedDocuments.dtos";

@Injectable()
export class UploadedDocumentsService {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        @InjectRepository(UploadedDocument)
        private readonly entityRepository: Repository<UploadedDocument>,
        private readonly agencyActorService: AgencyActorsService
    ) { }

    async uploadNewDocument(actorId: string, uploadedDocumentType: UploadedDocumentType, base64String: string, assetId?: string): Promise<UploadedDocumentDTO> {
        let entity = new UploadedDocument();

        await this.agencyActorService.validateActorId(actorId);
        entity.actorId;

        entity.uploadedDocumentType = uploadedDocumentType;

        //TODO validate asset ID
        if (assetId)
            entity.assetId = assetId;

        //todo make this configurable
        entity.storageFacility = StorageFacility.ALFRESCO;

        entity.storageRecordId = await this.callExternalStorageService(base64String, actorId);

        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("uploadNewDocument() not available");
            });

        return this.entityToDTO(entity);
    }

    async callExternalStorageService(documentBase64: string, identifier: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    entityToDTO(entity: UploadedDocument): UploadedDocumentDTO {
        let dto = new UploadedDocumentDTO;
        dto.uploadedDocumentId = entity.uploadedDocumentId;
        dto.uploadedDocumentType = entity.uploadedDocumentType;
        dto.actorId = entity.actorId;
        dto.assetId = entity.assetId;
        dto.storageFacility = entity.storageFacility;
        dto.storageRecordId = entity.storageRecordId;
        dto.uploadedAt = entity.createdAt;

        return dto;
    }
}