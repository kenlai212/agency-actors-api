import { Logger, Module, Post } from "@nestjs/common";
import { EmailAddressesController } from "./emailAddresses.controller";
import { AgencyActorsModule } from "../agencyActors/agencyActors.module";
import { EmailAdddressesService } from "./emailAddresses.service";
import { EmailAddress } from "./emailAddress.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmailAddress]),
        AgencyActorsModule
    ],
    controllers: [
        EmailAddressesController
    ],
    providers: [
        EmailAdddressesService
    ],
    exports: [
        EmailAdddressesService
    ]
})
export class EmailAddressesModule { }