import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

export enum CertificationAuthority {
    MICROSOFT = "Microsoft",
    GOOGLE = "Google",
    AMAZON = "Amazon",
    CISCO = "Cisco",
    COMTIA = "CompTIA"
}

@Entity()
export class Certification extends DocumentLinkedAsset {
    @Column({
        nullable: false,
        type: "enum",
        enum: CertificationAuthority
    })
    certificationAuthority: CertificationAuthority;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    certificateName: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    certificateNumber: string;

    @Column({
        nullable: true,
        type: "timestamp"
    })
    issueDate!: Date;
}