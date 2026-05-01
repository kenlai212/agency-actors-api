import { Body, Controller, Get, Post } from "@nestjs/common";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";

@Controller("/employments")
export class EmploymentsController {
    @Post("/")
    async createNewEmployments(@Body() newEmploymentRequestDTO: NewEmploymentRequestDTO): Promise<EmploymentDTO> {
        return new EmploymentDTO();
    }

    @Get("/")
    async searchEmployments(): Promise<EmploymentDTO[]> {
        return [];
    }
}