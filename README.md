# Ordermentum Node.js SDK

Node.js SDK for the Ordermentum

### Getting started

```bash
curl \
  -X POST \
  -d username=example@example.com \
  -d password=secret \
  -d grant_type=password \
  "https://app.ordermentum.com/v1/auth"
```

```javascript
import createClient from 'ordermentum-sdk';

const client = createClient({
  token: '[TOKEN]',
});
```

### Products

```javascript
const products = client.products.findAll({ supplierId: '' });

const response = client.products.create({

});
```

### Orders

```javascript
const orders = client.orders.findAll({ supplierId: '' });

const response = client.orders.update(id, {

});
```

### Invoices

```javascript
const invoices = client.invoices.findAll({ supplierId: '' });

const response = client.invoices.update(id, {

});
```
