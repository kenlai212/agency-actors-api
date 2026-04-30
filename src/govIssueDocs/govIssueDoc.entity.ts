import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAttribute } from "../actors/actorAttribute.entity";

@Entity()
export class GovIssueDoc extends ActorAttribute {
    @PrimaryGeneratedColumn('uuid')
    resumeId: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    documentIdentifier: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 3
    })
    issuerCountryCode: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    idType: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    idNumber: string;
}