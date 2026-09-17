export const SHOP_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'upgrades', label: 'Upgrades' },
  { id: 'passes', label: 'Raid Passes' },
  { id: 'incubators', label: 'Incubators' },
  { id: 'boosts', label: 'Boosts & Lures' },
  { id: 'supplies', label: 'Supplies' }
];

export const SHOP_ITEMS = [
  // Upgrades
  {
    id: 'pokemon_storage',
    name: '+50 Pokémon Storage',
    category: 'upgrades',
    price: 200,
    image: '/assets/items/pokemonstorageupgrade.1.png',
    fallbackIcon: '📦',
    description: 'Expands your maximum Pokémon storage capacity by 50.',
    badge: 'Popular',
    featured: true
  },
  {
    id: 'bag_expansion',
    name: '+50 Item Bag',
    category: 'upgrades',
    price: 200,
    image: '/assets/items/itemstorageupgrade.1.png',
    fallbackIcon: '🎒',
    description: 'Increases inventory bag limit by 50 item slots.',
    badge: 'Essential',
    featured: true
  },
  {
    id: 'postcard_storage',
    name: '+100 Postcards',
    category: 'upgrades',
    price: 100,
    image: '/assets/items/Item_postcardstorageupgrade.1.png',
    fallbackIcon: '💌',
    description: 'Expands your Postcard Book capacity by 100 pages.'
  },

  // Passes & Raids
  {
    id: 'remote_pass',
    name: 'Remote Raid Pass',
    category: 'passes',
    price: 195,
    image: '/assets/items/Item_1408.png',
    fallbackIcon: '🌐',
    description: 'Join any active Raid Battle anywhere in the world.',
    badge: 'Top Pick',
    featured: true
  },
  {
    id: 'remote_pass_x3',
    name: '3x Remote Raid Pass',
    category: 'passes',
    price: 525,
    image: '/assets/items/Item_1408_3.png',
    fallbackIcon: '🌐',
    description: 'Bundle of 3 Remote Raid Passes.',
    badge: 'Save 60'
  },
  {
    id: 'premium_pass',
    name: 'Premium Battle Pass',
    category: 'passes',
    price: 100,
    image: '/assets/items/Item_1402.png',
    fallbackIcon: '🎫',
    description: 'In-person Raid Battles or Premium GO Battle League tracks.'
  },
  {
    id: 'premium_pass_x3',
    name: '3x Premium Battle Pass',
    category: 'passes',
    price: 250,
    image: '/assets/items/Item_1402_3.png',
    fallbackIcon: '🎟️',
    description: 'Bundle of 3 Premium Battle Passes.',
    badge: 'Save 50'
  },

  // Incubators
  {
    id: 'egg_incubator',
    name: 'Egg Incubator',
    category: 'incubators',
    price: 150,
    image: '/assets/items/EggIncubatorIAP_Empty.png',
    fallbackIcon: '🥚',
    description: 'Hatches an Egg when walked. Can be used 3 times.'
  },
  {
    id: 'super_incubator',
    name: 'Super Incubator',
    category: 'incubators',
    price: 200,
    image: '/assets/items/EggIncubatorSuper_Empty.png',
    fallbackIcon: '✨',
    description: 'Hatches Eggs 1.5x faster. Usable 3 times.',
    badge: 'Fast Hatch'
  },
  {
    id: 'super_incubator_x3',
    name: '3x Super Incubator',
    category: 'incubators',
    price: 500,
    image: '/assets/items/super_incubatorx3.png',
    fallbackIcon: '✨',
    description: 'Bundle of 3 Super Incubators (9 hatches).',
    badge: 'Save 100'
  },

  // Boosts & Lures
  {
    id: 'lucky_egg',
    name: 'Lucky Egg',
    category: 'boosts',
    price: 80,
    image: '/assets/items/luckyegg.png',
    fallbackIcon: '🥚',
    description: 'Doubles all XP earned for 30 minutes.'
  },
  {
    id: 'lucky_egg_x8',
    name: '8x Lucky Egg',
    category: 'boosts',
    price: 500,
    image: '/assets/items/luckyegg.5.png',
    fallbackIcon: '🥚',
    description: 'Bundle of 8 Lucky Eggs for raid & evolution sprees.',
    badge: 'Save 140'
  },
  {
    id: 'star_piece',
    name: 'Star Piece',
    category: 'boosts',
    price: 100,
    image: '/assets/items/starpiece.png',
    fallbackIcon: '⭐',
    description: 'Earn 50% more Stardust for 30 minutes.'
  },
  {
    id: 'star_piece_x8',
    name: '8x Star Piece',
    category: 'boosts',
    price: 640,
    image: '/assets/items/starpiece.8.png',
    fallbackIcon: '⭐',
    description: 'Bundle of 8 Star Pieces.',
    badge: 'Save 160'
  },
  {
    id: 'incense',
    name: 'Incense',
    category: 'boosts',
    price: 40,
    image: '/assets/items/Incense_0.png',
    fallbackIcon: '💨',
    description: 'Attracts wild Pokémon to your location for 60 minutes.'
  },
  {
    id: 'incense_x8',
    name: '8x Incense',
    category: 'boosts',
    price: 250,
    image: '/assets/items/Incense_0_Med_Bundle.png',
    fallbackIcon: '💨',
    description: 'Bundle of 8 Incenses for extended hunts.',
    badge: 'Save 70'
  },
  {
    id: 'poffin',
    name: 'Poffin',
    category: 'boosts',
    price: 100,
    image: '/assets/items/poffin.3.png',
    fallbackIcon: '🥐',
    description: 'Fills your buddy hunger & doubles daily hearts earned.'
  },
  {
    id: 'lure_module',
    name: 'Standard Lure Module',
    category: 'boosts',
    price: 100,
    image: '/assets/items/TroyKey.png',
    fallbackIcon: '🌸',
    description: 'Attracts Pokémon to a PokéStop for 30 minutes.'
  },
  {
    id: 'lure_glacial',
    name: 'Glacial Lure Module',
    category: 'boosts',
    price: 180,
    image: '/assets/items/TroyKey_glacial.png',
    fallbackIcon: '❄️',
    description: 'Attracts Water & Ice types. Evolves Eevee into Glaceon.'
  },
  {
    id: 'lure_magnetic',
    name: 'Magnetic Lure Module',
    category: 'boosts',
    price: 180,
    image: '/assets/items/TroyKey_magnetic.png',
    fallbackIcon: '🧲',
    description: 'Attracts Electric & Steel. Evolves Magneton & Nosepass.'
  },
  {
    id: 'lure_mossy',
    name: 'Mossy Lure Module',
    category: 'boosts',
    price: 180,
    image: '/assets/items/TroyKey_moss.png',
    fallbackIcon: '🌿',
    description: 'Attracts Grass & Bug types. Evolves Eevee into Leafeon.'
  },
  {
    id: 'lure_rainy',
    name: 'Rainy Lure Module',
    category: 'boosts',
    price: 180,
    image: '/assets/items/TroyKey_rainy.png',
    fallbackIcon: '🌧️',
    description: 'Attracts Water, Bug & Electric types. Evolves Sliggoo.'
  },

  // Supplies
  {
    id: 'pokeballs_x20',
    name: '20x Poké Balls',
    category: 'supplies',
    price: 100,
    image: '/assets/items/pokeball_store.png',
    fallbackIcon: '🔴',
    description: '20 standard Poké Balls for catching wild Pokémon.'
  },
  {
    id: 'pokeballs_x100',
    name: '100x Poké Balls',
    category: 'supplies',
    price: 460,
    image: '/assets/items/pokeball_store.100.png',
    fallbackIcon: '🔴',
    description: '100 standard Poké Balls.',
    badge: 'Value Pack'
  },
  {
    id: 'pokeballs_x200',
    name: '200x Poké Balls',
    category: 'supplies',
    price: 800,
    image: '/assets/items/pokeball_store.200.png',
    fallbackIcon: '🔴',
    description: '200 standard Poké Balls for community days.',
    badge: 'Bulk Saver'
  },
  {
    id: 'max_potions_x10',
    name: '10x Max Potions',
    category: 'supplies',
    price: 200,
    image: '/assets/items/maxpotion_store.10.png',
    fallbackIcon: '🧪',
    description: 'Fully restores HP for 10 fainted or injured Pokémon.'
  },
  {
    id: 'max_revives_x6',
    name: '6x Max Revives',
    category: 'supplies',
    price: 180,
    image: '/assets/items/maxrevive_store.6.png',
    fallbackIcon: '💎',
    description: 'Revives and fully restores max HP to 6 fainted Pokémon.'
  },
  {
    id: 'team_medallion',
    name: 'Team Medallion',
    category: 'supplies',
    price: 1000,
    image: '/assets/items/Item_1406.png',
    fallbackIcon: '🛡️',
    description: 'Allows you to change your Team (usable once every 365 days).',
    badge: 'Exclusive'
  }
];