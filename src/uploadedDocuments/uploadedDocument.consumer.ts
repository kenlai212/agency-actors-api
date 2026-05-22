import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UploadedDocumentsConsumerController {

    @EventPattern('uploadedDocument.submitted')
    async handleEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
        const originalMessage = context.getMessage();
        const partition = context.getPartition();
        console.log(`Received message from partition ${partition}:`, message);
    }
}