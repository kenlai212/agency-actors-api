import { Module, Post } from "@nestjs/common";
import { EmailAddressesController } from "./emailAddresses.controller";

@Module({
    controllers: [
        EmailAddressesController
    ],
})
export class EmailAddressesModule {
    @Post()
    async createNewEmailAddress() { }
}