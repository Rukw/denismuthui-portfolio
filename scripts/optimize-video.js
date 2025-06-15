const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
    inputDir: path.join(__dirname, '../assets/videos/original'),
    outputDir: path.join(__dirname, '../assets/videos/optimized'),
    formats: {
        webm: {
            codec: 'libvpx-vp9',
            quality: 30,
            maxWidth: 1280,
            maxHeight: 720
        },
        mp4: {
            codec: 'libx264',
            quality: 23,
            maxWidth: 1280,
            maxHeight: 720
        }
    }
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
}

// Get all video files from input directory
const videoFiles = fs.readdirSync(config.inputDir)
    .filter(file => /\.(mp4|mov|avi|mkv)$/i.test(file));

// Process each video file
videoFiles.forEach(videoFile => {
    const inputPath = path.join(config.inputDir, videoFile);
    const baseName = path.parse(videoFile).name;

    // Process for each format
    Object.entries(config.formats).forEach(([format, settings]) => {
        const outputPath = path.join(config.outputDir, `${baseName}.${format}`);

        ffmpeg(inputPath)
            .outputOptions([
                `-c:v ${settings.codec}`,
                `-crf ${settings.quality}`,
                `-vf scale='min(${settings.maxWidth},iw)':'min(${settings.maxHeight},ih)'`,
                '-movflags +faststart',
                '-preset medium'
            ])
            .output(outputPath)
            .on('end', () => {
                console.log(`Finished processing ${baseName}.${format}`);
            })
            .on('error', (err) => {
                console.error(`Error processing ${baseName}.${format}:`, err);
            })
            .run();
    });
}); 