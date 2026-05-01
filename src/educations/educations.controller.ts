import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { EducationDTO, NewEducationRequestDTO, SearchEducationsRequestDTO } from "./educations.dtos";

@Controller("educations")
export class EducationsController {
    @Post("/")
    @ApiOperation({
        summary: 'Create new Education.',
        description: `New Education must tie to an actor.`
    })
    @ApiOkResponse({
        description: 'Successfully POST response EducationDTO.',
        type: EducationDTO,
    })
    async createNewEducation(@Body() body: NewEducationRequestDTO): Promise<EducationDTO> {
        return new EducationDTO();
    }

    @Get("/")
    @ApiOperation({
        summary: 'Create new Education.',
        description: `New Education must tie to an actor.`
    })
    @ApiOkResponse({
        description: 'Successfully POST response EducationDTO.',
        type: EducationDTO,
    })
    async searchEducations(@Query() query: SearchEducationsRequestDTO): Promise<Array<EducationDTO>> {
        return [];
    }

    @Delete("/:educationId")
    async deleteEducation(@Param("educationId") educationId: string): Promise<string> {
        return `Successfully deleted ${educationId}`
    }

    @Post("/upload-document")
    async uploadDocument() { }
}