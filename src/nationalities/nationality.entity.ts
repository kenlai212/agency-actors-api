import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

export enum Country {
    HK = "HK",
    CH = "CH",
    SG = "SG",
    JP = "JP"
}

@Entity()
export class Nationality extends DocumentLinkedAsset {
    @Column({
        nullable: true,
        type: "enum",
        enum: Country,
        default: null
    })
    country: Country;
}