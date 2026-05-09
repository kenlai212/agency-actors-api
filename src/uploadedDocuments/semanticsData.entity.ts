import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class SemanticsData {
    @PrimaryGeneratedColumn('uuid')
    semanticsDataId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: true,
        type: "varchar",
        length: 36
    })
    uploadedDocumentId: string;

    @Column({
        nullable: true,
        type: "json"
    })
    abstractedResult: JSON;
}