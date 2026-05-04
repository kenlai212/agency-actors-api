import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";
import { ActorAssetDTO } from "./actorAssets.dtos";
import { ActorAsset } from "./actorAsset.entity";
import { ObjectLiteral, Repository } from "typeorm";

export abstract class ActorAssetsService<T extends ObjectLiteral> {
    @Inject(AgencyActorsService) protected readonly agencyActorsService: AgencyActorsService;

    constructor(
        protected readonly repository: Repository<T>
    ) { }

    protected async validateActor(actorId: string) {
        console.log(actorId)
        await this.agencyActorsService.validateActorId(actorId);
    }

    async deleteAsset(assetId: string) {
        const asset = await this.repository.findOneBy({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        if (!asset) {
            throw new BadRequestException("Certification with ID " + assetId + " not found");
        }

        await this.repository.delete({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("deleteAsset() not available");
            });

        const msg = `Successfully deleted ${assetId}`;
        console.log(msg);
        return msg
    }

    abstract entityToDTO(entity: ActorAsset): ActorAssetDTO
}