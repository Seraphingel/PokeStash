export const events = {
  majorEvents: [
    { name: "Mega Ascension", start: "2026-08-31", end: "2026-09-04", description: "Kick-off event focusing on Mega Evolutions." },
    { name: "GO Fest Mega Finale", start: "2026-09-05", end: "2026-09-06", description: "Global/Season culmination event." },
    { name: "Mega Squads", start: "2026-09-08", end: "2026-09-14", description: "Team/co-op focused Mega Evolution event." },
    { name: "Community Day Classic", start: "2026-09-12", end: "2026-09-12", description: "Features a returning classic Community Day Pokemon." },
    { name: "Unannounced Event (???)", start: "2026-09-16", end: "2026-09-22", description: "Mystery mid-month event." },
    { name: "Super Mega Raid Day", start: "2026-09-19", end: "2026-09-19", description: "Intensive single-day raid event." },
    { name: "Catch Mastery", start: "2026-09-26", end: "2026-09-26", description: "Focused catch challenges and Poke Ball throw bonuses." },
    { name: "City Safari (Ticketed)", start: "2026-09-26", end: "2026-09-27", description: "In-person event held in select cities." },
    { name: "Harvest Festival", start: "2026-09-29", end: "2026-10-05", description: "Autumn-themed harvest event featuring fall spawns." }
  ],
  fiveStarRaids: [
    { name: "Regirock, Regice, Registeel", start: "2026-08-26", end: "2026-09-08" },
    { name: "Kyogre", start: "2026-09-09", end: "2026-09-15" },
    { name: "Groudon", start: "2026-09-16", end: "2026-09-22" },
    { name: "Regional Ultra Beasts", start: "2026-09-23", end: "2026-09-29" },
    { name: "Giratina - Altered Forme", start: "2026-09-30", end: "2026-10-06" }
  ],
  megaRaids: [
    { name: "Mega Beedrill", start: "2026-09-08", end: "2026-09-15" },
    { name: "Mega Diancie", start: "2026-09-11", end: "2026-09-15" },
    { name: "Mega Gyarados", start: "2026-09-16", end: "2026-09-22" },
    { name: "Mega Milotic", start: "2026-09-23", end: "2026-09-29" },
    { name: "Mega Tropius", start: "2026-09-30", end: "2026-10-06" }
  ],
  shadowRaids: [
    { name: "Shadow Chandelure (Weekends)", start: "2026-09-09", end: "2026-10-06" }
  ],
  spotlightHours: [
    { name: "Dunsparce (2x Transfer Candy)", start: "2026-09-10", end: "2026-09-10" },
    { name: "Yamask / Galarian Yamask (2x Transfer Candy)", start: "2026-09-13", end: "2026-09-13" },
    { name: "Mystery Pokemon (2x Catch Stardust)", start: "2026-09-17", end: "2026-09-17" },
    { name: "Cutiefly (2x Evo XP, XXS chances)", start: "2026-09-24", end: "2026-09-24" }
  ]
};

export const getEventsForDate = (date) => {
  const dateStr = date.toISOString().split('T')[0];
  
  const filterActive = (list) => {
    return list.filter(event => event.start <= dateStr && event.end >= dateStr);
  };

  return {
    majorEvents: filterActive(events.majorEvents),
    fiveStarRaids: filterActive(events.fiveStarRaids),
    megaRaids: filterActive(events.megaRaids),
    shadowRaids: filterActive(events.shadowRaids),
    spotlightHours: filterActive(events.spotlightHours)
  };
};
