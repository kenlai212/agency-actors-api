import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { SocialProvider, SocialProfile } from "./socialProfile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { SocialProfileDTO } from "./socialProfiles.dtos";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";

@Injectable()
export class SocialProfilesService extends ActorAssetsService<SocialProfile> {
    readonly logger: Logger = new Logger('SocialProfilesService')

    constructor(
        @InjectRepository(SocialProfile)
        private readonly socialProfileRepository: Repository<SocialProfile>,
    ) {
        super(socialProfileRepository)
    }

    async createSocialProfile(actorId: string, provider: SocialProvider, providerHandle: string, url?: string, providerUserId?: string): Promise<SocialProfileDTO> {
        if (!await this.checkSocialProfileUnique(provider, providerHandle)) {
            throw new BadRequestException("Social profile with the same provider and provider handle already exists");
        }

        let socialProfile = new SocialProfile();

        await this.validateActor(actorId);
        socialProfile.actorId = actorId;

        socialProfile.provider = provider;
        socialProfile.providerHandle = providerHandle;

        if (url) {
            socialProfile.url = url;
        }
        if (providerUserId) {
            socialProfile.providerUserId = providerUserId;
        }

        await this.socialProfileRepository.save(socialProfile)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createSocialProfile() not available");
            });

        return this.entityToDTO(socialProfile);
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

        const socialProfiles = await this.socialProfileRepository.find({ where: whereClause });
        return socialProfiles.map((sp) => this.entityToDTO(sp));
    }

    /*async deleteSocialProfile(assetId: string): Promise<void> {
        await this.socialProfileRepository.delete({ assetId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteSocialProfile() not available");
            });
    }*/

    private async checkSocialProfileUnique(provider: SocialProvider, providerHandle: string): Promise<boolean> {
        return await this.socialProfileRepository.findOne({
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

    entityToDTO(entity: SocialProfile): SocialProfileDTO {
        let dto = new SocialProfileDTO(entity);
        dto.socialProvider = entity.provider;
        dto.url = entity.url;
        dto.providerUserId = entity.providerUserId;
        dto.providerHandle = entity.providerHandle;
        return dto;
    }

}