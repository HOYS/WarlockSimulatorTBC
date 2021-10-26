class Spell {
  constructor (player) {
    this.player = player
    this.castTime = 0
    this.manaCost = 0
    this.cooldown = 0
    this.name = null
    this.varName = null // Same as this.name except it's written in camelCase
    this.isDot = false
    this.modifier = 1
    this.doesDamage = false
    this.canCrit = false
    this.school = null // The school that the spell belongs to such as shadow or fire
    this.type = null // affliction or destruction
    this.travelTime = 0
    this.bonusCrit = 0
    this.cooldownRemaining = 0
    this.isNonWarlockAbility = false
    this.casting = false
    this.isItem = false
    this.onGcd = true
    this.isProc = false
    this.breakdownTable = 'damage'
  }

  reset () {
    this.cooldownRemaining = 0
    this.casting = false
  }

  setup () {
    this.varName = camelCase(this.name)
    this.player[this.breakdownTable + 'Breakdown'][this.varName] = this.player[this.breakdownTable + 'Breakdown'][this.varName] || { name: this.name }
    if (this.minDmg && this.maxDmg) {
      this.dmg = (this.minDmg + this.maxDmg) / 2
    }
    if (this.minMana && this.maxMana) {
      this.avgManaValue = (this.minMana + this.maxMana) / 2
    }
  }

  ready () {
    return this.canCast() && this.hasEnoughMana()
  }

  canCast() {
    return (!this.onGcd || this.isNonWarlockAbility || this.player.gcdRemaining <= 0) && (this.isProc || this.isNonWarlockAbility || this.player.castTimeRemaining <= 0) && this.cooldownRemaining <= 0
  }

  hasEnoughMana() {
    return this.manaCost <= this.player.mana
  }

  getCastTime () {
    let hastePercent = this.player.stats.hastePercent
    
    // If both Bloodlust and Power Infusion are active then remove the 20% bonus from Power Infusion since they don't stack
    if (this.player.auras.powerInfusion && this.player.auras.bloodlust && this.player.auras.powerInfusion.active && this.player.auras.bloodlust.active) {
      hastePercent /= 1.2
    }

    return Math.round(this.castTime / ((1 + (this.player.stats.hasteRating / hasteRatingPerPercent / 100)) * hastePercent) * 10000) / 10000 + this.player.spellDelay
  }

  startCast (predictedDamage = 0) {
    if (this.onGcd && !this.isNonWarlockAbility) {
      this.player.gcdRemaining = this.player.getGcdValue(this.varName)
    }

    let combatLogMsg = ''
    if (this.castTime > 0) {
      this.casting = true
      this.player.castTimeRemaining = this.getCastTime()
      if (!this.isProc) {
        combatLogMsg += 'Started casting ' + this.name + ' - Cast time: ' + (this.player.castTimeRemaining - this.player.spellDelay) + ' (' + Math.round((((1 + (this.player.stats.hasteRating / hasteRatingPerPercent / 100)) * this.player.stats.hastePercent) - 1) * 10000) / 100 + '% haste at a base cast speed of ' + this.castTime + ').'
      }
    } else {
      if (!this.isProc) {
        combatLogMsg += 'Cast ' + this.name
      }
      this.cast()
    }
    if (this.onGcd && !this.isNonWarlockAbility) {
      combatLogMsg += ' - Global cooldown: ' + this.player.gcdRemaining
    }
    if (predictedDamage > 0) {
      combatLogMsg += ' - Estimated damage / Cast Time: ' + Math.round(predictedDamage)
    }
    this.player.combatLog(combatLogMsg)
  }

  // Called when a spell finishes casting or immediately called if the spell has no cast time.
  cast () {
    const currentMana = this.player.mana
    if (!this.isAura) {
      this.player[this.breakdownTable + 'Breakdown'][this.varName].casts = this.player[this.breakdownTable + 'Breakdown'][this.varName].casts + 1 || 1
    }
    // Infinite mana setting
    // For some reason the setting sometimes has the value 'on' if it isn't enabled when loading settings from previous sessions.
    // The setting is only enabled when it is equal to true, so lower the player's mana if it's equal to false or 'on'
    if (this.player.simSettings.infinitePlayerMana !== 'yes') {
      this.player.mana -= (this.manaCost * this.player.stats.manaCostModifier)
    }
    if (this.manaCost > 0) {
      this.player.fiveSecondRuleTimer = 5
    }
    this.cooldownRemaining = this.cooldown
    this.casting = false
    if (this.castTime > 0) {
      this.player.combatLog('Finished casting ' + this.name + ' - Mana: ' + Math.round(currentMana) + ' -> ' + Math.round(this.player.mana) + ' - Mana Cost: ' + Math.round(this.manaCost) + ' - Mana Cost Modifier: ' + Math.round(this.player.stats.manaCostModifier * 100) + '%')
    }

    let isCrit = false  
    if (this.canCrit) {
      // Checks if the spell is a crit.
      isCrit = this.player.isCrit(this, this.bonusCrit)
      if (isCrit) {
        // Increment the crit counter whether the spell hits or not so that the crit % on the damage breakdown is correct. Otherwise the crit % will be lower due to lost crits when the spell misses.
        this.player[this.breakdownTable + 'Breakdown'][this.varName].crits = this.player[this.breakdownTable + 'Breakdown'][this.varName].crits + 1 || 1
      }
    }

    // Check if the spell hits or misses
    if (((!this.isItem && !this.isNonWarlockAbility ) || this.doesDamage) && !this.player.isHit(this.type === 'affliction')) {
      this.player.combatLog(this.name + ' *resist*')
      this.player[this.breakdownTable + 'Breakdown'][this.varName].misses = this.player[this.breakdownTable + 'Breakdown'][this.varName].misses + 1 || 1
      return
    }

    if (this.isDot || this.isAura) {
      this.player.auras[this.varName].apply()
    }

    if (this.doesDamage) {
      this.damage(isCrit)
    }

    // If it's an item such as mana potion, demonic rune, destruction potion, or if it's a proc with a hidden cooldown like Blade of Wizardry or Robe of the Elder Scribes then jump out of the method
    if (this.isItem || this.isProc || this.isNonWarlockAbility ) {
      return
    }

    // Judgement of Wisdom (50% proc rate)
    if (this.player.selectedAuras.judgementOfWisdom && random(1, 100) <= 50) {
      const manaVal = 74
      const currentMana = this.player.mana
      const manaGained = Math.min(this.player.stats.maxMana - currentMana, manaVal)
      this.player.manaGainBreakdown.judgementOfWisdom.casts = this.player.manaGainBreakdown.judgementOfWisdom.casts + 1 || 1
      this.player.manaGainBreakdown.judgementOfWisdom.manaGain = this.player.manaGainBreakdown.judgementOfWisdom.manaGain + manaGained || manaGained
      this.player.totalManaRegenerated += manaGained
      this.player.mana = Math.min(this.player.stats.maxMana, currentMana + manaGained)
      this.player.combatLog('Player gains ' + manaGained + ' mana from Judgement of Wisdom (' + Math.round(currentMana) + ' -> ' + Math.round(this.player.mana) + ')')
    }

    // T4 2-set
    if (this.player.sets['645'] >= 2 && ['shadow', 'fire'].includes(this.school) && random(1, 100) <= this.player.auras.shadowflame.procChance) {
      if (this.school == 'shadow') {
        this.player.auras.flameshadow.apply()
      } else if (this.school == 'fire') {
        this.player.auras.shadowflame.apply()
      }
    }

    // Spellstrike 2-set
    if (this.player.sets['559'] == 2 && random(1, 100) <= this.player.auras.spellstrikeProc.procChance) {
      this.player.auras.spellstrikeProc.apply()
    }

    // Quagmirran's Eye
    if (this.player.spells.quagmirransEye && this.player.spells.quagmirransEye.ready() && random(1, 100) <= this.player.spells.quagmirransEye.procChance) {
      this.player.spells.quagmirransEye.cast()
    }

    // Mana-Etched Regalia 4-set (2% proc chance)
    if (this.player.sets['658'] >= 4 && random(1, 100) <= this.player.auras.manaEtched4Set.procChance) {
      this.player.auras.manaEtched4Set.apply()
    }

    // Lightning Overload
    if (this.player.auras.lightningOverload && random(1,100) <= this.player.auras.lightningOverload.procChance) {
      this.player.spells.LightningOverload.cast()
    }

    // Mark of Defiance
    if (this.player.spells.markOfDefiance && random(1, 100) <= this.player.spells.markOfDefiance.procChance) {
      this.player.spells.markOfDefiance.cast()
    }

    // Darkmoon Card: Crusade
    if (this.player.auras.darkmoonCardCrusade) {
      this.player.auras.darkmoonCardCrusade.apply()
    }

    // Band of the Eternal Sage
    if (this.player.spells.bandOfTheEternalSage && this.player.spells.bandOfTheEternalSage.ready() && random(1, 100) <= this.player.spells.bandOfTheEternalSage.procChance) {
      this.player.spells.bandOfTheEternalSage.cast()
    }

    // Blade of Wizardry
    if (this.player.spells.bladeOfWizardry && this.player.spells.bladeOfWizardry.ready() && random(1, 100) <= this.player.auras.bladeOfWizardry.procChance) {
      this.player.spells.bladeOfWizardry.cast()
    }

    // Mystical Skyfire Diamond
    if (this.player.spells.mysticalSkyfireDiamond && this.player.spells.mysticalSkyfireDiamond.ready() && random(1, 100) <= this.player.spells.mysticalSkyfireDiamond.procChance) {
      this.player.spells.mysticalSkyfireDiamond.cast()
    }

    // Robe of the Elder Scribes
    if (this.player.spells.robeOfTheElderScribes && this.player.spells.robeOfTheElderScribes.ready() && random(1, 100) <= this.player.spells.robeOfTheElderScribes.procChance) {
      this.player.spells.robeOfTheElderScribes.cast()
    }

    // Insightful Earthstorm Diamond
    if (this.player.spells.insightfulEarthstormDiamond && this.player.spells.insightfulEarthstormDiamond.ready() && random(1, 100) <= this.player.spells.insightfulEarthstormDiamond.procChance) {
      this.player.spells.insightfulEarthstormDiamond.cast()
    }

    // Wrath of Cenarius
    if (this.player.auras.wrathOfCenarius && random(1,100) <= this.player.auras.wrathOfCenarius.procChance) {
      this.player.auras.wrathOfCenarius.apply()
    }
  }

  getModifier () {
    return this.player.stats[this.school + 'Modifier'] * this.modifier
  }

  damage (isCrit) {
    // [baseDamage, dmg, modifier, partialResistMultiplier, spellPower]
    const constantDamage = this.getConstantDamage()
    // Make a variable for the base damage to output into the combat log
    const baseDamage = constantDamage[0]
    let dmg = constantDamage[1]
    const modifier = constantDamage[2]
    const partialResistMultiplier = constantDamage[3]
    const spellPower = constantDamage[4]
    let critMultiplier = this.player.critMultiplier

    if (isCrit) {
      critMultiplier = this.getCritMultiplier(critMultiplier)
      dmg *= critMultiplier
      this.onCritProcs()
    }

    this.onDamageProcs()

    // Combat Log
    let combatLogMsg = this.name + ' '
    if (isCrit) combatLogMsg += '*'
    combatLogMsg += Math.round(dmg)
    if (isCrit) combatLogMsg += '*'
    combatLogMsg += ' (' + baseDamage + ' Base Damage - ' + Math.round(this.coefficient * 1000) / 1000 + ' Coefficient - ' + Math.round(spellPower) + ' Spell Power - '
    if (isCrit) combatLogMsg += critMultiplier.toFixed(2) + '% Crit Multiplier - '
    combatLogMsg += Math.round(modifier * 10000) / 100 + '% Damage Modifier - ' + Math.round(partialResistMultiplier * 1000) / 10 + '% Partial Resist Multiplier)'
    this.player.combatLog(combatLogMsg)
    this.player[this.breakdownTable + 'Breakdown'][this.varName].damage = this.player[this.breakdownTable + 'Breakdown'][this.varName].damage + dmg || dmg
    this.player.iterationDamage += dmg

  }

  // Returns the non-RNG damage of the spell (basically just the base damage + spell power + damage modifiers, no crit/miss etc.)
  // todo: investigate this noRNG variable
  getConstantDamage(noRNG = false) {
    let dmg = this.player.simSettings.randomizeValues === 'yes' && this.minDmg && this.maxDmg && !noRNG ? random(this.minDmg, this.maxDmg) : this.dmg
    const baseDamage = dmg // Creating a variable for the base damage just for the combat log
    const spellPower = this.player.getSpellPower() + (this.school == 'nature' ? this.player.stats.naturePower : this.school == 'fire' ? this.player.stats.firePower : 0)
    let modifier = this.getModifier()
    const partialResistMultiplier = this.player.getPartialResistMultiplier(this.player.enemy[this.school + 'Resist'])


    // Add damage from Spell Power
    dmg += spellPower * this.coefficient

    dmg *= modifier * partialResistMultiplier

    return [baseDamage, dmg, modifier, partialResistMultiplier, spellPower]
  }

  // Returns the number that the damage of the spell will be multiplied with if it crits
  getCritMultiplier(critMult) {
    let critMultiplier = critMult

    // Chaotic Skyfire Diamond meta gem
    if (this.player.metaGemIds.includes(34220)) {
      critMultiplier *= 1.03
    }

    return critMultiplier
  }

  // Predicts how much damage the spell will do based on crit % and miss %
  predictDamage() {
    const normalDamage = this.getConstantDamage()[1] || 0
    let critDamage = 0, critChance = 0, chanceToNotCrit = 0

    if (this.canCrit) {
      critDamage = normalDamage * this.getCritMultiplier(this.player.critMultiplier)
      critChance = this.player.getCritChance(this) / 100
      chanceToNotCrit = 1 - critChance
    }
    const hitChance = this.player.getHitChance(this.type == 'affliction') / 100
    let estimatedDamage = this.canCrit ? (normalDamage * chanceToNotCrit) + (critDamage * critChance) : normalDamage

    // Add the predicted damage of the DoT over its full duration
    if (this.isDot) {
      estimatedDamage += this.player.auras[this.varName].predictDamage()
    }

    return (estimatedDamage * hitChance) / Math.max(this.player.getGcdValue(this.varName), this.getCastTime())
  }

  tick (t) {
    if (this.cooldownRemaining > 0 && this.cooldownRemaining - t <= 0) {
      this.player.combatLog(this.name + ' is off cooldown')
    }
    this.cooldownRemaining = Math.max(0, this.cooldownRemaining - t)

    if (this.casting && this.player.castTimeRemaining <= 0) {
      this.cast()
    }
  }

  onCritProcs() {
    // The Lightning Capacitor
    if (this.player.spells.theLightningCapacitor) {
      this.player.spells.theLightningCapacitor.startCast()
    }
    // Sextant of Unstable Currents
    if (this.player.trinketIds.includes(30626) && this.player.spells.sextantOfUnstableCurrents.ready() && random(1, 100) <= this.player.spells.sextantOfUnstableCurrents.procChance) {
      this.player.spells.sextantOfUnstableCurrents.cast()
    }
    // Shiffar's Nexus-Horn
    if (this.player.trinketIds.includes(28418) && this.player.spells.shiffarsNexusHorn.ready() && random(1, 100) <= this.player.spells.shiffarsNexusHorn.procChance) {
      this.player.spells.shiffarsNexusHorn.cast()
    }
  }

  onDamageProcs() {
    // Confirm that this procs on dealing damage
    // Shattered Sun Pendant of Acumen
    if (this.player.exaltedWithShattrathFaction && this.player.spells.shatteredSunPendantOfAcumen && this.player.spells.shatteredSunPendantOfAcumen.cooldownRemaining <= 0 && random(1, 100) <= this.player.spells.shatteredSunPendantOfAcumen.procChance) {
      this.player.spells.shatteredSunPendantOfAcumen.cast()
    }
  }
}

