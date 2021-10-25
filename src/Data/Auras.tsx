import { Aura, AuraGroupKey } from "../Types"

export const Auras: Aura[] = [
  // Buffs
  { name: 'Fel Armor', varName: 'felArmor', group: AuraGroupKey.Buffs, iconName: 'spell_shadow_felarmour', id: 28189, stats: { spellPower: 100 } },
  { name: 'Blessing of Kings', varName: 'blessingOfKings', group: AuraGroupKey.Buffs, iconName: 'spell_magic_greaterblessingofkings', id: 25898, stats: { staminaModifier: 1.1, intellectModifier: 1.1, spiritModifier: 1.1, } },
  { name: 'Blessing of Wisdom', varName: 'blessingOfWisdom', group: AuraGroupKey.Buffs, iconName: 'spell_holy_greaterblessingofwisdom', id: 27143, stats: { mp5: 41, } },
  { name: 'Judgement of Wisdom', varName: 'judgementOfWisdom', group: AuraGroupKey.Buffs, iconName: 'spell_holy_righteousnessaura', id: 20354 },
  { name: 'Mana Spring Totem', varName: 'manaSpringTotem', group: AuraGroupKey.Buffs, iconName: 'spell_nature_manaregentotem', id: 25570, stats: { mp5: 50, } },
  { name: 'Wrath of Air Totem', varName: 'wrathOfAirTotem', group: AuraGroupKey.Buffs, iconName: 'spell_nature_slowingtotem', id: 3738, stats: { spellPower: 101, } },
  { name: 'Totem of Wrath', varName: 'totemOfWrath', group: AuraGroupKey.Buffs, iconName: 'spell_fire_totemofwrath', id: 30706 },
  { name: 'Mark of the Wild', varName: 'markOfTheWild', group: AuraGroupKey.Buffs, iconName: 'spell_nature_regeneration', id: 26990, stats: { stamina: 14, intellect: 14, arcaneResist: 25, shadowResist: 25, frostResist: 25, fireResist: 25, natureResist: 25, } },
  { name: 'Arcane Intellect', varName: 'arcaneIntellect', group: AuraGroupKey.Buffs, iconName: 'spell_holy_arcaneintellect', id: 27127, stats: { intellect: 40, } },
  { name: 'Prayer of Fortitude', varName: 'prayerOfFortitude', group: AuraGroupKey.Buffs, iconName: 'spell_holy_prayeroffortitude', id: 25392, stats: { stamina: 79, } },
  { name: 'Prayer of Spirit', varName: 'prayerOfSpirit', group: AuraGroupKey.Buffs, iconName: 'spell_holy_prayerofspirit', id: 32999, stats: { spirit: 50, } },
  { name: 'Blood Pact', varName: 'bloodPact', group: AuraGroupKey.Buffs, iconName: 'spell_shadow_bloodboil', id: 27268, stats: { stamina: 70, } },
  { name: 'Inspiring Presence', varName: 'inspiringPresence', group: AuraGroupKey.Buffs, iconName: 'inv_staff_23', id: 28878 },
  { name: 'Moonkin Aura', varName: 'moonkinAura', group: AuraGroupKey.Buffs, iconName: 'spell_nature_moonglow', id: 24907 },
  { name: 'Power Infusion', varName: 'powerInfusion', group: AuraGroupKey.Buffs, iconName: 'spell_holy_powerinfusion', id: 10060 },
  { name: 'Power of the Guardian', varName: 'powerOfTheGuardianWarlock', group: AuraGroupKey.Buffs, iconName: 'spell_nature_moonglow', id: 28143 },
  { name: 'Power of the Guardian', varName: 'powerOfTheGuardianMage', group: AuraGroupKey.Buffs, iconName: 'spell_nature_moonglow', id: 28142 },
  { name: 'Eye of The Night', varName: 'eyeOfTheNight', group: AuraGroupKey.Buffs, iconName: 'inv_jewelry_necklace_28', id: 31033, stats: { spellPower: 34, } },
  { name: 'Chain of the Twilight Owl', varName: 'chainOfTheTwilightOwl', group: AuraGroupKey.Buffs, iconName: 'inv_jewelry_necklace_ahnqiraj_02', id: 31035 },
  { name: 'Jade Pendant of Blasting', varName: 'jadePendantOfBlasting', group: AuraGroupKey.Buffs, iconName: 'inv_jewelry_necklace_01', id: 25607, stats: { spellPower: 15, } },
  { name: 'Idol of the Raven Goddess', varName: 'idolOfTheRavenGoddess', group: AuraGroupKey.Buffs, iconName: 'inv-mount_raven_54', id: 39926, stats: { critRating: 20, } },
  { name: 'Drums of Battle', varName: 'drumsOfBattle', group: AuraGroupKey.Buffs, iconName: 'inv_misc_drum_02', drums: true, id: 35476 },
  { name: 'Drums of War', varName: 'drumsOfWar', group: AuraGroupKey.Buffs, iconName: 'inv_misc_drum_03', drums: true, id: 35475 },
  { name: 'Drums of Restoration', varName: 'drumsOfRestoration', group: AuraGroupKey.Buffs, iconName: 'inv_misc_drum_07', drums: true, id: 35478 },
  { name: 'Bloodlust', varName: 'bloodlust', group: AuraGroupKey.Buffs, iconName: 'spell_nature_bloodlust', id: 2825 },
  { name: 'Ferocious Inspiration', varName: 'ferociousInspiration', group: AuraGroupKey.Buffs, iconName: 'ability_hunter_ferociousinspiration', id: 34460 },
  { name: 'Innervate', varName: 'innervate', group: AuraGroupKey.Buffs, iconName: 'spell_nature_lightning', id: 29166 },

  // Debuffs
  { name: 'Curse of the Elements', varName: 'curseOfTheElements', group: AuraGroupKey.Debuffs, iconName: 'spell_shadow_chilltouch', id: 27228, stats: { spellPenetration: 88, } },
  { name: 'Shadow Weaving', varName: 'shadowWeaving', group: AuraGroupKey.Debuffs, iconName: 'spell_shadow_blackplague', id: 15334, stats: { shadowModifier: 1.1, } },
  { name: 'Improved Scorch', varName: 'improvedScorch', group: AuraGroupKey.Debuffs, iconName: 'spell_fire_soulburn', id: 12873, stats: { fireModifier: 1.15, } },
  { name: 'Misery', varName: 'misery', group: AuraGroupKey.Debuffs, iconName: 'Spell_shadow_misery', id: 33195, stats: { shadowModifier: 1.05, fireModifier: 1.05, arcaneModifier: 1.05, frostModifier: 1.05, natureModifier: 1.05, } },
  { name: 'Judgement of the Crusader', varName: 'judgementOfTheCrusader', group: AuraGroupKey.Debuffs, iconName: 'spell_holy_holysmite', id: 20337 },
  { name: 'Vampiric Touch', varName: 'vampiricTouch', group: AuraGroupKey.Debuffs, iconName: 'spell_holy_stoicism', id: 34914 },
  { name: 'Faerie Fire', varName: 'faerieFire', group: AuraGroupKey.Debuffs, iconName: 'spell_nature_faeriefire', forPet: true, id: 26993 },
  { name: 'Sunder Armor', varName: 'sunderArmor', group: AuraGroupKey.Debuffs, iconName: 'ability_warrior_sunder', forPet: true, id: 25225 },
  { name: 'Expose Armor', varName: 'exposeArmor', group: AuraGroupKey.Debuffs, iconName: 'ability_warrior_riposte', forPet: true, id: 26866 },
  { name: 'Curse of Recklessness', varName: 'curseOfRecklessness', group: AuraGroupKey.Debuffs, iconName: 'spell_shadow_unholystrength', forPet: true, id: 27226 },
  { name: 'Blood Frenzy', varName: 'bloodFrenzy', group: AuraGroupKey.Debuffs, iconName: 'ability_warrior_bloodfrenzy', forPet: true, id: 29859 },
  { name: 'Expose Weakness', varName: 'exposeWeakness', group: AuraGroupKey.Debuffs, iconName: 'ability_rogue_findweakness', forPet: true, id: 34503 },
  { name: 'Annihilator', varName: 'annihilator', group: AuraGroupKey.Debuffs, iconName: 'inv_axe_12', forPet: true, id: 16928 },
  { name: "Improved Hunter's Mark", varName: 'improvedHuntersMark', group: AuraGroupKey.Debuffs, iconName: 'ability_hunter_snipershot', forPet: true, id: 19425 },

  // Consumables
  { name: 'Flask of Pure Death', varName: 'flaskOfPureDeath', group: AuraGroupKey.Consumables, iconName: 'inv_potion_115', id: 22866, battleElixir: true, guardianElixir: true, stats: { shadowPower: 80, firePower: 80, frostPower: 80, } },
  { name: 'Elixir of Major Shadow Power', varName: 'elixirOfMajorShadowPower', group: AuraGroupKey.Consumables, iconName: 'inv_potion_145', id: 22835, battleElixir: true, stats: { shadowPower: 55, } },
  { name: 'Elixir of Major Firepower', varName: 'elixirOfMajorFirepower', group: AuraGroupKey.Consumables, iconName: 'inv_potion_146', id: 22833, battleElixir: true, stats: { firePower: 55, } },
  { name: 'Greater Arcane Elixir', varName: 'greaterArcaneElixir', group: AuraGroupKey.Consumables, iconName: 'inv_potion_25', id: 13454, battleElixir: true, stats: { spellPower: 35, } },
  { name: "Adept's Elixir", varName: 'adeptsElixir', group: AuraGroupKey.Consumables, iconName: 'inv_potion_96', id: 28103, battleElixir: true, stats: { spellPower: 24, critRating: 24, } },
  { name: 'Elixir of Draenic Wisdom', varName: 'elixirOfDraenicWisdom', group: AuraGroupKey.Consumables, iconName: 'inv_potion_155', id: 32067, guardianElixir: true, stats: { intellect: 30, spirit: 30, } },
  { name: 'Elixir of Major Mageblood', varName: 'elixirOfMajorMageblood', group: AuraGroupKey.Consumables, iconName: 'inv_potion_151', id: 22840, guardianElixir: true, stats: { mp5: 16, } },
  { name: 'Super Mana Potion', varName: 'superManaPotion', group: AuraGroupKey.Consumables, iconName: 'inv_potion_137', id: 22832, potion: true },
  { name: 'Destruction Potion', varName: 'destructionPotion', group: AuraGroupKey.Consumables, iconName: 'inv_potion_107', id: 22839, potion: true },
  { name: 'Brilliant Wizard Oil', varName: 'brilliantWizardOil', group: AuraGroupKey.Consumables, iconName: 'inv_potion_105', id: 20749, weaponOil: true, stats: { spellPower: 36, critRating: 14, } },
  { name: 'Superior Wizard Oil', varName: 'superiorWizardOil', group: AuraGroupKey.Consumables, iconName: 'inv_potion_141', id: 22522, weaponOil: true, stats: { spellPower: 42, } },
  { name: 'Blessed Wizard Oil', varName: 'blessedWizardOil', group: AuraGroupKey.Consumables, iconName: 'inv_potion_26', id: 23123, weaponOil: true, stats: { spellPower: 60, } },
  { name: 'Demonic Rune', varName: 'demonicRune', group: AuraGroupKey.Consumables, iconName: 'inv_misc_rune_04', id: 12662, demonicRune: true },
  { name: 'Flame Cap', varName: 'flameCap', group: AuraGroupKey.Consumables, iconName: 'inv_misc_herb_flamecap', id: 22788, demonicRune: true },
  { name: 'Rumsey Rum Black Label', varName: 'rumseyRumBlackLabel', group: AuraGroupKey.Consumables, iconName: 'inv_drink_04', id: 21151, alcohol: true, stats: { stamina: 15, } },
  { name: "Kreeg's Stout Beatdown", varName: 'kreegsStoutBeatdown', group: AuraGroupKey.Consumables, iconName: 'inv_drink_05', id: 18284, alcohol: true, stats: { spirit: 25, intellect: -5, } },
  { name: 'Blackened Basilisk', varName: 'blackenedBasilisk', group: AuraGroupKey.Consumables, iconName: 'inv_misc_food_86_basilisk', id: 27657, foodBuff: true, stats: { spellPower: 23, spirit: 20, } },
  { name: 'Skullfish Soup', varName: 'skullfishSoup', group: AuraGroupKey.Consumables, iconName: 'inv_misc_food_63', id: 33825, foodBuff: true, stats: { critRating: 20, spirit: 20, } },
  { name: 'Very Berry Cream', varName: 'veryBerryCream', group: AuraGroupKey.Consumables, iconName: 'inv_valentineschocolate02', id: 22238, stats: { spellPower: 23, } },
  { name: 'Midsummer Sausage', varName: 'midsummerSausage', group: AuraGroupKey.Consumables, iconName: 'inv_misc_food_53', id: 23326, stats: { spellPower: 23, } },
  { name: "Bloodthistle", varName: 'bloodthistle', group: AuraGroupKey.Consumables, iconName: "inv_misc_herb_11", id: 22710, stats: { spellPower: 10, }, },

  // Pet Buffs
  { name: 'Blessing of Kings', varName: 'blessingOfKingsPet', group: AuraGroupKey.PetBuffs, iconName: 'spell_magic_greaterblessingofkings', id: 25898 },
  { name: 'Blessing of Wisdom', varName: 'blessingOfWisdomPet', group: AuraGroupKey.PetBuffs, iconName: 'spell_holy_greaterblessingofwisdom', id: 27143 },
  { name: 'Blessing of Might', varName: 'blessingOfMight', group: AuraGroupKey.PetBuffs, iconName: 'spell_holy_greaterblessingofkings', id: 27141 },
  { name: 'Arcane Intellect', varName: 'arcaneIntellectPet', group: AuraGroupKey.PetBuffs, iconName: 'spell_holy_arcaneintellect', id: 27127 },
  { name: 'Mark of the Wild', varName: 'markOfTheWildPet', group: AuraGroupKey.PetBuffs, iconName: 'spell_nature_regeneration', id: 26990 },
  { name: 'Prayer of Fortitude', varName: 'prayerOfFortitudePet', group: AuraGroupKey.PetBuffs, iconName: 'spell_holy_prayeroffortitude', id: 25392 },
  { name: 'Prayer of Spirit', varName: 'prayerOfSpiritPet', group: AuraGroupKey.PetBuffs, iconName: 'spell_holy_prayerofspirit', id: 32999 },
  { name: "Kibler's Bits", varName: 'kiblersBits', group: AuraGroupKey.PetBuffs, iconName: 'inv_misc_food_49', id: 43771 },
  { name: 'Heroic Presence', varName: 'heroicPresence', group: AuraGroupKey.PetBuffs, iconName: 'inv_helmet_21', id: 6562 },
  { name: 'Strength of Earth Totem', varName: 'strengthOfEarthTotem', group: AuraGroupKey.PetBuffs, iconName: 'spell_nature_earthbindtotem', id: 25528 },
  { name: 'Grace of Air Totem', varName: 'graceOfAirTotem', group: AuraGroupKey.PetBuffs, iconName: 'spell_nature_invisibilitytotem', id: 10627 },
  { name: 'Battle Shout', varName: 'battleShout', group: AuraGroupKey.PetBuffs, iconName: 'ability_warrior_battleshout', id: 2048 },
  { name: 'Trueshot Aura', varName: 'trueshotAura', group: AuraGroupKey.PetBuffs, iconName: 'ability_trueshot', id: 31519 },
  { name: 'Leader of the Pack', varName: 'leaderOfThePack', group: AuraGroupKey.PetBuffs, iconName: 'spell_nature_unyeildingstamina', id: 17007 },
  { name: 'Unleashed Rage', varName: 'unleashedRage', group: AuraGroupKey.PetBuffs, iconName: 'spell_nature_unleashedrage', id: 30811 },
  { name: 'Scroll of Stamina V', varName: 'scrollOfStaminaV', group: AuraGroupKey.PetBuffs, iconName: 'inv_scroll_07', id: 33081 },
  { name: 'Scroll of Intellect V', varName: 'scrollOfIntellectV', group: AuraGroupKey.PetBuffs, iconName: 'inv_scroll_01', id: 33078 },
  { name: 'Scroll of Strength V', varName: 'scrollOfStrengthV', group: AuraGroupKey.PetBuffs, iconName: 'inv_scroll_02', id: 33082 },
  { name: 'Scroll of Agility V', varName: 'scrollOfAgilityV', group: AuraGroupKey.PetBuffs, iconName: 'inv_scroll_02', id: 33077 },
  { name: 'Scroll of Spirit V', varName: 'scrollOfSpiritV', group: AuraGroupKey.PetBuffs, iconName: 'inv_scroll_01', id: 33080
  }
]