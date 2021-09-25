// Convertion calculations
const hitRatingPerPercent = 12.62
const critRatingPerPercent = 22.08
const hasteRatingPerPercent = 15.77
const manaPerInt = 15
const healthPerStamina = 10
const critPerInt = 1 / 81.95 // Crit % per point of intellect
const baseCritChancePercent = 1.701

const characterStats = {
  // Normal stats
  health: 3310,
  mana: 2335,
  stamina: 0,
  intellect: 0,
  spirit: 0,
  spellPower: 0,
  shadowPower: 0,
  firePower: 0,
  critRating: 0,
  hitRating: 0,
  hasteRating: 0,
  hastePercent: 0,
  critPercent: 0,
  mp5: 0,
  spellPen: 0,
  // Percentage modifiers
  damageModifier: 1,
  shadowModifier: 1,
  fireModifier: 1,
  natureModifier: 1,
  arcaneModifier: 1,
  frostModifier: 1,
  staminaModifier: 1,
  intellectModifier: 1,
  spiritModifier: 1,
  manaCostModifier: 1,
  // Resistances
  shadowResist: 0,
  fireResist: 0,
  frostResist: 0,
  natureResist: 0,
  arcaneResist: 0
}

const raceStats = {
  gnome: {
    stamina: 75,
    intellect: 136,
    spirit: 139,
    arcaneResist: 10,
    intellectModifier: 1.05
  },
  human: {
    stamina: 76,
    intellect: 129,
    spirit: 132,
    spiritModifier: 1.1
  },
  orc: {
    stamina: 78,
    intellect: 126,
    spirit: 134,
    petDamageModifier: 1.05
  },
  undead: {
    stamina: 77,
    intellect: 131,
    spirit: 144,
    shadowResist: 10
  },
  bloodElf: {
    stamina: 74,
    intellect: 133,
    spirit: 130,
    fireResist: 5,
    frostResist: 5,
    shadowResist: 5,
    arcaneResist: 5,
    natureResist: 5
  }
}