class LightningBolt extends Spell {
  constructor (player) {
    super(player)
    this.castTime = this.calculateCastTime()
    this.manaCost = 300 * (1 - 0.02 * player.talents.convection)
    this.coefficient = (3 / 3.5)
    this.minDmg = 571
    this.maxDmg = 652
    this.name = 'Lightning Bolt'
    this.doesDamage = true
    this.canCrit = true
    this.school = 'nature'
    this.type = 'elemental'
    this.travelTime = player.spellTravelTime
    this.setup()

     // T6 4pc
    // if (player.sets['670'] >= 4) {
    //   this.modifier *= 1.06
    // }
  }

  startCast () {
    // if (this.player.auras.shadowTrance && this.player.auras.shadowTrance.active) {
    //   this.castTime = 0
    // }
    super.startCast()
    // if (this.player.auras.shadowTrance && this.player.auras.shadowTrance.active) {
    //   this.castTime = this.calculateCastTime()
    //   this.player.auras.shadowTrance.fade()
    // }
  }

  calculateCastTime () {
    return 2.5 - (0.1 * this.player.talents.lightningMastery)
  }
}

class LightningOverload extends Spell {
  constructor (player) {
    super(player)
    this.castTime = 0
    this.manaCost = 0
    this.coefficient = (3/3.5)
    this.minDmg = 285
    this.maxDmg = 326
    this.name = "Lightning Bolt - Overload";
    this.doesDamage = true
    this.canCrit = true
    this.school = 'nature'
    this.type = 'elemental'
    this.travelTime = player.spellTravelTime
    this.setup()
    
  }
}

