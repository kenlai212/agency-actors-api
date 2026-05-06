import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StorageFacility, UploadDocumentType, UploadedDocument } from "./uploadedDocument.entity";
import { Repository } from "typeorm";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";

@Injectable()
export class UploadedDocumentService {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        @InjectRepository(UploadedDocument)
        private readonly entityRepository: Repository<UploadedDocument>,
        private readonly agencyActorService: AgencyActorsService
    ) { }

    async uploadNewDocument(actorId: string, uploadDocumentType: UploadDocumentType, base64String: string): Promise<string> {
        let entity = new UploadedDocument();

        await this.agencyActorService.validateActorId(actorId);
        entity.actorId;

        entity.uploadDocumentType = uploadDocumentType;

        //todo make this configurable
        entity.storageFacility = StorageFacility.ALFRESCO;

        entity.storageRecordId = await this.callExternalStorageService(base64String, actorId);

        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("uploadNewDocument() not available");
            });

        return entity.uploadedDocumentId;
    }

    async callExternalStorageService(documentBase64: string, identifier: string): Promise<string> {
        return "https://example.com/document/12345";
    }
}