import express, { Application } from 'express';
import sequelize from './models/model';
import cors from 'cors';

import router from './routers';
import bodyParser from 'body-parser';

const app: Application = express();

const port = 3000;

const corsOptions = {
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
  credentials: true
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/', router);

(async () => {
  try {
    await sequelize.sync();
    app.listen(port, () => console.log(`Server running at port ${port}!`))
  } catch (error) {
    console.log(error);
  }
})();