class SoulFire extends Spell {
  constructor (player) {
    super(player)
    this.castTime = 6 - (0.4 * player.talents.lightningMastery)
    this.manaCost = 250 * (1 - 0.02 * player.talents.convection)
    this.coefficient = 1.15
    this.minDmg = 1003
    this.maxDmg = 1257
    this.name = 'Soul Fire'
    this.doesDamage = true
    this.canCrit = true
    this.school = 'fire'
    this.type = 'destruction'
    this.travelTime = player.spellTravelTime
    this.setup()
  }
}


class LifeTap extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Life Tap'
    this.manaReturn = 582
    this.coefficient = 0.8
    this.modifier = 1 * (1 + 0.1 * this.player.talents.callOfFlame)
    this.breakdownTable = 'manaGain'
    this.setup()
  }

  ready() {
    return super.ready() && this.manaGain() + this.player.mana < this.player.stats.maxMana
  }

  manaGain () {
    return (this.manaReturn + ((this.player.getSpellPower() + this.player.stats.naturePower) * this.coefficient)) * this.modifier
  }

  cast () {
    this.player[this.breakdownTable + 'Breakdown'][this.varName].casts = this.player[this.breakdownTable + 'Breakdown'][this.varName].casts + 1 || 1
    const manaGain = this.manaGain()
    this.player.combatLog(this.name + ' ' + Math.round(manaGain) + ' (' + Math.round(this.player.getSpellPower() + this.player.stats.naturePower) + ' Spell Power - ' + Math.round(this.modifier * 10000) / 100 + '% Mana Gain Modifier)')
    this.player.totalManaRegenerated += manaGain
    this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain = this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain + manaGain || manaGain
    // Warning for if Life Tap is used while there are important auras active
    if (this.player.importantAuraCounter > 0) {
      this.player.combatLog('Life Tap used while there are cooldowns active')
    }
    // Warning for if the simulation ever decides to use life tap when it would overcap the player on mana.
    if (this.player.mana + manaGain > this.player.stats.maxMana) {
      this.player.combatLog('Life Tap used at too high mana (mana wasted)')
    }
    this.player.mana = Math.min(this.player.stats.maxMana, this.player.mana + manaGain)
  }
}


