import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CountryCode, PhoneNumber, PhoneNumberType } from "./phoneNumber.entity";
import { Repository } from "typeorm";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { FindPhoneNumberRequestDTO, PhoneNumberDTO } from "./phoneNumbers.dtos";

@Injectable()
export class PhoneNumbersService extends ActorAssetsService<PhoneNumber, PhoneNumberDTO> {
    constructor(
        @InjectRepository(PhoneNumber)
        private readonly entityRepository: Repository<PhoneNumber>,
    ) {
        super(entityRepository);
    }

    async createNewPhoneNumber(actorId: string, countryCode: CountryCode, numberString: string, phoneNumberType: PhoneNumberType): Promise<PhoneNumberDTO> {
        let phoneNumber = new PhoneNumber();

        await this.validateActor(actorId);
        phoneNumber.actorId = actorId;

        await this.validateUniquePhoneNumber(countryCode, numberString);
        phoneNumber.countryCode = countryCode;
        phoneNumber.numberString = numberString;

        phoneNumber.phoneNumberType = phoneNumberType;

        phoneNumber = await this.entityRepository.save(phoneNumber)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createNewPhoneNumber() not available");
            })

        return this.entityToDTO(phoneNumber);
    }

    async findPhoneNumber(dto: FindPhoneNumberRequestDTO): Promise<PhoneNumberDTO> {
        if (!dto.assetId && !dto.countryCode && !dto.numberString)
            throw new BadRequestException("Must provide at least one search parameter");

        let whereClause = {}
        if (dto.assetId)
            whereClause = { assetId: dto.assetId };
        else
            whereClause = { countryCode: dto.countryCode, numberString: dto.numberString };

        const phoneNumber = await this.entityRepository.findOne({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("searchPhoneNuber() not available");
            })

        if (!phoneNumber)
            throw new NotFoundException(`Phone Number not found`);

        return this.entityToDTO(phoneNumber);
    }

    async validateUniquePhoneNumber(countryCode: CountryCode, numberString: string) {
        let phoneNumber = await this.entityRepository.findOne({ where: { countryCode, numberString } })
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