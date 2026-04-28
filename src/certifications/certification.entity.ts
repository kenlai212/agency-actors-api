import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ActorRef } from "../actors/actorRef.entity";

@Entity()
export class Certification extends ActorRef {
    @PrimaryGeneratedColumn('uuid')
    certificationId: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    authority: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    certificateName: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    certificateNumber: string;

    @Column({
        nullable: true,
        type: "timestamp"
    })
    startDate!: Date;

    @Column({
        nullable: false,
        type: "timestamp"
    })
    endDate: Date;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    documentIdentifier!: string;
}