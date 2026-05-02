import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

@Entity()
export class Resume extends ActorAsset {
    @PrimaryGeneratedColumn('uuid')
    resumeId: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    documentIdentifier: string;
}