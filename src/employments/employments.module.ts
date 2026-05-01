import { Module } from "@nestjs/common";
import { EmploymentsController } from "./employments.controller";

@Module({
    controllers: [
        EmploymentsController
    ],
})
export class EmploymentsModule { }