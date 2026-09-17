import { scrapedEvents } from './scrapedEvents.js';

export const EVENT_COLORS = {
  DailyDiscovery: '#712957',
  Event: '#65b679',
  Raid: '#b95749',
  Season: '#6cb5b3',
  Spotlight: '#dd9f53',
  MaxBattle: '#843667',
  CommunityDay: '#4371ae',
  RaidDay: '#d96958',
  WildArea: '#396e75',
  GoPass: '#dbbd5d'
};

const BASE_ASSET_URL = '/assets/pokemon/';

export const events = {
  discoveries: [
    { 
      name: "Max Monday", 
      dayOfWeek: 1, 
      description: "1 Rare Candy XL for in-person Max Battles", 
      color: EVENT_COLORS.DailyDiscovery,
      details: {
        bonuses: ["1 Rare Candy XL for completing in-person Max Battles"],
        advice: "Group up locally! Remote Raid Passes cannot be used for Max Battles.",
        difficulty: "Varies by Dynamax boss"
      }
    },
    { 
      name: "Showcase Tuesday", 
      dayOfWeek: 2, 
      description: "Enter up to 5 Showcases in 20 categories", 
      color: EVENT_COLORS.DailyDiscovery,
      details: {
        bonuses: ["Stardust, XP, and premium items for placing 1st"],
        advice: "Don't transfer your XXL or XXS Pokémon! Keep them tagged for Showcases."
      }
    },
    { 
      name: "Wednesday Raid Hour", 
      dayOfWeek: 3, 
      description: "1 Rare Candy XL for in-person Raid Battles", 
      color: EVENT_COLORS.DailyDiscovery,
      details: {
        bonuses: ["1 Rare Candy XL for in-person Raid Battles", "Increased 5-Star Raid spawns globally"],
        advice: "Use your daily free pass! Gyms get congested during 6PM to 7PM local time."
      }
    },
    { 
      name: "GO Battle Thursday", 
      dayOfWeek: 4, 
      description: "50 battles/day, 4x Win Stardust", 
      color: EVENT_COLORS.DailyDiscovery,
      details: {
        bonuses: ["Complete up to 50 GBL Battles (10 sets)", "4x Win Stardust"],
        advice: "Pop a Star Piece before claiming your set rewards if you won 3 or more matches!"
      }
    },
    { 
      name: "Friendship Friday", 
      dayOfWeek: 5, 
      description: "3 Special Trades, 2 guaranteed Candy XL", 
      color: EVENT_COLORS.DailyDiscovery,
      details: {
        bonuses: ["Up to 3 Special Trades", "2 Guaranteed Candy XL from trades", "Increased chance of Lucky Trade"],
        advice: "Coordinate with Lucky Friends on this day to maximize your guaranteed IV floors."
      }
    },
    { 
      name: "Scenic Sunday", 
      dayOfWeek: 0, 
      description: "Boosted incense, encounter Mateo 3x", 
      color: EVENT_COLORS.DailyDiscovery,
      details: {
        bonuses: ["More Pokémon in the wild", "Boosted Incense while on Routes", "Encounter Mateo 3x"],
        advice: "Great day for Route Grinding! Try to secure Zygarde cells while collecting Mateo gifts."
      }
    }
  ],
  spotlightHours: [
    { 
      date: "2026-09-17", 
      name: "Charmander (Friede's Goggles)", 
      color: EVENT_COLORS.Spotlight, 
      bonus: "2x Catch Stardust",
      imageUrl: `${BASE_ASSET_URL}pm4.icon.png`,
      details: {
        featured: ["Costume Charmander"],
        advice: "Part of the Pokémon Horizons Celebration Event!"
      }
    },
    { date: "2026-09-24", name: "Rattata", color: EVENT_COLORS.Spotlight, bonus: "2x Evolution XP", imageUrl: `${BASE_ASSET_URL}pm19.icon.png` }
  ],
  majorEvents: [
    { 
      name: "Twilight Trails", 
      start: "2026-09-01", 
      end: "2026-12-01", 
      color: EVENT_COLORS.Season, 
      details: { 
        "Pokémon Debuts": ["Maschiff", "Mabosstiff"],
        "Mega-Evolved Pokémon": ["Staraptor", "Chandelure"],
        "Max Pokémon Debuts": ["Dynamax Rhyhorn", "Dynamax Sneasel", "Dynamax Uxie", "Dynamax Mesprit", "Dynamax Azelf", "Dynamax Sizzlipede"],
        "Sales": ["The Pokémon GO Web Store will have new boxes during Twilight Trails! Be sure to check out the web store regularly."]
      } 
    },
    {
      name: "Mega Squads",
      start: "2026-09-08",
      end: "2026-09-14",
      color: EVENT_COLORS.Event,
      imageUrl: "/assets/events/Maschiff.png",
      details: {
        "Pokémon Debuts": [
          "Maschiff",
          "Mabosstiff"
        ],
        "Wild Encounters": [
          "Weedle",
          "Flamigo",
          "September 8 at 10:00 a.m. – September 11 at 10:00 a.m.",
          "Pidgey",
          "Emolga",
          "Fletchling",
          "Noibat",
          "Rookidee",
          "September 11 at 10:00 a.m. – September 14 at 8:00 p.m.",
          "Houndour",
          "Carvanha",
          "Purrloin",
          "Nickit"
        ],
        "Sales": [
          "GO Pass Deluxe: Mega Squads - 10 Ultra Balls, 5 Max Revives, 1 Premium Battle Pass, and 5 Max Potions",
          "GO Pass Deluxe: Mega Squads + 6 Ranks - 10 Ultra Balls, 5 Max Revives, 2 Premium Battle Passes, and 5 Max Potions",
          "GO Pass Deluxe: Mega Squads + 6 Ranks Ultra Box - 20 Ultra Balls, 10 Max Revives, 10 Max Potions, and 5 Premium Battle Passes"
        ]
      }
    },
    { 
      name: "PokéXciting! Kuala Lumpur", 
      start: "2026-09-12", 
      end: "2026-09-13", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["KLCC Park, Kuala Lumpur"],
        "Wild Encounters": ["Turquoise T-Shirt Pikachu", "Unown", "Corsola", "Regional spawns"], "Sales": ["PokéXciting Box - 2 Premium Battle Passes, 1 Lure Module"]
      }
    },
    { 
      name: "Pokémon Horizons Celebration", 
      start: "2026-09-16", 
      end: "2026-09-22", 
      color: EVENT_COLORS.Event,
      imageUrl: "/assets/events/pm4.fGOGGLES_2026.icon.png",
      details: {
        "Pokémon Debuts": [
          "Charmander wearing Friede's goggles",
          "Charmeleon wearing Friede's goggles",
          "Charizard wearing Friede's goggles"
        ],
        "Wild Encounters": [
          "Charmander wearing Friede's goggles",
          "Captain's Cap Pikachu",
          "From 5:00 a.m. to 5:00 p.m.",
          "Fidough",
          "Wattrel",
          "Chansey",
          "From 5:00 p.m. to 5:00 a.m.",
          "Eevee",
          "Hatenna",
          "Rockruff"
        ],
        "Sales": [
          "GO Pass Deluxe: Collaboration Celebration Event - 10 Ultra Balls, 5 Max Revives, 1 Premium Battle Pass, 5 Max Potions",
          "GO Pass Deluxe: Collaboration Celebration Event + 6 Ranks - 10 Ultra Balls, 5 Max Revives, 2 Premium Battle Passes, 5 Max Potions",
          "GO Pass Deluxe: Collaboration Celebration Event + 6 Ranks Ultra Box - 20 Ultra Balls, 10 Max Revives, 10 Max Potions, 5 Premium Battle Passes"
        ]
      }
    },
    { 
      name: "Autumn Picnic", 
      start: "2026-09-18", 
      end: "2026-10-11", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["South Korea (Select Locations)"],
        "Wild Encounters": ["Orange Hanbok Pikachu", "Bulbasaur", "Oddish", "Seedot"], "Sales": ["Autumn Box - 10 Ultra Balls, 2 Premium Battle Passes", "Picnic Bundle - 1 Poffin, 5 Max Potions"]
      }
    },
    { name: "Super Mega Raid Day (Staraptor)", start: "2026-09-19", end: "2026-09-19", color: EVENT_COLORS.Raid, imageUrl: `${BASE_ASSET_URL}pm398.icon.png` },
    { name: "Korea Outing", start: "2026-09-24", end: "2026-09-26", color: EVENT_COLORS.Event, imageUrl: `${BASE_ASSET_URL}pm25.icon.png`, details: { regions: ["Nationwide South Korea"], featured: ["Orange Hanbok Pikachu"] } },
    { name: "Catch Mastery (Phantump)", start: "2026-09-26", end: "2026-09-26", color: EVENT_COLORS.Event, imageUrl: `${BASE_ASSET_URL}pm708.icon.png` },
    { 
      name: "City Safari (Global)", 
      start: "2026-09-26", 
      end: "2026-09-27", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm133.icon.png`,
      details: {
        regions: ["Lisbon", "Brisbane", "Boston", "Marseille", "Munich", "Rio de Janeiro"],
        "Pokémon Debuts": ["Skiddo", "Gogoat"], "Wild Encounters": ["Eevee in Explorer Hat", "Mudbray", "Heracross"], "Sales": ["Safari Box - 5 Super Incubators, 5 Premium Battle Passes"]
      }
    },
    { 
      name: "Gigantamax Cinderace Max Battle Day", 
      start: "2026-10-03", 
      end: "2026-10-03", 
      color: EVENT_COLORS.MaxMonday,
      imageUrl: `${BASE_ASSET_URL}pm815.icon.png`,
      details: {
        bonuses: ["Remote limit increased to 20", "1/4 adventuring distance for Max Particles"],
        advice: "2:00 PM to 5:00 PM local time. Gather friends to defeat the new Gigantamax!"
      }
    },
    { name: "Choose Your Path: Twilight Trails", start: "2026-09-23", end: "2026-09-28", color: EVENT_COLORS.Event, imageUrl: "/assets/events/choose-your-path-twilight-trails-2026.jpg" },
    { name: "Harvest Festival 2026: Applin Picking", start: "2026-09-29", end: "2026-10-05", color: EVENT_COLORS.Event, imageUrl: "/assets/events/harvest-festival-2026.jpg" },
    { name: "Patterns of the Wild", start: "2026-10-02", end: "2026-10-02", color: EVENT_COLORS.Event, imageUrl: "/assets/events/patterns-of-the-wild-2026.jpg" },
    { name: "Harvest Festival: Taken Over", start: "2026-10-02", end: "2026-10-05", color: EVENT_COLORS.Event, imageUrl: "/assets/events/harvest-festival-taken-over-2026.jpg" },
    { name: "October Community Day (Zorua)", start: "2026-10-10", end: "2026-10-10", color: EVENT_COLORS.CommunityDay, imageUrl: `${BASE_ASSET_URL}pm570.icon.png` },
    { 
      name: "PokéXciting! Taipei", 
      start: "2026-10-10", 
      end: "2026-10-11", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: { regions: ["Xinyi District, Taipei"], featured: ["Pink T-Shirt Pikachu", "Regional spawns"] }
    },
    { name: "Hatch Day", start: "2026-10-17", end: "2026-10-17", color: EVENT_COLORS.Event, imageUrl: "/assets/events/events-default-img.jpg" },
    { name: "Max Battle Day", start: "2026-10-24", end: "2026-10-24", color: EVENT_COLORS.MaxMonday, imageUrl: "/assets/events/max-battles-kanto.jpg" },
    { name: "Super Mega Raid Day", start: "2026-10-31", end: "2026-10-31", color: EVENT_COLORS.Raid, imageUrl: "/assets/events/mega-default.jpg" },
    { 
      name: "PokéXciting! Singapore", 
      start: "2026-11-07", 
      end: "2026-11-08", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: { regions: ["Citywide, Singapore"], featured: ["Blue T-Shirt Pikachu", "Regional spawns"] }
    },
    { 
      name: "GO Wild Area 2026", 
      start: "2026-11-14", 
      end: "2026-11-15", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm68.icon.png`,
      details: {
        featured: ["Dynamax Machamp (Modern Jacket)", "Mighty Pokémon are back"],
        "Pokémon Debuts": ["Toxtricity (Amped Form)", "Toxtricity (Low Key Form)"], "Wild Encounters": ["Dynamax Machamp (Modern Jacket)", "Dynamax Toxtricity", "Snorlax (Studded Jacket)"], "Sales": ["Wild Area Ticket - Increased shiny chance, 6 extra raid passes"],
        advice: "Play from 10:00 AM to 6:00 PM. Buy the $11.99 ticket for increased shiny chance and 6 extra raid passes per day!"
      }
    },
    { name: "November Community Day", start: "2026-11-21", end: "2026-11-21", color: EVENT_COLORS.CommunityDay },
    { name: "Super Mega Raid Day", start: "2026-11-28", end: "2026-11-28", color: EVENT_COLORS.Raid },
    { 
      name: "PokéXciting! Manila", 
      start: "2027-01-23", 
      end: "2027-01-24", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: { regions: ["Mall of Asia, Manila"], featured: ["Red T-Shirt Pikachu", "Regional spawns"] }
    },
    { 
      name: "PokéXciting! Bangkok", 
      start: "2027-02-13", 
      end: "2027-02-14", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: { regions: ["TBA, Bangkok"], featured: ["TBA T-Shirt Pikachu", "Regional spawns"] }
    },
    { name: "Max Monday: Dynamax Rhyhorn", start: "2026-09-14", end: "2026-09-14", color: EVENT_COLORS.MaxMonday, imageUrl: `${BASE_ASSET_URL}pm111.icon.png` },
    { name: "Max Monday: Dynamax Articuno, Zapdos, Moltres", start: "2026-09-21", end: "2026-09-21", color: EVENT_COLORS.MaxMonday, imageUrl: `${BASE_ASSET_URL}pm144.icon.png` },
    { name: "Max Monday: Dynamax Sobble", start: "2026-09-28", end: "2026-09-28", color: EVENT_COLORS.MaxMonday, imageUrl: `${BASE_ASSET_URL}pm816.icon.png` },
    {
      name: "LEGO Stores and Pokémon GO",
      type: "event",
      start: "2026-08-03",
      end: "2026-09-30",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["United States", "United Kingdom", "Poland", "France", "Germany", "Australia"],
        promoCodes: [
          { code: "LEGOxPOKEMONGOxCAP", description: "Timed Research for 2026 LEGO® Pokémon Cap" },
          { code: "LEGOxPOKEMONGOxBERRIES", description: "Bundle of 10 Poké Balls, 5 Razz Berries, 5 Pinap Berries, and 5 Nanab Berries" }
        ],
        Sales: [
          "New Avatar Items - 2026 LEGO® Pokémon Jacket, 2026 LEGO® Pokémon Cap"
        ]
      }
    },
    {
      name: "National Trust Collaboration",
      type: "event",
      start: "2026-09-01",
      end: "2026-12-31",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm252.icon.png`,
      details: {
        regions: ["United Kingdom"],
        "Wild Encounters": ["Treecko", "Grovyle", "Sceptile"]
      }
    },
    {
      name: "Pokémon Astronomical Observatory",
      type: "event",
      start: "2026-09-01",
      end: "2026-12-31",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm35.icon.png`,
      details: {
        regions: ["Japan"],
        "Wild Encounters": ["Clefairy"]
      }
    },
    {
      name: "PokéPark Kanto",
      type: "event",
      start: "2026-09-01",
      end: "2026-12-31",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm145.icon.png`,
      details: {
        regions: ["Kanto, Japan"],
        "Wild Encounters": ["Zapdos", "Moltres", "Articuno"]
      }
    },
    {
      name: "Pokémon Fossil Museum Chicago",
      type: "event",
      start: "2026-05-22",
      end: "2027-04-11",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["Chicago, IL, USA"],
        "Wild Encounters": ["Pikachu", "Omanyte", "Kabuto", "Aerodactyl"]
      }
    },
    {
      name: "Red Pokémon Jet Collaboration",
      type: "event",
      start: "2026-09-01",
      end: "2026-12-31",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["Japan"],
        "Wild Encounters": ["Pikachu"]
      }
    },
    {
      name: "GO Stamp Rally Pokémon Center",
      type: "event",
      start: "2026-09-01",
      end: "2026-12-31",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["Japan"],
        "Wild Encounters": ["Pikachu"]
      }
    },
    {
      name: "Celebrando con Hawlucha",
      type: "event",
      start: "2026-09-15",
      end: "2026-09-21",
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm701.icon.png`,
      details: {
        regions: ["Mexico"],
        "Bonuses": [
          "Incense will last twice as long (2x Incense Duration)"
        ],
        "Wild Encounters": [
          "Hawlucha (Appearing more frequently in the wild)"
        ],
        "Timed Research: Pick Your Side": [
          "Candela Path (Team Valor): Ponyta, Torchic, Chimchar",
          "Arlo Path (Team GO Rocket): Hisuian Sneasel, Scizor, Primeape",
          "Both Path Rewards: Hawlucha Encounter, XP, Incense, Charged TMs"
        ],
        "Field Research": [
          "Hawlucha"
        ],
        "Collection Challenges": [
          "Hawlucha"
        ],
        advice: "10:00 AM – 8:00 PM local time. Exclusive event celebrating Hawlucha across Mexico with pick-your-path Timed Research between Candela and Arlo!"
      }
    }
  ],
  fiveStarRaids: [
    { 
      name: "Zacian (Hero of Many Battles)", 
      start: "2026-09-09", 
      end: "2026-09-15", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm888.icon.png`,
      details: {
        featured: ["Zacian (Hero of Many Battles)"],
        type: ["Fairy"],
        weaknesses: ["Poison", "Steel"],
        counters: ["Metagross", "Nihilego", "Dialga", "Excadrill", "Roserade", "Genesect"]
      }
    },
    { 
      name: "Zamazenta (Hero of Many Battles)", 
      start: "2026-09-16", 
      end: "2026-09-22", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm889.icon.png`,
      details: {
        featured: ["Zamazenta (Hero of Many Battles)"],
        type: ["Fighting"],
        weaknesses: ["Fairy", "Flying", "Psychic"],
        counters: ["Mewtwo", "Rayquaza", "Togekiss", "Gardevoir", "Ho-Oh", "Lugia"],
        difficulty: "3+ trainers needed"
      }
    },
    { 
      name: "Ultra Beasts (Kartana/Celesteela/Buzzwole...)", 
      start: "2026-09-23", 
      end: "2026-09-29", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm798.icon.png`,
      details: {
        regions: ["Xurkitree (Asia-Pacific)", "Pheromosa (Europe, Middle East, Africa, India)", "Buzzwole (Americas, Greenland)"],
        weaknesses: ["Varies heavily by Ultra Beast"],
        advice: "Use Remote Raid passes and coordinate with international friends to collect them all!"
      }
    },
    { 
      name: "Xerneas", 
      start: "2026-09-30", 
      end: "2026-10-06", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm716.icon.png`,
      details: {
        type: ["Fairy"],
        weaknesses: ["Poison", "Steel"],
        counters: ["Metagross", "Nihilego", "Dialga", "Excadrill"]
      }
    }
  ],
  megaRaids: [
    { 
      name: "Mega Beedrill", 
      start: "2026-09-08", 
      end: "2026-09-15", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm15.fMEGA.icon.png`,
      details: {
        featured: ["Mega Beedrill"],
        type: ["Bug", "Poison"],
        weaknesses: ["Fire", "Flying", "Psychic", "Rock"],
        counters: ["Mewtwo", "Reshiram", "Rampardos", "Heatran", "Rayquaza", "Chandelure"]
      }
    },
    { 
      name: "Mega Houndoom", 
      start: "2026-09-11", 
      end: "2026-09-15", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm229.fMEGA.icon.png`,
      details: {
        featured: ["Mega Houndoom"],
        type: ["Dark", "Fire"],
        weaknesses: ["Fighting", "Ground", "Rock", "Water"],
        counters: ["Kyogre", "Terrakion", "Rampardos", "Swampert", "Groudon", "Lucario", "Conkeldurr"]
      }
    },
    { 
      name: "Mega Venusaur", 
      start: "2026-09-16", 
      end: "2026-09-22", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm3.fMEGA.icon.png`,
      details: {
        type: ["Grass", "Poison"],
        weaknesses: ["Fire", "Flying", "Ice", "Psychic"],
        counters: ["Mewtwo", "Reshiram", "Heatran", "Ho-Oh", "Darmanitan", "Rayquaza"]
      }
    },
    { 
      name: "Mega Malamar", 
      start: "2026-09-23", 
      end: "2026-09-29", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm687.fMEGA.icon.png`,
      details: {
        type: ["Dark", "Psychic"],
        weaknesses: ["Bug (Double Weakness)", "Fairy"],
        counters: ["Volcarona", "Pheromosa", "Vikavolt", "Pinsir", "Scizor"]
      }
    },
    { 
      name: "Mega Victreebel", 
      start: "2026-09-30", 
      end: "2026-10-06", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm71.fMEGA.icon.png`,
      details: {
        type: ["Grass", "Poison"],
        weaknesses: ["Fire", "Flying", "Ice", "Psychic"],
        counters: ["Mewtwo", "Reshiram", "Heatran", "Chandelure", "Moltres"]
      }
    }
  ],
  shadowRaids: [
    { 
      name: "Shadow Thundurus (Therian Forme)", 
      start: "2026-09-09", 
      end: "2026-10-06", 
      color: EVENT_COLORS.Raid, 
      isWeekendOnly: true,
      imageUrl: `${BASE_ASSET_URL}pm642.fTHERIAN.icon.png`,
      details: {
        type: ["Electric", "Flying"],
        weaknesses: ["Ice", "Rock"],
        counters: ["Mamoswine", "Rampardos", "Galarian Darmanitan", "Rhyperior", "Tyrantrum"],
        difficulty: "3+ trainers needed",
        advice: "Bring Purified Gems to subdue it!"
      }
    },
    { 
      name: "Shadow Thundurus (Incarnate Forme)", 
      start: "2026-10-06", 
      end: "2026-11-06", 
      color: EVENT_COLORS.Raid, 
      isWeekendOnly: true,
      imageUrl: `${BASE_ASSET_URL}pm642.fINCARNATE.icon.png`,
      details: {
        type: ["Electric", "Flying"],
        weaknesses: ["Ice", "Rock"],
        counters: ["Mamoswine", "Rampardos", "Galarian Darmanitan", "Rhyperior", "Tyrantrum"]
      }
    }
  ]
};

export const cleanEventName = (name) => {
  return (name || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\ufffd/gi, 'e')
    .replace(/:\s*the series/gi, '')
    .replace(/\bcelebration event\b/gi, '')
    .replace(/\bcelebration\b/gi, '')
    .replace(/\bevent\b/gi, '')
    .replace(/\bwearing\b/gi, '')
    .replace(/\bfriedes?\s+goggles\b/gi, 'goggles')
    .replace(/during max mondays?/gi, '')
    .replace(/max mondays?:?/gi, '')
    .replace(/in (mega|5-star|shadow|primal) raid(s| battles)?/gi, '')
    .replace(/spotlight hour/gi, '')
    .replace(/super mega/gi, '')
    .replace(/raid day/gi, '')
    .replace(/max battle day/gi, '')
    .replace(/community day/gi, '')
    .replace(/applin picking/gi, '')
    .replace(/\b(therian|incarnate)(\s+forme)?\b/gi, '')
    .replace(/\band\b/gi, '')
    .replace(/[^a-z0-9\s]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export const areEventsEqual = (name1, name2) => {
  const n1 = (name1 || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\ufffd/gi, 'e');
  const n2 = (name2 || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\ufffd/gi, 'e');
  if (n1 === n2 || n1.includes(n2) || n2.includes(n1)) return true;

  const c1 = cleanEventName(name1);
  const c2 = cleanEventName(name2);
  if (c1 && c2 && (c1 === c2 || c1.includes(c2) || c2.includes(c1))) return true;

  return false;
};

export const getEventsForDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;
  const dayOfWeek = date.getDay(); 

  const filterActive = (list) => {
    if (!list) return [];
    return list.filter(event => {
      const nameLower = (event.name || '').toLowerCase();
      if (nameLower.includes('go pass')) return false;
      const isMaxMonday = nameLower.includes('max monday') || event.type === 'max-mondays';
      if (isMaxMonday && dayOfWeek !== 1) return false;
      return event.start <= dateStr && event.end >= dateStr;
    });
  };

  const dedupeAndMerge = (manual, scraped, color) => {
    const manualActive = filterActive(manual);
    const scrapedActive = filterActive(scraped);

    const merged = manualActive.map(mEvent => ({ ...mEvent, details: { ...mEvent.details } }));
    
    scrapedActive.forEach(sEvent => {
      const matchIndex = merged.findIndex(mEvent => areEventsEqual(mEvent.name, sEvent.name));
      
      if (matchIndex >= 0) {
        if (sEvent.details) {
          merged[matchIndex].details = {
            ...sEvent.details,
            ...merged[matchIndex].details
          };
        }
        if (!merged[matchIndex].imageUrl && sEvent.imageUrl) {
          merged[matchIndex].imageUrl = sEvent.imageUrl;
        }
      } else {
        merged.push({ ...sEvent, color: sEvent.color || color });
      }
    });

    return merged;
  };

  const activeShadowRaids = dedupeAndMerge(events.shadowRaids.filter(r => !r.isWeekendOnly || (dayOfWeek === 0 || dayOfWeek === 6)), scrapedEvents.shadowRaids, EVENT_COLORS.Raid);

  return {
    discoveries: events.discoveries.filter(d => d.dayOfWeek === dayOfWeek),
    spotlightHours: dedupeAndMerge(events.spotlightHours.filter(s => s.date === dateStr), (scrapedEvents.spotlightHours || []).filter(s => s.start === dateStr), EVENT_COLORS.Spotlight),
    majorEvents: dedupeAndMerge(events.majorEvents, scrapedEvents.majorEvents, EVENT_COLORS.Event),
    fiveStarRaids: dedupeAndMerge(events.fiveStarRaids, scrapedEvents.fiveStarRaids, EVENT_COLORS.Raid),
    megaRaids: dedupeAndMerge(events.megaRaids, scrapedEvents.megaRaids, EVENT_COLORS.Raid),
    shadowRaids: activeShadowRaids
  };
};

export const getUpcomingEvents = (fromDate = new Date()) => {
  const year = fromDate.getFullYear();
  const month = String(fromDate.getMonth() + 1).padStart(2, '0');
  const day = String(fromDate.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  const all = [];
  const addCategory = (list, category, typeLabel, defaultColor) => {
    if (!list) return;
    list.forEach(e => {
      all.push({ 
        ...e, 
        category, 
        typeLabel: typeLabel || category,
        color: e.color || defaultColor 
      });
    });
  };

  addCategory(events.majorEvents, 'event', 'Special Event', EVENT_COLORS.Event);
  addCategory(scrapedEvents.majorEvents, 'event', 'Special Event', EVENT_COLORS.Event);
  addCategory(events.fiveStarRaids, 'raid', '5-Star Raid', EVENT_COLORS.Raid);
  addCategory(scrapedEvents.fiveStarRaids, 'raid', '5-Star Raid', EVENT_COLORS.Raid);
  addCategory(events.megaRaids, 'mega', 'Mega Raid', EVENT_COLORS.Raid);
  addCategory(scrapedEvents.megaRaids, 'mega', 'Mega Raid', EVENT_COLORS.Raid);
  addCategory(events.shadowRaids, 'shadow', 'Shadow Raid', EVENT_COLORS.Raid);
  addCategory(scrapedEvents.shadowRaids, 'shadow', 'Shadow Raid', EVENT_COLORS.Raid);
  addCategory(events.spotlightHours?.map(s => ({ ...s, start: s.date, end: s.date })), 'spotlight', 'Spotlight Hour', EVENT_COLORS.Spotlight);
  addCategory(scrapedEvents.spotlightHours, 'spotlight', 'Spotlight Hour', EVENT_COLORS.Spotlight);

  const unique = [];
  all.forEach(item => {
    const end = item.end || item.start;
    if (end < dateStr) return;
    const nameLower = (item.name || '').toLowerCase();
    if (nameLower.includes('go pass')) return;

    const existingIdx = unique.findIndex(u => areEventsEqual(u.name, item.name));
    if (existingIdx >= 0) {
      unique[existingIdx].details = { ...(item.details || {}), ...(unique[existingIdx].details || {}) };
      if (!unique[existingIdx].imageUrl && item.imageUrl) {
        unique[existingIdx].imageUrl = item.imageUrl;
      }
      if (item.color && !unique[existingIdx].color) {
        unique[existingIdx].color = item.color;
      }
    } else {
      unique.push({ ...item });
    }
  });

  return unique.sort((a, b) => {
    const aIsFutureOrToday = (a.start || '') >= dateStr;
    const bIsFutureOrToday = (b.start || '') >= dateStr;

    if (aIsFutureOrToday && !bIsFutureOrToday) return -1;
    if (!aIsFutureOrToday && bIsFutureOrToday) return 1;

    if (aIsFutureOrToday && bIsFutureOrToday) {
      return (a.start || '').localeCompare(b.start || '');
    }

    return (a.end || '').localeCompare(b.end || '');
  });
};
