import { scrapedEvents } from './scrapedEvents.js';
import { hasEventDetails, getPokemon3DIconUrl } from '../utils/pokemonAssets.js';

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
        bonus: "2x Catch Stardust",
        advice: "Part of the Pokémon Horizons Celebration Event!"
      }
    },
    { 
      date: "2026-09-24", 
      name: "Rattata", 
      color: EVENT_COLORS.Spotlight, 
      bonus: "2x Evolution XP", 
      imageUrl: `${BASE_ASSET_URL}pm19.icon.png`,
      details: {
        featured: ["Rattata"],
        bonus: "2x Evolution XP",
        advice: "6:00 PM – 7:00 PM local time. Evolve Pokémon with a Lucky Egg for quadruple XP!"
      }
    },
    { 
      date: "2026-10-06", 
      name: "Seedot", 
      color: EVENT_COLORS.Spotlight, 
      bonus: "2x Catch XP", 
      imageUrl: `${BASE_ASSET_URL}pm273.icon.png`,
      details: {
        featured: ["Seedot"],
        bonus: "2x Catch XP",
        advice: "6:00 PM – 7:00 PM local time. Excellent Throws with a Lucky Egg yield massive XP!"
      }
    },
    { 
      date: "2026-10-13", 
      name: "Elgyem", 
      color: EVENT_COLORS.Spotlight, 
      bonus: "2x Catch Candy", 
      imageUrl: `${BASE_ASSET_URL}pm605.icon.png`,
      details: {
        featured: ["Elgyem"],
        bonus: "2x Catch Candy",
        advice: "6:00 PM – 7:00 PM local time. Use Pinap Berries for 4x candy per catch!"
      }
    },
    { 
      date: "2026-10-20", 
      name: "Stufful", 
      color: EVENT_COLORS.Spotlight, 
      bonus: "2x Transfer Candy", 
      imageUrl: `${BASE_ASSET_URL}pm759.icon.png`,
      details: {
        featured: ["Stufful"],
        bonus: "2x Transfer Candy",
        advice: "6:00 PM – 7:00 PM local time. Clear out your Pokémon storage to earn double transfer candy!"
      }
    },
    { 
      date: "2026-10-27", 
      name: "Morelull", 
      color: EVENT_COLORS.Spotlight, 
      bonus: "2x Catch Stardust", 
      imageUrl: `${BASE_ASSET_URL}pm755.icon.png`,
      details: {
        featured: ["Morelull"],
        bonus: "2x Catch Stardust",
        advice: "6:00 PM – 7:00 PM local time. Morelull already awards extra baseline Stardust—pop a Star Piece for enormous Stardust gains!"
      }
    },
    { 
      date: "2026-11-03", 
      name: "Gastly", 
      color: EVENT_COLORS.Spotlight, 
      bonus: "2x Evolution XP", 
      imageUrl: `${BASE_ASSET_URL}pm92.icon.png`,
      details: {
        featured: ["Gastly"],
        bonus: "2x Evolution XP",
        advice: "6:00 PM – 7:00 PM local time. Evolve Pokémon during the Halloween season for boosted XP!"
      }
    }
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
      imageUrl: '/assets/events/pm25.fTSHIRT_03.icon.png',
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
    { 
      name: "Super Mega Raid Day (Staraptor)", 
      start: "2026-09-19", 
      end: "2026-09-19", 
      color: EVENT_COLORS.Raid, 
      imageUrl: `${BASE_ASSET_URL}pm398.icon.png`,
      details: {
        featured: ["Mega Staraptor"],
        type: ["Normal", "Flying"],
        weaknesses: ["Electric", "Ice", "Rock"],
        advice: "2:00 PM – 5:00 PM local time. Staraptor makes its Super Mega Raid debut! Receive up to 5 additional free Raid Passes."
      }
    },
    { 
      name: "Korea Outing", 
      start: "2026-09-24", 
      end: "2026-09-26", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`, 
      details: { 
        regions: ["Nationwide South Korea"], 
        featured: ["Orange Hanbok Pikachu"],
        advice: "Special celebration event across South Korea featuring Orange Hanbok Pikachu!"
      } 
    },
    { 
      name: "Catch Mastery: Phantump", 
      start: "2026-09-26", 
      end: "2026-09-26", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm708.icon.png`,
      details: {
        featured: ["Phantump"],
        type: ["Ghost", "Grass"],
        weaknesses: ["Dark", "Fire", "Flying", "Ghost", "Ice"],
        advice: "10:00 AM – 8:00 PM local time. Complete accuracy-focused throw tasks to encounter Phantump with boosted Shiny odds!"
      }
    },
    { 
      name: "City Safari (Global)", 
      start: "2026-09-26", 
      end: "2026-09-27", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm133.icon.png`,
      details: {
        regions: ["Lisbon", "Brisbane", "Boston", "Marseille", "Munich", "Rio de Janeiro"],
        "Pokémon Debuts": ["Skiddo", "Gogoat"], 
        "Wild Encounters": ["Eevee in Explorer Hat", "Mudbray", "Heracross"], 
        "Sales": ["Safari Box - 5 Super Incubators, 5 Premium Battle Passes"],
        advice: "City Safari events happening worldwide with special costumed Eevee and location-specific encounters!"
      }
    },
    { 
      name: "Gigantamax Cinderace Max Battle Day", 
      start: "2026-10-03", 
      end: "2026-10-03", 
      color: EVENT_COLORS.MaxMonday,
      imageUrl: `${BASE_ASSET_URL}pm815.icon.png`,
      details: {
        featured: ["Gigantamax Cinderace"],
        type: ["Fire"],
        weaknesses: ["Ground", "Rock", "Water"],
        bonuses: ["Remote limit increased to 20", "8x Max Particles from Power Spots", "1/4 adventuring distance for Max Particles"],
        advice: "2:00 PM to 5:00 PM local time. Six-star Max Battles debut with Gigantamax Cinderace!"
      }
    },
    { 
      name: "Harvest Festival 2026: Applin Picking", 
      start: "2026-09-29", 
      end: "2026-10-05", 
      color: EVENT_COLORS.Event, 
      imageUrl: "/assets/events/pm546.cSPRING_2024.icon.png",
      details: {
        featured: ["Applin", "Flapple", "Appletun", "Dipplin", "Hydrapple"],
        "Wild Encounters": ["Applin", "Cottonee", "Oddish", "Bounsweet", "Smoliv"],
        advice: "Collect Applin during the Harvest Festival and look out for Mossy Lure Module bonuses!"
      }
    },
    { 
      name: "October Community Day: Zorua", 
      start: "2026-10-10", 
      end: "2026-10-10", 
      color: EVENT_COLORS.CommunityDay, 
      imageUrl: `${BASE_ASSET_URL}pm570.icon.png`,
      details: {
        featured: ["Zorua", "Zoroark"],
        type: ["Dark"],
        weaknesses: ["Bug", "Fairy", "Fighting"],
        bonuses: ["3x Catch Stardust", "2x Catch Candy", "2x chance for Candy XL", "3-hour Lure Modules & Incense"],
        advice: "2:00 PM – 5:00 PM local time. Evolve Zorua into Zoroark during the event or up to 2 hours after for an exclusive featured attack!"
      }
    },
    { 
      name: "PokéXciting! Taipei", 
      start: "2026-10-10", 
      end: "2026-10-11", 
      color: EVENT_COLORS.Event,
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: { regions: ["Xinyi District, Taipei"], featured: ["Pink T-Shirt Pikachu", "Regional spawns"] }
    },
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
    { 
      name: "Choose Your Path: Venom and Vines", 
      start: "2026-09-23", 
      end: "2026-09-28", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm71.fMEGA.icon.png`,
      details: {
        featured: ["Victreebel", "Malamar"],
        "Branching Research": ["Venom Path (Poison-type focus)", "Vines Path (Grass-type focus)"],
        bonuses: ["Increased spawns of Poison and Grass Pokémon", "Event-themed Timed Research"],
        advice: "Choose between Venom and Vines branching research! Event concludes September 28 at 8:00 PM local time."
      }
    },
    { 
      name: "Dancing in the Moonlight", 
      start: "2026-09-23", 
      end: "2026-09-27", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm35.icon.png`,
      details: {
        regions: ["Japan", "South Korea", "Taiwan", "Indonesia", "Singapore", "Hong Kong", "Malaysia"],
        featured: ["Clefairy", "Moonlight Spawns"],
        bonuses: ["Increased nocturnal Pokémon encounters", "Moonlight themed Field Research"],
        advice: "Special regional celebration across Asia with increased evening spawns and event bonuses!"
      }
    },
    { 
      name: "Seattle Mariners Special Event", 
      start: "2026-09-22", 
      end: "2026-09-22", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["T-Mobile Park, Seattle, WA, USA"],
        featured: ["Pikachu"],
        advice: "Special collaboration celebration during the Seattle Mariners home game!"
      }
    },
    { 
      name: "Boston Red Sox Special Event", 
      start: "2026-09-25", 
      end: "2026-09-25", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["Fenway Park, Boston, MA, USA"],
        featured: ["Pikachu"],
        advice: "Special collaboration celebration during the Boston Red Sox home game!"
      }
    },
    { 
      name: "Team GO Rocket: Taken Over", 
      start: "2026-10-02", 
      end: "2026-10-05", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm645.fINCARNATE.icon.png`,
      details: {
        featured: ["Shadow Pokémon", "Giovanni", "Team GO Rocket Leaders"],
        bonuses: ["Use a Charged TM to help a Shadow Pokémon forget Frustration", "Team GO Rocket balloons appear every 2 hours", "Defeat Team GO Rocket Grunts for Mysterious Components"],
        advice: "TM away Frustration from all your top Shadow Pokémon during this limited window!"
      }
    },
    { 
      name: "Fall Marathon: Buddy Trek", 
      start: "2026-10-13", 
      end: "2026-10-19", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm133.icon.png`,
      details: {
        featured: ["Buddy Pokémon"],
        bonuses: ["1/2 distance for Buddy Hearts & Candy", "Boosted buddy exploration souvenirs and gifts"],
        advice: "Keep your Buddy fed and on the adventure map to maximize distance bonuses and Candy XL!"
      }
    },
    { 
      name: "Hatch Day", 
      start: "2026-10-17", 
      end: "2026-10-17", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm133.icon.png`,
      details: {
        bonuses: ["1/2 Egg Hatch Distance", "Increased chance of hatching Shiny Pokémon from 2km & 7km Eggs"],
        advice: "2:00 PM – 5:00 PM local time. Super Incubators are 2x as fast during this 3-hour event window."
      }
    },
    { 
      name: "Dynamax Max Battle Day", 
      start: "2026-10-24", 
      end: "2026-10-24", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm111.icon.png`,
      details: {
        bonuses: ["Remote Max Battle limit increased to 20", "Max Particle capacity increased to 1,600", "8 extra Max Particle packs from Power Spots"],
        advice: "2:00 PM – 5:00 PM local time. Group up at local Power Spots to challenge high-tier Max Battles!"
      }
    },
    { 
      name: "Halloween 2026 Pt. I", 
      start: "2026-10-27", 
      end: "2026-10-31", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm92.icon.png`,
      details: {
        featured: ["Gastly", "Phantump", "Ghost-type Pokémon", "Dark-type Pokémon"],
        bonuses: ["2x Catch Candy", "2x Transfer Candy", "Guaranteed Candy XL when transferring Pokémon"],
        advice: "Stockpile your Ghost & Dark-type transfers to earn double candy and guaranteed XL candy!"
      }
    },
    { 
      name: "Super Mega Raid Day", 
      start: "2026-10-31", 
      end: "2026-10-31", 
      color: EVENT_COLORS.Raid, 
      imageUrl: `${BASE_ASSET_URL}pm302.fMEGA.icon.png`,
      details: {
        featured: ["Mega Sableye", "Mega Gengar"],
        bonuses: ["Receive up to 5 additional free Raid Passes from spinning Gyms", "Increased chance to encounter Shiny Pokémon in Mega Raids"],
        advice: "2:00 PM – 5:00 PM local time. Use all 5 free daily passes during the 3-hour raid day window!"
      }
    },
    { 
      name: "Halloween 2026 Pt. II", 
      start: "2026-11-01", 
      end: "2026-11-05", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        featured: ["Costume Pokémon", "Spooky Festival Spawns"],
        bonuses: ["2x Catch Candy", "Special costume encounters from Halloween Timed Research"],
        advice: "Part 2 of Halloween features exclusive costumed Pokémon and heightened spooky wild encounters!"
      }
    },
    { 
      name: "APAC Cross-Region Stamp Rally", 
      start: "2026-09-01", 
      end: "2029-12-31", 
      color: EVENT_COLORS.Event, 
      imageUrl: `${BASE_ASSET_URL}pm25.icon.png`,
      details: {
        regions: ["Asia-Pacific (APAC)"],
        featured: ["Regional Pokémon"],
        advice: "Long-term collaboration stamp rally across APAC partner locations and official Pokémon Centers."
      }
    },
    { 
      name: "Max Monday: Dynamax Rhyhorn", 
      start: "2026-09-14", 
      end: "2026-09-14", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm111.icon.png`,
      details: {
        featured: ["Dynamax Rhyhorn"],
        type: ["Ground", "Rock"],
        weaknesses: ["Water (Double Weakness)", "Grass (Double Weakness)", "Ice", "Fighting", "Ground", "Steel"],
        advice: "6:00 PM – 7:00 PM local time. Dynamax Rhyhorn appears in Max Battles at Power Spots with boosted encounters!"
      }
    },
    { 
      name: "Max Monday: Dynamax Articuno, Zapdos, Moltres", 
      start: "2026-09-21", 
      end: "2026-09-21", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm144.icon.png`,
      details: {
        featured: [
          "Dynamax Articuno (1743 CP Hundo)",
          "Dynamax Zapdos (2015 CP Hundo)",
          "Dynamax Moltres (1980 CP Hundo)"
        ],
        type: [
          "Ice / Flying (Articuno)",
          "Electric / Flying (Zapdos)",
          "Fire / Flying (Moltres)"
        ],
        weaknesses: [
          "Rock (Double Weakness - Articuno & Moltres)",
          "Rock (Zapdos)",
          "Ice (Zapdos)",
          "Fire (Articuno)",
          "Electric (Articuno & Moltres)",
          "Water (Moltres)",
          "Steel (Articuno)"
        ],
        advice: "6:00 PM – 7:00 PM local time. Set the right Fast Move (Max Move type depends on your Fast Move!). Use Tanks to build energy, switch to catch resisted moves, unlock Max Spirit to heal, upgrade Max Move for Damage Dealers, and use Zacian/Eternatus Adventure Effect if needed!"
      }
    },
    { 
      name: "Max Monday: Dynamax Sobble", 
      start: "2026-09-28", 
      end: "2026-09-28", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm816.icon.png`,
      details: {
        featured: ["Dynamax Sobble"],
        type: ["Water"],
        weaknesses: ["Electric", "Grass"],
        advice: "6:00 PM – 7:00 PM local time. Dynamax Sobble appears in Max Battles at Power Spots with boosted encounters!"
      }
    },
    { 
      name: "Max Monday: Dynamax Sizzlipede", 
      start: "2026-10-05", 
      end: "2026-10-05", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm850.icon.png`,
      details: {
        featured: ["Dynamax Sizzlipede"],
        type: ["Fire", "Bug"],
        weaknesses: ["Rock (Double Weakness - 2x)", "Flying", "Water"],
        advice: "6:00 PM – 7:00 PM local time. Dynamax Sizzlipede debuts in Max Battles at Power Spots!"
      }
    },
    { 
      name: "Max Monday: Dynamax Dottler", 
      start: "2026-10-12", 
      end: "2026-10-12", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm825.icon.png`,
      details: {
        featured: ["Dynamax Dottler"],
        type: ["Bug", "Psychic"],
        weaknesses: ["Bug", "Dark", "Fire", "Flying", "Ghost", "Rock"],
        advice: "6:00 PM – 7:00 PM local time. Dynamax Dottler appears in Max Battles at Power Spots!"
      }
    },
    { 
      name: "Max Monday: Dynamax Impidimp", 
      start: "2026-10-19", 
      end: "2026-10-19", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm859.icon.png`,
      details: {
        featured: ["Dynamax Impidimp"],
        type: ["Dark", "Fairy"],
        weaknesses: ["Fairy", "Poison", "Steel"],
        advice: "6:00 PM – 7:00 PM local time. Dynamax Impidimp appears in Max Battles at Power Spots!"
      }
    },
    { 
      name: "Max Monday: Dynamax Sableye", 
      start: "2026-10-26", 
      end: "2026-10-26", 
      color: EVENT_COLORS.MaxMonday, 
      imageUrl: `${BASE_ASSET_URL}pm302.icon.png`,
      details: {
        featured: ["Dynamax Sableye"],
        type: ["Dark", "Ghost"],
        weaknesses: ["Fairy"],
        advice: "6:00 PM – 7:00 PM local time. Dynamax Sableye appears in Max Battles at Power Spots!"
      }
    },
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
        advice: "5-Star Raid boss. Wednesday Raid Hour on September 9 from 6:00 PM – 7:00 PM local time."
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
        difficulty: "3+ trainers needed",
        advice: "5-Star Raid boss. Wednesday Raid Hour on September 16 from 6:00 PM – 7:00 PM local time."
      }
    },
    { 
      name: "Xurkitree, Pheromosa, and Buzzwole", 
      start: "2026-09-23", 
      end: "2026-09-29", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm796.icon.png`,
      details: {
        featured: ["Xurkitree", "Pheromosa", "Buzzwole"],
        regions: ["Xurkitree (Asia-Pacific)", "Pheromosa (Europe, Middle East, Africa, India)", "Buzzwole (Americas, Greenland)"],
        type: ["Electric (Xurkitree)", "Bug / Fighting (Pheromosa)", "Bug / Fighting (Buzzwole)"],
        weaknesses: ["Ground (Xurkitree)", "Flying (Double Weakness - Pheromosa & Buzzwole)", "Fire (Pheromosa & Buzzwole)", "Psychic (Pheromosa & Buzzwole)", "Fairy (Pheromosa & Buzzwole)"],
        difficulty: "3+ trainers needed",
        advice: "Ultra Beasts are region-locked! Use Remote Raid passes and coordinate with international friends to collect all three. Wednesday Raid Hour on September 23 from 6:00 PM – 7:00 PM local time."
      }
    },
    { 
      name: "Xerneas", 
      start: "2026-09-30", 
      end: "2026-10-06", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm716.icon.png`,
      details: {
        featured: ["Xerneas"],
        type: ["Fairy"],
        weaknesses: ["Poison", "Steel"],
        advice: "5-Star Raid boss appearing worldwide. Wednesday Raid Hour on September 30 from 6:00 PM – 7:00 PM local time!"
      }
    },
    { 
      name: "Yveltal", 
      start: "2026-10-07", 
      end: "2026-10-13", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm717.icon.png`,
      details: {
        featured: ["Yveltal"],
        type: ["Dark", "Flying"],
        weaknesses: ["Electric", "Fairy", "Ice", "Rock"],
        advice: "5-Star Raid boss appearing worldwide. Wednesday Raid Hour on October 7 from 6:00 PM – 7:00 PM local time!"
      }
    },
    { 
      name: "Dialga", 
      start: "2026-10-14", 
      end: "2026-10-20", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm483.icon.png`,
      details: {
        featured: ["Dialga"],
        type: ["Steel", "Dragon"],
        weaknesses: ["Fighting", "Ground"],
        advice: "5-Star Raid boss appearing worldwide. Wednesday Raid Hour on October 14 from 6:00 PM – 7:00 PM local time!"
      }
    },
    { 
      name: "Palkia", 
      start: "2026-10-21", 
      end: "2026-10-27", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm484.icon.png`,
      details: {
        featured: ["Palkia"],
        type: ["Water", "Dragon"],
        weaknesses: ["Dragon", "Fairy"],
        advice: "5-Star Raid boss appearing worldwide. Wednesday Raid Hour on October 21 from 6:00 PM – 7:00 PM local time!"
      }
    },
    { 
      name: "Giratina (Origin Forme)", 
      start: "2026-10-28", 
      end: "2026-11-03", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm487.fORIGIN.icon.png`,
      details: {
        featured: ["Giratina (Origin Forme)"],
        type: ["Ghost", "Dragon"],
        weaknesses: ["Dark", "Dragon", "Fairy", "Ghost", "Ice"],
        advice: "5-Star Raid boss appearing worldwide. Wednesday Raid Hour on October 28 from 6:00 PM – 7:00 PM local time!"
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
        advice: "Mega Beedrill appears in Mega Raids! Thursday is Mega Raid day."
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
        advice: "Mega Houndoom appears in Mega Raids!"
      }
    },
    { 
      name: "Mega Venusaur", 
      start: "2026-09-16", 
      end: "2026-09-22", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm3.fMEGA.icon.png`,
      details: {
        featured: ["Mega Venusaur"],
        type: ["Grass", "Poison"],
        weaknesses: ["Fire", "Flying", "Ice", "Psychic"],
        advice: "Mega Venusaur appears in Mega Raids! Thursday is Mega Raid day."
      }
    },
    { 
      name: "Mega Malamar", 
      start: "2026-09-23", 
      end: "2026-09-29", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm687.fMEGA.icon.png`,
      details: {
        featured: ["Mega Malamar"],
        type: ["Dark", "Psychic"],
        weaknesses: ["Bug (Double Weakness)", "Fairy"],
        advice: "Mega Malamar appears in Mega Raids! Thursday is Mega Raid day."
      }
    },
    { 
      name: "Mega Victreebel", 
      start: "2026-09-30", 
      end: "2026-10-06", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm71.fMEGA.icon.png`,
      details: {
        featured: ["Mega Victreebel"],
        type: ["Grass", "Poison"],
        weaknesses: ["Fire", "Flying", "Ice", "Psychic"],
        advice: "Mega Victreebel appears in Mega Raids! Thursday is Mega Raid day."
      }
    },
    { 
      name: "Mega Blastoise", 
      start: "2026-10-07", 
      end: "2026-10-13", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm9.fMEGA.icon.png`,
      details: {
        featured: ["Mega Blastoise"],
        type: ["Water"],
        weaknesses: ["Electric", "Grass"],
        advice: "Mega Blastoise appears in Mega Raids! Earn Blastoise Mega Energy to Mega Evolve."
      }
    },
    { 
      name: "Mega Pidgeot", 
      start: "2026-10-14", 
      end: "2026-10-20", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm18.fMEGA.icon.png`,
      details: {
        featured: ["Mega Pidgeot"],
        type: ["Normal", "Flying"],
        weaknesses: ["Electric", "Ice", "Rock"],
        advice: "Mega Pidgeot appears in Mega Raids! Earn Pidgeot Mega Energy to Mega Evolve."
      }
    },
    { 
      name: "Mega Charizard X", 
      start: "2026-10-21", 
      end: "2026-10-27", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm6.fMEGA_X.icon.png`,
      details: {
        featured: ["Mega Charizard X"],
        type: ["Fire", "Dragon"],
        weaknesses: ["Dragon", "Ground", "Rock"],
        advice: "Mega Charizard X appears in Mega Raids! Thursday is Mega Raid day."
      }
    },
    { 
      name: "Mega Sableye", 
      start: "2026-10-28", 
      end: "2026-11-03", 
      color: EVENT_COLORS.Raid,
      imageUrl: `${BASE_ASSET_URL}pm302.fMEGA.icon.png`,
      details: {
        featured: ["Mega Sableye"],
        type: ["Dark", "Ghost"],
        weaknesses: ["Fairy"],
        advice: "Mega Sableye appears in Mega Raids throughout Halloween season!"
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
        featured: ["Shadow Thundurus (Therian Forme)"],
        type: ["Electric", "Flying"],
        weaknesses: ["Ice", "Rock"],
        difficulty: "3+ trainers needed",
        advice: "Appears in 5-Star Shadow Raids exclusively on weekends (Saturdays & Sundays). Bring Purified Gems to subdue it!"
      }
    },
    { 
      name: "Shadow Landorus (Incarnate Forme)", 
      start: "2026-10-07", 
      end: "2026-11-03", 
      color: EVENT_COLORS.Raid, 
      isWeekendOnly: true,
      imageUrl: `${BASE_ASSET_URL}pm645.fINCARNATE.icon.png`,
      details: {
        featured: ["Shadow Landorus (Incarnate Forme)"],
        type: ["Ground", "Flying"],
        weaknesses: ["Ice (Double Weakness - 2x)", "Water"],
        difficulty: "3+ trainers needed",
        advice: "Appears in 5-Star Shadow Raids exclusively on weekends (Saturdays & Sundays). Ice-type Pokémon deal 4x massive damage! Bring Purified Gems to subdue it when enraged."
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

  // Ultra beasts aliases
  const isUB1 = n1.includes('ultra beast') || (n1.includes('xurkitree') || n1.includes('pheromosa') || n1.includes('buzzwole'));
  const isUB2 = n2.includes('ultra beast') || (n2.includes('xurkitree') || n2.includes('pheromosa') || n2.includes('buzzwole'));
  if (isUB1 && isUB2) return true;

  const c1 = cleanEventName(name1);
  const c2 = cleanEventName(name2);
  if (c1 && c2 && (c1 === c2 || c1.includes(c2) || c2.includes(c1))) return true;

  return false;
};

export const getEventsForDate = (date, userEvents = []) => {
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
      if (!hasEventDetails(event)) return false;
      return event.start <= dateStr && event.end >= dateStr;
    });
  };

  const dedupeAndMerge = (manual, scraped, color) => {
    const manualActive = filterActive(manual);
    const scrapedActive = filterActive(scraped);

    const merged = manualActive.map(mEvent => ({ 
      ...mEvent, 
      imageUrl: getPokemon3DIconUrl(mEvent) || mEvent.imageUrl,
      details: { ...mEvent.details } 
    }));
    
    scrapedActive.forEach(sEvent => {
      const matchIndex = merged.findIndex(mEvent => areEventsEqual(mEvent.name, sEvent.name));
      const sIcon = getPokemon3DIconUrl(sEvent) || sEvent.imageUrl;
      
      if (matchIndex >= 0) {
        if (sEvent.details) {
          merged[matchIndex].details = {
            ...sEvent.details,
            ...merged[matchIndex].details
          };
        }
        if (!merged[matchIndex].imageUrl && sIcon) {
          merged[matchIndex].imageUrl = sIcon;
        }
      } else {
        merged.push({ 
          ...sEvent, 
          imageUrl: sIcon,
          color: sEvent.color || color 
        });
      }
    });

    return merged.filter(evt => hasEventDetails(evt));
  };

  const activeShadowRaids = dedupeAndMerge(events.shadowRaids.filter(r => !r.isWeekendOnly || (dayOfWeek === 0 || dayOfWeek === 6)), scrapedEvents.shadowRaids, EVENT_COLORS.Raid);
  const allMajorMerged = dedupeAndMerge(events.majorEvents, scrapedEvents.majorEvents, EVENT_COLORS.Event);

  const isMaxBattleEvent = (evt) => {
    if (!evt) return false;
    const nameLower = (evt.name || '').toLowerCase();
    const typeLower = (evt.type || '').toLowerCase();
    if (typeLower === 'max-battles' || typeLower === 'max-mondays' || typeLower.includes('max')) return true;
    if (nameLower.includes('max monday') || nameLower.includes('max battle') || nameLower.includes('dynamax') || nameLower.includes('gigantamax')) return true;
    if (evt.color === EVENT_COLORS.MaxMonday || evt.color === EVENT_COLORS.MaxBattle) return true;
    return false;
  };

  const maxBattles = allMajorMerged.filter(isMaxBattleEvent).map(evt => ({
    ...evt,
    color: evt.color || EVENT_COLORS.MaxMonday || '#843667',
    type: evt.type || 'max-battles'
  }));
  const majorEvents = allMajorMerged.filter(evt => !isMaxBattleEvent(evt));

  // Process and partition active user-created events
  const activeUserList = (userEvents || []).filter(e => {
    if (!e || !e.start) return false;
    const s = e.start;
    const end = e.end || e.start;
    return s <= dateStr && end >= dateStr;
  }).map(e => ({
    ...e,
    isCustom: true,
    imageUrl: getPokemon3DIconUrl(e) || e.imageUrl,
    color: e.color || EVENT_COLORS[e.category] || EVENT_COLORS.Event
  }));

  const userSpotlight = activeUserList.filter(e => e.category === 'spotlight');
  const userMax = activeUserList.filter(e => e.category === 'max-battles' || isMaxBattleEvent(e));
  const user5Star = activeUserList.filter(e => e.category === 'raid' || e.category === 'fiveStar');
  const userMega = activeUserList.filter(e => e.category === 'mega');
  const userShadow = activeUserList.filter(e => e.category === 'shadow');
  const userMajor = activeUserList.filter(e => 
    !userSpotlight.includes(e) && 
    !userMax.includes(e) && 
    !user5Star.includes(e) && 
    !userMega.includes(e) && 
    !userShadow.includes(e)
  );

  return {
    discoveries: events.discoveries.filter(d => d.dayOfWeek === dayOfWeek),
    spotlightHours: [...dedupeAndMerge(events.spotlightHours.filter(s => s.date === dateStr), (scrapedEvents.spotlightHours || []).filter(s => s.start === dateStr), EVENT_COLORS.Spotlight), ...userSpotlight],
    maxBattles: [...maxBattles, ...userMax],
    majorEvents: [...majorEvents, ...userMajor],
    fiveStarRaids: [...dedupeAndMerge(events.fiveStarRaids, scrapedEvents.fiveStarRaids, EVENT_COLORS.Raid), ...user5Star],
    megaRaids: [...dedupeAndMerge(events.megaRaids, scrapedEvents.megaRaids, EVENT_COLORS.Raid), ...userMega],
    shadowRaids: [...activeShadowRaids, ...userShadow]
  };
};

