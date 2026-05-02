import { ActorAssetDTO, ActorAssetRequestDTO } from "../actorAssets/actorAssets.dtos";

export class ResumeDTO extends ActorAssetDTO {
    resumeId: string;
    documentIdentifier: string;
}

export class UploadResumeRequestDTO extends ActorAssetRequestDTO {
    documentBase64: string;
}

export class GetResumesRequestDTO extends ActorAssetRequestDTO { }