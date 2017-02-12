import createClient from '../src/';

const token = process.env.TOKEN;
const supplierId = 'ff776456-8a19-48bf-9b1b-28a98cccd285';

const client = createClient({
  token,
  logger: console,
});

async function getInvoices() {
  try {
    const invoices = [];
    for await (const response of client.invoices.findAll({ supplierId }, { iterator: true })) {
      invoices.push(response.data);
    }
    return invoices;
  } catch (e) {
    console.log(e);
    return null;
  }
}

getInvoices();
