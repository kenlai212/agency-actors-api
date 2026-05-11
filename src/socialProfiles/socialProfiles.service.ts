import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { SocialProvider, SocialProfile } from "./socialProfile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { NewSocialProfileRequestDTO, SocialProfileDTO } from "./socialProfiles.dtos";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Injectable()
export class SocialProfilesService extends ActorAssetsService<SocialProfile, SocialProfileDTO> {
    constructor(
        @InjectRepository(SocialProfile)
        private readonly entityRepository: Repository<SocialProfile>,
    ) {
        super(entityRepository)
    }

    async findSocialProfiles(actorId: string, provider?: string, providerHandle?: string): Promise<Array<SocialProfileDTO>> {
        if (!actorId && !provider && !providerHandle) {
            throw new BadRequestException("At least one of actorId, provider or providerHandle must be provided");
        }

        let whereClause: any = {};
        if (actorId) {
            whereClause.actorId = actorId;
        }

        if (provider && providerHandle) {
            whereClause.provider = provider;
            whereClause.providerHandle = providerHandle;
        }

        const socialProfiles = await this.entityRepository.find({ where: whereClause });
        return socialProfiles.map((sp) => this.entityToDTO(sp));
    }

    private async checkSocialProfileUnique(provider: SocialProvider, providerHandle: string): Promise<boolean> {
        return await this.entityRepository.findOne({
            where: { providerHandle: providerHandle, provider: provider }
        })
            .then((socialProfile) => {
                return socialProfile ? false : true;
            }
            )
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("checkSocialProfileUnique() not available");
            });

    }

    async createNewAssetDtoToEntity(dto: NewSocialProfileRequestDTO): Promise<SocialProfile> {
        if (!await this.checkSocialProfileUnique(dto.provider, dto.providerHandle)) {
            throw new BadRequestException("Social profile with the same provider and provider handle already exists");
        }

        let socialProfile = new SocialProfile();

        await this.validateActor(dto.actorId);
        socialProfile.actorId = dto.actorId;

        socialProfile.provider = dto.provider;
        socialProfile.providerHandle = dto.providerHandle;

        if (dto.url) {
            socialProfile.url = dto.url;
        }
        if (dto.providerUserId) {
            socialProfile.providerUserId = dto.providerUserId;
        }

        return socialProfile;
    }

    entityToDTO(entity: SocialProfile): SocialProfileDTO {
        let dto = new SocialProfileDTO(entity);
        dto.socialProvider = entity.provider;
        dto.url = entity.url;
        dto.providerUserId = entity.providerUserId;
        dto.providerHandle = entity.providerHandle;
        return dto;
    }

}