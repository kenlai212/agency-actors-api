import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailAddress } from "./emailAddress.entity";
import { Repository } from "typeorm";
import { EmailAddressDTO } from "./emailAddresses.dtos";

@Injectable()
export class EmailAdddressesService extends ActorAssetsService<EmailAddress, EmailAddressDTO> {
    private readonly logger = new Logger('EmailAddressesService');

    constructor(
        @InjectRepository(EmailAddress)
        private readonly emailAddressRepository: Repository<EmailAddress>
    ) {
        super(emailAddressRepository);
    }

    async createNewEmailAddress(actorId: string, addressString: string): Promise<EmailAddressDTO> {
        let emailAddressEntity = new EmailAddress();

        await this.validateUniqueEmailAddress(addressString);
        emailAddressEntity.addressString = addressString;

        await this.validateActor(actorId);
        emailAddressEntity.actorId = actorId;

        //find actor's other emailAddresses.
        const actorOtherEmailAddresses = await this.emailAddressRepository.find({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        if (!actorOtherEmailAddresses || actorOtherEmailAddresses.length === 0)
            emailAddressEntity.isDefault = true;

        emailAddressEntity = await this.emailAddressRepository.save(emailAddressEntity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        return this.entityToDTO(emailAddressEntity);
    }

    async searchAsset(actorId?: string, addressString?: string): Promise<EmailAddressDTO[]> {
        if (!actorId && !addressString)
            throw new BadRequestException(`Must provide atleast one of actorId or addressString`);

        let whereClause = {}
        if (actorId)
            whereClause = { actorId }
        else
            whereClause = { addressString }

        const emailAddresses = await this.emailAddressRepository.find({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("searchEmailAddresses() not available");
            })
        this.logger.debug(`email addresses found : ${emailAddresses}`);

        if (!emailAddresses || emailAddresses.length === 0)
            throw new NotFoundException(`${addressString} doesn't exist`);

        let emailAddressDTOs = []
        for (let emailAddress of emailAddresses) {
            emailAddressDTOs.push(this.entityToDTO(emailAddress));
        }

        return emailAddressDTOs;
    }

    async setDdfault(actorId: string, addressString: string) {
        //check if this is a valid actor
        await this.validateActor(actorId);

        const actorEmailAddresses = await this.emailAddressRepository.find({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("lockEmailAddress() not available");
            });

        if (!actorEmailAddresses || actorEmailAddresses.length === 0)
            throw new NotFoundException(`${addressString} not found`)

        for (let emailAddress of actorEmailAddresses) {
            if (emailAddress.isDefault === true)
                emailAddress.isDefault = false;

            if (emailAddress.addressString === addressString)
                emailAddress.isDefault = true;
        }


        //build output
        let emailAddresses = await this.emailAddressRepository.find({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("lockEmailAddress() not available");
            });

        let emailAddressesDTOs = []
        for (let emailAddress of emailAddresses) {
            emailAddressesDTOs.push(this.entityToDTO(emailAddress))
        }

        return emailAddressesDTOs;
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

    entityToDTO(entity: EmailAddress): EmailAddressDTO {
        let dto = new EmailAddressDTO(entity);
        dto.addressString = entity.addressString;
        dto.isDefault = entity.isDefault;

        return dto;
    }
}