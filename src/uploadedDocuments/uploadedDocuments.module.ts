import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadedDocument } from "./uploadedDocument.entity";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { UploadedDocumentService } from "./uploadedDocuments.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UploadedDocument]),
        AgencyActorsModule
    ],
    providers: [
        UploadedDocumentService
    ],
    exports: [
        UploadedDocumentService
    ]
})
export class UploadedDocumentsModule { }