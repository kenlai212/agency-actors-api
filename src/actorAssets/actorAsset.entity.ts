import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ActorAsset {
    @PrimaryGeneratedColumn('uuid')
    assetId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "varchar",
        length: 36
    })
    actorId: string
}

@Entity()
export class DocumentLinkedAsset extends ActorAsset {
    @Column({
        nullable: true,
        type: "varchar",
        length: 255
    })
    documentIdentifier!: string;
}