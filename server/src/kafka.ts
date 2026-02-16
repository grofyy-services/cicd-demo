import { Kafka, Producer } from "kafkajs";

let producer: Producer | null = null;

export const BUY_EVENT_TOPIC = "product.buy";

export async function getKafkaProducer(): Promise<Producer | null> {
  const brokers = process.env.KAFKA_BROKERS;
  if (!brokers) {
    console.warn("KAFKA_BROKERS not set, buy events will not be published");
    return null;
  }
  if (producer) return producer;
  const kafka = new Kafka({
    clientId: "product-api",
    brokers: brokers.split(",").map((b) => b.trim()),
  });
  producer = kafka.producer();
  await producer.connect();
  return producer;
}

export async function publishBuyEvent(payload: {
  productId: string;
  productTitle: string;
  price: string;
  currency: string;
  quantity: number;
  boughtAt: string;
}) {
  const p = await getKafkaProducer();
  if (!p) return;
  await p.send({
    topic: BUY_EVENT_TOPIC,
    messages: [{ value: JSON.stringify(payload) }],
  });
}
