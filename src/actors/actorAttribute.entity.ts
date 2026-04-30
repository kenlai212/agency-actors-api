import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

export enum ActorType {
    AGENT = 'AGENT',
    CANDIDATE = 'CANDIDATE'
}

@Entity()
export class ActorAttribute {

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "enum",
        enum: ActorType
    })
    actorType: ActorType

    @Column({
        nullable: false,
        type: "varchar",
        length: 36
    })
    actorId: string
}