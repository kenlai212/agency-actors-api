import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Candidate } from "./candidate.entity";
import { Repository } from 'typeorm';
import { CandidateDTO } from "./candidates.dto";

@Injectable()
export class CandidatesService {
    private readonly logger = new Logger('CandidateService');

    constructor(
        @InjectRepository(Candidate)
        private readonly candidateRepository: Repository<Candidate>,
    ) { }

    async createCandidate(fullName: string, emailAddress?: string, mobilePhoneNumber?: string): Promise<CandidateDTO> {
        let candidate = new Candidate();
        candidate.fullName = fullName;

        await this.checkEmailOrPhoneExists(emailAddress, mobilePhoneNumber)
            .then((exists) => {
                if (exists) {
                    throw new BadRequestException("Email address or phone number already exists");
                }
            });

        if (emailAddress) {
            candidate.emailAddress = emailAddress;
        }
        if (mobilePhoneNumber) {
            candidate.mobilePhoneNumber = mobilePhoneNumber;
        }

        await this.candidateRepository.save(candidate)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("createCandidate() not available");
            });

        return this.candidateEntityToDTO(candidate);
    }

    async updateCandidate(candidateId: string, fullName?: string, emailAddress?: string, mobilePhoneNumber?: string): Promise<CandidateDTO> {
        let candidate = await this.candidateRepository.findOne({ where: { candidateId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateCandidate() not available");
            });

        if (!candidate) {
            throw new InternalServerErrorException("Candidate not found");
        }

        if (!fullName && !emailAddress && !mobilePhoneNumber) {
            throw new BadRequestException("No fields to update");
        }

        await this.checkEmailOrPhoneExists(emailAddress, mobilePhoneNumber)
            .then((exists) => {
                if (exists) {
                    throw new BadRequestException("Email address or phone number already exists");
                }
            });

        if (fullName) {
            candidate.fullName = fullName;
        }

        if (emailAddress) {
            candidate.emailAddress = emailAddress;
        }

        if (mobilePhoneNumber) {
            candidate.mobilePhoneNumber = mobilePhoneNumber;
        }

        candidate.updatedAt = new Date();

        await this.candidateRepository.save(candidate)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("updateCandidate() not available");
            });

        return this.candidateEntityToDTO(candidate);
    }

    async getCandidateById(candidateId: string): Promise<CandidateDTO> {
        let candidate = await this.candidateRepository.findOne({ where: { candidateId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("getCandidateById() not available");
            });

        if (!candidate) {
            throw new NotFoundException("Candidate not found");
        }

        return this.candidateEntityToDTO(candidate);
    }

    async deleteCandidate(candidateId: string): Promise<void> {
        let candidate = await this.candidateRepository.findOne({ where: { candidateId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCandidate() not available");
            });

        if (!candidate) {
            throw new NotFoundException("Candidate not found");
        }
        await this.candidateRepository.remove(candidate)
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("deleteCandidate() not available");
            });

        return;
    }

    async validateCandidateId(candidateId: string) {
        const candidate = await this.candidateRepository.findOne({ where: { candidateId } })
            .catch((error) => {
                this.logger.error(error);
                throw new InternalServerErrorException("validateCandidateId() not available");
            });

        if (!candidate)
            throw new BadRequestException(`Invalid canadiateId : ${candidateId}`)
    }

    private async checkEmailOrPhoneExists(emailAddress?: string, mobilePhoneNumber?: string): Promise<boolean> {
        if (!emailAddress && !mobilePhoneNumber) {
            return false;
        }

        const existingCandidate = await this.candidateRepository.findOne({
            where: [
                { emailAddress },
                { mobilePhoneNumber }
            ]
        });

        return !!existingCandidate;
    }

    private candidateEntityToDTO(candidate: Candidate): CandidateDTO {
        let dto = new CandidateDTO();
        dto.fullName = candidate.fullName;
        dto.candidateId = candidate.candidateId;
        dto.emailAddress = candidate.emailAddress;
        dto.mobilePhoneNumber = candidate.mobilePhoneNumber;
        dto.gender = candidate.gender;
        dto.dob = candidate.dob;
        dto.createdAt = candidate.createdAt;
        dto.updatedAt = candidate.updatedAt;
        return dto;
    }
}