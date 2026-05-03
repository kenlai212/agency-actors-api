import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

export enum AgencyActorType {
    CANDIDATE = "CANADATE",
    AGENT = "AGENT",
    BROKER = "BROKER"
}

export enum Country {
    HK = "HK",
    CH = "CH",
    SG = "SG",
    JP = "JP"
}

export enum ResidencyStatus {
    CITIZIEN = "CITIZEN",
    PERMENANT_RESIDENT = "PERMENANT_RESIDENT",
    EMPLOYMENT_PASS = "EMPLOYMENT_PASS_HOLDER",
    DEPENDENT_PASS = "DEPENDENT_PASS",
    LONG_TERM_VISIT_PASS = "LONG_TERM_VISIT",
    WORK_PERMIT = "WORK_PERMIT",
    STUDENT_PASS = "STUDENT_PASS",
    DUAL_STATUS = "DUAL_STATUS"
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
    nationality: Country;

    @Column({
        nullable: true,
        type: "enum",
        enum: ResidencyStatus,
        default: null
    })
    residencyStatus: ResidencyStatus;
}