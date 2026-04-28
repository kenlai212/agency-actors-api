import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthoritiesService {
  private readonly logger: Logger = new Logger('AuthoritiesService')
  private readonly validAuthorities = ["Microsoft", "Google", "Amazon", "Cisco", "CompTIA"];
  private readonly validCertificateNames = ["Azure Fundamentals", "AWS Certified Solutions Architect", "Google Cloud Professional Cloud Architect", "Cisco Certified Network Associate", "CompTIA Security+"];

  getValidAuthorities() {
    return this.validAuthorities;
  }

  getValidCertificateNames() {
    return this.validCertificateNames;
  }

  validateAuthority(authority: string) {
    if (!this.validAuthorities.includes(authority)) {
      const msg = `Invalid Authority : ${authority}`
      this.logger.warn(msg)
      throw new BadRequestException(msg)
    }
  }

  validateCertificateName(certificateName: string) {
    if (!this.validCertificateNames.includes(certificateName)) {
      const msg = `Invalid Certificate Name : ${certificateName}`
      this.logger.warn(msg);
      throw new BadRequestException(msg);
    }
  }
}