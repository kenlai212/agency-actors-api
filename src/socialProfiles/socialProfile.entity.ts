import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ActorAttribute } from "../actors/actorAttribute.entity";

export enum SocialProvider {
    INSTAGRAM = 'Instagram',
    LINKEDIN = 'LinkedIn',
    GITHUB = 'GitHub',
    FACEBOOK = 'Facebook',
    TWITTER = 'Twitter',
    LINE = 'Line',
}

@Entity()
export class SocialProfile extends ActorAttribute {
    @PrimaryGeneratedColumn('uuid')
    socialProfileId: string

    @Column({
        nullable: false,
        type: "enum",
        enum: SocialProvider
    })
    provider: SocialProvider

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    url!: string

    @Column({
        nullable: true,
        type: "varchar",
        length: 255,
    })
    providerUserId!: string

    @Column({
        nullable: false,
        type: "varchar",
        length: 255
    })
    providerHandle: string
}