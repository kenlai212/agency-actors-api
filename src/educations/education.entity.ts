import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

@Entity()
export class Education extends ActorAsset {
    @PrimaryGeneratedColumn('uuid')
    educationId: string;

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

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    documentIdentifier!: string;
}