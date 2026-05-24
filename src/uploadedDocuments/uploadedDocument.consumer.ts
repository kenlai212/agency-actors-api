import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { UploadedDocumentKafkaTopics } from './kafka.producer';
import { partition } from 'rxjs';
import { UploadedDocumentsService } from './uploadedDocuments.service';

@Controller()
export class UploadedDocumentsConsumerController {
    readonly logger: Logger = new Logger(this.constructor.name)

    constructor(
        private readonly uploadedDocumentsService: UploadedDocumentsService
    ) { }

    @EventPattern(UploadedDocumentKafkaTopics.DOCUMENT_SUBMITTED)
    async handleEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
        this.logger.debug(context);
        this.logger.log(`Recieved event from topic: ${context.getTopic()}`)
        this.logger.log(message);

        await this.uploadedDocumentsService.callexternalFileScanService(message.uploadedDocumentId);
    }
}