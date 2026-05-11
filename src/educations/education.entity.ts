import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

export enum LevelOfEducation {
    DEPLOMA = "DEPLOMA",
    UNDERGRADUATE = "UNDERGRADUATE",
    POSTGRADUATE = "POSTGRADUATE",
    MASTERS = "MASTERS",
    DOCTORATE = "DOCTORATE"
}

@Entity()
export class Education extends DocumentLinkedAsset {
    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    institutionName: string;

    @Column({
        nullable: true,
        type: "enum",
        enum: LevelOfEducation
    })
    levelOfEducation: LevelOfEducation;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    fieldOfStudy!: string;

    @Column({
        nullable: true,
        type: "year",
    })
    startYear!: number;

    @Column({
        nullable: true,
        type: "year",
    })
    endYear!: number;
}