import { POKEDEX_MAP } from '../data/pokedexData.js';

// Standard month abbreviations to 2-digit strings
const MONTH_NAMES = {
  jan: '01', january: '01',
  feb: '02', february: '02',
  mar: '03', march: '03',
  apr: '04', april: '04',
  may: '05',
  jun: '06', june: '06',
  jul: '07', july: '07',
  aug: '08', august: '08',
  sep: '09', september: '09',
  oct: '10', october: '10',
  nov: '11', november: '11',
  dec: '12', december: '12'
};

/**
 * Extracts candidate date ranges from text or OCR output
 * Examples: "14 - 20 OCT", "OCT 7 - 13", "October 24", "28 OCT - 3 NOV"
 */
export function extractDatesFromText(text, defaultYear = 2026) {
  if (!text || typeof text !== 'string') return null;

  const clean = text.toLowerCase().trim();

  // Pattern 1: "28 OCT - 3 NOV" or "14 - 20 OCT"
  const rangeWithTwoMonths = clean.match(/(\d{1,2})\s*([a-z]{3,9})?\s*[-–to]+\s*(\d{1,2})\s*([a-z]{3,9})/i);
  if (rangeWithTwoMonths) {
    const d1 = rangeWithTwoMonths[1].padStart(2, '0');
    const m1Str = rangeWithTwoMonths[2] || rangeWithTwoMonths[4];
    const d2 = rangeWithTwoMonths[3].padStart(2, '0');
    const m2Str = rangeWithTwoMonths[4];

    const m1 = MONTH_NAMES[m1Str.toLowerCase().slice(0, 3)] || '10';
    const m2 = MONTH_NAMES[m2Str.toLowerCase().slice(0, 3)] || m1;

    // If month rolls over from Dec to Jan
    let y2 = defaultYear;
    if (m1 === '12' && m2 === '01') {
      y2 = defaultYear + 1;
    }

    return {
      startDate: `${defaultYear}-${m1}-${d1}`,
      endDate: `${y2}-${m2}-${d2}`
    };
  }

  // Pattern 2: "OCT 7 - 13" or "OCTOBER 14-20"
  const monthFirstRange = clean.match(/([a-z]{3,9})\s*(\d{1,2})\s*[-–to]+\s*(\d{1,2})/i);
  if (monthFirstRange) {
    const mStr = monthFirstRange[1];
    const m = MONTH_NAMES[mStr.toLowerCase().slice(0, 3)] || '10';
    const d1 = monthFirstRange[2].padStart(2, '0');
    const d2 = monthFirstRange[3].padStart(2, '0');

    return {
      startDate: `${defaultYear}-${m}-${d1}`,
      endDate: `${defaultYear}-${m}-${d2}`
    };
  }

  // Pattern 3: Single date: "10 OCT" or "OCTOBER 24" or "24 OCT"
  const singleDate = clean.match(/(\d{1,2})\s*([a-z]{3,9})/i) || clean.match(/([a-z]{3,9})\s*(\d{1,2})/i);
  if (singleDate) {
    const isNumFirst = !isNaN(singleDate[1]);
    const dStr = isNumFirst ? singleDate[1] : singleDate[2];
    const mStr = isNumFirst ? singleDate[2] : singleDate[1];
    const m = MONTH_NAMES[mStr.toLowerCase().slice(0, 3)];
    if (m) {
      const d = dStr.padStart(2, '0');
      return {
        startDate: `${defaultYear}-${m}-${d}`,
        endDate: `${defaultYear}-${m}-${d}`
      };
    }
  }

  return null;
}

/**
 * Detects event category from text keywords
 */
export function detectCategoryFromText(text) {
  if (!text || typeof text !== 'string') return 'event';
  const lower = text.toLowerCase();

  if (lower.includes('mega')) return 'mega';
  if (lower.includes('shadow')) return 'shadow';
  if (lower.includes('spotlight')) return 'spotlight';
  if (lower.includes('max monday') || lower.includes('dynamax') || lower.includes('gigantamax') || lower.includes('max battle')) return 'max-battles';
  if (lower.includes('raid') || lower.includes('5-star') || lower.includes('five star')) return 'raid';

  return 'event';
}

/**
 * Searches text for any known Pokemon name in POKEDEX_MAP
 */
export function findPokemonInText(text) {
  if (!text || typeof text !== 'string') return '';
  const lower = text.toLowerCase();

  // Search longest names first so "Mega Charizard X" matches before "Charizard"
  const sortedEntries = Object.entries(POKEDEX_MAP).sort((a, b) => b[0].length - a[0].length);

  for (const [key, data] of sortedEntries) {
    if (key.length >= 4 && lower.includes(key)) {
      return data.name;
    }
  }

  return '';
}
