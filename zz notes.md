# Instruções

https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-relations

### Create repository template

https://github.com/Rocketseat/gostack-template-typeorm-relations/generate

```
cd H:\React\DesafiosGoStack\desafio-database-relations
git clone https://github.com/tmowes/go-barber-node.git
```

### Instalar dependencias

```
yarn
```

## Criar banco de dados `gostack_desafio09` e `gostack_desafio09_tests`

```
docker run --name gostack_desafio09 -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### Checar status banco de dados e reiniciar banco de dados

```
docker ps -a
docker start gostack_desafio09
```

## Create typeorm migrations

```
yarn typeorm migration:create -n CreateCustomers
yarn typeorm migration:create -n CreateProducts
yarn typeorm migration:create -n CreateOrders
yarn typeorm migration:create -n CreateOrdersProducts
```

## Rodar typeorm migrations

```
yarn typeorm migration:run
```

### Código para excecutar os testes

```
yarn test
```

### Código para rodar o programa

```
yarn dev:server
```

### Código para enviar para o Github

```
git add .
git commit -m 'message'
git push
```
