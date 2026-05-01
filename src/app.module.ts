import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './candidates/candidate.entity';
import { Resume } from './resumes/resume.entity';
import { GovIssueDoc } from './govIssueDocs/govIssueDoc.entity';
import { SocialProfile } from './socialProfiles/socialProfile.entity';
import { Certification } from './certifications/certification.entity';
import { CandidatesModule } from './candidates/candidates.module';
import { SocialProfilesModule } from './socialProfiles/socialProfiles.module';
import { CertificationsModule } from './certifications/certifications.module';
import { GovIssueDocsModule } from './govIssueDocs/govIssueDocs.module';
import { ResumesModule } from './resumes/resumes.module';
import { EducationsModule } from './educations/educations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Candidate,
        Resume,
        GovIssueDoc,
        SocialProfile,
        Certification
      ],
      synchronize: true,
      logging: process.env.DB_LOGGING === 'true' ? ['error', 'warn', 'info', 'log'] : false,
    }),
    CandidatesModule,
    SocialProfilesModule,
    CertificationsModule,
    GovIssueDocsModule,
    ResumesModule,
    EducationsModule
  ]
})
export class AppModule { }
