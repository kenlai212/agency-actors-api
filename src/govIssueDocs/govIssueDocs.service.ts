import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { GovIssueDoc } from "./govIssueDoc.entity";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO } from "./govIssueDocs.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class GovIssueDocsService extends DocumentLinkedAssetsService<GovIssueDoc, GovIssueDocDTO> {
    constructor(
        @InjectRepository(GovIssueDoc)
        private readonly entityRepository: Repository<GovIssueDoc>,
    ) {
        super(entityRepository);
    }

    async createNewGovIssueDoc(dto: NewGovIssueDocRequestDTO): Promise<GovIssueDocDTO> {
        let entity = new GovIssueDoc();

        await this.validateActor(dto.actorId);
        entity.actorId = dto.actorId;

        entity.issuerGoverment = dto.issuerGoverment;
        entity.issueDocType = dto.issueDocType;
        entity.issueDocNumber = dto.issueDocNumber;

        entity = await this.entityRepository.save(entity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmployment() not available");
            })

        return this.entityToDTO(entity);
    }

    entityToDTO(entity: GovIssueDoc): GovIssueDocDTO {
        let dto = new GovIssueDocDTO(entity);
        dto.issuerGoverment = entity.issuerGoverment;
        dto.issueDocType = entity.issueDocType;
        dto.issueDocNumber = entity.issueDocNumber;
        return dto;
    }
}