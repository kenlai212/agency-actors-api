import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

export enum KafkaTopics {
    UPLOADED_DOCUMENT_SUBMITTED = "UPLOADED_DOCUMENT_SUBMITTED"
}

@Injectable()
export class KafkaProducerService {
    readonly logger: Logger = new Logger(this.constructor.name)

    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka

    async produce(topic: KafkaTopics, payload: any) {
        this.kafkaClient.emit(topic, payload)
            .subscribe({
                next: (response) => { this.logger.log('Message published successfully', response) },
                error: (err) => {
                    this.logger.error(err.stack)
                }
            });
    }
}