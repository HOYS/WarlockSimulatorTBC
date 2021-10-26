class PetAura {
  constructor (pet) {
    this.pet = pet
    this.duration = 0
    this.durationRemaining = 0
    this.active = false
  }

  tick (t) {
    if (this.active) {
      this.durationRemaining = Math.max(0, this.durationRemaining - t)
      if (this.durationRemaining == 0) {
        this.fade()
      }
    }
  }

  apply () {
    this.active = true
    this.durationRemaining = this.duration
    let combatLogMsg = this.pet.name + ' gains ' + this.name
    if (this.stacks) combatLogMsg += '(' + this.stacks + '). Current AP: ' + Math.round(this.pet.getAttackPower()) + ')'
    this.pet.player.combatLog(combatLogMsg)
  }

  fade (endOfIteration = false) {
    this.active = false
    this.durationRemaining = 0
    if (!endOfIteration) {
      let combatLogMsg = this.name
      if (this.stacks) combatLogMsg += '(' + this.stacks + ')'
      combatLogMsg += ' fades from ' + this.pet.name
      this.pet.player.combatLog(combatLogMsg)
    }
  }
}

class DemonicFrenzy extends PetAura {
  constructor (pet) {
    super(pet)
    this.name = 'Demonic Frenzy'
    this.duration = 10
    this.maxStacks = 10
    this.stacks = 0
  }

  apply () {
    if (this.stacks < this.maxStacks) {
      this.stacks++
    }
    super.apply()
  }

  fade (endOfIteration = false) {
    this.stacks = 0
    super.fade(endOfIteration)
  }
}