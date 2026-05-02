import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { AgencyActor } from "../agencyActors/agencyActor.entity";

@Entity()
export class Candidate extends AgencyActor {
    @PrimaryGeneratedColumn('uuid')
    candidateId: string;
}