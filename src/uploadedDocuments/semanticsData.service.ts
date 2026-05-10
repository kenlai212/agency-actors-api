import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SemanticsData } from "./semanticsData.entity";
import { Repository } from "typeorm";
import { UploadedDocumentsService } from "./uploadedDocuments.service";

@Injectable()
export class SemanticsDataService {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        @InjectRepository(SemanticsData)
        private readonly entityRepository: Repository<SemanticsData>,
        private readonly uploadedDocumentService: UploadedDocumentsService
    ) { }

    async createNewSymanticsData(uploadedDocumentId: string, abstractedResult: JSON) {
        await this.uploadedDocumentService.validateUploadedDocumentId(uploadedDocumentId);

        let entity = new SemanticsData();
        entity.uploadedDocumentId = uploadedDocumentId;
        entity.abstractedResult = abstractedResult;

        await this.entityRepository.save(entity)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("createNewSymanticsData() not available");
            });
    }
}