import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailAddress } from "./emailAddress.entity";
import { Repository } from "typeorm";
import { EmailAddressDTO } from "./emailAddresses.dtos";

@Injectable()
export class EmailAdddressesService extends ActorAssetsService {
    private readonly logger = new Logger('EmailAddressesService');

    constructor(
        @InjectRepository(EmailAddress)
        private readonly emailAddressRepository: Repository<EmailAddress>,
    ) {
        super();
    }

    async createNewEmailAddress(actorId: string, addressString: string, isPrimary?: boolean): Promise<EmailAddressDTO> {
        let emailAddressEntity = new EmailAddress();

        await this.validateActor(actorId);
        emailAddressEntity.actorId = actorId;

        //find actor's other emailAddresses.
        const actorOtherEmailAddresses = await this.emailAddressRepository.find({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });
        if (!actorOtherEmailAddresses)
            //If none, set this one to primary.
            emailAddressEntity.isPrimary = true;
        else if (isPrimary) {
            //If actor has other emailAddress, set this one to primary.
            emailAddressEntity.isPrimary = true;
            //todo: unset the other existing primay address
        }

        await this.validateUniqueEmailAddress(addressString);

        emailAddressEntity = await this.emailAddressRepository.save(emailAddressEntity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        return this.entityToDTO(emailAddressEntity);
    }

    async validateUniqueEmailAddress(addressString: string) {
        const existingEmailAddress = await this.emailAddressRepository.findOne({ where: { addressString } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        if (existingEmailAddress)
            throw new BadRequestException("Email address already exists");
    }

    private entityToDTO(entity: EmailAddress): EmailAddressDTO {
        let dto = new EmailAddressDTO();
        dto.ownerActorId = entity.actorId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.addressString = entity.addressString;
        dto.isPrimary = entity.isPrimary;

        return dto;
    }
}