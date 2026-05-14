import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

export enum IssuerGoverment {
    CN = "CN",
    HK = "HK",
    SG = "SG",
    JP = "JP"
}

export enum IssueDocType {
    PASSPORT = "PASSPORT",
    IDENTITY_CARD = "IDENTITY_CARD",
    DRIVERS_LICENSE = "DRIVERS_LICENSE"
}

@Entity()
export class GovIssueDoc extends DocumentLinkedAsset {
    @Column({
        nullable: false,
        type: "enum",
        enum: IssuerGoverment
    })
    issuerGoverment!: IssuerGoverment;

    @Column({
        nullable: true,
        type: "enum",
        enum: IssueDocType
    })
    issueDocType!: IssueDocType;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    issueDocNumber!: string;
}