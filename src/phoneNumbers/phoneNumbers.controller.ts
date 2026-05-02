import { Body, Controller, Delete, Get, Post, Query } from "@nestjs/common";
import { CreatePhoneNumberDTO, PhoneNumberDTO, SearchPhoneNumberDTO } from "./phoneNumbers.dtos";

@Controller("/phone-numbers")
export class PhoneNumbersController {
    constructor() { }

    @Post("/")
    async createPhoneNumber(@Body() body: CreatePhoneNumberDTO): Promise<PhoneNumberDTO> {
        return new PhoneNumberDTO
    }

    @Get("/")
    async searchPhoneNumbers(@Query() query: SearchPhoneNumberDTO): Promise<PhoneNumberDTO[]> {
        return [];
    }

    @Delete("/:phoneNumberId")
    async deletePhoneNumber(): Promise<string> {
        return "Phone number deleted";
    }

}