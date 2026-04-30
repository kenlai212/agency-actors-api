import { ActorAttributeDTO, ActorAttributeRequestDTO } from "../actors/actorAttribute.dto";

export class ResumeDTO extends ActorAttributeDTO {
    resumeId: string;
    documentIdentifier: string;
}

export class UploadResumeRequestDTO extends ActorAttributeRequestDTO {
    documentBase64: string;
}

export class GetResumesRequestDTO extends ActorAttributeRequestDTO { }