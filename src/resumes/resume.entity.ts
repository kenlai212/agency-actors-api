import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAttribute } from "../actors/actorAttribute.entity";

@Entity()
export class Resume extends ActorAttribute {
    @PrimaryGeneratedColumn('uuid')
    resumeId: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    documentIdentifier: string;
}