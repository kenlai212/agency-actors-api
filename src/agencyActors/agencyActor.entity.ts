import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

export enum AgencyActorType {
    CANDIDATE,
    AGENT,
    BROKEN
}

export enum Country {
    HK,
    CH,
    SG,
    JP
}

@Entity()
export class AgencyActor {
    @PrimaryGeneratedColumn('uuid')
    actorId: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "enum",
        enum: AgencyActorType
    })
    agencyActorType: AgencyActorType;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    fullName: string;

    @Column({
        nullable: true,
        type: "date",
        default: null
    })
    dob!: Date;

    @Column({
        nullable: true,
        type: "enum",
        enum: Gender,
        default: null
    })
    gender!: Gender;

    @Column({
        nullable: true,
        type: "enum",
        enum: Country,
        default: null
    })
    countryOfResidence: Country;

    @Column({
        nullable: true,
        type: "enum",
        enum: Country,
        default: null
    })
    nationality: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 64
    })
    residencyStatus: string;
}