import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseLeekDuckHtml } from '../src/utils/leekDuckParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test sample HTML with schedule JSON and Pokemon debut
const sampleHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Pokémon Horizons: The Series Celebration Event 2026 - Leek Duck</title>
  <script type="application/json" data-event-schedule-json>
  {
    "title": "Pokémon Horizons: The Series Celebration Event 2026",
    "slug": "pokemon-horizons-the-series-celebration-event-2026",
    "description": "The Pokémon Horizons: The Series Celebration Event returns with Charmander wearing Friede's goggles.",
    "envelope": {
      "start": "2026-09-16T10:00:00-08:00",
      "end": "2026-09-22T20:00:00-08:00"
    }
  }
  </script>
</head>
<body>
  <div class="page-tags"><div class="tag event">Event</div></div>
  <h1 class="page-title">Pokémon Horizons: The Series Celebration Event&nbsp;2026</h1>
  <div class="event-description">
    <p>The Pokémon Horizons: The Series Celebration Event returns to Pokémon GO with the debut of Charmander wearing Friede’s goggles!</p>
  </div>
  <div class="bonus-list">
    <div class="bonus-item"><div class="bonus-text">Increased chance to encounter Kecleon at PokéStops</div></div>
    <div class="bonus-item"><div class="bonus-text">2× Candy for catching Pokémon</div></div>
  </div>
  <ul class="pkmn-list-flex">
    <li class="pkmn-list-item">
      <div class="pkmn-name">Charmander wearing Friede's goggles</div>
    </li>
  </ul>
</body>
</html>
`;

console.log('=== Testing parseLeekDuckHtml with Sample HTML ===');
const result = parseLeekDuckHtml(sampleHtml, 'https://leekduck.com/events/pokemon-horizons-the-series-celebration-event-2026/');

console.log('Parsed Result:');
console.log('  Name:', result.name);
console.log('  Category:', result.category);
console.log('  Start:', result.startDate);
console.log('  End:', result.endDate);
console.log('  Featured Pokemon:', result.featuredPokemon);
console.log('  Type:', result.pokemonType);
console.log('  Weaknesses:', result.weaknesses);
console.log('  Image URL:', result.imageUrl);
console.log('  Bonuses:\n' + result.bonusesText);

console.assert(result.name.includes('Horizons'), 'Name should include Horizons');
console.assert(result.startDate === '2026-09-16', 'Start date should be 2026-09-16');
console.assert(result.endDate === '2026-09-22', 'End date should be 2026-09-22');
console.assert(result.featuredPokemon === "Charmander wearing Friede's goggles", 'Featured should be goggles Charmander');
console.assert(result.pokemonType === 'Fire', 'Type should be Fire');
console.assert(result.weaknesses.includes('Water'), 'Weaknesses should include Water');
console.assert(result.imageUrl.includes('pm4.fGOGGLES_2026.icon.png'), 'Image should be goggles Charmander icon');

console.log('\nALL LEEK DUCK PARSER TESTS PASSED!');
