
import express from 'express';
import cors from 'cors';
import sharp from 'sharp';
import { createCanvas, registerFont } from 'canvas';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register Custom Fonts
const fontsDir = path.join(process.cwd(), 'src/assets/fonts');

registerFont(path.join(fontsDir, 'Anton-Regular.ttf'), { family: 'Anton' });
registerFont(path.join(fontsDir, 'HindSiliguri-Regular.ttf'), { family: 'Hind Siliguri' });
registerFont(path.join(fontsDir, 'HindSiliguri-Bold.ttf'), { family: 'Hind Siliguri', weight: 'bold' });
registerFont(path.join(fontsDir, 'IndieFlower-Regular.ttf'), { family: 'Indie Flower' });
registerFont(path.join(fontsDir, 'Inter-VariableFont_opsz,wght.ttf'), { family: 'Inter' });
registerFont(path.join(fontsDir, 'LuckiestGuy-Regular.ttf'), { family: 'Luckiest Guy' });
registerFont(path.join(fontsDir, 'Oswald-VariableFont_wght.ttf'), { family: 'Oswald' });
registerFont(path.join(fontsDir, 'Satisfy-Regular.ttf'), { family: 'Satisfy' });
registerFont(path.join(fontsDir, 'Ubuntu-Regular.ttf'), { family: 'Ubuntu' });
registerFont(path.join(fontsDir, 'Ubuntu-Bold.ttf'), { family: 'Ubuntu', weight: 'bold' });


const app = express();

app.use(cors());
app.use(express.json());





app.post('/api/removebg', async (req, res) => {
    try {
        const { imageUrl, apiKey } = req.body;

        const response = await fetch('https://syntexcore.site/api/v1/removebg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageUrl,
                apiKey: process.env.REMOVEBG_API_KEY
            })
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: error.message });
    }
});





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

        console.log("Composing image (Serverless)...", { originalImageUrl, hasMask: !!maskImageUrl });



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

            if (shadow) {
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


            const maxWidth = width * 0.9;



            const lines = content.split('\n');
            const processedLines = [];




            const getWrappedLines = (text, maxWidth) => {
                const words = text.split(' ');
                const lines = [];
                let currentLine = words[0];

                for (let i = 1; i < words.length; i++) {
                    const word = words[i];
                    const width = ctx.measureText(currentLine + " " + word).width;
                    if (width < maxWidth) {
                        currentLine += " " + word;
                    } else {
                        lines.push(currentLine);
                        currentLine = word;
                    }
                }
                lines.push(currentLine);
                return lines;
            };

            lines.forEach(line => {
                const wrapped = getWrappedLines(line, maxWidth);
                processedLines.push(...wrapped);
            });

            const lineHeight = finalFontSize * 1.2;
            const totalHeight = processedLines.length * lineHeight;



            let currentY = (height / 2) - (totalHeight / 2) + (lineHeight / 2);

            processedLines.forEach((line) => {
                ctx.fillText(line, width / 2, currentY);
                currentY += lineHeight;
            });
        }

        const textBuffer = canvas.toBuffer('image/png');



        let pipeline = sharp(originalBuffer);
        const layers = [{ input: textBuffer, top: 0, left: 0 }];

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
                pipeline = pipeline.sharpen({ sigma });
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





export default app;




if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Local Backend running on http://localhost:${PORT}`);
    });
}