class Corruption extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Corruption'
    this.manaCost = 370
    this.castTime = Math.round((2 - (0.4 * player.talents.concussion)) * 100) / 100
    this.isDot = true
    this.school = 'shadow'
    this.type = 'affliction'
    this.setup()
  }
}

class SiphonLife extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Siphon Life'
    this.manaCost = 410
    this.isDot = true
    this.school = 'shadow'
    this.type = 'affliction'
    this.setup()
  }
}

class FlameShock extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Flame Shock'
    this.manaCost = 500 * (1 - 0.02 * player.talents.convection)
    this.castTime = 0
    this.isDot = true
    this.doesDamage = true
    this.canCrit = true
    this.dmg = 331
    this.coefficient = 0.2
    this.school = 'fire'
    this.type = 'elemental'
    this.setup()
  }

  getModifier () {
    let modifier = super.getModifier()
    return modifier
  }
}

class CurseOfAgony extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Curse of Agony'
    this.manaCost = 265
    this.isDot = true
    this.school = 'shadow'
    this.type = 'affliction'
    this.setup()
  }
}

class CurseOfTheElements extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Curse of the Elements'
    this.manaCost = 260
    this.type = 'affliction'
    this.isAura = true
    this.setup()
  }
}

class CurseOfRecklessness extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Curse of Recklessness'
    this.manaCost = 160
    this.type = 'affliction'
    this.isAura = true
    this.setup()
  }
}

