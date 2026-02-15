✅ Run migrations in dev using TS directly (no need to build first)
✅ Automatically GENERATE migration by comparing Entities vs DB schema
Example: npm run migration:generate -- -n AddDiscountToProducts
✅ Create blank migration template (when you want custom SQL)
Example: npm run migration:create -- -n SeedProducts
✅ Prod migrations run against dist (after build)





Yep. Since your SSH works (ec2-user), your EC2 is Amazon Linux (most likely). Do this.

1) SSH into EC2

ssh -i product-app.pem ec2-user@18.223.32.43

2) Install Docker + start it

Run these on EC2:

sudo yum update -y
sudo yum install -y docker

sudo systemctl enable docker
sudo systemctl start docker

# allow ec2-user to run docker without sudo
sudo usermod -aG docker ec2-user

# refresh group in current session
newgrp docker

3) Verify

docker --version
docker ps

4) Install Docker Compose v2 (recommended)

On Amazon Linux 2, easiest is the plugin:

sudo yum install -y docker-compose-plugin || true
docker compose version

If docker compose still not found, install compose binary:

sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose version

✅ After this, your GitHub Action deploy step will work (docker compose ...).

⸻

5) One-time create app folder

sudo mkdir -p /opt/product-app
sudo chown -R ec2-user:ec2-user /opt/product-app


⸻

Important: open API port (only if needed)

If your frontend calls http://18.223.32.43:8080, add inbound rule:
	•	Custom TCP 8080 → 0.0.0.0/0 (or your IP)

⸻

If you paste the output of:

cat /etc/os-release

I’ll confirm whether you’re on Amazon Linux 2 or Amazon Linux 2023 and adjust the compose install command if needed.




docker commands



docker compose exec db sh
psql -U app -d product_catalog  // user name app , databse product_catalog


WARN[0000] /Users/aravindsiruvuru/Documents/product-catalog/docker-compose.yml: the attribute `version` is obsolete, it will be ignored, please remove it to avoid potential confusion 
/ # psql -U app -d product_catalog
psql (16.12)
Type "help" for help.

product_catalog=# \l
                                                      List of databases
      Name       | Owner | Encoding | Locale Provider |  Collate   |   Ctype    | ICU Locale | ICU Rules | Access privileges 
-----------------+-------+----------+-----------------+------------+------------+------------+-----------+-------------------
 postgres        | app   | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 product_catalog | app   | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | 
 template0       | app   | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/app           +
                 |       |          |                 |            |            |            |           | app=CTc/app
 template1       | app   | UTF8     | libc            | en_US.utf8 | en_US.utf8 |            |           | =c/app           +
                 |       |          |                 |            |            |            |           | app=CTc/app
(4 rows)

product_catalog=# \dt
          List of relations
 Schema |    Name    | Type  | Owner 
--------+------------+-------+-------
 public | migrations | table | app
 public | products   | table | app
(2 rows)

product_catalog=# \d table_name
Did not find any relation named "table_name".
product_catalog=# \d products 
                                     Table "public.products"
     Column      |           Type           | Collation | Nullable |           Default            
-----------------+--------------------------+-----------+----------+------------------------------
 id              | uuid                     |           | not null | uuid_generate_v4()
 title           | character varying(200)   |           | not null | 
 description     | text                     |           | not null | 
 price           | numeric(12,2)            |           | not null | 
 currency        | character varying(10)    |           | not null | 'USD'::character varying
 imageUrl        | character varying(500)   |           |          | 
 category        | character varying(80)    |           | not null | 'General'::character varying
 stock           | integer                  |           | not null | 0
 createdAt       | timestamp with time zone |           | not null | now()
 updatedAt       | timestamp with time zone |           | not null | now()
 discountPercent | integer                  |           | not null | 0
Indexes:
    "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY, btree (id)
    "UQ_69b6137c844dc50305a2f2ec385" UNIQUE CONSTRAINT, btree (title, category)

product_catalog=# DROP TABLE products 
product_catalog-# ;
DROP TABLE
product_catalog=# DROP TABLE migrations ;
DROP TABLE
product_catalog=# 










 ssh -i product-app.pem ec2-user@18.223.32.43


 docker exec -it 203e7e6b835a psql -U app -d product_catalog