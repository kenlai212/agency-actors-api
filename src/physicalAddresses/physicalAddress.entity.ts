import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

export enum PhysicalAddressType {
    HOME = "HOME",
    OFFICE = "OFFICE",
    MAILING = "MAILING"
}

@Entity()
export class PhysicalAddress extends DocumentLinkedAsset {
    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    addressLine1: string

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    addressLine2: string

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    addressLine3!: string

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    addressLine4!: string

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    addressLine5!: string

    @Column({
        nullable: false,
        type: "enum",
        enum: PhysicalAddressType,
    })
    addressType: PhysicalAddressType
}