class DestructionPotion extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Destruction Potion'
    this.cooldown = 120
    this.isItem = true
    this.isAura = true
    this.onGcd = false
    this.setup()
  }
}

class SuperManaPotion extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Super Mana Potion'
    this.cooldown = 120
    this.isItem = true
    this.minMana = 1800
    this.maxMana = 3000
    this.onGcd = false
    this.breakdownTable = 'manaGain'
    this.setup()
  }

  cast () {
    super.cast()
    const currentPlayerMana = this.player.mana
    const manaGain = this.player.simSettings.randomizeValues === 'yes' ? random(this.minMana, this.maxMana) : this.avgManaValue
    this.player.totalManaRegenerated += manaGain
    this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain = this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain + manaGain || manaGain
    this.player.mana = Math.min(this.player.stats.maxMana, currentPlayerMana + manaGain)
    this.player.combatLog('Player gains ' + Math.round(this.player.mana - currentPlayerMana) + ' mana from Super Mana Potion (' + Math.round(currentPlayerMana) + ' -> ' + Math.round(this.player.mana) + ')')
  }
}

class DemonicRune extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Demonic Rune'
    this.cooldown = 120
    this.isItem = true
    this.minMana = 900
    this.maxMana = 1500
    this.onGcd = false
    this.breakdownTable = 'manaGain'
    this.setup()
  }

  cast () {
    super.cast()
    const currentPlayerMana = this.player.mana
    const manaGain = this.player.simSettings.randomizeValues === 'yes' ? random(this.minMana, this.maxMana) : this.avgManaValue
    this.player.totalManaRegenerated += manaGain
    this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain = this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain + manaGain || manaGain
    this.player.mana = Math.min(this.player.stats.maxMana, currentPlayerMana + manaGain)
    this.player.combatLog('Player gains ' + Math.round(this.player.mana - currentPlayerMana) + ' mana from Demonic Rune (' + Math.round(currentPlayerMana) + ' -> ' + Math.round(this.player.mana) + ')')
  }
}

