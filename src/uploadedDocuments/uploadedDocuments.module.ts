import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadedDocument } from "./uploadedDocument.entity";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { UploadedDocumentsService } from "./uploadedDocuments.service";
import { UploadedDocumentsController } from "./uploadedDocuments.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([UploadedDocument]),
        AgencyActorsModule
    ],
    controllers: [
        UploadedDocumentsController
    ],
    providers: [
        UploadedDocumentsService
    ],
    exports: [
        UploadedDocumentsService
    ]
})
export class UploadedDocumentsModule { }