import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CountryCode, PhoneNumber } from "./phoneNumber.entity";
import { Repository } from "typeorm";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";
import { FindPhoneNumberRequestDTO, NewPhoneNumberRequestDTO, PhoneNumberDTO } from "./phoneNumbers.dtos";
import { CreateNewAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

@Injectable()
export class PhoneNumbersService extends ActorAssetsService<PhoneNumber, PhoneNumberDTO> {
    constructor(
        @InjectRepository(PhoneNumber)
        private readonly entityRepository: Repository<PhoneNumber>,
    ) {
        super(entityRepository);
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

    async createNewAssetDtoToEntity(dto: NewPhoneNumberRequestDTO): Promise<PhoneNumber> {
        let entity = new PhoneNumber();
        entity.actorId = dto.actorId;

        await this.validateUniquePhoneNumber(dto.countryCode, dto.numberString);
        entity.countryCode = dto.countryCode;
        entity.numberString = dto.numberString;

        entity.phoneNumberType = dto.phoneNumberType;

        return entity;
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