class FlameCap extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Flame Cap'
    this.cooldown = 180
    this.isItem = true
    this.isAura = true
    this.onGcd = false
    this.setup()
  }
}

class BloodFury extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Blood Fury'
    this.cooldown = 120
    this.isAura = true
    this.onGcd = false
    this.setup()
  }
}

class Bloodlust extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Bloodlust'
    this.cooldown = 600
	  this.isItem = true
    this.isAura = true
    this.onGcd = false
    this.setup()
  }
}

class DrumsOfBattle extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Drums of Battle'
    this.cooldown = 120
    this.isAura = true
    this.onGcd = false
    this.isNonWarlockAbility = true
    this.isItem = true
    this.setup()
  }

  ready () {
    return this.cooldownRemaining <= 0
  }
}

class DrumsOfWar extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Drums of War'
    this.cooldown = 120
    this.isAura = true
    this.onGcd = false
    this.isNonWarlockAbility = true
    this.isItem = true
    this.setup()
  }

  ready () {
    return this.cooldownRemaining <= 0
  }
}

class DrumsOfRestoration extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Drums of Restoration'
    this.cooldown = 120
    this.isAura = true
    this.onGcd = false
    this.isNonWarlockAbility = true
    this.isItem = true
    this.setup()
  }

  ready () {
    return this.cooldownRemaining <= 0
  }
}

