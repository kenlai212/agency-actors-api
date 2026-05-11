import { Injectable } from "@nestjs/common";
import { ResumeDTO } from "./resumes.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Resume } from "./resume.entity";
import { Repository } from "typeorm";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Injectable()
export class ResumesService extends DocumentLinkedAssetsService<Resume, ResumeDTO> {
    constructor(
        @InjectRepository(Resume)
        private readonly resumeRepository: Repository<Resume>,
    ) {
        super(resumeRepository);
    }

    async createNewAssetDtoToEntity(dto: CreateNewAssetRequestDTO): Promise<Resume> {
        let resume = new Resume();

        await this.validateActor(dto.actorId);
        resume.actorId = dto.actorId;

        return resume;
    }

    async updateAssetDtoToEntity(dto: UpdateAssetRequestDTO): Promise<Resume> {
        let entity = await this.validateAssetId(dto.assetId);

        return await this.updateAsset(entity);
    }

    entityToDTO(entity: Resume) {
        let dto = new ResumeDTO(entity);
        return dto;
    }
}