import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import router from './routes';

//  import dotenv config
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set router instance
app.use(cors());
app.use('/api/v1/', router);

const port = process.env.PORT || 8080;
// listen for running server
const server = app.listen(port, () => {
  console.log('Server started on port', port);
});

export default app;
exports.server = server;
