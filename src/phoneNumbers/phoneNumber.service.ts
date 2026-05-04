import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CountryCode, PhoneNumber, PhoneNumberType } from "./phoneNumber.entity";
import { Repository } from "typeorm";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { PhoneNumberDTO } from "./phoneNumbers.dtos";

@Injectable()
export class PhoneNumbersService extends ActorAssetsService<PhoneNumber> {
    readonly logger = new Logger('PhoneNumbersService')
    constructor(
        @InjectRepository(PhoneNumber)
        private readonly phoneNumberRepository: Repository<PhoneNumber>,
    ) {
        super(phoneNumberRepository);
    }

    async createNewPhoneNumber(actorId: string, countryCode: CountryCode, numberString: string, phoneNumberType: PhoneNumberType): Promise<PhoneNumberDTO> {
        let phoneNumber = new PhoneNumber();

        await this.validateActor(actorId);
        phoneNumber.actorId = actorId;

        await this.validateUniquePhoneNumber(countryCode, numberString);
        phoneNumber.countryCode = countryCode;
        phoneNumber.numberString = numberString;

        phoneNumber.phoneNumberType = phoneNumberType;

        phoneNumber = await this.phoneNumberRepository.save(phoneNumber)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewPhoneNumber() not available");
            })

        return this.entityToDTO(phoneNumber);
    }

    async searchPhoneNuber(actorId?: string, countryCode?: CountryCode, numberString?: string): Promise<PhoneNumberDTO[]> {
        if (!actorId && !countryCode && !numberString)
            throw new BadRequestException("Must provide at least one search parameter");

        let whereClause = {}
        if (actorId)
            whereClause = { actorId };
        else
            whereClause = { countryCode, numberString };

        const phoneNumbers = await this.phoneNumberRepository.find({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("searchPhoneNuber() not available");
            })

        let phoneNumberDTOs = []
        for (let phoneNumber of phoneNumbers) {
            phoneNumberDTOs.push();
            phoneNumberDTOs.push(this.entityToDTO(phoneNumber));
        }

        return phoneNumberDTOs;
    }

    /*async deletePhoneNumber(assetId: string): Promise<string> {
        const phoneNumber = await this.phoneNumberRepository.findOne({ where: { assetId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deletePhoneNumber() not available");
            })

        if (!phoneNumber)
            throw new BadRequestException(`Invalid phoneNumberId`)

        await this.phoneNumberRepository.delete(phoneNumber)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deletePhoneNumber() not available");
            })

        const msg = `Successfully deleted phoneNumberId: ${assetId}`
        this.logger.log(msg)
        return msg
    }*/

    async validateUniquePhoneNumber(countryCode: CountryCode, numberString: string) {
        let phoneNumber = await this.phoneNumberRepository.findOne({ where: { countryCode, numberString } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewPhoneNumber() not available");
            })

        if (phoneNumber)
            throw new BadRequestException(`Phone Number ${countryCode} ${numberString} already exist`);
    }

    entityToDTO(entity: PhoneNumber) {
        let dto = new PhoneNumberDTO(entity);
        dto.phoneNumberId = entity.assetId;
        dto.countryCode = entity.countryCode;
        dto.numberString = entity.numberString;
        dto.phoneNumberType = entity.phoneNumberType;

        return dto;
    }
}