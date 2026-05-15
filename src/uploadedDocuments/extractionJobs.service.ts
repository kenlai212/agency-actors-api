import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExtractionJob } from "./extractionJob.entity";

@Injectable()
export class ExtractionJobsService {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        @InjectRepository(ExtractionJob)
        private readonly entityRepository: Repository<ExtractionJob>
    ) { }

    async createNewExtractionJob(uploadedDocumentId: string) {
        let entity = new ExtractionJob();
        entity.uploadedDocumentId = uploadedDocumentId;

        //todo call external service to create extraction job
        entity.externalExtractionJobIdentifier = "IDP1234"

        await this.entityRepository.save(entity)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("createNewExtractionJob() not available");
            });
    }

    async updateSymanticsData(externalExtractionJobIdentifier: string, extractedResult: JSON) {
        let entity = await this.entityRepository.findOne({ where: { externalExtractionJobIdentifier } })
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("updateSymanticsData not available");
            });

        if (!entity)
            throw new BadRequestException(`Invalid externalExtractionJobIdentifier: ${externalExtractionJobIdentifier}`);

        entity.extractededResult = extractedResult;

        await this.entityRepository.save(entity)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("createNewSymanticsData() not available");
            });

        //todo validation

        //todo populate actor asset
    }
}