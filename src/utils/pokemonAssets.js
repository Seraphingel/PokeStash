import { getAssetUrl } from './assets.js';
import { POKEDEX_LIST, POKEDEX_MAP } from '../data/pokedexData.js';

const BASE_POKEMON_URL = '/assets/pokemon/';
const BASE_EVENTS_URL = '/assets/events/';

// High-speed CDN mirror for Pokemon GO 3D assets
const CDN_BASE_URL = 'https://cdn.jsdelivr.net/gh/pokemon-go-api/assets@main/Pokemon/';
const CDN_FALLBACK_URL = 'https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/';

// Local files saved in public/assets/pokemon/
const LOCAL_POKEMON_ICONS = new Set([
  'pm111.icon.png', 'pm13.icon.png', 'pm133.icon.png', 'pm144.icon.png', 'pm145.icon.png',
  'pm146.icon.png', 'pm15.fMEGA.icon.png', 'pm18.fMEGA.icon.png', 'pm19.icon.png', 'pm228.icon.png',
  'pm229.fMEGA.icon.png', 'pm25.icon.png', 'pm252.icon.png', 'pm273.icon.png', 'pm3.fMEGA.icon.png',
  'pm302.fMEGA.icon.png', 'pm302.icon.png', 'pm35.icon.png', 'pm398.icon.png', 'pm4.icon.png',
  'pm460.fMEGA.icon.png', 'pm483.fORIGIN.icon.png', 'pm483.icon.png', 'pm484.fORIGIN.icon.png',
  'pm484.icon.png', 'pm487.fALTERED.icon.png', 'pm487.fORIGIN.icon.png', 'pm570.icon.png',
  'pm6.fMEGA_X.icon.png', 'pm6.fMEGA_Y.icon.png', 'pm6.icon.png', 'pm605.icon.png',
  'pm642.fINCARNATE.icon.png', 'pm642.fTHERIAN.icon.png', 'pm645.fINCARNATE.icon.png', 'pm672.icon.png',
  'pm68.icon.png', 'pm687.fMEGA.icon.png', 'pm701.icon.png', 'pm708.icon.png', 'pm71.fMEGA.icon.png',
  'pm716.icon.png', 'pm717.icon.png', 'pm755.icon.png', 'pm759.icon.png', 'pm794.icon.png',
  'pm795.icon.png', 'pm796.icon.png', 'pm798.icon.png', 'pm815.icon.png', 'pm816.icon.png',
  'pm825.icon.png', 'pm850.icon.png', 'pm859.icon.png', 'pm888.icon.png', 'pm889.icon.png',
  'pm9.fMEGA.icon.png', 'pm92.icon.png', 'pm943.icon.png', 'pokeball.png'
]);

// Local files saved in public/assets/events/
const LOCAL_EVENT_ICONS = new Set([
  'pm4.fGOGGLES_2026.icon.png', 'pm25.fTSHIRT_03.icon.png', 'pm546.cSPRING_2024.icon.png',
  'pm705.fHISUIAN.icon.png', 'pm888.fHERO.icon.png', 'pm889.fHERO.icon.png',
  'pokemon_icon_003_51.png', 'pokemon_icon_015_51.png', 'pokemon_icon_019_00.png',
  'pokemon_icon_025_00.png', 'pokemon_icon_027_61.png', 'pokemon_icon_111_00.png',
  'pokemon_icon_113_00.png', 'pokemon_icon_144_00.png', 'pokemon_icon_228_00.png',
  'pokemon_icon_229_51.png', 'pokemon_icon_282_00.png', 'pokemon_icon_398_00_shiny.png',
  'pokemon_icon_642_11.png', 'pokemon_icon_644_00.png', 'pokemon_icon_716_00.png',
  'Maschiff.png'
]);

