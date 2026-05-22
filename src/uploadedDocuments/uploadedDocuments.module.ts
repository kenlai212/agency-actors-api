import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadedDocument } from "./uploadedDocument.entity";
import { UploadedDocumentsService } from "./uploadedDocuments.service";
import { UploadedDocumentsController } from "./uploadedDocuments.controller";
import { ExtractionJobsService } from "./extractionJobs.service";
import { ExtractionJob } from "./extractionJob.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UploadedDocumentsConsumerController } from "./uploadedDocument.consumer";
import { retry } from "rxjs";

@Module({
    imports: [
        TypeOrmModule.forFeature([UploadedDocument, ExtractionJob]),
        ClientsModule.register([
            {
                name: 'KAFKA_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'agency-actors-api',
                        brokers: ['localhost:9092'],
                    },
                    producer: {
                        idempotent: true,
                        retry: {
                            retries: 5,
                            maxRetryTime: 300000,
                        }
                    }
                },
            },
        ]),
    ],
    controllers: [
        UploadedDocumentsController, UploadedDocumentsConsumerController
    ],
    providers: [
        UploadedDocumentsService, ExtractionJobsService
    ],
    exports: [
        UploadedDocumentsService
    ]
})
export class UploadedDocumentsModule { }