import { ActorAssetDTO, CreateNewAssetRequestDTO, SearchAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class ResumeDTO extends ActorAssetDTO {
    documentIdentifier: string;
}

export class UploadResumeRequestDTO extends CreateNewAssetRequestDTO {
    documentBase64: string;
}