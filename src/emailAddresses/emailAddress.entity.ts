import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

@Entity()
export class EmailAddress extends ActorAsset {
    @Column({
        nullable: false,
        type: "varchar",
        length: 255,
        unique: true
    })
    addressString: string;

    @Column({
        nullable: false,
        type: "boolean",
        default: false
    })
    isDefault: boolean;
}