const elasticsearch = require('elasticsearch');
const dotenv = require('dotenv');
dotenv.config();

const client = new elasticsearch.Client({
    host: `${process.env.HOST_URL}:${process.env.PORT}`,
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('=== UNABLE TO REACH TARGET ===');
  } else {
    console.log('=== OK ===');
  }
});

client.search({
  index: 'sources',
  type: '_doc',
}, (err, response, status) => {
  if (err) {
    console.trace(err);
  } else {
    console.log('=== RESPONSE ===', response.hits.hits.map(x => x._source.data));
    console.log('=== STATUS ===', status);
  }
});