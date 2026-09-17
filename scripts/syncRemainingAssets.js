import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POKEMON_DIR = path.join(__dirname, '../public/assets/pokemon');
const EVENTS_DIR = path.join(__dirname, '../public/assets/events');

// 1. Copy already scraped assets into pokemon dir
const copies = [
  { from: 'pm816.icon.png', to: 'pm816.icon.png' },
  { from: 'pm71.fMEGA.icon.png', to: 'pm71.fMEGA.icon.png' },
  { from: 'pokemon_icon_642_11.png', to: 'pm642.fTHERIAN.icon.png' },
  { from: 'poke_capture_0815_000_mf_g_00000000_f_n.png', to: 'pm815.icon.png' }
];

copies.forEach(({ from, to }) => {
  const src = path.join(EVENTS_DIR, from);
  const dest = path.join(POKEMON_DIR, to);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${from} -> ${to}`);
  }
});

// 2. Fetch Thundurus Incarnate from PokeAPI (642 is Thundurus Incarnate Forme)
const download = (url, destName) => {
  return new Promise((resolve) => {
    const dest = path.join(POKEMON_DIR, destName);
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${destName}`);
          resolve();
        });
      } else {
        console.log(`HTTP ${res.statusCode} for ${url}`);
        file.close();
        fs.unlink(dest, () => {});
        resolve();
      }
    }).on('error', (e) => {
      console.error(e.message);
      file.close();
      fs.unlink(dest, () => {});
      resolve();
    });
  });
};

async function fetchRemaining() {
  await download('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/642.png', 'pm642.fINCARNATE.icon.png');
  await download('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/815.png', 'pm815.icon.png');
  console.log('Finished syncing all remaining assets!');
}

fetchRemaining();
