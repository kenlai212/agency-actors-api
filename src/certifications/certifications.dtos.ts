import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { DocumentLinkedAssetDTO } from "../actorAssets/documentLinkedAssets.dtos";
import { CreateNewAssetRequestDTO, UpdateAssetRequestDTO } from "../actorAssets/actorAssets.dtos";
import { CertificationAuthority } from "./certification.entity";

export class CertificationDTO extends DocumentLinkedAssetDTO {
    @ApiProperty({
        description: `Certification Authority ${Object.values(CertificationAuthority)}`,
        enum: CertificationAuthority,
        enumName: "CertificationAuthority"
    })
    certificationAuthority: CertificationAuthority;

    @ApiProperty({
        description: 'Certification Name',
    })
    certificateName: string;

    @ApiProperty({
        description: 'Certification Name',
    })
    certificateNumber: string;

    @ApiProperty({
        description: 'Certification Issue Date',
    })
    issueDate: Date;
}

export class NewCertificationRequestDTO extends CreateNewAssetRequestDTO {
    @ApiProperty({
        description: `Certification Authority ${Object.values(CertificationAuthority)}`,
        example: CertificationAuthority.AMAZON,
        enum: CertificationAuthority,
        enumName: "CertificationAuthority"
    })
    @IsNotEmpty()
    @IsEnum(CertificationAuthority)
    certificationAuthority: CertificationAuthority;

    @ApiPropertyOptional({
        description: 'The name of the certificate',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    certificateName: string;

    @ApiPropertyOptional({
        description: 'Certificate number or identifier',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    certificateNumber: string;

    @ApiPropertyOptional({
        description: 'The issue date of the certification',
    })
    @IsOptional()
    @IsString()
    issueDate: Date;
}

export class UpdateCertificationRequestDTO extends UpdateAssetRequestDTO {
    @ApiPropertyOptional({
        description: `Certification Authority ${Object.values(CertificationAuthority)}`,
        example: CertificationAuthority.AMAZON,
        enum: CertificationAuthority,
        enumName: "CertificationAuthority"
    })
    @IsOptional()
    @IsEnum(CertificationAuthority)
    certificationAuthority!: CertificationAuthority;

    @ApiProperty({
        description: 'The name of the certificate',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    certificateName!: string;

    @ApiProperty({
        description: 'Certificate number or identifier',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    certificateNumber!: string;

    @ApiProperty({
        description: 'The issue date of the certification',
    })
    @IsOptional()
    @IsDateString()
    issueDate!: Date;
}