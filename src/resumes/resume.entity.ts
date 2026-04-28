import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorRef } from "../actors/actorRef.entity";

@Entity()
export class Resume extends ActorRef {
    @PrimaryGeneratedColumn('uuid')
    resumeId: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    documentIdentifier: string;
}