export const getUpcomingEvents = (fromDate = new Date(), userEvents = []) => {
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

  // Add User-Created Events
  if (Array.isArray(userEvents)) {
    userEvents.forEach(e => {
      const cat = e.category || 'event';
      const label = cat === 'mega' ? 'Mega Raid' : cat === 'raid' ? '5-Star Raid' : cat === 'shadow' ? 'Shadow Raid' : cat === 'spotlight' ? 'Spotlight Hour' : cat === 'max-battles' ? 'Max Battle' : 'Special Event';
      const defaultCol = cat === 'spotlight' ? EVENT_COLORS.Spotlight : (cat === 'raid' || cat === 'mega' || cat === 'shadow') ? EVENT_COLORS.Raid : (cat === 'max-battles' ? EVENT_COLORS.MaxBattle : EVENT_COLORS.Event);
      all.push({
        ...e,
        category: cat,
        typeLabel: e.typeLabel || label,
        color: e.color || defaultCol,
        imageUrl: getPokemon3DIconUrl(e) || e.imageUrl,
        isCustom: true
      });
    });
  }

  const unique = [];
  all.forEach(item => {
    const end = item.end || item.start;
    if (end < dateStr) return;
    const nameLower = (item.name || '').toLowerCase();
    if (nameLower.includes('go pass')) return;

    if (item.isCustom) {
      unique.push(item);
      return;
    }

    const existingIdx = unique.findIndex(u => !u.isCustom && areEventsEqual(u.name, item.name));
    const icon = getPokemon3DIconUrl(item) || item.imageUrl;
    if (existingIdx >= 0) {
      unique[existingIdx].details = { ...(item.details || {}), ...(unique[existingIdx].details || {}) };
      if (icon) {
        unique[existingIdx].imageUrl = icon;
      }
      if (item.color && !unique[existingIdx].color) {
        unique[existingIdx].color = item.color;
      }
    } else {
      unique.push({ ...item, imageUrl: icon });
    }
  });

  return unique.filter(evt => hasEventDetails(evt)).sort((a, b) => {
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
