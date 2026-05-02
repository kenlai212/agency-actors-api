import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { EmploymentDTO, NewEmploymentRequestDTO } from "./employments.dtos";
import { UploadDocumentRequestDTO } from "../certifications/certifications.dtos";

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

    @Delete("/:employmentId")
    async deleteEmployments(@Param("employmentId") employmentId: string): Promise<string> {
        return "Successfully deleted"
    }

    @Post("/upload-document")
    async uploadDocument(@Body() body: UploadDocumentRequestDTO): Promise<EmploymentDTO> {
        return new EmploymentDTO();
    }
}