// Official Pokemon Type Effectiveness Chart
const TYPE_CHART = {
  Normal: { Fighting: 2, Ghost: 0 },
  Fire: { Water: 2, Ground: 2, Rock: 2, Fire: 0.5, Grass: 0.5, Ice: 0.5, Bug: 0.5, Steel: 0.5, Fairy: 0.5 },
  Water: { Electric: 2, Grass: 2, Water: 0.5, Fire: 0.5, Ice: 0.5, Steel: 0.5 },
  Grass: { Fire: 2, Ice: 2, Poison: 2, Flying: 2, Bug: 2, Water: 0.5, Electric: 0.5, Grass: 0.5, Ground: 0.5 },
  Electric: { Ground: 2, Electric: 0.5, Flying: 0.5, Steel: 0.5 },
  Ice: { Fire: 2, Fighting: 2, Rock: 2, Steel: 2, Ice: 0.5 },
  Fighting: { Flying: 2, Psychic: 2, Fairy: 2, Bug: 0.5, Rock: 0.5, Dark: 0.5 },
  Poison: { Ground: 2, Psychic: 2, Grass: 0.5, Fighting: 0.5, Poison: 0.5, Bug: 0.5, Fairy: 0.5 },
  Ground: { Water: 2, Grass: 2, Ice: 2, Poison: 0.5, Rock: 0.5, Electric: 0 },
  Flying: { Electric: 2, Ice: 2, Rock: 2, Grass: 0.5, Fighting: 0.5, Bug: 0.5, Ground: 0 },
  Psychic: { Bug: 2, Ghost: 2, Dark: 2, Fighting: 0.5, Psychic: 0.5 },
  Bug: { Fire: 2, Flying: 2, Rock: 2, Grass: 0.5, Fighting: 0.5, Ground: 0.5 },
  Rock: { Water: 2, Grass: 2, Fighting: 2, Ground: 2, Steel: 2, Normal: 0.5, Fire: 0.5, Poison: 0.5, Flying: 0.5 },
  Ghost: { Ghost: 2, Dark: 2, Poison: 0.5, Bug: 0.5, Normal: 0, Fighting: 0 },
  Dragon: { Ice: 2, Dragon: 2, Fairy: 2, Fire: 0.5, Water: 0.5, Grass: 0.5, Electric: 0.5 },
  Steel: { Fire: 2, Fighting: 2, Ground: 2, Normal: 0.5, Grass: 0.5, Ice: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 0.5, Dragon: 0.5, Steel: 0.5, Fairy: 0.5, Poison: 0 },
  Dark: { Fighting: 2, Bug: 2, Fairy: 2, Ghost: 0.5, Dark: 0.5, Psychic: 0 },
  Fairy: { Poison: 2, Steel: 2, Fighting: 0.5, Bug: 0.5, Dark: 0.5, Dragon: 0 }
};

const ALL_TYPES = Object.keys(TYPE_CHART);

/**
 * Calculates all 2x and 4x weaknesses for a given set of types
 */
export function calculateWeaknesses(types = []) {
  if (!types || types.length === 0) return [];
  const weaknesses = [];

  for (const attackType of ALL_TYPES) {
    let multiplier = 1;
    for (const defType of types) {
      const defChart = TYPE_CHART[defType];
      if (defChart && defChart[attackType] !== undefined) {
        multiplier *= defChart[attackType];
      }
    }
    if (multiplier > 1) {
      weaknesses.push(attackType);
    }
  }

  return weaknesses;
}

/**
 * Checks if an image is a wide key-art banner rather than an isolated 3D Pokemon model
 */
export function isBannerOrArtImage(url) {
  if (!url || typeof url !== 'string') return true;
  const lower = url.toLowerCase();
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return true;
  if (lower.includes('banner') || lower.includes('key-art') || lower.includes('default-img') || lower.includes('mega-default') || lower.includes('cd-default')) return true;
  if (lower.includes('max-battles-kanto') || lower.includes('twilight-trails') || lower.includes('gobattle') || lower.includes('raidhour')) return true;
  if (lower.includes('harvest-festival') || lower.includes('choose-your-path') || lower.includes('patterns-of-the-wild')) return true;
  return false;
}

/**
 * Validates if an event object contains meaningful details
 */
export function hasEventDetails(evt) {
  if (!evt) return false;
  const d = evt.details;
  if (!d) return false;
  if (Array.isArray(d)) return d.length > 0;
  if (typeof d === 'object') {
    const keys = Object.keys(d);
    if (keys.length === 0) return false;
    return keys.some(k => {
      const val = d[k];
      if (val === null || val === undefined) return false;
      if (Array.isArray(val)) return val.length > 0;
      if (typeof val === 'string') return val.trim().length > 0;
      if (typeof val === 'object') return Object.keys(val).length > 0;
      return true;
    });
  }
  return true;
}

/**
 * Resolves a local or CDN URL for a given icon filename
 */
function resolveIconPath(iconFilename) {
  if (!iconFilename) return '';
  if (iconFilename.startsWith('http://') || iconFilename.startsWith('https://')) {
    return iconFilename;
  }
  if (iconFilename.startsWith('/')) {
    return iconFilename;
  }

  // 1. Check local pokemon folder
  if (LOCAL_POKEMON_ICONS.has(iconFilename)) {
    return `${BASE_POKEMON_URL}${iconFilename}`;
  }

  // 2. Check local events folder
  if (LOCAL_EVENT_ICONS.has(iconFilename)) {
    return `${BASE_EVENTS_URL}${iconFilename}`;
  }

  // 3. Fallback to high-speed jsDelivr CDN
  return `${CDN_BASE_URL}${iconFilename}`;
}

