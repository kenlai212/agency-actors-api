import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

@Entity()
export class AgencyActor {
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    fullName: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
        unique: true
    })
    emailAddress: string;

    @Column({
        nullable: true,
        type: "varchar",
        length: 64,
        unique: true
    })
    mobilePhoneNumber: string;

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

    countryOfResidence: string;
    nationality: string;
    residencyStatus: string;
    homePhoneNumber: string;
}