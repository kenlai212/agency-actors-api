import { Module } from "@nestjs/common";
import { GovIssueDocsController } from "./govIssueDocs.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GovIssueDoc } from "./govIssueDoc.entity";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { GovIssueDocsService } from "./govIssueDocs.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([GovIssueDoc]),
        AgencyActorsModule
    ],
    controllers: [GovIssueDocsController],
    providers: [
        GovIssueDocsService
    ]
})
export class GovIssueDocsModule { }