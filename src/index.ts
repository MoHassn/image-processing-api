import express, { Application, Request, Response } from 'express';
import {resizeImage} from './sharp/index'
import path from 'path'
import fs from 'fs'
const app: Application = express();

interface QueryParams {
  filename: string;
  width: string;
  height: string;
}

app.get('/', async (req: Request, res: Response) => {
  const {filename, width, height} = req.query as unknown as QueryParams;

  const originalImagePath = path.join(__dirname, `../imgs/original/${filename}.jpg`);
  const processedImagePath = path.join(__dirname, `../imgs/processed/${filename}.jpg`);

  if (!fs.existsSync(originalImagePath)) {
    res.status(404).send("Not found")
  }

  if (fs.existsSync(processedImagePath)) {
    res.sendFile(processedImagePath)
  }
  await resizeImage(filename, +width, +height)

  res.sendFile(processedImagePath);
});

app.listen(3000, () => {
  console.log(`App is listening on http://localhost:3000`);
});
