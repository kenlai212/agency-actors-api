import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Certification } from "./certification.entity";
import { CertificationDTO } from "./certifications.dtos";
import { AuthoritiesService } from "./authoritries.service";
import { DocumentLinkedAssetsService } from "../actorAssets/actorAssets.service";

@Injectable()
export class CertificationsService extends DocumentLinkedAssetsService<Certification, CertificationDTO> {
    private readonly logger: Logger = new Logger('CertificationsService')

    constructor(
        @InjectRepository(Certification)
        private readonly certificationRepository: Repository<Certification>,
        private readonly authortiesService: AuthoritiesService,
    ) {
        super(certificationRepository);
    }

    async createCertification(actorId: string, authority?: string, certificateName?: string, certificateNumber?: string, issueDate?: Date): Promise<CertificationDTO> {
        let certification = new Certification();

        // Validate actor ID
        await this.validateActor(actorId)
        certification.actorId = actorId;

        // Validate authority and certificate name
        this.authortiesService.validateAuthority(authority);
        certification.authority = authority;

        // Validate certificate name
        this.authortiesService.validateCertificateName(certificateName);
        certification.certificateName = certificateName;

        certification.certificateNumber = certificateNumber;
        certification.issueDate = issueDate;

        await this.certificationRepository.save(certification)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCertification() not available");
            });

        return this.entityToDTO(certification);
    }

    async findCertifications(certificationId?: string, actorId?: string): Promise<Array<CertificationDTO>> {
        if (!certificationId && !actorId)
            throw new BadRequestException(`Must provide at lease one of certificationId, actorType, actorId`);

        let whereClause = {}
        if (certificationId)
            whereClause = { ...whereClause, certificationId }
        else
            whereClause = { ...whereClause, actorId }

        const certifications = await this.certificationRepository.find({ where: whereClause })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("findCertifications() not available");
            });

        let certificationDTOs: Array<CertificationDTO> = [];
        for (const certification of certifications) {
            certificationDTOs.push(this.entityToDTO(certification));
        }

        return certificationDTOs;
    }

    entityToDTO(entity: Certification): CertificationDTO {
        const dto = new CertificationDTO(entity);
        dto.authority = entity.authority;
        dto.certificateName = entity.certificateName;
        dto.certificateNumber = entity.certificateNumber;
        dto.issueDate = entity.issueDate;
        return dto;
    }
}