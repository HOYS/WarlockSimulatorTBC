const totalTalentPoints = 61
var talentPointsRemaining = totalTalentPoints
const _talents = {
  affliction: {
    suppression: {
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
    improvedCurseOfWeakness: {
      name: 'Earth\'s Grasp',
      rankIDs: [16043, 16130],
      iconName: 'spell_shadow_curseofmannoroth',
      row: 2,
      column: 1
    },
    improvedDrainSoul: {
      name: 'Elemental Warding',
      rankIDs: [28996, 28997, 28998],
      iconName: 'spell_shadow_haunting',
      row: 2,
      column: 2
    },
    improvedLifeTap: {
      name: 'Call of Flame',
      rankIDs: [16038, 16160, 16161],
      iconName: 'spell_shadow_burningspirit',
      row: 2,
      column: 3
    },
    soulSiphon: {
      name: 'Elemental Focus',
      rankIDs: [16164],
      iconName: 'spell_shadow_lifedrain02',
      row: 3,
      column: 1
    },
    improvedCurseOfAgony: {
      name: 'Reverberation',
      rankIDs: [16040, 16113, 16114, 16115, 16116],
      iconName: 'spell_shadow_curseofsargeras',
      row: 3,
      column: 2
    },
    felConcentration: {
      name: 'Call of Thunder',
      rankIDs: [16041, 16117, 16118, 16119, 16120],
      iconName: 'spell_shadow_fingerofdeath',
      row: 3,
      column: 3
    },
    amplifyCurse: {
      name: 'Improved Fire Totems',
      rankIDs: [16086, 16544],
      iconName: 'spell_shadow_contagion',
      row: 4,
      column: 1
    },
    grimReach: {
      name: 'Eye of the Storm',
      rankIDs: [29062, 29064, 29065],
      iconName: 'spell_shadow_callofbone',
      row: 4,
      column: 2
    },
    nightfall: {
      name: 'Elemental Devastation',
      rankIDs: [30160, 29179, 29180],
      iconName: 'spell_shadow_twilight',
      row: 4,
      column: 4
    },
    empoweredCorruption: {
      name: 'Storm Reach',
      rankIDs: [28999, 29000],
      iconName: 'spell_shadow_abominationexplosion',
      row: 5,
      column: 1
    },
    shadowEmbrace: {
      name: 'Elemental Fury',
      rankIDs: [16089],
      iconName: 'spell_shadow_shadowembrace',
      row: 5,
      column: 2
    },
    siphonLife: {
      name: 'Unrelenting Storm',
      rankIDs: [30664, 30665, 30666, 30667, 30668],
      iconName: 'spell_shadow_requiem',
      row: 5,
      column: 4
    },
    curseOfExhaustion: {
      name: 'Elemental Precision',
      rankIDs: [30672, 30673, 30674],
      iconName: 'spell_shadow_grimward',
      row: 6,
      column: 1,
      requirement: {
        name: 'amplifyCurse',
        points: 1
      }
    },
    shadowMastery: {
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
    contagion: {
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
    darkPact: {
      name: 'Elemental Shields',
      rankIDs: [30669, 30670, 30671],
      iconName: 'spell_shadow_darkritual',
      row: 7,
      column: 3
    },
    improvedHowlOfTerror: {
      name: 'Lightning Overload',
      rankIDs: [30675, 30678, 30679, 30680, 30681],
      iconName: 'spell_shadow_deathscream',
      row: 8,
      column: 2
    },
    unstableAffliction: {
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
    improvedHealthstone: {
      name: 'Improved Healthstone',
      rankIDs: [18692, 18693],
      iconName: 'inv_stone_04',
      row: 1,
      column: 1
    },
    improvedImp: {
      name: 'Improved Imp',
      rankIDs: [18694, 18695, 18696],
      iconName: 'spell_shadow_summonimp',
      row: 1,
      column: 2
    },
    demonicEmbrace: {
      name: 'Demonic Embrace',
      rankIDs: [18697, 18698, 18699, 18700, 18701],
      iconName: 'spell_shadow_metamorphosis',
      row: 1,
      column: 3
    },
    improvedHealthFunnel: {
      name: 'Improved Health Funnel',
      rankIDs: [18703, 18704],
      iconName: 'spell_shadow_lifedrain',
      row: 2,
      column: 1
    },
    improvedVoidwalker: {
      name: 'Improved Voidwalker',
      rankIDs: [18705, 18706, 18707],
      iconName: 'spell_shadow_summonvoidwalker',
      row: 2,
      column: 2
    },
    felIntellect: {
      name: 'Fel Intellect',
      rankIDs: [18731, 18743, 18744],
      iconName: 'spell_holy_magicalsentry',
      row: 2,
      column: 3
    },
    improvedSuccubus: {
      name: 'Improved Succubus',
      rankIDs: [18754, 18755, 18756],
      iconName: 'spell_shadow_summonsuccubus',
      row: 3,
      column: 1
    },
    felDomination: {
      name: 'Fel Domination',
      rankIDs: [18708],
      iconName: 'spell_nature_removecurse',
      row: 3,
      column: 2
    },
    felStamina: {
      name: 'Fel Stamina',
      rankIDs: [18748, 18749, 18750],
      iconName: 'spell_shadow_antishadow',
      row: 3,
      column: 3
    },
    demonicAegis: {
      name: 'Demonic Aegis',
      rankIDs: [30143, 30144, 30145],
      iconName: 'spell_shadow_ragingscream',
      row: 3,
      column: 4
    },
    masterSummoner: {
      name: 'Master Summoner',
      rankIDs: [18709, 18710],
      iconName: 'spell_shadow_impphaseshift',
      row: 4,
      column: 2,
      requirement: {
        name: 'felDomination',
        points: 1
      }
    },
    unholyPower: {
      name: 'Unholy Power',
      rankIDs: [18769, 18770, 18771, 18772, 18773],
      iconName: 'spell_shadow_shadowworddominate',
      row: 4,
      column: 3
    },
    improvedEnslaveDemon: {
      name: 'Improved Enslave Demon',
      rankIDs: [18821, 18822, 18823, 18824, 18825],
      iconName: 'spell_shadow_enslavedemon',
      row: 5,
      column: 1
    },
    demonicSacrifice: {
      name: 'Demonic Sacrifice',
      rankIDs: [18788],
      iconName: 'spell_shadow_psychicscream',
      row: 5,
      column: 2
    },
    improvedFirestone: {
      name: 'Improved Firestone',
      rankIDs: [18767, 18768],
      iconName: 'inv_ammo_firetar',
      row: 5,
      column: 4
    },
    manaFeed: {
      name: 'Mana Feed',
      rankIDs: [30326, 30327, 30328],
      iconName: 'spell_shadow_manafeed',
      row: 6,
      column: 1
    },
    masterDemonologist: {
      name: 'Master Demonologist',
      rankIDs: [23785, 23822, 23823, 23824, 23825],
      iconName: 'spell_shadow_shadowpact',
      row: 6,
      column: 3,
      requirement: {
        name: 'unholyPower',
        points: 5
      }
    },
    demonicResilience: {
      name: 'Demonic Resilience',
      rankIDs: [30319, 30320, 30321],
      iconName: 'spell_shadow_demonicfortitude',
      row: 7,
      column: 1
    },
    soulLink: {
      name: 'Soul Link',
      rankIDs: [19028],
      iconName: 'spell_shadow_gathershadows',
      row: 7,
      column: 2,
      requirement: {
        name: 'demonicSacrifice',
        points: 1
      }
    },
    demonicKnowledge: {
      name: 'Demonic Knowledge',
      rankIDs: [35691, 35692, 35693],
      iconName: 'Spell_shadow_improvedvampiricembrace',
      row: 7,
      column: 3
    },
    demonicTactics: {
      name: 'Demonic Tactics',
      rankIDs: [30242, 30245, 30246, 30247, 30248],
      iconName: 'Spell_shadow_demonictactics',
      row: 8,
      column: 2
    },
    summonFelguard: {
      name: 'Summon Felguard',
      rankIDs: [30146],
      iconName: 'spell_shadow_summonfelguard',
      row: 9,
      column: 2
    }
  },
  destruction: {
    improvedShadowBolt: {
      name: 'Improved Shadow Bolt',
      rankIDs: [17793, 17796, 17801, 17802, 17803],
      iconName: 'spell_shadow_shadowbolt',
      row: 1,
      column: 2
    },
    cataclysm: {
      name: 'Cataclysm',
      rankIDs: [17778, 17779, 17780, 17781, 17782],
      iconName: 'spell_fire_windsofwoe',
      row: 1,
      column: 3
    },
    bane: {
      name: 'Bane',
      rankIDs: [17788, 17789, 17790, 17791, 17792],
      iconName: 'spell_shadow_deathpact',
      row: 2,
      column: 2
    },
    aftermath: {
      name: 'Aftermath',
      rankIDs: [18119, 18120, 18121, 18122, 18123],
      iconName: 'spell_fire_fire',
      row: 2,
      column: 3
    },
    improvedFirebolt: {
      name: 'Improved Firebolt',
      rankIDs: [18126, 18127],
      iconName: 'spell_fire_firebolt',
      row: 3,
      column: 1
    },
    improvedLashOfPain: {
      name: 'Improved Lash of Pain',
      rankIDs: [18128, 18129],
      iconName: 'spell_shadow_curse',
      row: 3,
      column: 2
    },
    devastation: {
      name: 'Devastation',
      rankIDs: [18130, 18131, 18132, 18133, 18134],
      iconName: 'spell_fire_flameshock',
      row: 3,
      column: 3
    },
    shadowburn: {
      name: 'Shadowburn',
      rankIDs: [17877],
      iconName: 'spell_shadow_scourgebuild',
      row: 3,
      column: 4
    },
    intensity: {
      name: 'Intensity',
      rankIDs: [18135, 18136],
      iconName: 'spell_fire_lavaspawn',
      row: 4,
      column: 1
    },
    destructiveReach: {
      name: 'Destructive Reach',
      rankIDs: [17917, 17918],
      iconName: 'spell_shadow_corpseexplode',
      row: 4,
      column: 2
    },
    improvedSearingPain: {
      name: 'Improved Searing Pain',
      rankIDs: [17927, 17929, 17930],
      iconName: 'spell_fire_soulburn',
      row: 4,
      column: 4
    },
    pyroclasm: {
      name: 'Pyroclasm',
      rankIDs: [18096, 18073],
      iconName: 'spell_fire_volcano',
      row: 5,
      column: 1,
      requirement: {
        name: 'intensity',
        points: 2
      }
    },
    improvedImmolate: {
      name: 'Improved Immolate',
      rankIDs: [17815, 17833, 17834, 17835, 17836],
      iconName: 'spell_fire_immolation',
      row: 5,
      column: 2
    },
    ruin: {
      name: 'Ruin',
      rankIDs: [17959],
      iconName: 'spell_shadow_shadowwordpain',
      row: 5,
      column: 3,
      requirement: {
        name: 'devastation',
        points: 5
      }
    },
    netherProtection: {
      name: 'Nether Protection',
      rankIDs: [30299, 30301, 30302],
      iconName: 'spell_shadow_netherprotection',
      row: 6,
      column: 1
    },
    emberstorm: {
      name: 'Emberstorm',
      rankIDs: [17954, 17955, 17956, 17957, 17958],
      iconName: 'spell_fire_selfdestruct',
      row: 6,
      column: 3
    },
    backlash: {
      name: 'Backlash',
      rankIDs: [34935, 34938, 34939],
      iconName: 'spell_fire_playingwithfire',
      row: 7,
      column: 1
    },
    conflagrate: {
      name: 'Conflagrate',
      rankIDs: [17962],
      iconName: 'spell_fire_fireball',
      row: 7,
      column: 2,
      requirement: {
        name: 'improvedImmolate',
        points: 5
      }
    },
    soulLeech: {
      name: 'Soul Leech',
      rankIDs: [30293, 30295, 30296],
      iconName: 'spell_shadow_soulleech_3',
      row: 7,
      column: 3
    },
    shadowAndFlame: {
      name: 'Shadow and Flame',
      rankIDs: [30288, 30289, 30290, 30291, 30292],
      iconName: 'spell_shadow_shadowandflame',
      row: 8,
      column: 2
    },
    shadowfury: {
      name: 'Shadowfury',
      rankIDs: [30283],
      iconName: 'spell_shadow_shadowfury',
      row: 9,
      column: 2,
      requirement: {
        name: 'shadowAndFlame',
        points: 5
      }
    }
  }
}