// Pre-sort pokedex keys by length descending to match specific forms/costumes before base species
const SORTED_POKEDEX_ENTRIES = Object.entries(POKEDEX_MAP).sort((a, b) => b[0].length - a[0].length);

/**
 * Resolves the 3D Pokemon icon URL for any Pokemon name or query
 */
export function resolvePokemon3DUrl(pokemonName) {
  if (!pokemonName || typeof pokemonName !== 'string') return '';
  const clean = pokemonName.toLowerCase().trim();

  // Direct match
  if (POKEDEX_MAP[clean]) {
    return resolveIconPath(POKEDEX_MAP[clean].icon);
  }

  // Length-descending substring match
  for (const [key, data] of SORTED_POKEDEX_ENTRIES) {
    if (clean.includes(key) || key.includes(clean)) {
      return resolveIconPath(data.icon);
    }
  }

  return '';
}

/**
 * Returns preset battle info (type string & weaknesses array) for any Pokemon
 */
export function getPokemonPresetInfo(pokemonName) {
  if (!pokemonName || typeof pokemonName !== 'string') return null;
  const clean = pokemonName.toLowerCase().trim();

  let match = POKEDEX_MAP[clean];
  if (!match) {
    for (const [key, data] of SORTED_POKEDEX_ENTRIES) {
      if (clean.includes(key)) {
        match = data;
        break;
      }
    }
  }

  if (match) {
    const types = match.types || [];
    const typeStr = types.join(' / ');
    const weaknesses = calculateWeaknesses(types);
    return {
      type: typeStr,
      weaknesses
    };
  }

  return null;
}

/**
 * Returns a sorted list of all available Pokemon names for autocomplete
 */
export function getAvailablePokemonList() {
  const names = POKEDEX_LIST.map(p => p.name);
  return Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
}

/**
 * Master resolution function for extracting the primary 3D Pokemon icon for an event card
 */
export function getPokemon3DIconUrl(evt) {
  if (!evt) return '';

  const fullText = `${evt.name || ''} ${JSON.stringify(evt.details || '')}`.toLowerCase();

  // Special rule 1: If there are 2 Mega Evolutions (e.g. Charizard X & Y), feature Mega X
  if (fullText.includes('charizard') && (fullText.includes('charizard x') || fullText.includes('mega charizard x') || fullText.includes('mega x'))) {
    return resolveIconPath('pm6.fMEGA_X.icon.png');
  }

  // Special rule 2: Pokemon Horizons Celebration debuts Charmander wearing Friede's goggles
  if (fullText.includes('horizons') && fullText.includes('goggles')) {
    return resolveIconPath('pm4.fGOGGLES_2026.icon.png');
  }

  // 1. Check event Debuts first (The primary feature/mascot of the event)
  const debuts = Array.isArray(evt.details?.['Pokémon Debuts'])
    ? evt.details['Pokémon Debuts']
    : (evt.details?.['Pokémon Debuts'] ? [evt.details['Pokémon Debuts']] : []);

  for (const item of debuts) {
    if (!item || typeof item !== 'string') continue;
    const url = resolvePokemon3DUrl(item);
    if (url) return url;
  }

  // 2. Check details.featured
  const featuredList = Array.isArray(evt.details?.featured) 
    ? evt.details.featured 
    : (evt.details?.featured ? [evt.details.featured] : []);

  for (const item of featuredList) {
    if (!item || typeof item !== 'string') continue;
    const url = resolvePokemon3DUrl(item);
    if (url) return url;
  }

  // 3. Check event name for the first mentioned Pokemon
  const nameLower = (evt.name || '').toLowerCase();
  let firstMatch = null;
  let minIndex = Infinity;

  for (const [key, data] of SORTED_POKEDEX_ENTRIES) {
    const idx = nameLower.indexOf(key);
    if (idx !== -1 && idx < minIndex) {
      minIndex = idx;
      firstMatch = data.icon;
    }
  }

  if (firstMatch) {
    return resolveIconPath(firstMatch);
  }

  // 4. Check Mega-Evolved or Wild Encounters fallback lists
  const fallbackLists = [
    ...(Array.isArray(evt.details?.['Mega-Evolved Pokémon']) ? evt.details['Mega-Evolved Pokémon'] : []),
    ...(Array.isArray(evt.details?.['Wild Encounters']) ? evt.details['Wild Encounters'] : [])
  ];

  for (const item of fallbackLists) {
    if (!item || typeof item !== 'string') continue;
    const url = resolvePokemon3DUrl(item);
    if (url) return url;
  }

  // 5. Fallback: if existing imageUrl exists and is not a banner image
  if (evt.imageUrl && !isBannerOrArtImage(evt.imageUrl)) {
    return evt.imageUrl;
  }

  return '';
}
