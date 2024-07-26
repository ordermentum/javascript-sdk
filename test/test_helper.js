require('@babel/polyfill');
const register = require('@babel/register').default;

register({ extensions: ['.ts'] });
