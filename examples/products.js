import createClient from '../src/';

const token = process.env.TOKEN;
const supplierId = 'ff776456-8a19-48bf-9b1b-28a98cccd285';

const client = createClient({
  token,
  logger: console,
});

async function getProducts() {
  try {
    const products = await client.products.findAll({ supplierId });
    return products;
  } catch (e) {
    console.log(e);
    return null;
  }
}

getProducts();
