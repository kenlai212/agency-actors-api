import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './resumes/resume.entity';
import { GovIssueDoc } from './govIssueDocs/govIssueDoc.entity';
import { SocialProfile } from './socialProfiles/socialProfile.entity';
import { Certification } from './certifications/certification.entity';
import { SocialProfilesModule } from './socialProfiles/socialProfiles.module';
import { CertificationsModule } from './certifications/certifications.module';
import { GovIssueDocsModule } from './govIssueDocs/govIssueDocs.module';
import { ResumesModule } from './resumes/resumes.module';
import { EducationsModule } from './educations/educations.module';
import { EmploymentsModule } from './employments/employments.module';
import { AgencyActor } from './agencyActors/agencyActor.entity';
import { AgencyActorsModule } from './agencyActors/agencyActors.module';
import { EmailAddressesModule } from './emailAddresses/emailAddresses.module';
import { EmailAddress } from './emailAddresses/emailAddress.entity';
import { phoneNumbersModule } from './phoneNumbers/phoneNumbers.module';
import { PhoneNumber } from './phoneNumbers/phoneNumber.entity';
import { Education } from './educations/education.entity';
import { Employment } from './employments/employment.entity';
import { PhysicalAddress } from './physicalAddresses/physicalAddress.entity';
import { physicalAddressesModule } from './physicalAddresses/physicalAddresses.module';
import { UploadedDocument } from './uploadedDocuments/uploadedDocument.entity';
import { UploadedDocumentsModule } from './uploadedDocuments/uploadedDocuments.module';
import { AgencyActorsReadModule } from './agencyActorsRead/agencyActorsRead.module';
import { SemanticsData } from './uploadedDocuments/semanticsData.entity';
import configuration from './app.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { Nationality } from './nationalities/nationality.entity';
import { NationalitiesModule } from './nationalities/nationalities.module';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get("database.host"),
        port: configService.get("database.port"),
        username: configService.get("database.userName"),
        password: configService.get("database.password"),
        database: configService.get("database.databaseName"),
        entities: [
          AgencyActor,
          EmailAddress,
          PhoneNumber,
          Education,
          Employment,
          Resume,
          GovIssueDoc,
          SocialProfile,
          Certification,
          PhysicalAddress,
          UploadedDocument,
          SemanticsData,
          Nationality
        ],
        synchronize: true,
        logging: configService.get("database.logging"),
      }),
      inject: [ConfigService]
    }),
    AgencyActorsReadModule,
    AgencyActorsModule,
    NationalitiesModule,
    EmailAddressesModule,
    phoneNumbersModule,
    physicalAddressesModule,
    EducationsModule,
    EmploymentsModule,
    GovIssueDocsModule,
    ResumesModule,
    SocialProfilesModule,
    CertificationsModule,
    UploadedDocumentsModule
  ]
})
export class AppModule { }
