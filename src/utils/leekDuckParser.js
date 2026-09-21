import { getPokemonPresetInfo, resolvePokemon3DUrl } from './pokemonAssets.js';
import { POKEDEX_MAP } from '../data/pokedexData.js';

/**
 * Fetch HTML from Leek Duck using CORS-safe proxies
 */
export async function fetchLeekDuckHtml(url) {
  if (!url || typeof url !== 'string') {
    throw new Error('Please provide a valid URL.');
  }

  const cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    throw new Error('URL must start with https:// or http://');
  }

  // 1. Try Jina AI CORS Reader (Full HTML return format, bypasses Cloudflare anti-bot blocks)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);
    const jinaRes = await fetch(`https://r.jina.ai/${cleanUrl}`, {
      headers: { 'X-Return-Format': 'html' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (jinaRes.ok) {
      const html = await jinaRes.text();
      if (html && html.length > 500) {
        return html;
      }
    }
  } catch (err) {
    console.warn('Jina CORS proxy failed, trying secondary...', err);
  }

  // 2. Try Secondary Proxy (AllOrigins)
  const proxy2 = `https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(proxy2, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const html = await res.text();
      if (html && html.length > 500) {
        return html;
      }
    }
  } catch (err) {
    console.warn('AllOrigins CORS proxy failed, trying tertiary...', err);
  }

  // 3. Try Tertiary Proxy (corsproxy.io)
  const proxy3 = `https://corsproxy.io/?${encodeURIComponent(cleanUrl)}`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(proxy3, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const html = await res.text();
      if (html && html.length > 500) {
        return html;
      }
    }
  } catch (err) {
    console.warn('Corsproxy failed.', err);
  }

  throw new Error('Unable to connect to Leek Duck via network proxy. Please paste the webpage HTML or text into the box below.');
}

/**
 * Maps Leek Duck tag string or slug to PokeStash category
 */
export function mapLeekDuckCategory(tagText = '', url = '', title = '') {
  const combined = `${tagText} ${url} ${title}`.toLowerCase();

  if (combined.includes('mega-raid') || combined.includes('mega raid') || combined.includes('in mega raids') || combined.includes('super mega')) {
    return 'mega';
  }
  if (combined.includes('shadow-raid') || combined.includes('shadow raid') || combined.includes('in shadow raids')) {
    return 'shadow';
  }
  if (combined.includes('spotlight-hour') || combined.includes('spotlight hour')) {
    return 'spotlight';
  }
  if (combined.includes('max-battle') || combined.includes('max battle') || combined.includes('gigantamax') || combined.includes('dynamax') || combined.includes('max monday') || combined.includes('max-monday') || combined.includes('max-mondays')) {
    return 'max-battles';
  }
  if (combined.includes('5-star') || combined.includes('five-star') || combined.includes('raid-battles') || combined.includes('in 5-star raids') || combined.includes('raid boss') || combined.includes('raid hour') || combined.includes('raid day') || combined.includes('raid weekend')) {
    return 'raid';
  }

  return 'event';
}

/**
 * Parses ISO date string into YYYY-MM-DD
 */
function parseDateToYMD(isoStr) {
  if (!isoStr || typeof isoStr !== 'string') return '';
  const match = isoStr.match(/(\d{4}-\d{2}-\d{2})/);
  if (match) return match[1];
  return '';
}

/**
 * Core Parser: Extracts all event metadata from Leek Duck HTML
 */
