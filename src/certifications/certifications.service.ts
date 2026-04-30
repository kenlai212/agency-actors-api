import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Certification } from "./certification.entity";
import { CertificationDTO } from "./certifications.dtos";
import { AuthoritiesService } from "./authoritries.service";
import { ActorAttributeService } from "../actors/actorAttribute.service";
import { ActorType } from "../actors/actorAttribute.entity";

@Injectable()
export class CertificationsService extends ActorAttributeService {
    private readonly logger: Logger = new Logger('CertificationsService')

    constructor(
        @InjectRepository(Certification)
        private readonly certificationRepository: Repository<Certification>,
        private readonly authortiesService: AuthoritiesService,
    ) {
        super();
    }

    async createCertification(actorType: ActorType, actorId: string, authority: string, certificateName: string, certificateNumber: string, startDate: Date, endDate: Date): Promise<CertificationDTO> {
        let certification = new Certification();
        certification.actorType = actorType;

        // Validate actor ID
        await this.validateActor(actorType, actorId)
        certification.actorId = actorId;

        // Validate authority and certificate name
        this.authortiesService.validateAuthority(authority);
        certification.authority = authority;

        // Validate certificate name
        this.authortiesService.validateCertificateName(certificateName);
        certification.certificateName = certificateName;

        certification.certificateNumber = certificateNumber;
        certification.startDate = startDate;
        certification.endDate = endDate;

        await this.certificationRepository.save(certification)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCertification() not available");
            });

        return this.certificationToDTO(certification);
    }

    async findCertifications(actorType: ActorType, actorId: string): Promise<Array<CertificationDTO>> {
        const certifications = await this.certificationRepository.find({ where: { actorId, actorType } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("findCertifications() not available");
            });

        let certificationDTOs: Array<CertificationDTO> = [];
        for (const certification of certifications) {
            certificationDTOs.push(this.certificationToDTO(certification));
        }

        return certificationDTOs;
    }

    async deleteCertification(certificationId: string): Promise<void> {
        const certification = await this.certificationRepository.findOne({ where: { certificationId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        if (!certification) {
            throw new BadRequestException("Certification with ID " + certificationId + " not found");
        }

        await this.certificationRepository.delete({ certificationId })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });
    }

    async uploadLicense(certificationId: string, documentBase64: string): Promise<CertificationDTO> {
        const certification = await this.certificationRepository.findOne({ where: { certificationId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("uploadLicense() not available");
            });

        if (!certification) {
            throw new BadRequestException("Certification with ID " + certificationId + " not found");
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
                throw new InternalServerErrorException("uploadLicense() not available");
            });

        let certificationDTO = this.certificationToDTO(certification);
        certificationDTO.documentIdentifier = documentUrl;

        return certificationDTO;
    }

    private async callExternalDocumentStorageService(documentBase64: string): Promise<string> {
        return "https://example.com/document/12345";
    }

    private certificationToDTO(certification: Certification): CertificationDTO {
        const certificationDTO = new CertificationDTO();
        certificationDTO.certificationId = certification.certificationId;
        certificationDTO.ownerActorType = certification.actorType;
        certificationDTO.ownerActorId = certification.actorId;
        certificationDTO.authority = certification.authority;
        certificationDTO.certificateName = certification.certificateName;
        certificationDTO.certificateNumber = certification.certificateNumber;
        certificationDTO.startDate = certification.startDate;
        certificationDTO.endDate = certification.endDate;
        return certificationDTO;
    }
}