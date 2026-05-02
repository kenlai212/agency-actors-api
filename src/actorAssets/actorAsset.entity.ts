import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class ActorAsset {

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