import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

@Entity()
export class Certification extends ActorAsset {
    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    authority!: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    certificateName!: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    certificateNumber!: string;

    @Column({
        nullable: true,
        type: "timestamp"
    })
    issueDate!: Date;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    documentIdentifier!: string;
}