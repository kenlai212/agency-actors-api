import { Column, Entity } from "typeorm";
import { DocumentLinkedAsset } from "../actorAssets/documentLinkedAsset.entity";

@Entity()
export class Resume extends DocumentLinkedAsset { }