class TimbalsFocusingCrystal extends Spell {
  constructor (player) {
    super(player)
    this.name = "Timbal's Focusing Crystal"
    this.cooldown = 15
    this.onGcd = false
    this.procChance = 10
    this.minDmg = 285
    this.maxDmg = 475
    this.doesDamage = true
    this.coefficient = 0
    this.school = 'shadow'
    this.canCrit = true
    this.setup()
  }
}

class MarkOfDefiance extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Mark of Defiance'
    this.cooldown = 17
    this.procChance = 15
    this.onGcd = false
    this.minMana = 128
    this.maxMana = 172
    this.breakdownTable = 'manaGain'
    this.setup()
  }

  cast () {
    if (this.cooldownRemaining <= 0) {
      this.player[this.breakdownTable + 'Breakdown'][this.varName].casts = this.player[this.breakdownTable + 'Breakdown'][this.varName].casts + 1 || 1
      this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain = this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain + this.avgManaValue || this.avgManaValue
      this.player.totalManaRegenerated += this.avgManaValue
      this.player.combatLog(this.name + ' +' + this.avgManaValue + ' mana')
      this.player.mana = Math.min(this.player.stats.maxMana, this.player.mana + this.avgManaValue)
      this.cooldownRemaining = this.cooldown
    }
  }
}

class TheLightningCapacitor extends Spell {
  constructor (player) {
    super(player)
    this.name = 'The Lightning Capacitor'
    this.cooldown = 2.5
    this.onGcd = false
    this.minDmg = 694
    this.maxDmg = 806
    this.doesDamage = true
    this.coefficient = 0
    this.canCrit = true
    this.school = 'nature' // confirm
    this.setup()
  }

  startCast () {
    if (this.cooldownRemaining <= 0) {
      this.player.auras.theLightningCapacitor.apply()
      if (this.player.auras.theLightningCapacitor.stacks == 3) {
        this.cooldownRemaining = this.cooldown
        this.player.auras.theLightningCapacitor.fade()
        super.startCast()
      }
    }
  }
}

