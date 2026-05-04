import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class CertificationDTO extends ActorAssetDTO {
    @ApiProperty({
        description: 'Cerfication record ID',
        example: "96e4e28e-2404-4a4f-b69a-6b0709559596"
    })
    authority!: string;
    certificateName!: string;
    certificateNumber!: string;
    issueDate!: Date;
    documentIdentifier!: string;
}

export class NewCertificationRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({
        description: 'The authority that issued the certification',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    authority: string;

    @ApiProperty({
        description: 'The name of the certificate',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    certificateName: string;

    @ApiProperty({
        description: 'Certificate number or identifier',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    certificateNumber: string;

    @ApiProperty({
        description: 'The issue date of the certification',
    })
    @IsNotEmpty()
    @IsString()
    issueDate: Date;
}

export class UploadDocumentRequestDTO {
    @ApiProperty({
        description: 'The ID of the Certification',
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    certificationId: string;

    @ApiProperty({
        description: 'The base64-encoded license document',
    })
    @IsNotEmpty()
    @IsString()
    documentBase64: string;
}

export class SearchCertificationsRequestDTO extends ActorAssetRequestDTO {
    @ApiProperty({
        description: `The ID of the Certification`,
        example: `96e4e28e-2404-4a4f-b69a-6b0709559596`
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(36)
    certificationId: string;
}