export function parseLeekDuckHtml(html, sourceUrl = '') {
  if (!html || typeof html !== 'string') {
    throw new Error('Invalid HTML content provided.');
  }

  let title = '';
  let startDate = '';
  let endDate = '';
  let category = 'event';
  let featuredPokemon = '';
  const bonuses = [];
  let description = '';
  let imageUrl = '';

  // 1. Extract JSON Schedule metadata if available (fast and reliable)
  const jsonMatch = html.match(/<script[^>]*data-event-schedule-json[^>]*>([\s\S]*?)<\/script>/i);
  if (jsonMatch) {
    try {
      const scheduleData = JSON.parse(jsonMatch[1]);
      if (scheduleData.title) title = scheduleData.title.trim();
      if (scheduleData.description) description = scheduleData.description.trim();

      const startRaw = scheduleData.envelope?.start || scheduleData.windows?.[0]?.start || scheduleData.start_local;
      const endRaw = scheduleData.envelope?.end || scheduleData.windows?.[0]?.end || scheduleData.end_local;

      if (startRaw) startDate = parseDateToYMD(startRaw);
      if (endRaw) endDate = parseDateToYMD(endRaw);
    } catch (e) {
      console.warn('Failed to parse schedule JSON block', e);
    }
  }

  // 2. DOM Parsing (Browser or fallback)
  if (typeof window !== 'undefined' && window.DOMParser) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Title fallback
      if (!title) {
        const h1 = doc.querySelector('h1.page-title') || doc.querySelector('h1');
        if (h1) title = h1.textContent.trim();
      }
      if (!title) {
        const ogTitle = doc.querySelector('meta[property="og:title"]');
        if (ogTitle) title = (ogTitle.getAttribute('content') || '').split('-')[0].trim();
      }

      // Dates fallback
      if (!startDate) {
        const startEl = doc.querySelector('div[data-kind="start"]');
        if (startEl && startEl.getAttribute('data-start')) {
          startDate = parseDateToYMD(startEl.getAttribute('data-start'));
        }
      }
      if (!endDate) {
        const endEl = doc.querySelector('div[data-kind="end"]');
        if (endEl && endEl.getAttribute('data-start')) {
          endDate = parseDateToYMD(endEl.getAttribute('data-start'));
        }
      }

      // Category detection
      const tagEl = doc.querySelector('.page-tags .tag');
      const tagText = tagEl ? tagEl.textContent.trim() : '';
      category = mapLeekDuckCategory(tagText, sourceUrl, title);

      // Featured Pokémon detection
      // Check 1: Debut Pokémon (Headlining mascot)
      const debutSection = doc.querySelector('#pokémon-debut + p + ul, #pokémon-debut ~ ul.pkmn-list-flex');
      if (debutSection) {
        const firstPkmn = debutSection.querySelector('li.pkmn-list-item .pkmn-name');
        if (firstPkmn) featuredPokemon = firstPkmn.textContent.trim();
      }

      // Check 2: First Pokémon in pkmn-list-flex
      if (!featuredPokemon) {
        const firstPkmn = doc.querySelector('ul.pkmn-list-flex li.pkmn-list-item .pkmn-name');
        if (firstPkmn) featuredPokemon = firstPkmn.textContent.trim();
      }

      // Bonuses
      const bonusItems = doc.querySelectorAll('.bonus-list .bonus-item .bonus-text');
      bonusItems.forEach(b => {
        const txt = b.textContent.trim();
        if (txt && !bonuses.includes(txt)) {
          bonuses.push(txt);
        }
      });

      // Description
      if (!description) {
        const descEl = doc.querySelector('.event-description');
        if (descEl) {
          const p = descEl.querySelector('p');
          if (p) description = p.textContent.trim();
        }
      }

      // Image URL
      const imgEl = doc.querySelector('img[alt="Event image"]') || doc.querySelector('.event-page .image img');
      if (imgEl && imgEl.getAttribute('src')) {
        imageUrl = imgEl.getAttribute('src');
      } else {
        const ogImg = doc.querySelector('meta[property="og:image"]');
        if (ogImg) imageUrl = ogImg.getAttribute('content') || '';
      }
    } catch (domErr) {
      console.warn('DOMParser error, falling back to regex', domErr);
    }
  }

  // 3. Regex fallbacks (for environments without DOMParser or partial markup)
  if (!title) {
    const titleMatch = html.match(/<h1[^>]*class="[^"]*page-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
    if (titleMatch) {
      title = titleMatch[1].replace(/<[^>]+>/g, '').split('-')[0].trim();
    }
  }

  if (!startDate) {
    const startMatch = html.match(/data-kind="start"[^>]*data-start="([^"]+)"/i);
    if (startMatch) startDate = parseDateToYMD(startMatch[1]);
  }
  if (!endDate) {
    const endMatch = html.match(/data-kind="end"[^>]*data-start="([^"]+)"/i);
    if (endMatch) endDate = parseDateToYMD(endMatch[1]);
  }

  if (!startDate) {
    const today = new Date().toISOString().split('T')[0];
    startDate = today;
    endDate = today;
  }
  if (!endDate) endDate = startDate;

  // Extract featured Pokemon via regex if still empty
  if (!featuredPokemon) {
    const pkmnMatch = html.match(/<div[^>]*class="[^"]*pkmn-name[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (pkmnMatch) {
      featuredPokemon = pkmnMatch[1].replace(/<[^>]+>/g, '').trim();
    }
  }

  // Extract bonuses via regex if still empty
  if (bonuses.length === 0) {
    const bonusMatches = html.matchAll(/<div[^>]*class="[^"]*bonus-text[^"]*"[^>]*>([\s\S]*?)<\/div>/gi);
    for (const match of bonusMatches) {
      const txt = match[1].replace(/<[^>]+>/g, '').trim();
      if (txt && !bonuses.includes(txt)) {
        bonuses.push(txt);
      }
    }
  }

  // Extract description via regex if still empty
  if (!description) {
    const descMatch = html.match(/<div[^>]*class="[^"]*event-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (descMatch) {
      const pMatch = descMatch[1].match(/<p>([\s\S]*?)<\/p>/i);
      if (pMatch) description = pMatch[1].replace(/<[^>]+>/g, '').trim();
    }
  }

  // Search Title for Pokemon if still unassigned
  if (!featuredPokemon && title) {
    const lowerTitle = title.toLowerCase();
    for (const [key, data] of Object.entries(POKEDEX_MAP)) {
      if (lowerTitle.includes(key) && key.length >= 4) {
        featuredPokemon = data.name;
        break;
      }
    }
  }

  // Clean HTML entities from title (e.g. &nbsp; &amp; &#8209;)
  title = title
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8209;/g, '-')
    .replace(/&apos;/g, "'")
  // Refine category if still generic 'event'
  if (category === 'event') {
    category = mapLeekDuckCategory('', sourceUrl, title);
  }

  // Resolve 3D Icon, Type, and Weaknesses via PokeMiners Engine
  let resolvedIcon = '';
  let pokemonType = '';
  let weaknesses = [];

  if (featuredPokemon) {
    const preset = getPokemonPresetInfo(featuredPokemon);
    if (preset) {
      pokemonType = preset.type || '';
      weaknesses = preset.weaknesses || [];
    }
    resolvedIcon = resolvePokemon3DUrl(featuredPokemon);
  }

  return {
    name: title || 'Imported Event',
    category,
    startDate,
    endDate,
    featuredPokemon,
    pokemonType,
    weaknesses,
    imageUrl: resolvedIcon || imageUrl,
    bonusesText: bonuses.length ? bonuses.map(b => `• ${b}`).join('\n') : '',
    advice: description,
    sourceUrl
  };
}
