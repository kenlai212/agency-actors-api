import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

@Entity()
export class Education extends DocumentLinkedAsset {
    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    institutionName!: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    degree!: string;

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