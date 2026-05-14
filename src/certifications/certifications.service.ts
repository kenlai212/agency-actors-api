import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Certification } from "./certification.entity";
import { CertificationDTO, NewCertificationRequestDTO, UpdateCertificationRequestDTO } from "./certifications.dtos";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";

@Injectable()
export class CertificationsService extends DocumentLinkedAssetsService<Certification, CertificationDTO> {
    constructor(
        @InjectRepository(Certification)
        private readonly entityRepository: Repository<Certification>
    ) {
        super(entityRepository);
    }

    async updateAssetDtoToEntity(dto: UpdateCertificationRequestDTO): Promise<Certification> {
        let entity = await this.validateAssetId(dto.assetId)

        if (dto.certificationAuthority)
            entity.certificationAuthority = dto.certificationAuthority;

        if (dto.certificateName)
            entity.certificateName = dto.certificateName;

        if (dto.certificateNumber)
            entity.certificateNumber = dto.certificateNumber;

        if (dto.issueDate)
            entity.issueDate = dto.issueDate;

        return entity;
    }

    async createNewAssetDtoToEntity(dto: NewCertificationRequestDTO): Promise<Certification> {
        let entity = new Certification();

        await this.validateActor(dto.actorId);
        entity.actorId = dto.actorId;

        entity.certificationAuthority = dto.certificationAuthority;
        entity.certificateName = dto.certificateName;
        entity.certificateNumber = dto.certificateNumber;
        entity.issueDate = dto.issueDate;

        return entity;
    }

    entityToDTO(entity: Certification): CertificationDTO {
        const dto = new CertificationDTO(entity);
        dto.certificationAuthority = entity.certificationAuthority;
        dto.certificateName = entity.certificateName;
        dto.certificateNumber = entity.certificateNumber;
        dto.issueDate = entity.issueDate;
        return dto;
    }
}