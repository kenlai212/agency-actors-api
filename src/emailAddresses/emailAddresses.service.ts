import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailAddress } from "./emailAddress.entity";
import { Repository } from "typeorm";
import { EmailAddressDTO, FindEmailAddressRequestDTO } from "./emailAddresses.dtos";

@Injectable()
export class EmailAdddressesService extends ActorAssetsService<EmailAddress, EmailAddressDTO> {
    constructor(
        @InjectRepository(EmailAddress)
        private readonly entityRepository: Repository<EmailAddress>
    ) {
        super(entityRepository);
    }

    async createNewEmailAddress(actorId: string, addressString: string): Promise<EmailAddressDTO> {
        let emailAddressEntity = new EmailAddress();

        if (await this.checkingExisting(addressString) === true)
            throw new BadRequestException(`${addressString} already exist.`);
        emailAddressEntity.addressString = addressString;

        await this.validateActor(actorId);
        emailAddressEntity.actorId = actorId;

        //find actor's other emailAddresses.
        const actorOtherEmailAddresses = await this.entityRepository.find({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        if (!actorOtherEmailAddresses || actorOtherEmailAddresses.length === 0)
            emailAddressEntity.isDefault = true;

        emailAddressEntity = await this.entityRepository.save(emailAddressEntity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        return this.entityToDTO(emailAddressEntity);
    }

    async findEmailAddress(dto: FindEmailAddressRequestDTO): Promise<EmailAddressDTO> {
        if (!dto.assetId && !dto.addressString)
            throw new BadRequestException(`Must provide atleast one of actorId or addressString`);

        let whereClause = {}
        if (dto.assetId)
            whereClause = { assetId: dto.assetId }
        else
            whereClause = { addressString: dto.addressString }

        const emailAddress = await this.entityRepository.findOne({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("searchEmailAddresses() not available");
            })

        if (!emailAddress)
            throw new NotFoundException(`Invalid assetId or addressString`);

        return this.entityToDTO(emailAddress);
    }

    async setDdfault(actorId: string, addressString: string) {
        //check if this is a valid actor
        await this.validateActor(actorId);

        const actorEmailAddresses = await this.entityRepository.find({ where: { actorId } })
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
        let emailAddresses = await this.entityRepository.find({ where: { actorId } })
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

    async checkingExisting(addressString: string): Promise<boolean> {
        const existingEmailAddress = await this.entityRepository.findOne({ where: { addressString } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        if (existingEmailAddress)
            return true;
        else
            return false;
    }

    entityToDTO(entity: EmailAddress): EmailAddressDTO {
        let dto = new EmailAddressDTO(entity);
        dto.addressString = entity.addressString;
        dto.isDefault = entity.isDefault;

        return dto;
    }
}