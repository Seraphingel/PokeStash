import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEEK_DUCK_URL = 'https://leekduck.com/events/';
const ASSETS_DIR = path.join(__dirname, '../public/assets/events');
const OUTPUT_FILE = path.join(__dirname, '../src/data/scrapedEvents.js');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filepath)) {
      resolve();
      return;
    }
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      } else {
        reject(new Error(`Failed: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const cleanTitle = (rawTitle) => {
  return rawTitle
    .replace(/ in (Mega|5-star|Elite|Shadow|Primal|1-star|3-star) Raid( Battles|s)?/ig, '')
    .replace(/ Spotlight Hour/ig, '')
    .replace(/ Raid Day/ig, '')
    .replace(/ Max Battle Day/ig, '')
    .replace(/ Catch Mastery/ig, '')
    .replace(/ Community Day/ig, '')
    .trim();
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function scrape() {
  console.log('Fetching main Leek Duck events page...');
  try {
    const response = await fetch(LEEK_DUCK_URL);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const eventLinks = [];

    $('.event-header-item-wrapper').each((i, el) => {
      const $el = $(el);
      const eventType = $el.attr('data-event-type') || 'event';
      const startDateStr = $el.attr('data-event-start-date-check');
      const endDateStr = $el.attr('data-event-end-date') || $el.attr('data-event-date-sort');
      
      const $item = $el.find('.event-item-wrapper');
      const rawTitle = $item.find('.event-text h2').text().trim();
      const href = $el.find('a.event-item-link').attr('href');
      
      if (!rawTitle || !startDateStr || !href) return;
      if (rawTitle.toLowerCase().includes('go pass') || href.toLowerCase().includes('go-pass')) return;

      eventLinks.push({
        rawTitle,
        type: eventType,
        start: startDateStr.split('T')[0],
        end: endDateStr ? endDateStr.split('T')[0] : startDateStr.split('T')[0],
        url: `https://leekduck.com${href}`
      });
    });

    console.log(`Found ${eventLinks.length} events. Crawling individual pages...`);
    const events = [];
    const imagePromises = [];

    // Crawl in sequence to avoid rate limiting
    for (let i = 0; i < eventLinks.length; i++) {
      const eventData = eventLinks[i];
      console.log(`[${i+1}/${eventLinks.length}] Crawling ${eventData.url}...`);
      
      try {
        const articleRes = await fetch(eventData.url);
        const articleHtml = await articleRes.text();
        const $article = cheerio.load(articleHtml);
        
        const title = cleanTitle(eventData.rawTitle);
        
        let imgUrl = null;
        
        // Find specific pokemon image in pkmn-list-flex
        const $pkmnIcon = $article('ul.pkmn-list-flex li.pkmn-list-item img').first();
        if ($pkmnIcon.length) {
          imgUrl = $pkmnIcon.attr('src');
        } else {
          // Fallback to primary event image
          const $eventImg = $article('img[alt="Event image"]').first();
          if ($eventImg.length) {
            imgUrl = $eventImg.attr('src');
          }
        }

        let localImagePath = null;
        if (imgUrl) {
          let originalImgUrl = imgUrl;
          if (imgUrl.includes('cdn-cgi/image')) {
            const parts = imgUrl.split('/assets/img/');
            if (parts.length > 1) {
              originalImgUrl = `https://leekduck.com/assets/img/${parts[1]}`;
            }
          }
          if (originalImgUrl.startsWith('/')) {
            originalImgUrl = `https://leekduck.com${originalImgUrl}`;
          }
          
          const filename = path.basename(originalImgUrl).split('?')[0];
          localImagePath = `/assets/events/${filename}`;
          
          const savePath = path.join(ASSETS_DIR, filename);
          imagePromises.push(downloadImage(originalImgUrl, savePath).catch(err => {}));
        }

const POKEMON_RAID_INFO = {
  "houndoom": {
    name: "Mega Houndoom",
    type: ["Dark", "Fire"],
    weaknesses: ["Fighting", "Ground", "Rock", "Water"],
    counters: ["Kyogre", "Terrakion", "Rampardos", "Swampert", "Groudon", "Lucario", "Conkeldurr"]
  },
  "beedrill": {
    name: "Mega Beedrill",
    type: ["Bug", "Poison"],
    weaknesses: ["Fire", "Flying", "Psychic", "Rock"],
    counters: ["Mewtwo", "Reshiram", "Rampardos", "Heatran", "Rayquaza", "Chandelure"]
  },
  "zacian": {
    name: "Zacian (Hero of Many Battles)",
    type: ["Fairy"],
    weaknesses: ["Poison", "Steel"],
    counters: ["Metagross", "Nihilego", "Dialga", "Excadrill", "Roserade", "Genesect"]
  },
  "zamazenta": {
    name: "Zamazenta (Hero of Many Battles)",
    type: ["Fighting"],
    weaknesses: ["Fairy", "Flying", "Psychic"],
    counters: ["Mewtwo", "Rayquaza", "Togekiss", "Gardevoir", "Ho-Oh", "Lugia"]
  },
  "venusaur": {
    name: "Mega Venusaur",
    type: ["Grass", "Poison"],
    weaknesses: ["Fire", "Flying", "Ice", "Psychic"],
    counters: ["Mewtwo", "Reshiram", "Heatran", "Ho-Oh", "Kyurem"]
  },
  "malamar": {
    name: "Mega Malamar",
    type: ["Dark", "Psychic"],
    weaknesses: ["Bug (Double Weakness)", "Fairy"],
    counters: ["Volcarona", "Pheromosa", "Vikavolt", "Pinsir", "Scizor"]
  },
  "victreebel": {
    name: "Mega Victreebel",
    type: ["Grass", "Poison"],
    weaknesses: ["Fire", "Flying", "Ice", "Psychic"],
    counters: ["Mewtwo", "Reshiram", "Heatran", "Chandelure", "Moltres"]
  },
  "thundurus": {
    name: "Shadow Thundurus",
    type: ["Electric", "Flying"],
    weaknesses: ["Ice", "Rock"],
    counters: ["Mamoswine", "Rampardos", "Galarian Darmanitan", "Rhyperior", "Tyrantrum"]
  },
  "xerneas": {
    name: "Xerneas",
    type: ["Fairy"],
    weaknesses: ["Poison", "Steel"],
    counters: ["Metagross", "Nihilego", "Dialga", "Excadrill"]
  },
  "kartana": {
    name: "Kartana",
    type: ["Grass", "Steel"],
    weaknesses: ["Fire (Double Weakness)", "Fighting"],
    counters: ["Reshiram", "Heatran", "Ho-Oh", "Chandelure", "Darmanitan"]
  },
  "celesteela": {
    name: "Celesteela",
    type: ["Steel", "Flying"],
    weaknesses: ["Fire", "Electric"],
    counters: ["Reshiram", "Xurkitree", "Thundurus", "Heatran", "Zekrom"]
  },
  "buzzwole": {
    name: "Buzzwole",
    type: ["Bug", "Fighting"],
    weaknesses: ["Flying (Double Weakness)", "Fire", "Psychic", "Fairy"],
    counters: ["Rayquaza", "Mewtwo", "Moltres", "Staraptor", "Yveltal"]
  },
  "xurkitree": {
    name: "Xurkitree",
    type: ["Electric"],
    weaknesses: ["Ground"],
    counters: ["Groudon", "Landorus", "Excadrill", "Rhyperior", "Mamoswine"]
  },
  "pheromosa": {
    name: "Pheromosa",
    type: ["Bug", "Fighting"],
    weaknesses: ["Flying (Double Weakness)", "Fire", "Psychic", "Fairy"],
    counters: ["Rayquaza", "Mewtwo", "Moltres", "Staraptor", "Yveltal"]
  },
  "staraptor": {
    name: "Staraptor",
    type: ["Normal", "Flying"],
    weaknesses: ["Electric", "Ice", "Rock"],
    counters: ["Xurkitree", "Rampardos", "Mamoswine", "Zekrom", "Thundurus"]
  },
  "rhyhorn": {
    name: "Dynamax Rhyhorn",
    type: ["Ground", "Rock"],
    weaknesses: ["Water (Double Weakness)", "Grass (Double Weakness)", "Ice", "Fighting", "Ground", "Steel"],
    counters: ["Kyogre", "Kartana", "Kingler", "Swampert", "Roselia"]
  },
  "articuno": {
    name: "Dynamax Articuno",
    type: ["Ice", "Flying"],
    weaknesses: ["Rock (Double Weakness)", "Fire", "Electric", "Steel"],
    counters: ["Rampardos", "Rhyperior", "Gigalith", "Tyrantrum", "Terrakion"]
  },
  "zapdos": {
    name: "Dynamax Zapdos",
    type: ["Electric", "Flying"],
    weaknesses: ["Ice", "Rock"],
    counters: ["Mamoswine", "Rampardos", "Galarian Darmanitan", "Rhyperior"]
  },
  "moltres": {
    name: "Dynamax Moltres",
    type: ["Fire", "Flying"],
    weaknesses: ["Rock (Double Weakness)", "Water", "Electric"],
    counters: ["Rampardos", "Rhyperior", "Kyogre", "Gigalith", "Tyrantrum"]
  },
  "cinderace": {
    name: "Gigantamax Cinderace",
    type: ["Fire"],
    weaknesses: ["Water", "Ground", "Rock"],
    counters: ["Kyogre", "Groudon", "Rampardos", "Rhyperior", "Swampert"]
  },
  "phantump": {
    name: "Phantump",
    type: ["Ghost", "Grass"],
    weaknesses: ["Dark", "Fire", "Flying", "Ghost", "Ice"],
    counters: ["Hydreigon", "Tyranitar", "Reshiram", "Chandelure", "Gengar"]
  }
};

        // Extract features, spawns, sales dynamically
        const details = {};
        
        $article('h2').each((_, h2) => {
          const sectionTitle = $article(h2).text().trim();
          const lowerTitle = sectionTitle.toLowerCase();
          
          let validSection = false;
          let sectionKey = '';
          
          // Disable bonuses and eggs
          if (lowerTitle.includes('bonus') || lowerTitle.includes('egg')) return;
          
          if (lowerTitle.includes('mega-evolved')) { validSection = true; sectionKey = 'Mega-Evolved Pokémon'; }
          else if (lowerTitle.includes('max pokémon')) { validSection = true; sectionKey = 'Max Pokémon Debuts'; }
          else if (lowerTitle.includes('debut')) { validSection = true; sectionKey = 'Pokémon Debuts'; }
          else if (lowerTitle.includes('sale') || lowerTitle.includes('web store')) { validSection = true; sectionKey = 'Sales'; }
          else if (lowerTitle.includes('spotlight hour')) { validSection = true; sectionKey = 'Spotlight Hours'; }
          else if (lowerTitle.includes('spawn') || lowerTitle.includes('wild') || lowerTitle.includes('encounter')) { validSection = true; sectionKey = 'Wild Encounters'; }
          else if (lowerTitle.includes('new item')) { validSection = true; sectionKey = 'New Items'; }
          else if (lowerTitle.includes('raid') || lowerTitle.includes('featured') || lowerTitle.includes('showcase')) { validSection = true; sectionKey = 'featured'; }
          
          if (validSection) {
            let $next = $article(h2).next();
            const items = new Set(details[sectionKey] || []);
            
            while($next.length && !['h2', 'h1'].includes($next[0].name)) {
               // Handle dates/times headers for spawns
               if (sectionKey === 'Wild Encounters' && ($next[0].name === 'h3' || $next[0].name === 'h4')) {
                 let dateHeader = $next.text().trim();
                 if (dateHeader) items.add(dateHeader);
               }

               if ($next[0].name === 'ul' || $next[0].name === 'ol') {
                  if ($next.hasClass('pkmn-list-flex')) {
                    $next.find('li.pkmn-list-item').each((_, li) => {
                      let name = $article(li).find('.pkmn-name').text().trim();
                      if (!name) name = $article(li).text().trim(); // Fallback
                      name = name.replace(/✨/g, '').trim();
                      if (name) items.add(name);
                    });
                  } else if (sectionKey === 'Sales') {
                    $next.find('li').each((_, li) => {
                      let text = $article(li).text().trim().replace(/\s+/g, ' ');
                      let passMatch = text.match(/(.*?)(?:will receive|includes|grants)\s+(.*)/i);
                      if (passMatch) {
                        let passName = passMatch[1].replace(/Trainers who (purchase|upgrade to)/i, '').replace(/(via|on) the Pokémon GO Web Store/i, '').replace(/the /i, '').trim();
                        let benefits = passMatch[2].replace(/as a gift with purchase/i, '').trim();
                        items.add(`${passName} - ${benefits}`);
                      } else if (text.length < 150 && !text.includes('activate as soon as')) {
                        items.add(text);
                      }
                    });
                  } else if (sectionKey !== 'featured' && sectionKey !== 'Wild Encounters' && sectionKey !== 'Pokémon Debuts') {
                    $next.find('li').each((_, li) => {
                      let text = $article(li).text().trim().replace(/\s+/g, ' ');
                      if (text) items.add(text);
                    });
                  } else if (sectionKey === 'Wild Encounters' || sectionKey === 'Pokémon Debuts') {
                     $next.find('li').each((_, li) => {
                        let name = $article(li).text().trim().replace(/✨/g, '').trim();
                        if (name.split(' ').length <= 4 && !name.toLowerCase().includes('catch') && !name.toLowerCase().includes('encounter')) {
                          items.add(name);
                        }
                     });
                  }
               } else if ($next[0].name === 'p' && sectionKey === 'Sales') {
                 let text = $next.text().trim().replace(/\s+/g, ' ');
                 let passMatch = text.match(/(.*?)(?:will receive|includes|grants)\s+(.*)/i);
                 if (passMatch) {
                   let passName = passMatch[1].replace(/Trainers who (purchase|upgrade to)/i, '').replace(/(via|on) the Pokémon GO Web Store/i, '').replace(/the /i, '').trim();
                   let benefits = passMatch[2].replace(/as a gift with purchase/i, '').replace(/\.$/, '').trim();
                   items.add(`${passName} - ${benefits}`);
                 }
               } else if ($next[0].name === 'p' && sectionKey !== 'featured' && sectionKey !== 'Wild Encounters' && sectionKey !== 'Pokémon Debuts' && sectionKey !== 'Sales') {
                 let text = $next.text().trim().replace(/\s+/g, ' ');
                 if (text) items.add(text);
               }
               $next = $next.next();
            }
            
            if (items.size > 0) {
              if (sectionKey === 'featured') {
                const cleaned = Array.from(items).filter(item => {
                  const lower = item.toLowerCase();
                  return !lower.includes('will be in') && !lower.includes('raid battle') && !lower.includes('five-star') && item.length <= 45;
                });
                if (cleaned.length > 0) details[sectionKey] = cleaned;
              } else {
                details[sectionKey] = Array.from(items);
              }
            }
          }
        });

        // Enrich raid details with type, weaknesses, counters
        const fullSearchText = (title + ' ' + (details.featured ? details.featured.join(' ') : '')).toLowerCase();
        for (const [key, info] of Object.entries(POKEMON_RAID_INFO)) {
          if (fullSearchText.includes(key)) {
            details.type = info.type;
            details.weaknesses = info.weaknesses;
            details.counters = info.counters;
            if (!details.featured || details.featured.some(f => f.toLowerCase().includes('will be in') || f.length > 40)) {
              details.featured = [info.name];
            }
            break;
          }
        }

        events.push({
          name: title,
          type: eventData.type,
          start: eventData.start,
          end: eventData.end,
          imageUrl: localImagePath,
          details: Object.keys(details).length ? details : undefined
        });

      } catch (err) {
        console.log(`Failed to crawl ${eventData.url}`);
      }
      
      await delay(100); // 100ms delay to be polite
    }

    console.log(`Waiting for ${imagePromises.length} images to download...`);
    await Promise.allSettled(imagePromises);

    const grouped = {
      spotlightHours: events.filter(e => e.type.includes('spotlight')),
      megaRaids: events.filter(e => e.type.includes('raid') && e.name.toLowerCase().includes('mega')),
      shadowRaids: events.filter(e => e.type.includes('raid') && e.name.toLowerCase().includes('shadow')),
      fiveStarRaids: events.filter(e => e.type.includes('raid') && !e.name.toLowerCase().includes('mega') && !e.name.toLowerCase().includes('shadow')),
      majorEvents: events.filter(e => !e.type.includes('spotlight') && !e.type.includes('raid'))
    };

    const fileContent = `// AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY\n// Scraped from Leek Duck\nexport const scrapedEvents = ${JSON.stringify(grouped, null, 2)};\n`;
    fs.writeFileSync(OUTPUT_FILE, fileContent);
    console.log(`Successfully wrote advanced scraped data to src/data/scrapedEvents.js`);

  } catch (error) {
    console.error('Scraping failed:', error);
    process.exit(1);
  }
}

scrape();
