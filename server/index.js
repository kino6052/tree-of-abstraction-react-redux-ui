import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import axios from 'axios';

const indexEndpoints = (app) => {
  app.get('/item', (req, res) => {
    axios
      .get('https://personal-dashboard-umbrella-kino6052.c9users.io/item')
      .then(
        (response) => {
          let {
            data
          } = response;
          res.send(data);
        }
      )
  });
  app.get('/note', (req, res) => {
    axios
      .get('https://personal-dashboard-umbrella-kino6052.c9users.io/note')
      .then(
        (response) => {
          let {
            data
          } = response;
          res.send(data);
        }
      )
  });
}

export const jsonBodyParser = bodyParser.json();
export const app = express();
indexEndpoints(app);
console.log()
app.use('/static', express.static(path.join(__dirname, '/build')));
app.listen(process.env.PORT || '8080', () => console.log(`Listening... ${process.env.PORT}`));
