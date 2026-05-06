import { Column, Entity } from "typeorm";
import { ActorAsset } from "./actorAsset.entity";

@Entity()
export class DocumentLinkedAsset extends ActorAsset {
    @Column({
        nullable: true,
        type: "varchar",
        length: 36
    })
    uploadedDocumentId!: string;
}