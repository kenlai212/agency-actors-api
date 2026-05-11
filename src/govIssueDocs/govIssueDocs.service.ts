import { Injectable } from "@nestjs/common";
import { GovIssueDoc } from "./govIssueDoc.entity";
import { GovIssueDocDTO } from "./govIssueDocs.dtos";
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

    entityToDTO(entity: GovIssueDoc): GovIssueDocDTO {
        let dto = new GovIssueDocDTO(entity);
        dto.issuerGoverment = entity.issuerGoverment;
        dto.issueDocType = entity.issueDocType;
        dto.issueDocNumber = entity.issueDocNumber;
        return dto;
    }
}