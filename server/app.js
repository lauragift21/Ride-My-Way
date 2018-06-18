import express from 'express';

const app = express();

app.get('/', (req, res) => res.status(200).json({ message: 'app has started successfully' }));

app.listen(3000, () => console.log('App running at port 3000'));
