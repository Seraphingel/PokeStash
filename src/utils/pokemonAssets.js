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
  'moltres': 'pm146.icon.png',
  'dynamax moltres': 'pm146.icon.png',
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
  'buzzwole': 'pm794.icon.png',
  'pheromosa': 'pm795.icon.png',
  'xurkitree': 'pm796.icon.png',
  'ultra beasts': 'pm796.icon.png',
  'ultra beast': 'pm796.icon.png',
  'kartana': 'pm798.icon.png',
  'cinderace': 'pm815.icon.png',
  'gigantamax cinderace': 'pm815.icon.png',
  'sobble': 'pm816.icon.png',
  'dynamax sobble': 'pm816.icon.png',
  'zacian': 'pm888.icon.png',
  'zamazenta': 'pm889.icon.png',
  'gastly': 'pm92.icon.png',
  'blastoise': 'pm9.fMEGA.icon.png',
  'mega blastoise': 'pm9.fMEGA.icon.png',
  'pidgeot': 'pm18.fMEGA.icon.png',
  'mega pidgeot': 'pm18.fMEGA.icon.png',
  'charizard x': 'pm6.fMEGA_X.icon.png',
  'mega charizard x': 'pm6.fMEGA_X.icon.png',
  'charizard y': 'pm6.fMEGA_Y.icon.png',
  'mega charizard y': 'pm6.fMEGA_Y.icon.png',
  'seedot': 'pm273.icon.png',
  'sableye': 'pm302.icon.png',
  'mega sableye': 'pm302.fMEGA.icon.png',
  'dynamax sableye': 'pm302.icon.png',
  'dialga': 'pm483.fORIGIN.icon.png',
  'dialga origin': 'pm483.fORIGIN.icon.png',
  'origin dialga': 'pm483.fORIGIN.icon.png',
  'palkia': 'pm484.fORIGIN.icon.png',
  'palkia origin': 'pm484.fORIGIN.icon.png',
  'origin palkia': 'pm484.fORIGIN.icon.png',
  'giratina': 'pm487.fALTERED.icon.png',
  'giratina altered': 'pm487.fALTERED.icon.png',
  'altered giratina': 'pm487.fALTERED.icon.png',
  'elgyem': 'pm605.icon.png',
  'landorus': 'pm645.fINCARNATE.icon.png',
  'shadow landorus': 'pm645.fINCARNATE.icon.png',
  'yveltal': 'pm717.icon.png',
  'morelull': 'pm755.icon.png',
  'stufful': 'pm759.icon.png',
  'dottler': 'pm825.icon.png',
  'dynamax dottler': 'pm825.icon.png',
  'sizzlipede': 'pm850.icon.png',
  'dynamax sizzlipede': 'pm850.icon.png',
  'impidimp': 'pm859.icon.png',
  'dynamax impidimp': 'pm859.icon.png',
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

  const resolvePath = (iconPath) => {
    if (!iconPath) return '';
    if (iconPath.startsWith('/')) return iconPath;
    return `${BASE_POKEMON_URL}${iconPath}`;
  };

  // 1. Check details.featured (first mentioned featured Pokemon)
  const featuredList = Array.isArray(evt.details?.featured) 
    ? evt.details.featured 
    : (evt.details?.featured ? [evt.details.featured] : []);

  for (const item of featuredList) {
    if (!item || typeof item !== 'string') continue;
    const clean = item.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    for (const [key, iconPath] of Object.entries(POKEMON_3D_ICONS)) {
      if (clean.includes(key)) {
        return resolvePath(iconPath);
      }
    }
  }

  // 2. Check event name for the first mentioned Pokemon
  const nameLower = (evt.name || '').toLowerCase();
  let firstMatch = null;
  let minIndex = Infinity;

  for (const [key, iconPath] of Object.entries(POKEMON_3D_ICONS)) {
    const idx = nameLower.indexOf(key);
    if (idx !== -1 && idx < minIndex) {
      minIndex = idx;
      firstMatch = iconPath;
    }
  }

  if (firstMatch) {
    return resolvePath(firstMatch);
  }

  // 3. Check debuts or wild encounters
  const fallbackLists = [
    ...(Array.isArray(evt.details?.['Pokémon Debuts']) ? evt.details['Pokémon Debuts'] : []),
    ...(Array.isArray(evt.details?.['Mega-Evolved Pokémon']) ? evt.details['Mega-Evolved Pokémon'] : []),
    ...(Array.isArray(evt.details?.['Wild Encounters']) ? evt.details['Wild Encounters'] : [])
  ];

  for (const item of fallbackLists) {
    if (!item || typeof item !== 'string') continue;
    const clean = item.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    for (const [key, iconPath] of Object.entries(POKEMON_3D_ICONS)) {
      if (clean.includes(key)) {
        return resolvePath(iconPath);
      }
    }
  }

  // 4. Fallback: if existing imageUrl exists and is not a banner
  if (evt.imageUrl && !isBannerOrArtImage(evt.imageUrl)) {
    return evt.imageUrl;
  }

  return '';
}
