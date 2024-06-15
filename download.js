const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Read URLs from example.txt
const filePath = path.join(__dirname, 'example.txt');
const urls = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);



// Function to download an image
const downloadImage = async (url, index) => {
  const imagePath = path.join(__dirname, `./Images/image${index}.jpg`);
  const writer = fs.createWriteStream(imagePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

// Download all images
const downloadAllImages = async () => {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      await downloadImage(url, i + 1);
    //   console.log(`Downloaded image ${i + 1} from ${url}`);
    } catch (error) {
      console.error(`Failed to download image ${i + 1} from ${url}:`, error.message);
    }
  }
};

downloadAllImages();
