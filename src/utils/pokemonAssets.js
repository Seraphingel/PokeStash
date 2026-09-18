import { getAssetUrl } from './assets';

const BASE_POKEMON_URL = '/assets/pokemon/';

// Known 3D Pokemon icon mappings available in public/assets/pokemon/ and public/assets/events/
const POKEMON_3D_ICONS = {
  // Starters & Common
  'bulbasaur': 'pm1.icon.png',
  'charmander': 'pm4.icon.png',
  'charmander wearing friede': '/assets/events/pm4.fGOGGLES_2026.icon.png',
  'charmeleon': 'pm5.icon.png',
  'charizard': 'pm6.icon.png',
  'weedle': 'pm13.icon.png',
  'beedrill': 'pm15.fMEGA.icon.png',
  'mega beedrill': 'pm15.fMEGA.icon.png',
  'rattata': 'pm19.icon.png',
  'pikachu': 'pm25.icon.png',
  'clefairy': 'pm35.icon.png',
  'machamp': 'pm68.icon.png',
  'dynamax machamp': 'pm68.icon.png',
  'victreebel': 'pm71.fMEGA.icon.png',
  'mega victreebel': 'pm71.fMEGA.icon.png',
  'rhyhorn': 'pm111.icon.png',
  'dynamax rhyhorn': 'pm111.icon.png',
  'chansey': '/assets/events/pokemon_icon_113_00.png',
  'eevee': 'pm133.icon.png',
  'articuno': 'pm144.icon.png',
  'dynamax articuno': 'pm144.icon.png',
  'zapdos': 'pm145.icon.png',
  'dynamax zapdos': 'pm145.icon.png',
  'houndour': 'pm228.icon.png',
  'houndoom': 'pm229.fMEGA.icon.png',
  'mega houndoom': 'pm229.fMEGA.icon.png',
  'treecko': 'pm252.icon.png',
  'gardevoir': '/assets/events/pokemon_icon_282_00.png',
  'venusaur': 'pm3.fMEGA.icon.png',
  'mega venusaur': 'pm3.fMEGA.icon.png',
  'staraptor': 'pm398.icon.png',
  'mega staraptor': 'pm398.icon.png',
  'abomasnow': 'pm460.fMEGA.icon.png',
  'mega abomasnow': 'pm460.fMEGA.icon.png',
  'cottonee': '/assets/events/pm546.cSPRING_2024.icon.png',
  'applin': '/assets/events/pm546.cSPRING_2024.icon.png',
  'zorua': 'pm570.icon.png',
  'thundurus': 'pm642.fTHERIAN.icon.png',
  'shadow thundurus': 'pm642.fTHERIAN.icon.png',
  'zekrom': '/assets/events/pokemon_icon_644_00.png',
  'skiddo': 'pm672.icon.png',
  'malamar': 'pm687.fMEGA.icon.png',
  'mega malamar': 'pm687.fMEGA.icon.png',
  'hawlucha': 'pm701.icon.png',
  'sliggoo': '/assets/events/pm705.fHISUIAN.icon.png',
  'hisui sliggoo': '/assets/events/pm705.fHISUIAN.icon.png',
  'goodra': '/assets/events/pm705.fHISUIAN.icon.png',
  'phantump': 'pm708.icon.png',
  'xerneas': 'pm716.icon.png',
  'buzzwole': '/assets/events/pm794.icon.png',
  'pheromosa': '/assets/events/pm794.icon.png',
  'xurkitree': '/assets/events/pm794.icon.png',
  'ultra beasts': '/assets/events/pm794.icon.png',
  'kartana': 'pm798.icon.png',
  'cinderace': 'pm815.icon.png',
  'gigantamax cinderace': 'pm815.icon.png',
  'sobble': 'pm816.icon.png',
  'dynamax sobble': 'pm816.icon.png',
  'zacian': 'pm888.icon.png',
  'zamazenta': 'pm889.icon.png',
  'maschiff': '/assets/events/Maschiff.png',
  'mabosstiff': '/assets/events/Maschiff.png',
  'shroodle': 'pm943.icon.png',
  'grafaiai': 'pm943.icon.png'
};

export function isBannerOrArtImage(url) {
  if (!url || typeof url !== 'string') return true;
  const lower = url.toLowerCase();
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return true;
  if (lower.includes('banner') || lower.includes('key-art') || lower.includes('default-img') || lower.includes('mega-default') || lower.includes('cd-default')) return true;
  if (lower.includes('max-battles-kanto') || lower.includes('twilight-trails') || lower.includes('gobattle') || lower.includes('raidhour')) return true;
  if (lower.includes('harvest-festival') || lower.includes('choose-your-path') || lower.includes('patterns-of-the-wild')) return true;
  return false;
}

export function hasEventDetails(evt) {
  if (!evt) return false;
  const d = evt.details;
  if (!d) return false;
  if (Array.isArray(d)) return d.length > 0;
  if (typeof d === 'object') {
    const keys = Object.keys(d);
    if (keys.length === 0) return false;
    // Check if at least one property has non-empty content
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

export function getPokemon3DIconUrl(evt) {
  if (!evt) return '';

  // 1. If evt.imageUrl is already a 3D pokemon icon (.png and not a banner)
  if (evt.imageUrl && !isBannerOrArtImage(evt.imageUrl)) {
    return evt.imageUrl;
  }

  // 2. Check details.featured or debuts or wild encounters
  const candidates = [
    ...(Array.isArray(evt.details?.featured) ? evt.details.featured : (evt.details?.featured ? [evt.details.featured] : [])),
    ...(Array.isArray(evt.details?.['Pokémon Debuts']) ? evt.details['Pokémon Debuts'] : []),
    ...(Array.isArray(evt.details?.['Mega-Evolved Pokémon']) ? evt.details['Mega-Evolved Pokémon'] : []),
    ...(Array.isArray(evt.details?.['Wild Encounters']) ? evt.details['Wild Encounters'] : []),
    evt.name
  ];

  for (const item of candidates) {
    if (!item || typeof item !== 'string') continue;
    const clean = item.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

    for (const [key, iconPath] of Object.entries(POKEMON_3D_ICONS)) {
      if (clean.includes(key)) {
        if (iconPath.startsWith('/')) return iconPath;
        return `${BASE_POKEMON_URL}${iconPath}`;
      }
    }
  }

  // 3. Fallback: check if name mentions known Pokemon
  const nameLower = (evt.name || '').toLowerCase();
  for (const [key, iconPath] of Object.entries(POKEMON_3D_ICONS)) {
    if (nameLower.includes(key)) {
      if (iconPath.startsWith('/')) return iconPath;
      return `${BASE_POKEMON_URL}${iconPath}`;
    }
  }

  // 4. Fallback: if existing imageUrl exists and is not a banner
  if (evt.imageUrl && !isBannerOrArtImage(evt.imageUrl)) {
    return evt.imageUrl;
  }

  return '';
}
