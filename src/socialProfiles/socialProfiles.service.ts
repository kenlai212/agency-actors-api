import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { SocialProvider, SocialProfile } from "./socialProfile.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { SocialProfileDTO } from "./socialProfiles.dtos";
import { ActorType } from "../actors/actorAttribute.entity";
import { ActorAttributeService } from "../actors/actorAttribute.service";

@Injectable()
export class SocialProfilesService extends ActorAttributeService {
    private readonly logger: Logger = new Logger('SocialProfilesService')

    constructor(
        @InjectRepository(SocialProfile)
        private readonly socialProfileRepository: Repository<SocialProfile>,
    ) {
        super()
    }

    async createSocialProfile(actorType: ActorType, actorId: string, provider: SocialProvider, providerHandle: string, url?: string, providerUserId?: string): Promise<SocialProfileDTO> {
        if (!await this.checkSocialProfileUnique(provider, providerHandle)) {
            throw new BadRequestException("Social profile with the same provider and provider handle already exists");
        }

        let socialProfile = new SocialProfile();

        await this.validateActor(actorType, actorId);
        socialProfile.actorType = actorType;
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

        return this.socialProfileEntityToDTO(socialProfile);
    }

    async findSocialProfiles(actorType: ActorType, actorId: string, provider?: string, providerHandle?: string): Promise<Array<SocialProfileDTO>> {
        if (!actorId && !actorType && !provider && !providerHandle) {
            throw new BadRequestException("At least one of candidateId, provider or providerHandle must be provided");
        }

        let whereClause: any = {};
        if (actorType && actorId) {
            whereClause.actorType = actorType;
            whereClause.actorId = actorId;
        }

        if (provider && providerHandle) {
            whereClause.provider = provider;
            whereClause.providerHandle = providerHandle;
        }

        const socialProfiles = await this.socialProfileRepository.find({ where: whereClause });
        return socialProfiles.map((sp) => this.socialProfileEntityToDTO(sp));
    }

    async deleteSocialProfile(socialProfileId: string): Promise<void> {
        await this.socialProfileRepository.delete({ socialProfileId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteSocialProfile() not available");
            });
    }

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

    private socialProfileEntityToDTO(socialProfile: SocialProfile): SocialProfileDTO {
        let socialProfileDTO = new SocialProfileDTO();
        socialProfileDTO.id = socialProfile.socialProfileId;
        socialProfileDTO.createdAt = socialProfile.createdAt;
        socialProfileDTO.updatedAt = socialProfile.updatedAt;
        socialProfileDTO.ownerActorType = socialProfile.actorType
        socialProfileDTO.ownerActorId = socialProfile.actorId;
        socialProfileDTO.socialProvider = socialProfile.provider;
        socialProfileDTO.url = socialProfile.url;
        socialProfileDTO.providerUserId = socialProfile.providerUserId;
        socialProfileDTO.providerHandle = socialProfile.providerHandle;
        return socialProfileDTO;
    }

}