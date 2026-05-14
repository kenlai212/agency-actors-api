import { Injectable } from "@nestjs/common";
import { DocumentLinkedAssetsService } from "../actorAssets/documentLinkedAssets.service";
import { Nationality } from "./nationality.entity";
import { NationalityDTO, NewNationalityRequestDTO } from "./nationalities.dtos";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Injectable()
export class NationalitiesService extends DocumentLinkedAssetsService<Nationality, NationalityDTO> {
    constructor(
        @InjectRepository(Nationality)
        private readonly entityRepository: Repository<Nationality>,
    ) {
        super(entityRepository);
    }

    async updateAssetDtoToEntity(dto: UpdateAssetRequestDTO): Promise<Nationality> {
        let entity = await this.validateAssetId(dto.assetId);

        return entity;
    }

    async createNewAssetDtoToEntity(dto: NewNationalityRequestDTO): Promise<Nationality> {
        let entity = new Nationality();
        await this.validateActor(dto.actorId);
        entity.actorId = dto.actorId;

        entity.country = dto.country;

        return entity;
    }

    entityToDTO(entity: Nationality): NationalityDTO {
        let dto = new NationalityDTO(entity);
        dto.country = entity.country
        return dto;
    }
}