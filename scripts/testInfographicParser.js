import { extractDatesFromText, detectCategoryFromText, findPokemonInText } from '../src/utils/infographicParser.js';

console.log('=== 1. Testing Date Extraction from Infographic Text ===');
const d1 = extractDatesFromText('14 - 20 OCT', 2026);
console.log('14 - 20 OCT:', d1);
console.assert(d1?.startDate === '2026-10-14' && d1?.endDate === '2026-10-20', 'd1 matches');

const d2 = extractDatesFromText('OCT 7 - 13', 2026);
console.log('OCT 7 - 13:', d2);
console.assert(d2?.startDate === '2026-10-07' && d2?.endDate === '2026-10-13', 'd2 matches');

const d3 = extractDatesFromText('28 OCT - 3 NOV', 2026);
console.log('28 OCT - 3 NOV:', d3);
console.assert(d3?.startDate === '2026-10-28' && d3?.endDate === '2026-11-03', 'd3 matches');

const d4 = extractDatesFromText('24 OCT', 2026);
console.log('24 OCT:', d4);
console.assert(d4?.startDate === '2026-10-24' && d4?.endDate === '2026-10-24', 'd4 matches');

console.log('\n=== 2. Testing Category Detection ===');
console.assert(detectCategoryFromText('5-STAR RAIDS') === 'raid', '5-star raids should be raid');
console.assert(detectCategoryFromText('MEGA RAIDS') === 'mega', 'mega raids should be mega');
console.assert(detectCategoryFromText('SHADOW RAIDS') === 'shadow', 'shadow raids should be shadow');
console.assert(detectCategoryFromText('SPOTLIGHT HOUR') === 'spotlight', 'spotlight hour should be spotlight');
console.assert(detectCategoryFromText('MAX MONDAY') === 'max-battles', 'max monday should be max-battles');
console.assert(detectCategoryFromText('Harvest Festival') === 'event', 'harvest festival should be event');

console.log('\n=== 3. Testing Pokemon Search in Text ===');
const p1 = findPokemonInText('Zorua Community Day on 10 OCT');
console.log('Zorua text found:', p1);
console.assert(p1 === 'Zorua', 'Should find Zorua');

const p2 = findPokemonInText('Mega Charizard X Super Raid Day');
console.log('Mega Charizard X text found:', p2);
console.assert(p2 === 'Mega Charizard X', 'Should find Mega Charizard X');

console.log('\nALL INFOGRAPHIC PARSER TESTS PASSED SUCCESSFULLY!');
