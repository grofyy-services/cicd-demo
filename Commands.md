 # How to run FE 
1. Run docker containers for db, kafka, kafka-ui -- docker compose up -d db kafka kafka-ui
2. npm run dev

# How to run BE
1. npm run dev

# How to run migrations
1. npm run migration:generate -- name
2. npm run migration:up



docker compose build     
--  first we need to build the docker images from our docker files ( only builds the images for given docker files , not for kafka and postgres as they are already images)

docker compose build server -- to build image seperatly

docker images    -- to see all images


docker compose up --- spin up all the images in that 


docker compose down -v
docker compose up --build

docker ps

-- sh into continer with container name

    1.  docker exec -it product_catalog_server sh   
    2. ls -- to see all the folders in it
    3. cat package.json 
    4. exit 

-- sh in postgres cluster
    1. docker exec -it product_catalog_cluster sh  - into cluster continer
    2. psql -U app -d product_db     -- to enter into postgres server
    3. \dt   -- to see all tables
    4. select * from products;
    5. exit -- to exit from current 


cd ~/Downloads && ssh -i product-app.pem ec2-user@18.223.32.43    --- ssh to ec2

cd /opt/product-app
docker compose -f docker-compose.prod.yml down -v

 


docker ps -a --filter name=product_catalog_kafka  - to see killed containers





----- after ec2 create -------


sudo mkdir -p /opt/product-app
sudo chown -R ec2-user:ec2-user /opt/product-app   # or ubuntu:ubuntu


----------- install docker  ---------

sudo yum update -y
sudo amazon-linux-extras enable docker
sudo yum install -y docker
sudo systemctl enable --now docker

----------- install docker & compose -----------


sudo mkdir -p /usr/local/lib/docker/cli-plugins

sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 \
  -o /usr/local/lib/docker/cli-plugins/docker-compose

sudo chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

docker compose version



---------------
