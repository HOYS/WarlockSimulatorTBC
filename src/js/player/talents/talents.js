const totalTalentPoints = 61
var talentPointsRemaining = totalTalentPoints
const _talents = {
  elemental: {
    convection: {
      name: 'Convection',
      rankIDs: [16039, 16109, 16110, 16111, 16112],
      iconName: 'spell_nature_wispsplode',
      row: 1,
      column: 2
    },
    concussion: {
      name: 'Concussion',
      rankIDs: [16035, 16105, 16106, 16107, 16108],
      iconName: 'spell_fire_fireball',
      row: 1,
      column: 3
    },
    earthsgrasp: {
      name: 'Earth\'s Grasp',
      rankIDs: [16043, 16130],
      iconName: 'spell_nature_stoneclawtotem',
      row: 2,
      column: 1
    },
    elementalWarding: {
      name: 'Elemental Warding',
      rankIDs: [28996, 28997, 28998],
      iconName: 'spell_nature_spiritarmor',
      row: 2,
      column: 2
    },
    callOfFlame: {
      name: 'Call of Flame',
      rankIDs: [16038, 16160, 16161],
      iconName: 'spell_fire_immolation',
      row: 2,
      column: 3
    },
    elementalFocus: {
      name: 'Elemental Focus',
      rankIDs: [16164],
      iconName: 'spell_shadow_manaburn',
      row: 3,
      column: 1
    },
    reverberation: {
      name: 'Reverberation',
      rankIDs: [16040, 16113, 16114, 16115, 16116],
      iconName: 'spell_frost_frostward',
      row: 3,
      column: 2
    },
    callOfThunder: {
      name: 'Call of Thunder',
      rankIDs: [16041, 16117, 16118, 16119, 16120],
      iconName: 'spell_nature_callstorm',
      row: 3,
      column: 3
    },
    improvedFireTotems: {
      name: 'Improved Fire Totems',
      rankIDs: [16086, 16544],
      iconName: 'spell_fire_sealoffire',
      row: 4,
      column: 1
    },
    eyeOfTheStorm: {
      name: 'Eye of the Storm',
      rankIDs: [29062, 29064, 29065],
      iconName: 'spell_shadow_soulleech_2',
      row: 4,
      column: 2
    },
    elementalDevastation: {
      name: 'Elemental Devastation',
      rankIDs: [30160, 29179, 29180],
      iconName: 'classic_spell_fire_elementaldevastation',
      row: 4,
      column: 4
    },
    stormReach: {
      name: 'Storm Reach',
      rankIDs: [28999, 29000],
      iconName: 'spell_nature_stormreach',
      row: 5,
      column: 1
    },
    elementalFury: {
      name: 'Elemental Fury',
      rankIDs: [16089],
      iconName: 'spell_fire_volcano',
      row: 5,
      column: 2
    },
    unrelentingStorm: {
      name: 'Unrelenting Storm',
      rankIDs: [30664, 30665, 30666, 30667, 30668],
      iconName: 'spell_nature_unrelentingstorm',
      row: 5,
      column: 4
    },
    elementalPrecision: {
      name: 'Elemental Precision',
      rankIDs: [30672, 30673, 30674],
      iconName: 'spell_nature_elementalprecision_1',
      row: 6,
      column: 1,
      requirement: {
        name: 'improvedFireTotems',
        points: 1
      }
    },
    lightningMastery: {
      name: 'Lightning Mastery',
      rankIDs: [16578, 16579, 16580, 16581, 16582],
      iconName: 'spell_lightning_lightningbolt01',
      row: 6,
      column: 3,
      requirement: {
        name: 'callOfThunder',
        points: 5
      }
    },
    elementalMastery: {
      name: 'Elemental Mastery',
      rankIDs: [16166],
      iconName: 'spell_nature_wispheal',
      row: 7,
      column: 2,
      requirement: {
        name: 'elementalFury',
        points: 1
      }
    },
    elementalShields: {
      name: 'Elemental Shields',
      rankIDs: [30669, 30670, 30671],
      iconName: 'spell_nature_elementalshields',
      row: 7,
      column: 3
    },
    lightningOverload: {
      name: 'Lightning Overload',
      rankIDs: [30675, 30678, 30679, 30680, 30681],
      iconName: 'spell_nature_lightningoverload',
      row: 8,
      column: 2
    },
    totemOfWrath: {
      name: 'Totem of Wrath',
      rankIDs: [30706],
      iconName: 'spell_fire_totemofwrath',
      row: 9,
      column: 2,
      requirement: {
        name: 'lightningOverload',
        points: 5
      }
    }
  },
  enhancement: {
    ancestralKnowledge: {
      name: 'Ancestral Knowledge',
      rankIDs: [17485, 17486, 17487, 17488, 17489],
      iconName: 'spell_shadow_grimward',
      row: 1,
      column: 2
    },
    shieldSpecialization: {
      name: 'Shield Specialization',
      rankIDs: [16253, 16298],
      iconName: 'inv_shield_06',
      row: 1,
      column: 3
    },
    guardianTotems: {
      name: 'Guardian Totems',
      rankIDs: [16258, 16293],
      iconName: 'spell_nature_stoneskintotem',
      row: 2,
      column: 1
    },
    thunderingStrikes: {
      name: 'Thundering Strikes',
      rankIDs: [16255, 16302, 16303, 16304, 16305],
      iconName: 'ability_thunderbolt',
      row: 2,
      column: 2
    },
    improvedGhostWolf: {
      name: 'Improved Ghost Wolf',
      rankIDs: [16262, 16287],
      iconName: 'spell_nature_spiritwolf',
      row: 2,
      column: 3
    },
    improvedLightningShield: {
      name: 'Improved Lightning Shield',
      rankIDs: [16261, 16290],
      iconName: 'spell_nature_lightningshield',
      row: 2,
      column: 4
    },
    enhancingTotems: {
      name: 'Enhancing Totems',
      rankIDs: [16259, 16295],
      iconName: 'spell_nature_earthbindtotem',
      row: 3,
      column: 1
    },
    shamanisticFocus: {
      name: 'Shamanistic Focus',
      rankIDs: [43338],
      iconName: 'spell_nature_elementalabsorption',
      row: 3,
      column: 3
    },
    anticipation: {
      name: 'Anticipation',
      rankIDs: [16254, 16271, 16272, 16273, 16274],
      iconName: 'spell_nature_mirrorimage',
      row: 3,
      column: 4
    },
    flurry: {
      name: 'Flurry',
      rankIDs: [16256, 16281, 16282, 16283, 16284],
      iconName: 'ability_ghoulfrenzy',
      row: 4,
      column: 2,
      requirement: {
        name: 'thunderingStrikes',
        points: 5
      }
    },
    toughness: {
      name: 'Toughness',
      rankIDs: [16252, 16306, 16307, 16308, 16309],
      iconName: 'spell_holy_devotion',
      row: 4,
      column: 3
    },
    improvedWeaponTotems: {
      name: 'Improved Weapon Totems',
      rankIDs: [29192, 29193],
      iconName: 'spell_fire_enchantweapon',
      row: 5,
      column: 1
    },
    spiritWeapons: {
      name: 'Spirit Weapons',
      rankIDs: [16268],
      iconName: 'ability_parry',
      row: 5,
      column: 2
    },
    elementalWeapons: {
      name: 'Elemental Weapons',
      rankIDs: [16266, 29079, 29080],
      iconName: 'spell_fire_flametounge',
      row: 5,
      column: 3
    },
    mentalQuickness: {
      name: 'Mental Quickness',
      rankIDs: [30812, 30813, 30814],
      iconName: 'spell_nature_mentalquickness',
      row: 6,
      column: 1
    },
    weaponMastery: {
      name: 'Weapon Mastery',
      rankIDs: [29082, 29084, 29086, 29087, 29088],
      iconName: 'ability_hunter_swiftstrike',
      row: 6,
      column: 4
    },
    dualWieldSpecialization: {
      name: 'Dual Wield Specialization',
      rankIDs: [30816, 30818, 30819],
      iconName: 'ability_dualwieldspecialization',
      row: 7,
      column: 1,
      requirement: {
        name: 'dualWield',
        points: 1
      }
    },
    dualWield: {
      name: 'Dual Wield',
      rankIDs: [30798],
      iconName: 'ability_dualwield',
      row: 7,
      column: 2
    },
    stormStrike: {
      name: 'Stormstrike',
      rankIDs: [17364],
      iconName: 'ability_shaman_stormstrike',
      row: 7,
      column: 3,
      requirement: {
        name: 'elementalWeapons',
        points: 3
      }
    },
    unleashedRage: {
      name: 'Unleashed Rage',
      rankIDs: [30802, 30808, 30809, 30810, 30811],
      iconName: 'spell_nature_unleashedrage',
      row: 8,
      column: 2
    },
    shamanisticRage: {
      name: 'Shamanistic Rage',
      rankIDs: [30823],
      iconName: 'spell_nature_shamanrage',
      row: 9,
      column: 2
    }
  },
  restoration: {
    improvedHealingWave: {
      name: 'Improved Healing Wave',
      rankIDs: [16182, 16226, 16227, 16228, 16229],
      iconName: 'spell_nature_magicimmunity',
      row: 1,
      column: 2
    },
    tidalFocus: {
      name: 'Tidal Focus',
      rankIDs: [16179, 16214, 16215, 16216, 16217],
      iconName: 'spell_frost_manarecharge',
      row: 1,
      column: 3
    },
    improvedReincarnation: {
      name: 'Improved Reincarnation',
      rankIDs: [16184, 16209],
      iconName: 'spell_nature_reincarnation',
      row: 2,
      column: 1
    },
    ancestralHealing: {
      name: 'Ancestral Healing',
      rankIDs: [16176, 16235, 16240],
      iconName: 'spell_nature_undyingstrength',
      row: 2,
      column: 2
    },
    totemicFocus: {
      name: 'Totemic Focus',
      rankIDs: [16173, 16222, 16223, 16224, 16225],
      iconName: 'spell_nature_moonglow',
      row: 2,
      column: 3
    },
    naturesGuidance: {
      name: 'Nature\'s Guidance',
      rankIDs: [16180, 16196, 16198],
      iconName: 'spell_frost_stun',
      row: 3,
      column: 1
    },
    healingFocus: {
      name: 'Healing Focus',
      rankIDs: [16181, 16230, 16232, 16233, 16234],
      iconName: 'spell_nature_healingwavelesser',
      row: 3,
      column: 2
    },
    totemicMastery: {
      name: 'Totemic Mastery',
      rankIDs: [16189],
      iconName: 'spell_nature_nullward',
      row: 3,
      column: 3
    },
    healingGrace: {
      name: 'Healing Grace',
      rankIDs: [29187, 29189, 29191],
      iconName: 'spell_nature_healingtouch',
      row: 3,
      column: 4
    },
    restorativeTotems: {
      name: 'Restorative Totems',
      rankIDs: [16187, 16205, 16206, 16207, 16208],
      iconName: 'spell_nature_manaregentotem',
      row: 4,
      column: 2
    },
    tidalMastery: {
      name: 'Tidal Mastery',
      rankIDs: [16194, 16218, 16219, 16220, 16221],
      iconName: 'spell_nature_tranquility',
      row: 4,
      column: 3
    },
    healingWay: {
      name: 'Healing Way',
      rankIDs: [29206, 29205, 29202],
      iconName: 'classic_spell_nature_healingway',
      row: 5,
      column: 1
    },
    naturesSwiftness: {
      name: 'Nature\'s Swiftness',
      rankIDs: [16188],
      iconName: 'spell_nature_ravenform',
      row: 5,
      column: 3
    },
    focusedMind: {
      name: 'Focused Mind',
      rankIDs: [30864,30865, 30866],
      iconName: 'spell_nature_focusedmind',
      row: 5,
      column: 3
    },
    purification: {
      name: 'Purification',
      rankIDs: [16178, 16210, 16211, 16212, 16213],
      iconName: 'spell_frost_wizardmark',
      row: 6,
      column: 3
    },
    manaTideTotem: {
      name: 'Mana Tide Totem',
      rankIDs: [16190],
      iconName: 'spell_frost_summonwaterelemental',
      row: 7,
      column: 2,
      requirement: {
        name: 'restorativeTotems',
        points: 5
      }
    },
    naturesGuardian: {
      name: 'Nature\'s Guardian',
      rankIDs: [30881, 30883, 30884, 30885, 30886],
      iconName: 'spell_nature_natureguardian',
      row: 7,
      column: 3
    },
    naturesBlessing: {
      name: 'Nature\'s Blessing',
      rankIDs: [30867, 30868, 30869],
      iconName: 'spell_nature_natureblessing',
      row: 8,
      column: 2
    },
    improvedChainHeal: {
      name: 'Improved Chain Heal',
      rankIDs: [30872, 30873],
      iconName: 'spell_nature_healingwavegreater',
      row: 8,
      column: 3
    },
    earthShield: {
      name: 'Earth Shield',
      rankIDs: [974],
      iconName: 'spell_nature_skinofearth',
      row: 9,
      column: 2,
      requirement: {
        name: 'naturesBlessing',
        points: 3
      }
    }
  }
}
