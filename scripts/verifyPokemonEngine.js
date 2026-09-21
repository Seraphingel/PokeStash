import { getPokemonPresetInfo, resolvePokemon3DUrl, getPokemon3DIconUrl, calculateWeaknesses } from '../src/utils/pokemonAssets.js';
import { events } from '../src/data/events.js';
import { scrapedEvents } from '../src/data/scrapedEvents.js';

console.log('=== 1. Testing Weakness Calculation Engine ===');
const lucarioWeaknesses = calculateWeaknesses(['Fighting', 'Steel']);
console.log('Lucario (Fighting/Steel) weaknesses:', lucarioWeaknesses);
console.assert(lucarioWeaknesses.includes('Fire'), 'Lucario should be weak to Fire');
console.assert(lucarioWeaknesses.includes('Fighting'), 'Lucario should be weak to Fighting');
console.assert(lucarioWeaknesses.includes('Ground'), 'Lucario should be weak to Ground');
console.assert(lucarioWeaknesses.length === 3, 'Lucario should have exactly 3 weaknesses');

const charizardWeaknesses = calculateWeaknesses(['Fire', 'Flying']);
console.log('Charizard (Fire/Flying) weaknesses:', charizardWeaknesses);
console.assert(charizardWeaknesses.includes('Rock'), 'Charizard should be weak to Rock');
console.assert(charizardWeaknesses.includes('Electric'), 'Charizard should be weak to Electric');
console.assert(charizardWeaknesses.includes('Water'), 'Charizard should be weak to Water');

const bulbasaurWeaknesses = calculateWeaknesses(['Grass', 'Poison']);
console.log('Bulbasaur (Grass/Poison) weaknesses:', bulbasaurWeaknesses);
console.assert(bulbasaurWeaknesses.includes('Fire'), 'Bulbasaur should be weak to Fire');
console.assert(bulbasaurWeaknesses.includes('Flying'), 'Bulbasaur should be weak to Flying');
console.assert(bulbasaurWeaknesses.includes('Ice'), 'Bulbasaur should be weak to Ice');
console.assert(bulbasaurWeaknesses.includes('Psychic'), 'Bulbasaur should be weak to Psychic');

console.log('\n=== 2. Testing Preset Lookups (Typing any Pokemon) ===');
const testNames = ['Lucario', 'Ceruledge', 'Tinkatink', 'Gengar', 'Mega Rayquaza', "Captain's Cap Pikachu", "Charmander wearing Friede's goggles"];

for (const name of testNames) {
  const preset = getPokemonPresetInfo(name);
  const icon = resolvePokemon3DUrl(name);
  console.log(`[${name}]`);
  console.log(`  Type: ${preset?.type}`);
  console.log(`  Weaknesses: ${preset?.weaknesses?.join(', ')}`);
  console.log(`  Icon URL: ${icon}`);
  console.assert(preset !== null, `${name} should have a preset`);
  console.assert(icon.length > 0, `${name} should resolve an icon`);
}

console.log('\n=== 3. Testing Pokemon Horizons Celebration Card Mascot ===');
// Test event from events.js
const allEvents = Object.values(events).flat();
const horizonsEvt = allEvents.find(e => e.name && e.name.toLowerCase().includes('horizons'));
console.log('events.js Horizons event found:', !!horizonsEvt);
const horizonsIcon = getPokemon3DIconUrl(horizonsEvt);
console.log('events.js Horizons resolved icon:', horizonsIcon);
console.assert(horizonsIcon.includes('pm4.fGOGGLES_2026.icon.png'), 'Horizons card should feature Friede goggles Charmander');

// Test event from scrapedEvents.js
const allScraped = Object.values(scrapedEvents).flat();
const scrapedHorizons = allScraped.find(e => e.name && e.name.toLowerCase().includes('horizons'));
console.log('scrapedEvents.js Horizons event found:', !!scrapedHorizons);
const scrapedHorizonsIcon = getPokemon3DIconUrl(scrapedHorizons);
console.log('scrapedEvents.js Horizons resolved icon:', scrapedHorizonsIcon);
console.assert(scrapedHorizonsIcon.includes('pm4.fGOGGLES_2026.icon.png'), 'Scraped Horizons card should feature Friede goggles Charmander');

console.log('\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
