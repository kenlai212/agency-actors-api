import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

export enum PhoneNumberType {
    MOBILE = "MOBILE",
    HOME = "HOME",
    OFFICE = "OFFICE",
}

export enum CountryCode {
    HK = "+852",
    CH = "+86",
    SG = "+65",
    JP = "+81"
}

@Entity()
export class PhoneNumber extends ActorAsset {
    @Column({
        nullable: false,
        type: "enum",
        enum: CountryCode,
    })
    countryCode: CountryCode;

    @Column({
        nullable: false,
        type: "varchar",
        length: 64,
    })
    numberString: string;

    @Column({
        nullable: false,
        type: "enum",
        enum: PhoneNumberType,
    })
    phoneNumberType: PhoneNumberType
}