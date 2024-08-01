# Set up MySQL Docker

```console
docker run --name=mysql -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password mysql:9
```