import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/actorAsset.entity";

@Entity()
export class Resume extends DocumentLinkedAsset { }