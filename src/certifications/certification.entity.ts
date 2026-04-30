import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAttribute } from "../actors/actorAttribute.entity";

@Entity()
export class Certification extends ActorAttribute {
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