class BladeOfWizardry extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Blade of Wizardry'
    this.cooldown = 50
    this.onGcd = false
    this.isItem = true
    this.isProc = true
    this.isAura = true
    this.breakdownTable = 'aura'
    this.setup()
  }
}

class ShatteredSunPendantOfAcumen extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Shattered Sun Pendant of Acumen'
    this.cooldown = 45
    this.procChance = 15
    this.onGcd = false
    this.isItem = true
    if (this.player.shattrathFaction == 'Aldor') {
      this.isProc = true
      this.isAura = true
      this.breakdownTable = 'aura'
    } else if (this.player.shattrathFaction == 'Scryers') {
      this.doesDamage = true
      this.canCrit = true
      this.coefficient = 0
      this.dmg = 333 // confirm
      this.school = 'arcane'
    }
    this.setup()
  }
}

class RobeOfTheElderScribes extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Robe of the Elder Scribes'
    this.cooldown = 50
    this.procChance = 20
    this.onGcd = false
    this.isItem = true
    this.isProc = true
    this.isAura = true
    this.breakdownTable = 'aura'
    this.setup()
  }
}

class QuagmirransEye extends Spell {
  constructor (player) {
    super(player)
    this.name = "Quagmirran's Eye"
    this.cooldown = 45
    this.procChance = 10
    this.onGcd = false
    this.isItem = true
    this.isAura = true
    this.breakdownTable = 'aura'
    this.setup()
  }
}

class ShiffarsNexusHorn extends Spell {
  constructor (player) {
    super(player)
    this.name = "Shiffar's Nexus-Horn"
    this.cooldown = 45
    this.procChance = 20
    this.onGcd = false
    this.isItem = true
    this.isAura = true
    this.breakdownTable = 'aura'
    this.setup()
  }
}

class SextantOfUnstableCurrents extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Sextant of Unstable Currents'
    this.cooldown = 45
    this.procChance = 20
    this.onGcd = false
    this.isItem = true
    this.isAura = true
    this.breakdownTable = 'aura'
    this.setup()
  }
}

class BandOfTheEternalSage extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Band of the Eternal Sage'
    this.cooldown = 60
    this.procChance = 10
    this.onGcd = false
    this.isItem = true
    this.isAura = true
    this.breakdownTable = 'aura'
    this.setup()
  }
}

class MysticalSkyfireDiamond extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Mystical Skyfire Diamond'
    this.cooldown = 35
    this.procChance = 15
    this.onGcd = false
    this.isProc = true
    this.isItem = true
    this.isAura = true
    this.breakdownTable = 'aura'
    this.setup()
  }
}

class InsightfulEarthstormDiamond extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Insightful Earthstorm Diamond'
    this.cooldown = 15
    this.procChance = 5
    this.onGcd = false
    this.isProc = true
    this.isItem = true
    this.breakdownTable = 'manaGain'
    this.manaGain = 300
    this.setup()
  }

  cast() {
    super.cast()
    const currentPlayerMana = this.player.mana
    this.player.totalManaRegenerated += this.manaGain
    this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain = this.player[this.breakdownTable + 'Breakdown'][this.varName].manaGain + this.manaGain || this.manaGain
    this.player.mana = Math.min(this.player.stats.maxMana, currentPlayerMana + this.manaGain)
    this.player.combatLog('Player gains ' + Math.round(this.player.mana - currentPlayerMana) + ' mana from ' + this.name + ' (' + Math.round(currentPlayerMana) + ' -> ' + Math.round(this.player.mana) + ')')
  }
}

class PowerInfusion extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Power Infusion'
    this.cooldown = 180
    this.isAura = true
    this.isNonWarlockAbility = true
    this.setup()
  }
}

class Innervate extends Spell {
  constructor (player) {
    super(player)
    this.name = 'Innervate'
    this.cooldown = 360
    this.isAura = true
    this.isNonWarlockAbility = true
    this.setup()
  }
}