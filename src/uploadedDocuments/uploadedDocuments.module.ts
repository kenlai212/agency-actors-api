import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadedDocument } from "./uploadedDocument.entity";
import { UploadedDocumentsService } from "./uploadedDocuments.service";
import { UploadedDocumentsController } from "./uploadedDocuments.controller";
import { ExtractionJobsService } from "./extractionJobs.service";
import { ExtractionJob } from "./extractionJob.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UploadedDocument, ExtractionJob])
    ],
    controllers: [
        UploadedDocumentsController
    ],
    providers: [
        UploadedDocumentsService, ExtractionJobsService
    ],
    exports: [
        UploadedDocumentsService
    ]
})
export class UploadedDocumentsModule { }