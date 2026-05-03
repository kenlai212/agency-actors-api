import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAsset } from "../actorAssets/actorAsset.entity";

@Entity()
export class Employment extends ActorAsset {
    @PrimaryGeneratedColumn('uuid')
    employmentId: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    companyName: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    jobTitle: string;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    location: string;

    @Column({
        nullable: false,
        type: "timestamp"
    })
    startDate: Date;

    @Column({
        nullable: true,
        type: "timestamp"
    })
    endDate!: Date;

    @Column({
        nullable: false,
        type: "boolean",
        default: false
    })
    isCurrent: boolean;
}