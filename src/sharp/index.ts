import sharp from 'sharp'
import path from 'path'

const resizeImage = async (filename: string, width: number, height: number)=> {
  const imagePath = path.join(__dirname, `../../imgs/original/${filename}.jpg`);
  const outputPath = path.join(__dirname, `../../imgs/processed/${filename}.jpg`);
  await sharp(imagePath).resize(width, height).toFile(outputPath)
}

export {resizeImage}