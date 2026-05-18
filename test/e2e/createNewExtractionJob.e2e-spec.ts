import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { ExtractionJobsService, ExtractionJobType } from '../../src/uploadedDocuments/extractionJobs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ExtractionJob } from '../../src/uploadedDocuments/extractionJob.entity';
import { UploadedDocumentType } from '../../src/uploadedDocuments/uploadedDocument.entity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '' + __dirname + '/../../.env' });

describe(`Create new Extraction Job E2E test`, () => {
    let extractionJobsService: ExtractionJobsService;
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'mysql',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    entities: [
                        ExtractionJob,
                    ],
                    synchronize: true
                }),
                TypeOrmModule.forFeature([ExtractionJob])
            ],
            providers: [ExtractionJobsService]
        }).compile();

        extractionJobsService = module.get<ExtractionJobsService>(ExtractionJobsService);
    })

    afterAll(async () => {
        const repository = module.get(getRepositoryToken(ExtractionJob));
        await repository.query(`DELETE FROM extraction_job`);
        await module.close();
    });

    it(`Successfully create a new Extraction Job`, async () => {
        const result = await extractionJobsService.createNewExtractionJob("UPLOADED_DOC_123", "base64StringSample", UploadedDocumentType.GOVERMENT_ISSUE_DOCUMENT, ExtractionJobType.QUICK_VALIDATION)
        console.log(result);
        expect(result).toBeDefined();
    });
});