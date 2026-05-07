import { BadRequestException, Inject, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { AgencyActorsService } from "../agencyActors/agencyActors.service";
import { ActorAssetDTO } from "./actorAssets.dtos";
import { Repository } from "typeorm";
import { ActorAsset } from "./actorAsset.entity";

export abstract class ActorAssetsService<T extends ActorAsset, K extends ActorAssetDTO> {
    @Inject(AgencyActorsService) protected readonly agencyActorsService: AgencyActorsService;

    constructor(
        protected readonly repository: Repository<T>
    ) { }

    protected async validateActor(actorId: string) {
        await this.agencyActorsService.validateActorId(actorId);
    }

    async findAsset(assetId?: string): Promise<K> {
        const asset = await this.repository.findOne({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("findCertifications() not available");
            });

        if (!asset)
            throw new NotFoundException(`Asset ${assetId} not found`);

        return this.entityToDTO(asset);
    }

    async searchAssetsByActorId(actorId?: string): Promise<K[]> {
        const assets = await this.repository.find({ where: { actorId } as any })
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("findCertifications() not available");
            });

        let dtos: Array<K> = [];
        for (const item of assets) {
            dtos.push(this.entityToDTO(item));
        }

        return dtos;
    }

    async deleteAsset(assetId: string): Promise<string> {
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

    async validateAssetId(assetId: string): Promise<T> {
        const asset = await this.repository.findOneBy({ assetId } as any)
            .catch((error) => {
                console.error(error);
                throw new InternalServerErrorException("deleteCertification() not available");
            });

        if (!asset) {
            throw new NotFoundException("Certification with ID " + assetId + " not found");
        }

        return asset;
    }

    abstract entityToDTO(entity: T): K
}