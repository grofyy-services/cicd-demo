import { Kafka } from "kafkajs";
import { AppDataSource } from "./dataSource";
import { Invoice } from "./entity/Invoice";

const TOPIC = "product.buy";

interface BuyEvent {
  productId: string;
  productTitle: string;
  price: string;
  currency: string;
  quantity: number;
  boughtAt: string;
}

export async function startConsumer() {
  const brokers = process.env.KAFKA_BROKERS;
  if (!brokers) {
    throw new Error("KAFKA_BROKERS is required");
  }

  const kafka = new Kafka({
    clientId: "invoice-service",
    brokers: brokers.split(",").map((b) => b.trim()),
  });

  const consumer = kafka.consumer({ groupId: "invoice-consumer-group" });
  await consumer.connect();

  // Ensure topic exists (Kafka auto-creates by default, but we can also create explicitly)
  const admin = kafka.admin();
  await admin.connect();
  const topics = await admin.listTopics();
  if (!topics.includes(TOPIC)) {
    await admin.createTopics({ topics: [{ topic: TOPIC }] });
  }
  await admin.disconnect();

  await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const value = message.value?.toString();
      if (!value) return;

      try {
        const event: BuyEvent = JSON.parse(value);
        const repo = AppDataSource.getRepository(Invoice);
        const invoice = repo.create({
          productId: event.productId,
          productTitle: event.productTitle,
          price: event.price,
          currency: event.currency,
          quantity: event.quantity ?? 1,
        });
        await repo.save(invoice);
        console.log(`Invoice created for product ${event.productTitle} (${event.productId})`);
      } catch (err) {
        console.error("Failed to create invoice:", err);
      }
    },
  });

  console.log(`Invoice consumer listening on topic: ${TOPIC}`);
}
