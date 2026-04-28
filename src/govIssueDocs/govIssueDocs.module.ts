import { Module } from "@nestjs/common";
import { GovIssueDocsController } from "./govIssueDocs.controller";

@Module({
    controllers: [GovIssueDocsController]
})
export class GovIssueDocsModule { }