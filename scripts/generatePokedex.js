import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_FILE = path.join(__dirname, '../src/data/pokedexData.js');

async function build() {
  console.log('Fetching Pokemon GO Pokedex dataset...');
  const res = await fetch('https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json');
  const data = await res.json();

  console.log(`Fetched ${data.length} Pokemon entries.`);

  const pokemonList = [];
  const pokemonMap = {};

  for (const p of data) {
    if (!p.names?.English) continue;
    const name = p.names.English.trim();
    const id = p.dexNr;
    const types = [p.primaryType?.names?.English, p.secondaryType?.names?.English].filter(Boolean);
    const baseIcon = `pm${id}.icon.png`;

    const entry = {
      id,
      name,
      types,
      icon: baseIcon
    };

    pokemonList.push(entry);
    pokemonMap[name.toLowerCase()] = entry;

    // Megas
    if (p.megaEvolutions) {
      for (const megaKey of Object.keys(p.megaEvolutions)) {
        const mega = p.megaEvolutions[megaKey];
        if (mega?.names?.English) {
          const megaName = mega.names.English.trim();
          const megaTypes = [mega.primaryType?.names?.English, mega.secondaryType?.names?.English].filter(Boolean);
          let megaIcon = baseIcon;
          if (mega.assets?.image) {
            megaIcon = path.basename(mega.assets.image);
          }
          const megaEntry = {
            id,
            name: megaName,
            types: megaTypes.length ? megaTypes : types,
            icon: megaIcon
          };
          pokemonList.push(megaEntry);
          pokemonMap[megaName.toLowerCase()] = megaEntry;
        }
      }
    }

    // Region forms
    if (p.regionForms) {
      for (const rKey of Object.keys(p.regionForms)) {
        const rf = p.regionForms[rKey];
        if (rf?.names?.English) {
          const rfName = rf.names.English.trim();
          const rfTypes = [rf.primaryType?.names?.English, rf.secondaryType?.names?.English].filter(Boolean);
          let rfIcon = baseIcon;
          if (rf.assets?.image) {
            rfIcon = path.basename(rf.assets.image);
          }
          const rfEntry = {
            id,
            name: rfName,
            types: rfTypes.length ? rfTypes : types,
            icon: rfIcon
          };
          pokemonList.push(rfEntry);
          pokemonMap[rfName.toLowerCase()] = rfEntry;
        }
      }
    }
  }

  // Add Special Form / Costume Aliases & Presets
  const specialAliases = [
    {
      name: "Captain's Cap Pikachu",
      id: 25,
      types: ["Electric"],
      icon: "pm25.fHORIZONS.icon.png"
    },
    {
      name: "Charmander wearing Friede's goggles",
      id: 4,
      types: ["Fire"],
      icon: "pm4.fGOGGLES_2026.icon.png"
    },
    {
      name: "Charmeleon wearing Friede's goggles",
      id: 5,
      types: ["Fire"],
      icon: "pm5.fGOGGLES_2026.icon.png"
    },
    {
      name: "Charizard wearing Friede's goggles",
      id: 6,
      types: ["Fire", "Flying"],
      icon: "pm6.fGOGGLES_2026.icon.png"
    },
    {
      name: "Turquoise T-Shirt Pikachu",
      id: 25,
      types: ["Electric"],
      icon: "pm25.fTSHIRT_03.icon.png"
    },
    {
      name: "Spring Cottonee",
      id: 546,
      types: ["Grass", "Fairy"],
      icon: "pm546.cSPRING_2024.icon.png"
    },
    {
      name: "Origin Dialga",
      id: 483,
      types: ["Steel", "Dragon"],
      icon: "pm483.fORIGIN.icon.png"
    },
    {
      name: "Dialga (Origin Forme)",
      id: 483,
      types: ["Steel", "Dragon"],
      icon: "pm483.fORIGIN.icon.png"
    },
    {
      name: "Origin Palkia",
      id: 484,
      types: ["Water", "Dragon"],
      icon: "pm484.fORIGIN.icon.png"
    },
    {
      name: "Palkia (Origin Forme)",
      id: 484,
      types: ["Water", "Dragon"],
      icon: "pm484.fORIGIN.icon.png"
    },
    {
      name: "Origin Giratina",
      id: 487,
      types: ["Ghost", "Dragon"],
      icon: "pm487.fORIGIN.icon.png"
    },
    {
      name: "Giratina (Origin Forme)",
      id: 487,
      types: ["Ghost", "Dragon"],
      icon: "pm487.fORIGIN.icon.png"
    },
    {
      name: "Altered Giratina",
      id: 487,
      types: ["Ghost", "Dragon"],
      icon: "pm487.fALTERED.icon.png"
    },
    {
      name: "Giratina (Altered Forme)",
      id: 487,
      types: ["Ghost", "Dragon"],
      icon: "pm487.fALTERED.icon.png"
    },
    {
      name: "Therian Thundurus",
      id: 642,
      types: ["Electric", "Flying"],
      icon: "pm642.fTHERIAN.icon.png"
    },
    {
      name: "Incarnate Thundurus",
      id: 642,
      types: ["Electric", "Flying"],
      icon: "pm642.fINCARNATE.icon.png"
    },
    {
      name: "Incarnate Landorus",
      id: 645,
      types: ["Ground", "Flying"],
      icon: "pm645.fINCARNATE.icon.png"
    },
    {
      name: "Hisuian Sliggoo",
      id: 705,
      types: ["Steel", "Dragon"],
      icon: "pm705.fHISUIAN.icon.png"
    }
  ];

  for (const alias of specialAliases) {
    pokemonList.push(alias);
    pokemonMap[alias.name.toLowerCase()] = alias;
  }

  // Deduplicate and sort list
  const uniqueNames = new Set();
  const dedupedList = [];
  for (const item of pokemonList) {
    if (!uniqueNames.has(item.name.toLowerCase())) {
      uniqueNames.add(item.name.toLowerCase());
      dedupedList.push(item);
    }
  }
  dedupedList.sort((a, b) => a.id - b.id || a.name.localeCompare(b.name));

  console.log(`Generated ${dedupedList.length} total entries.`);

  const content = `// Generated Pokemon GO Pokedex dataset
// Contains official IDs, names, primary/secondary types, and asset mappings

export const POKEDEX_LIST = ${JSON.stringify(dedupedList, null, 2)};

export const POKEDEX_MAP = ${JSON.stringify(pokemonMap, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, content, 'utf-8');
  console.log(`Successfully wrote to ${OUTPUT_FILE}`);
}

build().catch(err => {
  console.error('Error generating pokedex:', err);
  process.exit(1);
});
