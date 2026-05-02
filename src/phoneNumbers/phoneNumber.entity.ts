import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

export enum PhoneType {
    MOBILE = "MOBILE",
    HOME = "HOME",
    OFFICE = "OFFICE",
}

export enum CountryCode {
    "+852",
    "+86",
    "+65",
    "+81"
}

@Entity()
export class PhoneNumber extends ActorAsset {
    @PrimaryGeneratedColumn('uuid')
    phoneNumberId: string;

    @Column({
        nullable: false,
        type: "enum",
        enum: CountryCode,
    })
    countryCode: CountryCode;

    @Column({
        nullable: false,
        type: "string",
        length: 32,
    })
    phoneNumber: string;
}