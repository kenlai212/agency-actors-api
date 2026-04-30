import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "./actor.entity";

export class ActorDTO {
    @ApiProperty({
        description: 'Actor fullname',
        example: "John Smith"
    })
    fullName: string;

    @ApiProperty({
        description: 'Actor emailAddress',
        example: "john.smith@test.com"
    })
    emailAddress: string;

    @ApiProperty({
        description: 'Actor phoneNumber',
        example: "+852 1234 5678"
    })
    mobilePhoneNumber: string;

    @ApiProperty({
        description: `Actor Gender, can be MALE, FEMALE, OTHER`,
        enum: Gender,
        enumName: "Gender"
    })
    gender: Gender;

    @ApiProperty({
        description: `Candidate Date of Birth, `,
        example: "YYYY-MM-DD"
    })
    dob: Date;

    @ApiProperty({
        description: 'Candidate creation datetime',
        example: "YYYY-MM-DDTHH:mm:ss.sssZ"
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Candidate last update datetime',
        example: "YYYY-MM-DDTHH:mm:ss.sssZ"
    })
    updatedAt: Date;

    countryOfResidence: string;
    nationality: string;
    residencyStatus: string;
    homePhoneNumber: string;
}