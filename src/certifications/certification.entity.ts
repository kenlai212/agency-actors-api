import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

@Entity()
export class Certification extends DocumentLinkedAsset {
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
}