import express, { Application, Request, Response } from 'express';
import { resizeImage } from './sharp/index';
import path from 'path';
import fs from 'fs';
const app: Application = express();

interface QueryParams {
  filename: string;
  width: string;
  height: string;
}

app.get('/', async (req: Request, res: Response) => {
  const { filename, width, height } = req.query as unknown as QueryParams;

  if (!filename) {
    return res.status(400).send('must provide filename');
  }

  if (!(parseInt(height) > 0))
    return res.status(400).send('must provide valid height');

  if (!(parseInt(width) > 0))
    return res.status(400).send('must provide valid width');

  const originalImagePath = path.join(
    __dirname,
    `../imgs/original/${filename}.jpg`
  );
  const processedImagePath = path.join(
    __dirname,
    `../imgs/processed/${filename}.jpg`
  );

  if (!fs.existsSync(originalImagePath)) {
    return res.status(404).send('Not found');
  }

  if (fs.existsSync(processedImagePath)) {
    return res.sendFile(processedImagePath);
  }
  try {
    await resizeImage(filename, +width, +height);
  } catch (e) {
    console.log('Error', e);
    return res.status(500).send('Error ocurred while processing image');
  }

  res.sendFile(processedImagePath);
});

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:3000`);
});

export default app;
