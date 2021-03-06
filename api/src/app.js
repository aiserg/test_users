import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const path = require('path');
const Port = 3000;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') { 
    return res.status(200).send({});
  }
  return next();
});
app.use(express.static(path.join(__dirname, '../../user-app/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../user-app/build', 'index.html'));
});
app.use('/api', bodyParser.json({ type: 'application/json' }), require('./router').default);
app.listen(Port, () => console.log(`Server on ${Port}`));