// Refreshes the player's values in the sidebar when changing e.g. gear, consumables, or buffs.
function refreshCharacterStats () {
  const spiritModifier = characterStats.spiritModifier * (1 - (0.01 * talents.demonicEmbrace))
  const staminaModifier = characterStats.staminaModifier * (1 + (0.03 * talents.demonicEmbrace))
  let stamina = characterStats.stamina

  // Stamina
  if (auras.bloodPact) {
    stamina += _auras.buffs.auras.bloodPact.stamina * (0.1 * document.querySelector("select[name='improvedImp']").value)
  }

  // Crit
  let critRating = characterStats.critRating
  if (auras.powerOfTheGuardianMage) critRating += 28 * document.querySelector("select[name='mageAtieshAmount']").value
  let critChance = Math.round((critRating / critRatingPerPercent + baseCritChancePercent) * 100) / 100 + talents.devastation + talents.backlash + talents.demonicTactics + ((characterStats.intellect * characterStats.intellectModifier) * critPerInt)
  if (auras.moonkinAura) critChance += 5
  if (auras.judgementOfTheCrusader) critChance += 3
  if (auras.totemOfWrath) critChance += 3 * document.querySelector("select[name='totemOfWrathAmount']").value
  if (auras.chainOfTheTwilightOwl) critChance += 2
  critChance = critChance.toFixed(2)

  // Hit
  let hitRating = JSON.parse(JSON.stringify(characterStats.hitRating))
  // Mana-Etched Regalia 2-set
  if (localStorage.getItem('setBonuses') && JSON.parse(localStorage.setBonuses)['658'] >= 2) hitRating += 35
  let hitChance = Math.round((hitRating / hitRatingPerPercent) * 100) / 100
  if (auras.inspiringPresence) hitChance += 1
  if (auras.totemOfWrath) hitChance += 3 * document.querySelector("select[name='totemOfWrathAmount']").value
  hitChance = hitChance.toFixed(2)

  // Shadow/Fire damage % modifiers
  let shadowModifier = characterStats.shadowModifier
  let fireModifier = characterStats.fireModifier
  // Add stats from pets/pet-related talents
  if (talents.demonicSacrifice === 1 && document.querySelector("select[name='sacrificePet']").value === 'yes') {
    const pet = document.querySelector("select[name='petChoice']").value
    if (pet == PetName.IMP) {
      fireModifier *= 1.15
    } else if (pet == PetName.SUCCUBUS) {
      shadowModifier *= 1.15
    } else if (pet == PetName.FELGUARD) {
      shadowModifier *= 1.1
    }
  } else {
    // Master Demonologist
    if (talents.masterDemonologist > 0) {
      if (document.querySelector("select[name='petChoice']").value == PetName.SUCCUBUS) {
        shadowModifier *= 1.1
        fireModifier *= 1.1
      } else if (document.querySelector("select[name='petChoice']").value == PetName.FELGUARD) {
        shadowModifier *= 1.05
        fireModifier *= 1.05
      }
    }
    // Soul Link
    if (talents.soulLink > 0) {
      shadowModifier *= 1.05
      fireModifier *= 1.05
    }
  }
  if (auras.curseOfTheElements) {
    shadowModifier *= 1.1 + (0.01 * document.querySelector("select[name='improvedCurseOfTheElements']").value)
    fireModifier *= 1.1 + (0.01 * document.querySelector("select[name='improvedCurseOfTheElements']").value)
  }
  if (talents.emberstorm > 0) {
    fireModifier *= 1 + (0.02 * talents.emberstorm)
  }
  // Ferocious Inspiration
  if (auras.ferociousInspiration) {
    shadowModifier *= Math.pow(1.03, document.querySelector("select[name='ferociousInspirationAmount']").value)
    fireModifier *= Math.pow(1.03, document.querySelector("select[name='ferociousInspirationAmount']").value)
  }

  // Spell Power
  let spellPower = JSON.parse(JSON.stringify(characterStats.spellPower))
  if (localStorage.getItem('setBonuses') && JSON.parse(localStorage.setBonuses)['667'] == 2) spellPower += 15 // The Twin Stars 2-set bonus (15 spellpower)
  if (auras.felArmor) spellPower += 100 * (1 + 0.1 * talents.demonicAegis)
  if (auras.prayerOfSpirit) spellPower += (characterStats.spirit * spiritModifier * (0.05 * document.querySelector("select[name='improvedDivineSpirit']").value))
  if (auras.powerOfTheGuardianWarlock) spellPower += 33 * document.querySelector("select[name='warlockAtieshAmount']").value
  // Spellfire 3-set bonus
  if (localStorage.setBonuses && JSON.parse(localStorage.setBonuses)['552'] >= 3) spellPower += (characterStats.intellect * characterStats.intellectModifier * 0.07)
  // Elemental Shaman T4 2pc bonus
  if (auras.wrathOfAirTotem && document.querySelector("select[name='improvedWrathOfAirTotem']").value == 'yes') spellPower += 20
  spellPower = Math.round(spellPower)

  // MP5
  let mp5 = characterStats.mp5
  // Add mp5 from Vampiric Touch (add 25% instead of 5% since we're adding it to the mana per 5 seconds variable)
  if (auras.vampiricTouch) {
    mp5 += settings.shadowPriestDps * 0.25
  }

  // Enemy armor
  let enemyArmor = document.querySelector("input[name='enemyArmor']").value
  if (auras.faerieFire) enemyArmor -= 610
  if ((auras.sunderArmor && auras.exposeArmor && settings.improvedExposeArmor == 2) || (auras.exposeArmor && !auras.sunderArmor)) enemyArmor -= 2050 * (1 + 0.25 * settings.improvedExposeArmor)
  else if (auras.sunderArmor) enemyArmor -= 520 * 5
  if (auras.curseOfRecklessness) enemyArmor -= 800
  if (auras.annihilator) enemyArmor -= 600

  document.getElementById("character-health-val").innerHTML = Math.round((characterStats.health + (stamina * staminaModifier) * healthPerStamina) * (1 + (0.01 * talents.felStamina)))
  document.getElementById("character-mana-val").innerHTML = Math.round((characterStats.mana + (characterStats.intellect * characterStats.intellectModifier) * manaPerInt) * (1 + (0.01 * talents.felIntellect)))
  document.getElementById("character-stamina-val").innerHTML = Math.round(stamina * staminaModifier)
  document.getElementById("character-intellect-val").innerHTML = Math.round(characterStats.intellect * characterStats.intellectModifier)
  document.getElementById("character-spirit-val").innerHTML = Math.round(characterStats.spirit * spiritModifier)
  document.getElementById("character-spell-power-val").innerHTML = spellPower
  document.getElementById("character-shadow-power-val").innerHTML = characterStats.shadowPower + ' (' + (characterStats.shadowPower + spellPower) + ')'
  document.getElementById("character-fire-power-val").innerHTML = characterStats.firePower + ' (' + (characterStats.firePower + spellPower) + ')'
  document.getElementById("character-crit-val").innerHTML = Math.round(critRating) + ' (' + critChance + '%)'
  document.getElementById("character-hit-val").innerHTML = Math.round(hitRating) + ' (' + hitChance + '%)'
  document.getElementById("character-haste-val").innerHTML = Math.round(characterStats.hasteRating) + ' (' + (Math.round((characterStats.hasteRating / hasteRatingPerPercent) * 100) / 100) + '%)'
  document.getElementById("character-shadow-damage-modifier-val").innerHTML = Math.round((shadowModifier * (1 + (0.02 * talents.shadowMastery))) * 100) + '%'
  document.getElementById("character-fire-damage-modifier-val").innerHTML = Math.round(fireModifier * 100) + '%'
  document.getElementById("character-mp5-val").innerHTML = Math.round(mp5)
  document.getElementById("enemy-armor-val").innerHTML = Math.max(0, enemyArmor)
}
