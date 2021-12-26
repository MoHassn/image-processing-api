import express, { Application } from 'express';

const app: Application = express();

app.get('/', (req, res) => {
  res.send('hello server');
});

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:3000`);
});
