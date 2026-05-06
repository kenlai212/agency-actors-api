import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UploadedDocumentType {
    CERTIFICATION_PROOF = "CERTIFICATION_PROOF",
    EDUCATION_PROOF = "EDUCATION_PROOF",
    EMPLOYMENT_PROOF = "EMPLOYMENT_PROOF",
    INCOME_PROOF = "INCOME_PROOF",
    RESUME = "RESUME",
    ADDRESS_PROOF = "ADDRESS_PROOF",
    GOVERMENT_ISSUE_DOCUMENT = "GOVERMENT_ISSUE_DOCUMENT"
}

export enum StorageFacility {
    REGIONAL_DOC_STORE_API = "REGIONAL_DOC_STORE_API",
    AZURE_BLOB_STORAGE = "AZURE_BLOB_STORAGE",
    ALFRESCO = "ALFRESCO"
}

@Entity()
export class UploadedDocument {
    @PrimaryGeneratedColumn('uuid')
    uploadedDocumentId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "enum",
        enum: UploadedDocumentType,
    })
    uploadedDocumentType: UploadedDocumentType;

    @Column({
        nullable: false,
        type: "enum",
        enum: StorageFacility,
    })
    storageFacility: StorageFacility;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    storageRecordId: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 36
    })
    actorId: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 36
    })
    assetId!: string;
}