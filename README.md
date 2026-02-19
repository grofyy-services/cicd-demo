# Product Catalog + Invoice Service

A full-stack product catalog with a Kafka-based buy flow: the API handles product CRUD and buy requests, and the Invoice Service consumes buy events to create invoices.

## Architecture

- **API** (`server`): Product CRUD and Buy API. Publishes buy events to Kafka.
- **Invoice Service**: Consumes buy events from Kafka and writes invoices to `invoice_db`.
- **Kafka**: Message broker. Topic `product.buy` carries buy events.
- **Postgres**: Hosts `product_db` (products) and `invoice_db` (invoices).

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development without full Docker)

## Quick Start

```bash
docker compose up --build
```

This starts:

| Service          | Port  | Description                          |
|------------------|-------|--------------------------------------|
| **Postgres**     | 5433  | Databases `product_db`, `invoice_db` |
| **Kafka**        | 9092  | Apache Kafka (KRaft, no Zookeeper)   |
| **Kafka UI**     | 9094  | Web UI for topics and messages      |
| **API**          | 8080  | Product API + Kafka producer         |
| **Invoice Service** | —   | Kafka consumer, creates invoices     |
| **Web**          | 3000  | Vite/React frontend                  |

- App: http://localhost:3000  
- API: http://localhost:8080  
- Kafka UI: http://localhost:9094  

## Buy Flow

1. User clicks **Buy** on a product on the products list page.
2. Frontend calls `POST /api/products/:id/buy`.
3. **API**:
   - Checks product exists and has stock
   - Decrements `stock` by 1
   - Publishes a buy event to Kafka topic `product.buy`
   - Returns updated product
4. **Invoice Service**:
   - Consumes the buy event from `product.buy`
   - Inserts a row into `invoices` in `invoice_db`

### Buy Event Payload (Kafka)

```json
{
  "productId": "uuid",
  "productTitle": "Product Name",
  "price": "19.99",
  "currency": "USD",
  "quantity": 1,
  "boughtAt": "2025-02-15T12:00:00.000Z"
}
```

## Local Development (without full Docker)

Run only Postgres and Kafka in Docker, then API and Invoice Service (and optionally the client) locally.

1. **Start Postgres and Kafka**

   ```bash
   docker compose up -d db kafka kafka-ui
   ```

2. **Environment**

   In `server/.env.local`:

   ```
   DATABASE_URL=postgres://app:app@localhost:5433/product_db
   KAFKA_BROKERS=localhost:9092
   ```

   In `invoice-service/.env.local`:

   ```
   DATABASE_URL=postgres://app:app@localhost:5433/invoice_db
   KAFKA_BROKERS=localhost:9092
   ```

   (`invoice_db` is created by the Postgres init script when the stack first runs.)

3. **Migrations**

   ```bash
   cd server && npm run migration:up
   cd ../invoice-service && npm run migration:up
   ```

4. **Run services**

   ```bash
   cd server && npm run dev
   cd invoice-service && npm run dev
   ```

   In another terminal, run the client:

   ```bash
   cd client && npm run dev
   ```

## Migrations

- **Run migrations (dev)**: TypeScript is run directly; no build required.
- **Generate migration** from entity/schema diff:
  ```bash
  npm run migration:generate -- -n AddDiscountToProducts
  ```
- **Create blank migration** (e.g. for custom SQL or seeds):
  ```bash
  npm run migration:create -- -n SeedProducts
  ```
- **Prod**: Run migrations against built `dist` after `npm run build`.

Run these from `server/` or `invoice-service/` as appropriate.

## Verifying Kafka

```bash
# List topics
docker compose exec kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list

# Consume buy events (optional)
docker compose exec kafka /opt/kafka/bin/kafka-console-consumer.sh \
  --bootstrap-server localhost:9092 \
  --topic product.buy \
  --from-beginning
```

Or use **Kafka UI** at http://localhost:9094.

## Verifying Invoices

```bash
docker compose exec db psql -U app -d invoice_db -c "SELECT * FROM invoices;"
```

## Useful Docker Commands

```bash
# Shell into API container
docker exec -it product_catalog_server sh

# Connect to Postgres (product_db)
docker exec -it product_catalog_cluster psql -U app -d product_db

# List tables
# In psql: \dt
```

## Production

For production, use the production Compose file and pre-built images (see `docker-compose.prod.yml`). Deploy steps (e.g. EC2, Docker install, and running the stack) are documented in `Commands.md`.
