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
    async handleDocumentSubmittedEvent(@Payload() payload: any, @Ctx() context: KafkaContext) {
        this.logInboundEvent(payload, context);

        //once document submitted, trigger file scan 
        await this.uploadedDocumentsService.callexternalFileScanService(payload.uploadedDocumentId)
            .catch(error => {
                this.logger.error(error.stack);
            });

        await this.commitOffset(context);
    }

    @EventPattern(UploadedDocumentKafkaTopics.SECURITY_SCAN)
    async handleSecurityScanEvent(@Payload() payload: any, @Ctx() context: KafkaContext) {
        this.logInboundEvent(payload, context);

        //once file scanned, trigger classification
        await this.uploadedDocumentsService.callExternalDocumentClassification(payload.uploadedDocumentId)
            .catch(error => {
                this.logger.error(error.stack);
            });

        await this.commitOffset(context);
    }

    @EventPattern(UploadedDocumentKafkaTopics.CLASSIFICATION)
    async handleClassificationEvent(@Payload() payload: any, @Ctx() context: KafkaContext) {
        this.logInboundEvent(payload, context);

        //todo, validate classification type

        //once classified, trigger quick validation
        await this.uploadedDocumentsService.callExternalQuickValidation(payload.uploadedDocumentId)
            .catch(error => {
                this.logger.error(error.stack);
            });

        await this.commitOffset(context);
    }

    @EventPattern(UploadedDocumentKafkaTopics.QUICK_VALIDATION)
    async handleQuickValidationEvent(@Payload() payload: any, @Ctx() context: KafkaContext) {
        this.logInboundEvent(payload, context);

        //todo, fuzzy name match

        //todo, validate date expiry

        //once quick validated, trigger detail extraction
        await this.uploadedDocumentsService.callExternalDetailExtraction(payload.uploadedDocumentId)
            .catch(error => {
                this.logger.error(error.stack);
            });

        await this.commitOffset(context);
    }

    @EventPattern(UploadedDocumentKafkaTopics.DATA_EXTRACTION)
    async handleDataExtractionEvent(@Payload() payload: any, @Ctx() context: KafkaContext) {
        this.logInboundEvent(payload, context);

        //todo, populate actor assets

        await this.commitOffset(context);
    }



    private logInboundEvent(payload: any, context: KafkaContext) {
        const { offset } = context.getMessage();
        const topic = context.getTopic();
        const partition = context.getPartition();
        this.logger.log(
            `Received message from topic [${topic}] partition [${partition}] offset [${offset}]`
        );

        this.logger.log(`Payload: ${JSON.stringify(payload)}`);
    }

    private async commitOffset(context: KafkaContext) {
        const { offset } = context.getMessage();
        const topic = context.getTopic();
        const partition = context.getPartition();
        await context
            .getConsumer()
            .commitOffsets([
                { topic, partition, offset: (parseInt(offset) + 1).toString() },
            ]);
    }
}