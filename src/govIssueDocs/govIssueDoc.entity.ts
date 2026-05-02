import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

@Entity()
export class GovIssueDoc extends ActorAsset {
    @PrimaryGeneratedColumn('uuid')
    GovermentIssueDocId: string;

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