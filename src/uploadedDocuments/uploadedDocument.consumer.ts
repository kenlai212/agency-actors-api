import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from './kafka.producer';

@Controller()
export class UploadedDocumentsConsumerController {

    @EventPattern(KafkaTopics.UPLOADED_DOCUMENT_SUBMITTED)
    async handleEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
        const originalMessage = context.getMessage();
        const partition = context.getPartition();
        console.log(`Received message from partition ${partition}:`, message);
    }
}