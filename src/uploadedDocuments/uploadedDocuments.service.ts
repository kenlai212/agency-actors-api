import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StorageFacility, UploadedDocumentType, UploadedDocument, UploadDocumentStatus } from "./uploadedDocument.entity";
import { Repository } from "typeorm";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";
import { UploadDocumentRequestDTO, UploadedDocumentDTO } from "./uploadedDocuments.dtos";

@Injectable()
export class UploadedDocumentsService {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        @InjectRepository(UploadedDocument)
        private readonly entityRepository: Repository<UploadedDocument>,
        private readonly agencyActorService: AgencyActorsService,
    ) { }

    async uploadNewDocument(dto: UploadDocumentRequestDTO): Promise<UploadedDocumentDTO> {
        let entity = new UploadedDocument();

        await this.agencyActorService.validateActorId(dto.actorId);
        entity.actorId;

        entity.uploadedDocumentType = dto.uploadedDocumentType;

        //TODO validate asset ID
        if (dto.assetId)
            entity.assetId = dto.assetId;

        entity.uploadDocumentStatus = UploadDocumentStatus.SUBMITTED;

        entity.documentBase64 = dto.documentBase64;

        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("uploadNewDocument() not available");
            });

        return this.entityToDTO(entity);
    }

    async callexternalFileScanService(uploadedDocumentId: string): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        //todo call file scan api

        entity.uploadDocumentStatus = UploadDocumentStatus.SCANNED;

        return this.saveUploadedDocument(entity);
    }

    async callExternalStorageService(uploadedDocumentId: string): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        //todo make this configurable
        entity.storageFacility = StorageFacility.ALFRESCO;

        //todo call doc store api and set storageRecordId;
        entity.storageRecordId = "ALFRESCO1234"

        entity.uploadDocumentStatus = UploadDocumentStatus.UPLOADED;

        return this.saveUploadedDocument(entity);
    }

    async callExternalDocumentClassification(uploadedDocumentId): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        //todo call IDP classification
        entity.uploadDocumentStatus = UploadDocumentStatus.CLASSIFIED;

        return this.saveUploadedDocument(entity);
    }

    async classExternalSemanticDataValidation(uploadedDocumentId: string): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        //todo call IDP extraction
        //todo get validation templateId

        entity.extractionJobId = "IDP0000";
        entity.uploadDocumentStatus = UploadDocumentStatus.VALIDATED;

        return this.saveUploadedDocument(entity);
    }

    async callExternalSemanticDataExtraction(uploadedDocumentId: string): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        //todo call IDP extration
        //todo get extraction templateId

        entity.extractionJobId = "IDP1234"
        entity.uploadDocumentStatus = UploadDocumentStatus.EXTRACTING;

        return this.saveUploadedDocument(entity);
    }

    async validateUploadedDocumentId(uploadedDocumentId: string) {
        const uploadedDocument = await this.entityRepository.findOne({ where: { uploadedDocumentId } })
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("validateUploadedDocumentId() not available");
            });

        if (!uploadedDocument)
            throw new BadRequestException(`Invalid uploadedDocumentId : ${uploadedDocumentId}`);
    }

    private async getUploadedDocument(uploadedDocumentId: string): Promise<UploadedDocument> {
        let entity = await this.entityRepository.findOne({ where: { uploadedDocumentId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("getUploadedDocument() not available");
            });

        if (!entity)
            throw new BadRequestException(`Invalid uploadedDocumentId: ${uploadedDocumentId}`);

        return entity;
    }

    private async saveUploadedDocument(entity: UploadedDocument): Promise<UploadedDocumentDTO> {
        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("saveUploadedDocument() not available");
            });

        return this.entityToDTO(entity);
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
        dto.documentUploadStatus = entity.uploadDocumentStatus;
        dto.documentBase64 = entity.documentBase64;

        return dto;
    }
}