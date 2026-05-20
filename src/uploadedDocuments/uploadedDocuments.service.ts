import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StorageFacility, UploadedDocumentType, UploadedDocument, UploadDocumentStatus } from "./uploadedDocument.entity";
import { Between, FormattedConsoleLogger, Repository } from "typeorm";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";
import { SearchUploadedDocumentsRequestDTO, SearchUploadedDocumentsResponseDTO, UploadDocumentRequestDTO, UploadedDocumentDTO } from "./uploadedDocuments.dtos";
import { ExtractionJobsService, ExtractionJobType } from "./extractionJobs.service";
import { validate } from "class-validator";

@Injectable()
export class UploadedDocumentsService {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        @InjectRepository(UploadedDocument)
        private readonly entityRepository: Repository<UploadedDocument>,
        private readonly extractionJobsService: ExtractionJobsService
    ) { }

    async uploadNewDocument(dto: UploadDocumentRequestDTO): Promise<UploadedDocumentDTO> {
        validate(dto).then(errors => {
            if (errors.length > 0)
                throw new BadRequestException(errors.toString());
        });

        let entity = new UploadedDocument();

        await this.validateActorId(dto.actorId);
        entity.actorId = dto.actorId;

        entity.uploadedDocumentType = dto.uploadedDocumentType;

        //TODO validate asset ID
        if (dto.assetId)
            entity.assetId = dto.assetId;

        entity.uploadDocumentStatus = UploadDocumentStatus.SUBMITTED;

        entity.documentBase64 = dto.documentBase64;

        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("uploadNewDocument() not available");
            });

        return this.entityToDTO(entity);
    }

    async searchUploadedDocuments(dto: SearchUploadedDocumentsRequestDTO): Promise<SearchUploadedDocumentsResponseDTO> {
        if (!dto.searchRangeEnd)
            dto.searchRangeEnd = new Date();

        const documents = await this.entityRepository.find({
            where: {
                createdAt: Between(
                    dto.searchRangeStart,
                    dto.searchRangeEnd
                )
            }
        })

        let respone = new SearchUploadedDocumentsResponseDTO();
        respone.documents = [];
        documents.forEach(document => {
            respone.documents.push(this.entityToDTO(document));
        });

        return respone;
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

    async callExternalDocumentClassification(uploadedDocumentId: string): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        await this.extractionJobsService.createNewExtractionJob(uploadedDocumentId, entity.documentBase64, entity.uploadedDocumentType, ExtractionJobType.CLASSIFICATION);
        entity.uploadDocumentStatus = UploadDocumentStatus.CLASSIFYING;

        return this.saveUploadedDocument(entity);
    }

    async callExternalQuickValidation(uploadedDocumentId: string): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        await this.extractionJobsService.createNewExtractionJob(uploadedDocumentId, entity.documentBase64, entity.uploadedDocumentType, ExtractionJobType.QUICK_VALIDATION);
        entity.uploadDocumentStatus = UploadDocumentStatus.VALIDATING;

        return this.saveUploadedDocument(entity);
    }

    async callExternalDetailExtraction(uploadedDocumentId: string): Promise<UploadedDocumentDTO> {
        let entity = await this.getUploadedDocument(uploadedDocumentId);

        await this.extractionJobsService.createNewExtractionJob(uploadedDocumentId, entity.documentBase64, entity.uploadedDocumentType, ExtractionJobType.DETAIL_EXTRACTION)
        entity.uploadDocumentStatus = UploadDocumentStatus.EXTRACTING;

        return this.saveUploadedDocument(entity);
    }

    private async validateActorId(actorId: string) {
        return true
    }

    private async getUploadedDocument(uploadedDocumentId: string): Promise<UploadedDocument> {
        let entity = await this.entityRepository.findOne({ where: { uploadedDocumentId } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("getUploadedDocument() not available");
            });

        if (!entity)
            throw new BadRequestException(`Invalid uploadedDocumentId: ${uploadedDocumentId}`);

        return entity;
    }

    private async saveUploadedDocument(entity: UploadedDocument): Promise<UploadedDocumentDTO> {
        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error.stack);
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