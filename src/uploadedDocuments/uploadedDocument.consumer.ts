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
    async handleEvent(@Payload() payload: any, @Ctx() context: KafkaContext) {
        //this.logger.debug(context);
        const { offset } = context.getMessage();
        const topic = context.getTopic();
        const partition = context.getPartition();
        this.logger.log(
            `Received message from topic [${topic}] partition [${partition}] offset [${offset}]`
        );

        this.logger.log(`Payload: ${JSON.stringify(payload)}`);

        await this.uploadedDocumentsService.callexternalFileScanService(payload.uploadedDocumentId)
            .catch(error => {
                this.logger.error(error.stack);
            });

        await context
            .getConsumer()
            .commitOffsets([
                { topic, partition, offset: (parseInt(offset) + 1).toString() },
            ]);
    }
}