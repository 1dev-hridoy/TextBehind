
import express from 'express';
import cors from 'cors';
import sharp from 'sharp';
import { createCanvas, registerFont, loadImage } from 'canvas';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());




async function fetchImageBuffer(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
    return await response.buffer();
}

app.post('/api/compose', async (req, res) => {
    try {
        const { originalImageUrl, maskImageUrl, textConfig, effects } = req.body;

        if (!originalImageUrl) {
            return res.status(400).json({ error: 'Missing original image URL' });
        }

        console.log("Composing image...", { originalImageUrl, hasMask: !!maskImageUrl, textConfig });


        const originalBuffer = await fetchImageBuffer(originalImageUrl);


        const originalMeta = await sharp(originalBuffer).metadata();
        const width = originalMeta.width;
        const height = originalMeta.height;


        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        if (textConfig && textConfig.content) {
            const { content, font, size, color, opacity, letterSpacing, shadow } = textConfig;





            let fontSizePx = 96;
            if (typeof size === 'string' && size.includes('rem')) {
                fontSizePx = parseFloat(size) * 16;
            } else if (typeof size === 'number') {
                fontSizePx = size;
            }



            const scaleFactor = width / (req.body.previewWidth || 800);
            const finalFontSize = fontSizePx * scaleFactor;


            ctx.globalAlpha = opacity !== undefined ? opacity : 1.0;




            if (shadow) { // { blur: 0, color: '#000' }
                ctx.shadowColor = shadow.color || '#000000';
                ctx.shadowBlur = (shadow.blur || 0) * scaleFactor;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 10 * scaleFactor;
            }





            ctx.font = `bold ${finalFontSize}px "${font.split(',')[0].replace(/['"]/g, '')}", sans-serif`;
            ctx.fillStyle = color || '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';



            if (letterSpacing) {



                const spacingPx = parseFloat(letterSpacing);
                ctx.letterSpacing = `${spacingPx * scaleFactor}px`;
            }




            ctx.fillText(content, width / 2, height / 2);
        }

        const textBuffer = canvas.toBuffer('image/png');


        let pipeline = sharp(originalBuffer);



        const layers = [];




        layers.push({ input: textBuffer, top: 0, left: 0 });




        if (maskImageUrl) {
            const maskBuffer = await fetchImageBuffer(maskImageUrl);




            const maskMeta = await sharp(maskBuffer).metadata();
            if (maskMeta.width !== width || maskMeta.height !== height) {
                const resizedMask = await sharp(maskBuffer).resize(width, height).toBuffer();
                layers.push({ input: resizedMask, top: 0, left: 0 });
            } else {
                layers.push({ input: maskBuffer, top: 0, left: 0 });
            }
        }

        pipeline = pipeline.composite(layers);




        if (effects) {
            if (effects.sharpen && effects.sharpen > 0) {



                const sigma = 0.5 + (effects.sharpen / 100) * 2.0;
                pipeline = pipeline.sharpen({
                    sigma: sigma,
                    m1: 0.0,
                    m2: 3.0,
                    x1: 2.0,
                    y2: 10.0,
                    y3: 20.0
                });
            }
            if (effects.retro) {
                pipeline = pipeline
                    .modulate({ brightness: 0.95, saturation: 0.8 })
                    .tint({ r: 240, g: 230, b: 200 });
            }
        }




        const finalBuffer = await pipeline
            .withMetadata()
            .png({
                compressionLevel: 9,
                adaptiveFiltering: true,
                palette: false,


                force: true
            })
            .toBuffer();

        res.set('Content-Type', 'image/png');
        res.set('Content-Disposition', `attachment; filename="texture-design-${Date.now()}.png"`);
        res.send(finalBuffer);

    } catch (error) {
        console.error("Composition error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
