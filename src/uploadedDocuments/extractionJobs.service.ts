import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExtractionJob } from "./extractionJob.entity";
import { UploadedDocumentType } from "./uploadedDocument.entity";
import { randomUUID } from 'crypto';

export enum ExtractionJobType {
    CLASSIFICATION = "CLASSIFICATION",
    QUICK_VALIDATION = "QUICK_VALIDATION",
    DETAIL_EXTRACTION = "DETAIL_EXTRACTION"
}

@Injectable()
export class ExtractionJobsService {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        @InjectRepository(ExtractionJob)
        private readonly entityRepository: Repository<ExtractionJob>
    ) { }

    async createNewExtractionJob(uploadedDocumentId: string, documentBase64: string, documentType: UploadedDocumentType, extractionJobType: ExtractionJobType): Promise<ExtractionJob> {
        let entity = new ExtractionJob();
        entity.uploadedDocumentId = uploadedDocumentId;

        const templateId = await this.lookupTemplateId(documentType, extractionJobType);
        entity.externalExtractionJobTemplateId = templateId;

        entity.externalExtractionJobIdentifier = await this.callExternalExtractionAPI(documentBase64, templateId)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("External Extraction API not available");
            });

        await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("createNewExtractionJob() not available");
            });

        return entity;
    }

    async updateExtractionResult(externalExtractionJobIdentifier: string, extractionResult: JSON) {
        let entity = await this.entityRepository.findOne({ where: { externalExtractionJobIdentifier } })
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("updateSymanticsData not available");
            });

        if (!entity)
            throw new BadRequestException(`Invalid externalExtractionJobIdentifier: ${externalExtractionJobIdentifier}`);

        entity.extractionResult = extractionResult;

        await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error.stack);
                throw new InternalServerErrorException("createNewSymanticsData() not available");
            });

        //todo validation of extraction result
        //todo populate actor asset
    }

    private async lookupTemplateId(uploadedDocumentType: UploadedDocumentType, extractionJobType: ExtractionJobType): Promise<string> {
        const templates = [
            {
                templateId: "T1_V",
                documentType: UploadedDocumentType.RESUME,
                extractionJobType: ExtractionJobType.QUICK_VALIDATION
            },
            {
                templateId: "T1_E",
                documentType: UploadedDocumentType.RESUME,
                extractionJobType: ExtractionJobType.DETAIL_EXTRACTION
            },
            {
                templateId: "T2_V",
                documentType: UploadedDocumentType.GOVERMENT_ISSUE_DOCUMENT,
                extractionJobType: ExtractionJobType.QUICK_VALIDATION
            },
            {
                templateId: "T2_E",
                documentType: UploadedDocumentType.GOVERMENT_ISSUE_DOCUMENT,
                extractionJobType: ExtractionJobType.DETAIL_EXTRACTION
            }
        ]

        const template = templates.find(item => item.documentType === uploadedDocumentType && item.extractionJobType === extractionJobType);

        if (!template)
            throw new BadRequestException(`Invalid ${uploadedDocumentType} & ${extractionJobType}`);

        this.logger.log(`Found matching template : ${JSON.stringify(template)}`);

        return template.templateId;
    }

    //call IDP API, expect IDP extractionJobIdentifier
    private async callExternalExtractionAPI(documentBase64: string, templateId: string): Promise<string> {
        return randomUUID();
    }
}