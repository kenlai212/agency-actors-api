import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { AgencyActor } from "../actors/actor.entity";

@Entity()
export class Candidate extends AgencyActor {
    @PrimaryGeneratedColumn('uuid')
    candidateId: string;
}