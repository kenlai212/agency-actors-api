import { Module } from "@nestjs/common";
import { GovermentIdsController } from "./govermentIds.controller";

@Module({
    controllers: [GovermentIdsController]
})
export class GovermentIdsModule { }