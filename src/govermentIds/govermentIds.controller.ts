import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { GovermentIdDTO, NewGovernmentIdRequestDTO } from "./govermentIds.dtos";

@Controller()
export class GovermentIdsController {
    @Post("/government-id")
    async uploadGovernmentId(@Body() newGovernmentIdRequest: NewGovernmentIdRequestDTO): Promise<GovermentIdDTO> {
        return new GovermentIdDTO();
    }

    @Delete("/government-id/:governmentId")
    async deleteGovernmentId(): Promise<void> {
        return;
    }

    @Get("/government-id/:candidateId")
    async getGovernmentId(): Promise<Array<GovermentIdDTO>> {
        return [new GovermentIdDTO()];
    }
}