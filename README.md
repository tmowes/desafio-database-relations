# Instruções

https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-relations

### Create repository template

https://github.com/Rocketseat/gostack-template-typeorm-relations/generate

```
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

### Testes finalizados

```
PS \desafio-database-relations> yarn test
yarn run v1.22.4
$ cross-env NODE_ENV=test jest
 PASS  src/__tests__/App.spec.ts
  App
    √ should be able to create a new customer (41ms)
    √ should not be able to create a customer with one e-mail thats already registered (19ms)
    √ should be able to create a new product (24ms)
    √ should not be able to create a customer with one e-mail thats already registered (17ms)
    √ should be able to create a new order (55ms)
    √ should not be able to create an order with a invalid customer (9ms)
    √ should not be able to create an order with invalid products (19ms)
    √ should not be able to create an order with products with insufficient quantities (41ms)
    √ should be able to subtract an product total quantity when it is ordered (58ms)
    √ should be able to list one specific order (44ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.901s, estimated 5s
Ran all test suites.
Done in 2.63s.
```
