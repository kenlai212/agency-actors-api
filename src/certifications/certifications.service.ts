import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Certification } from "./certification.entity";
import { CertificationDTO } from "./certifications.dtos";
import { AuthoritiesService } from "./authoritries.service";
import { ActorAssetsService } from "../actorAssets/actorAssets.service";

@Injectable()
export class CertificationsService extends ActorAssetsService {
    private readonly logger: Logger = new Logger('CertificationsService')

    constructor(
        @InjectRepository(Certification)
        private readonly certificationRepository: Repository<Certification>,
        private readonly authortiesService: AuthoritiesService,
    ) {
        super();
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

    async deleteCertification(assetId: string): Promise<string> {
        const certification = await this.certificationRepository.findOne({ where: { assetId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        if (!certification) {
            throw new BadRequestException("Certification with ID " + assetId + " not found");
        }

        await this.certificationRepository.delete({ assetId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        const msg = `Successfully deleted ${assetId}`;
        this.logger.log(msg);
        return msg
    }

    async uploadDocument(assetId: string, documentBase64: string): Promise<CertificationDTO> {
        const certification = await this.certificationRepository.findOne({ where: { assetId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadDocument() not available");
            });

        if (!certification) {
            throw new BadRequestException("Certification with ID " + assetId + " not found");
        }

        const documentUrl = await this.callExternalDocumentStorageService(documentBase64)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("Failed to upload document to external storage service");
            });
        certification.documentIdentifier = documentUrl;

        await this.certificationRepository.save(certification)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadDocument() not available");
            });

        let certificationDTO = this.entityToDTO(certification);
        certificationDTO.documentIdentifier = documentUrl;

        return certificationDTO;
    }

    private async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    private entityToDTO(entity: Certification): CertificationDTO {
        const certificationDTO = new CertificationDTO();
        certificationDTO.certificationId = entity.assetId;
        certificationDTO.ownerActorId = entity.actorId;
        certificationDTO.authority = entity.authority;
        certificationDTO.certificateName = entity.certificateName;
        certificationDTO.certificateNumber = entity.certificateNumber;
        certificationDTO.issueDate = entity.issueDate;
        return certificationDTO;
    }
}