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