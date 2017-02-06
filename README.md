# Javascript SDK for Ordermentum API

### Getting started

```javascript
import Client from 'ordermentum-js';

const client = Client({
  base: 'https://app.ordermentum.com',
  token: '[TOKEN]',
});
```

### Products

```javascript
const products = client.products.search({ });

const response = client.products.create({

});
```

### Orders

```javascript
const orders = client.orders.search({ });

const response = client.orders.update(id, {

});
```

### Invoices

```javascript
const invoices = client.invoices.search({ });

const response = client.invoices.update(id, {

});
```