import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes';

//  import dotenv config
dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routhe handler and router instance
// app.use('/api/v1/', router);

app.get('/', (req, res) => res.status(200).json({ message: 'app has started successfully' }));

// listen for running server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
