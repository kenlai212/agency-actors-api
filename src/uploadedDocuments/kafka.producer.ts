import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

export enum UploadedDocumentKafkaTopics {
    DOCUMENT_SUBMITTED = "DOCUMENT_SUBMITTED",
    SECURITY_SCAN = "SECURITY_SCAN",
    STORAGE_COMPLETE = "STORAGE_COMPLETE",
    CLASSIFICATION = "CLASSIFICATION",
    QUICK_VALIDATION = "QUICK_VALIDATION",
    DATA_EXTRACTION = "DATA_EXTRACTION"
}

@Injectable()
export class KafkaProducerService {
    readonly logger: Logger = new Logger(this.constructor.name)

    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka

    async produce(topic: UploadedDocumentKafkaTopics, payload: any) {
        this.kafkaClient.emit(topic, payload)
            .subscribe({
                next: (response) => {
                    this.logger.debug(response)
                    this.logger.log(`Message published successfully to topic: ${response[0].topicName}, baseOffset: ${response[0].baseOffset}`)
                },
                error: (err) => {
                    this.logger.error(err.stack);
                }
            });
    }
}