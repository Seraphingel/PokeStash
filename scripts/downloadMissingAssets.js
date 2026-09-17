import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POKEMON_DIR = path.join(__dirname, '../public/assets/pokemon');

const downloads = [
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_133_00.png',
    dest: 'pm133.icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_642_00.png',
    dest: 'pm642.fINCARNATE.icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_642_11.png',
    dest: 'pm642.fTHERIAN.icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_815_00.png',
    dest: 'pm815.icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_068_00.png',
    dest: 'pm68.icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_816_00.png',
    dest: 'pm816.icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_071_51.png',
    dest: 'pm71.fMEGA.icon.png'
  },
  {
    url: 'https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/pokemon_icon_570_00.png',
    dest: 'pm570.icon.png'
  }
];

const download = ({ url, dest }) => {
  return new Promise((resolve) => {
    const filePath = path.join(POKEMON_DIR, dest);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`Already exists: ${dest}`);
      return resolve();
    }
    const file = fs.createWriteStream(filePath);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${dest}`);
          resolve();
        });
      } else {
        console.error(`Failed ${dest}: HTTP ${res.statusCode}`);
        file.close();
        fs.unlink(filePath, () => {});
        resolve();
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${dest}:`, err.message);
      file.close();
      fs.unlink(filePath, () => {});
      resolve();
    });
  });
};

async function run() {
  for (const item of downloads) {
    await download(item);
  }
  console.log('All downloads finished!');
}

run();
