import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailAddress } from "./emailAddress.entity";
import { Repository } from "typeorm";
import { EmailAddressDTO } from "./emailAddresses.dtos";

@Injectable()
export class EmailAdddressesService extends ActorAssetsService<EmailAddress> {
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
            //If none, set this one to 'locked'.
            emailAddressEntity.isLocked = true;

        emailAddressEntity = await this.emailAddressRepository.save(emailAddressEntity)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewEmailAddress() not available");
            });

        return this.entityToDTO(emailAddressEntity);
    }

    async searchEmailAddresses(actorId?: string, addressString?: string): Promise<EmailAddressDTO[]> {
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

    /*async deleteEmailAddress(assetId: string): Promise<string> {
        const emailAddress = await this.emailAddressRepository.findOne({ where: { assetId } })

        if (!emailAddress)
            throw new NotFoundException("Email address not found");

        if (emailAddress.isLocked)
            throw new BadRequestException("Cannot delete a locked Email Address, it is tied to an Actor as an Identifier. Please create another locked Email Address for this Actor, before deleting this one")

        await this.emailAddressRepository.delete(assetId)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteEmailAddress not available");
            });

        const msg = `Successfully deleted email address with id: ${assetId}`;
        this.logger.log(msg);
        return msg;
    }*/

    async lockEmailAddress(actorId: string, addressString: string) {
        //check if this is a valid actor
        await this.validateActor(actorId);

        const actorEmailAddresses = await this.emailAddressRepository.find({ where: { actorId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("lockEmailAddress() not available");
            });

        if (this.validateUniqueEmailAddress(addressString)) {
            //if this emailAddress doesn't exist in the db, then create it a new emailAddress and lock it to this actor

            let newEmailAddress = new EmailAddress();
            newEmailAddress.actorId = actorId;
            newEmailAddress.addressString = addressString;
            newEmailAddress.isLocked = true;

            newEmailAddress = await this.emailAddressRepository.save(newEmailAddress)
                .catch((error) => {
                    this.logger.error(error);
                    throw new InternalServerErrorException("lockEmailAddress() not available");
                });

            this.logger.log(`Created new Locked Email Address ${addressString} for Actor ${actorId}`)

            return [this.entityToDTO(newEmailAddress)];
        } else {
            //this is an existing emailAddress
            //find all emailAddresses of this actor, and set the isLock flag from old to new emailAddress
            const emailAddresses = await this.emailAddressRepository.find({ where: { actorId } })
                .catch((error) => {
                    this.logger.error(error);
                    throw new InternalServerErrorException("lockEmailAddress() not available");
                });

            //loop thru all the emailAddress of this actor to find old + new locked email addresses
            let oldLockedEmailAddress: EmailAddress;
            let targetEmailAddress: EmailAddress;
            for (let emailAddress of emailAddresses) {
                if (emailAddress.isLocked)
                    oldLockedEmailAddress = emailAddress;

                if (emailAddress.addressString === addressString)
                    targetEmailAddress = emailAddress;
            }

            if (!targetEmailAddress)
                throw new BadRequestException(`${addressString} does not belog to Actor ${actorId}`)

            //lock target emailAddress
            targetEmailAddress.isLocked = true;
            await this.emailAddressRepository.save(targetEmailAddress)
                .then(() => {
                    this.logger.log(`Locked Email Address ${targetEmailAddress.addressString} for Actor ${actorId}`)
                })
                .catch((error) => {
                    this.logger.error(error);
                    throw new InternalServerErrorException("lockEmailAddress() not available");
                });

            //flip unlocked old emailAddress
            oldLockedEmailAddress.isLocked = false;
            await this.emailAddressRepository.save(oldLockedEmailAddress)
                .then(() => {
                    this.logger.log(`Unlocked Email Address ${oldLockedEmailAddress.addressString} for Actor ${actorId}`)
                })
                .catch((error) => {
                    this.logger.error(error);
                    throw new InternalServerErrorException("lockEmailAddress() not available");
                });
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
        dto.isLocked = entity.isLocked;

        return dto;
    }
}