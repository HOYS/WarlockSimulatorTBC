const totalTalentPoints = 61
var talentPointsRemaining = totalTalentPoints
const _talents = {
  affliction: {
    convection: {
      name: 'Convection',
      rankIDs: [16039, 16109, 16110, 16111, 16112],
      iconName: 'spell_shadow_unsummonbuilding',
      row: 1,
      column: 2
    },
    concussion: {
      name: 'Concussion',
      rankIDs: [16035, 16105, 16106, 16107, 16108],
      iconName: 'spell_shadow_abominationexplosion',
      row: 1,
      column: 3
    },
    earthsgrasp: {
      name: 'Earth\'s Grasp',
      rankIDs: [16043, 16130],
      iconName: 'spell_shadow_curseofmannoroth',
      row: 2,
      column: 1
    },
    elementalWarding: {
      name: 'Elemental Warding',
      rankIDs: [28996, 28997, 28998],
      iconName: 'spell_shadow_haunting',
      row: 2,
      column: 2
    },
    callOfFlame: {
      name: 'Call of Flame',
      rankIDs: [16038, 16160, 16161],
      iconName: 'spell_shadow_burningspirit',
      row: 2,
      column: 3
    },
    elementalFocus: {
      name: 'Elemental Focus',
      rankIDs: [16164],
      iconName: 'spell_shadow_lifedrain02',
      row: 3,
      column: 1
    },
    reverberation: {
      name: 'Reverberation',
      rankIDs: [16040, 16113, 16114, 16115, 16116],
      iconName: 'spell_shadow_curseofsargeras',
      row: 3,
      column: 2
    },
    callOfThunder: {
      name: 'Call of Thunder',
      rankIDs: [16041, 16117, 16118, 16119, 16120],
      iconName: 'spell_shadow_fingerofdeath',
      row: 3,
      column: 3
    },
    improvedFireTotems: {
      name: 'Improved Fire Totems',
      rankIDs: [16086, 16544],
      iconName: 'spell_shadow_contagion',
      row: 4,
      column: 1
    },
    eyeOfTheStorm: {
      name: 'Eye of the Storm',
      rankIDs: [29062, 29064, 29065],
      iconName: 'spell_shadow_callofbone',
      row: 4,
      column: 2
    },
    elementalDevastation: {
      name: 'Elemental Devastation',
      rankIDs: [30160, 29179, 29180],
      iconName: 'spell_shadow_twilight',
      row: 4,
      column: 4
    },
    stormReach: {
      name: 'Storm Reach',
      rankIDs: [28999, 29000],
      iconName: 'spell_shadow_abominationexplosion',
      row: 5,
      column: 1
    },
    elementalFury: {
      name: 'Elemental Fury',
      rankIDs: [16089],
      iconName: 'spell_shadow_shadowembrace',
      row: 5,
      column: 2
    },
    unrelentingStorm: {
      name: 'Unrelenting Storm',
      rankIDs: [30664, 30665, 30666, 30667, 30668],
      iconName: 'spell_shadow_requiem',
      row: 5,
      column: 4
    },
    elementalPrecision: {
      name: 'Elemental Precision',
      rankIDs: [30672, 30673, 30674],
      iconName: 'spell_shadow_grimward',
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
      iconName: 'spell_shadow_shadetruesight',
      row: 6,
      column: 3,
      requirement: {
        name: 'felConcentration',
        points: 5
      }
    },
    elementalMastery: {
      name: 'Elemental Mastery',
      rankIDs: [16166],
      iconName: 'Spell_shadow_painfulafflictions',
      row: 7,
      column: 2,
      requirement: {
        name: 'shadowEmbrace',
        points: 1
      }
    },
    elementalShields: {
      name: 'Elemental Shields',
      rankIDs: [30669, 30670, 30671],
      iconName: 'spell_shadow_darkritual',
      row: 7,
      column: 3
    },
    lightningOverload: {
      name: 'Lightning Overload',
      rankIDs: [30675, 30678, 30679, 30680, 30681],
      iconName: 'spell_shadow_deathscream',
      row: 8,
      column: 2
    },
    totemOfWrath: {
      name: 'Totem of Wrath',
      rankIDs: [30706],
      iconName: 'spell_shadow_unstableaffliction_3',
      row: 9,
      column: 2,
      requirement: {
        name: 'improvedHowlOfTerror',
        points: 5
      }
    }
  },
  demonology: {
    ancestralKnowledge: {
      name: 'Ancestral Knowledge',
      rankIDs: [17485, 17486, 17487, 17488, 17489],
      iconName: 'inv_stone_04',
      row: 1,
      column: 2
    },
    shieldSpecialization: {
      name: 'Shield Specialization',
      rankIDs: [16253, 16298],
      iconName: 'spell_shadow_summonimp',
      row: 1,
      column: 3
    },
    demonicEmbrace: {
      name: 'Enhancing Totems',
      rankIDs: [16259, 16295],
      iconName: 'spell_shadow_metamorphosis',
      row: 2,
      column: 1
    },
    thunderingStrikes: {
      name: 'Thundering Strikes',
      rankIDs: [16255, 16302, 16303, 16304, 16305],
      iconName: 'spell_shadow_lifedrain',
      row: 2,
      column: 2
    },
    improvedGhostWolf: {
      name: 'Improved Ghost Wolf',
      rankIDs: [16262, 16287],
      iconName: 'spell_shadow_summonvoidwalker',
      row: 2,
      column: 3
    },
    felIntellect: {
      name: 'Improved Lightning Shield',
      rankIDs: [16261, 16290],
      iconName: 'spell_holy_magicalsentry',
      row: 2,
      column: 4
    },
    improvedSuccubus: {
      name: 'Enhancing Totems',
      rankIDs: [16259, 16295],
      iconName: 'spell_shadow_summonsuccubus',
      row: 3,
      column: 1
    },
    shamanisticFocus: {
      name: 'Shamanistic Focus',
      rankIDs: [43338],
      iconName: 'spell_nature_removecurse',
      row: 3,
      column: 3
    },
    felStamina: {
      name: 'Anticipation',
      rankIDs: [16254, 16271, 16272, 16273, 16274],
      iconName: 'spell_shadow_antishadow',
      row: 3,
      column: 4
    },
    demonicAegis: {
      name: 'Flurry',
      rankIDs: [16256, 16281, 16282, 16283, 16284],
      iconName: 'spell_shadow_ragingscream',
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
      iconName: 'spell_shadow_impphaseshift',
      row: 4,
      column: 3
    },
    unholyPower: {
      name: 'Improved Weapon Totems',
      rankIDs: [29192, 29193],
      iconName: 'spell_shadow_shadowworddominate',
      row: 5,
      column: 1
    },
    spiritWeapons: {
      name: 'Spirit Weapons',
      rankIDs: [16268],
      iconName: 'spell_shadow_enslavedemon',
      row: 5,
      column: 2
    },
    demonicSacrifice: {
      name: 'Elemental Weapons',
      rankIDs: [16266, 29079, 29080],
      iconName: 'spell_shadow_psychicscream',
      row: 5,
      column: 3
    },
    mentalQuickness: {
      name: 'Mental Quickness',
      rankIDs: [30812, 30813, 30814],
      iconName: 'inv_ammo_firetar',
      row: 6,
      column: 1
    },
    manaFeed: {
      name: 'Weapon Mastery',
      rankIDs: [29082, 29084, 29086, 29087, 29088],
      iconName: 'spell_shadow_manafeed',
      row: 6,
      column: 4
    },
    masterDemonologist: {
      name: 'Dual Wield Specialization',
      rankIDs: [30816, 30818, 30819],
      iconName: 'spell_shadow_shadowpact',
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
      iconName: 'spell_shadow_demonicfortitude',
      row: 7,
      column: 2
    },
    soulLink: {
      name: 'Stormstrike',
      rankIDs: [17364],
      iconName: 'spell_shadow_gathershadows',
      row: 7,
      column: 3,
      requirement: {
        name: 'demonicSacrifice',
        points: 3
      }
    },
    demonicKnowledge: {
      name: 'Unleashed Rage',
      rankIDs: [30802, 30808, 30809, 30810, 30811],
      iconName: 'Spell_shadow_improvedvampiricembrace',
      row: 8,
      column: 2
    },
    demonicTactics: {
      name: 'Shamanistic Rage',
      rankIDs: [30823],
      iconName: 'Spell_shadow_demonictactics',
      row: 9,
      column: 2
    }
  },
  destruction: {
    improvedShadowBolt: {
      name: 'Improved Healing Wave',
      rankIDs: [16182, 16226, 16227, 16228, 16229],
      iconName: 'spell_shadow_shadowbolt',
      row: 1,
      column: 2
    },
    cataclysm: {
      name: 'Tidal Focus',
      rankIDs: [16179, 16214, 16215, 16216, 16217],
      iconName: 'spell_fire_windsofwoe',
      row: 1,
      column: 3
    },
    bane: {
      name: 'Improved Reincarnation',
      rankIDs: [16184, 16209],
      iconName: 'spell_shadow_deathpact',
      row: 2,
      column: 1
    },
    ancestralHealing: {
      name: 'Ancestral Healing',
      rankIDs: [16176, 16235, 16240],
      iconName: 'spell_fire_fire',
      row: 2,
      column: 2
    },
    totemicFocus: {
      name: 'Totemic Focus',
      rankIDs: [16173, 16222, 16223, 16224, 16225],
      iconName: 'spell_fire_firebolt',
      row: 2,
      column: 3
    },
    naturesGuidance: {
      name: 'Nature\'s Guidance',
      rankIDs: [16180, 16196, 16198],
      iconName: 'spell_shadow_curse',
      row: 3,
      column: 1
    },
    devastation: {
      name: 'Healing Focus',
      rankIDs: [16181, 16230, 16232, 16233, 16234],
      iconName: 'spell_fire_flameshock',
      row: 3,
      column: 2
    },
    totemicMastery: {
      name: 'Totemic Mastery',
      rankIDs: [16189],
      iconName: 'spell_shadow_scourgebuild',
      row: 3,
      column: 3
    },
    healingGrace: {
      name: 'Healing Grace',
      rankIDs: [29187, 29189, 29191],
      iconName: 'spell_fire_lavaspawn',
      row: 3,
      column: 4
    },
    restorativeTotems: {
      name: 'Restorative Totems',
      rankIDs: [16187, 16205, 16206, 16207, 16208],
      iconName: 'spell_shadow_corpseexplode',
      row: 4,
      column: 2
    },
    tidalMastery: {
      name: 'Tidal Mastery',
      rankIDs: [16194, 16218, 16219, 16220, 16221],
      iconName: 'spell_fire_soulburn',
      row: 4,
      column: 3
    },
    healingWay: {
      name: 'Healing Way',
      rankIDs: [29206, 29205, 29202],
      iconName: 'spell_fire_volcano',
      row: 5,
      column: 1
    },
    naturesSwiftness: {
      name: 'Nature\'s Swiftness',
      rankIDs: [16188],
      iconName: 'spell_fire_immolation',
      row: 5,
      column: 3
    },
    focusedMind: {
      name: 'Focused Mind',
      rankIDs: [30864,30865, 30866],
      iconName: 'spell_shadow_shadowwordpain',
      row: 5,
      column: 3
    },
    purification: {
      name: 'Purification',
      rankIDs: [16178, 16210, 16211, 16212, 16213],
      iconName: 'spell_shadow_netherprotection',
      row: 6,
      column: 3
    },
    emberstorm: {
      name: 'Mana Tide Totem',
      rankIDs: [16190],
      iconName: 'spell_fire_selfdestruct',
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
      iconName: 'spell_fire_playingwithfire',
      row: 7,
      column: 3
    },
    naturesBlessing: {
      name: 'Nature\'s Blessing',
      rankIDs: [30867, 30868, 30869],
      iconName: 'spell_fire_fireball',
      row: 8,
      column: 2
    },
    improvedChainHeal: {
      name: 'Improved Chain Heal',
      rankIDs: [30872, 30873],
      iconName: 'spell_shadow_soulleech_3',
      row: 8,
      column: 3
    },
    shadowfury: {
      name: 'Earth Shield',
      rankIDs: [974],
      iconName: 'spell_shadow_shadowfury',
      row: 9,
      column: 2,
      requirement: {
        name: 'naturesBlessing',
        points: 3
      }
    }
  }
}
