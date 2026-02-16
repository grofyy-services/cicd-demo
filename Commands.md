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


cd ~/Downloads && ssh -i product-app.pem ec2-user@18.223.32.43 

cd /opt/product-app
docker compose -f docker-compose.prod.yml down -v
