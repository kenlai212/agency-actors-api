import { Module } from "@nestjs/common";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { CertificationsModule } from "../certifications/certifications.module";
import { EducationsModule } from "../educations/educations.module";
import { EmailAddressesModule } from "../emailAddresses/emailAddresses.module";
import { EmploymentsModule } from "../employments/employments.module";
import { GovIssueDocsModule } from "../govIssueDocs/govIssueDocs.module";
import { phoneNumbersModule } from "../phoneNumbers/phoneNumbers.module";
import { physicalAddressesModule } from "../physicalAddresses/physicalAddresses.module";
import { ResumesModule } from "../resumes/resumes.module";
import { SocialProfilesModule } from "../socialProfiles/socialProfiles.module";
import { AgencyActorsReadController } from "./agencyActorsRead.controller";
import { AgencyActorsReadService } from "./agencyActorsRead.service";

@Module({
    imports: [
        AgencyActorsModule,
        CertificationsModule,
        EducationsModule,
        EmailAddressesModule,
        EmploymentsModule,
        GovIssueDocsModule,
        phoneNumbersModule,
        physicalAddressesModule,
        ResumesModule,
        SocialProfilesModule
    ],
    controllers: [
        AgencyActorsReadController
    ],
    providers: [
        AgencyActorsReadService
    ]
})
export class AgencyActorsReadModule { }