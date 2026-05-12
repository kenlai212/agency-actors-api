import { Injectable } from "@nestjs/common";
import { GovIssueDoc } from "./govIssueDoc.entity";
import { GovIssueDocDTO, NewGovIssueDocRequestDTO, UpdateGovIssueDocRequestDTO } from "./govIssueDocs.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Injectable()
export class GovIssueDocsService extends DocumentLinkedAssetsService<GovIssueDoc, GovIssueDocDTO> {
    constructor(
        @InjectRepository(GovIssueDoc)
        private readonly entityRepository: Repository<GovIssueDoc>,
    ) {
        super(entityRepository);
    }

    async createNewAssetDtoToEntity(dto: NewGovIssueDocRequestDTO): Promise<GovIssueDoc> {
        let entity = new GovIssueDoc();

        await this.validateActor(dto.actorId);
        entity.actorId = dto.actorId;

        entity.issuerGoverment = dto.issuerGoverment;

        if (dto.issueDocType)
            entity.issueDocType = dto.issueDocType;

        if (dto.issueDocNumber)
            entity.issueDocNumber = dto.issueDocNumber;

        return entity;
    }

    async updateAssetDtoToEntity(dto: UpdateGovIssueDocRequestDTO): Promise<GovIssueDoc> {
        let entity = await this.validateAssetId(dto.assetId);

        entity.issuerGoverment = dto.issuerGoverment;

        if (dto.issueDocType)
            entity.issueDocType = dto.issueDocType;

        if (dto.issueDocNumber)
            entity.issueDocNumber = dto.issueDocNumber;

        return entity;
    }

    entityToDTO(entity: GovIssueDoc): GovIssueDocDTO {
        let dto = new GovIssueDocDTO(entity);
        dto.issuerGoverment = entity.issuerGoverment;
        dto.issueDocType = entity.issueDocType;
        dto.issueDocNumber = entity.issueDocNumber;
        return dto;
    }
}