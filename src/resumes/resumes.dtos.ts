import { ActorRefDTO, ActorRefRequestDTO } from "../actors/actorRef.dto";

export class ResumeDTO extends ActorRefDTO {
    resumeId: string;
    documentIdentifier: string;
}

export class UploadResumeRequestDTO extends ActorRefRequestDTO {
    documentBase64: string;
}

export class GetResumesRequestDTO extends ActorRefRequestDTO { }