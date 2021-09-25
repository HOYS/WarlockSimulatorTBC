document.addEventListener("DOMContentLoaded", function() {
  // Listens to any clicks on the "rotation" spells for dots, filler, curse, and finisher.
  document.addEventListener("click", function(e) {
    if (e.target.matches("#rotation-list div li img")) {
      const element = e.target.closest("li")
      const clickedSpell = element.dataset.name
      let refreshStats = false

      if (element.classList.contains("rotation-filler")) {
        Array.from(document.getElementsByClassName("rotation-filler")).forEach(filler => {
          filler.dataset.checked = false
          rotation[filler.dataset.type][filler.dataset.name] = false
        })

        if (document.getElementById("demonicSacrifice").dataset.points == 1) {
          refreshStats = true
        }
      } else if (element.classList.contains("rotation-curse")) {
        Array.from(document.getElementsByClassName("rotation-curse")).forEach(curse => {
          if (curse.dataset.name !== clickedSpell) {
            curse.dataset.checked = false
            rotation[curse.dataset.type][curse.dataset.name] = false
          }
        })
      }

      const checkedVal = element.dataset.checked === 'true'
      element.dataset.checked = !checkedVal
      rotation[element.dataset.type][element.dataset.name] = !checkedVal
      localStorage.rotation = JSON.stringify(rotation)
      if (refreshStats) {
        refreshCharacterStats()
      }
      event.preventDefault()
    }
  })

  document.addEventListener("change", function(e) {
    // Fired when the user changes any settings such as fight length, iteration amount, etc.
    if (e.target.matches("#sim-settings select, #sim-settings input")) {
      settings[e.target.getAttribute("name")] = e.target.value
      localStorage.settings = JSON.stringify(settings)
      refreshCharacterStats()
      updateSimulationSettingsVisibility()
    }
    // User changes races in the simulation settings
    if (e.target.matches("#race-dropdown-list")) {
      const oldRace = e.target.dataset.currentRace
      const newRace = e.target.value
      e.target.dataset.currentRace = newRace

      // Remove the previous race's stats
      for (const stat in raceStats[oldRace]) {
        if (characterStats.hasOwnProperty(stat)) {
          // Check if the buff is a modifier to know whether to add/subtract or multiply/divide the stat
          if (stat.toLowerCase().search('modifier') !== -1) {
            characterStats[stat] /= raceStats[oldRace][stat]
          } else {
            characterStats[stat] -= raceStats[oldRace][stat]
          }
        }
      }

      // Add the new race's stats
      for (const stat in raceStats[newRace]) {
        if (characterStats.hasOwnProperty(stat)) {
          // Check if the buff is a modifier to know whether to add/subtract or multiply/divide the stat
          if (stat.toLowerCase().search('modifier') !== -1) {
            characterStats[stat] *= raceStats[newRace][stat]
          } else {
            characterStats[stat] += raceStats[newRace][stat]
          }
        }
      }

      document.getElementById("race").innerHTML = document.querySelector("#race-dropdown-list option:checked").innerHTML
      refreshCharacterStats()
    }
  })
})

function updateSimulationSettingsVisibility () {
  // Rotation Options
  if (document.querySelector("#sim-settings input[name='rotationOption']:checked").value === "simChooses") {
    Array.from(document.querySelectorAll("#rotation-list div")).forEach(e => {
      e.style.display = "none"
    })
    document.getElementById("rotation-curse").style.display = ""
  } else {
    Array.from(document.querySelectorAll("#rotation-list div")).forEach(e => {
      e.style.display = ""
    })
  }

  if (talents.demonicSacrifice === 0) {
    document.getElementById("sacrificePet").style.display = "none"
  } else {
    document.getElementById("sacrificePet").style.display = ""
  }


  if (document.getElementById("sacrificePet").style.display === "" && document.querySelector("#sacrificePet select").value === "yes") {
    document.getElementById("petMode").style.display = "none"
  } else {
    document.getElementById("petMode").style.display = ""
  }

  // If not sacrificing the pet or if sacrificing the pet isn't an option then show various pet options
  if (document.querySelector("#sacrificePet select").value === "no" || document.getElementById("sacrificePet").style.display === "none") {
    // Show pet buffs
    document.getElementById("petBuffs-heading").style.display = ""
    Array.from(document.getElementsByClassName("petBuffs")).forEach(e => {
      e.style.display = ""
    })
    // Check if pet is set to aggressive
    if (document.querySelector("#petMode select").value == PetMode.AGGRESSIVE) {
      document.getElementById("prepopBlackBook").style.display = ""
      if (document.querySelector("#petChoice select").value != PetName.IMP) {
        document.getElementById("enemyArmor").style.display = ""
        document.getElementById("enemy-armor-val").closest("li").style.display = ""
      } else {
        document.getElementById("enemyArmor").style.display = "none"
        document.getElementById("enemy-armor-val").closest("li").style.display = "none"
      }
      Array.from(document.getElementsByClassName("petDebuff")).forEach(debuff => {
        debuff.style.display = ""
      })
    } else {
      document.getElementById("prepopBlackBook").style.display = "none"
      document.getElementById("enemyArmor").style.display = "none"
      document.getElementById("enemy-armor-val").closest("li").style.display = "none"
      Array.from(document.getElementsByClassName("petDebuff")).forEach(debuff => {
        debuff.style.display = "none"
      })
    }
  } else {
    document.getElementById("prepopBlackBook").style.display = "none"
    document.getElementById("petBuffs-heading").style.display = "none"
    Array.from(document.getElementsByClassName("petBuffs")).forEach(buff => {
      buff.style.display = "none"
    })
    document.getElementById("enemyArmor").style.display = "none"
    document.getElementById("enemy-armor-val").closest("li").style.display = "none"
    Array.from(document.getElementsByClassName("petDebuff")).forEach(debuff => {
      debuff.style.display = "none"
    })
  }

  if (document.querySelector("#petChoice select").value == PetName.SUCCUBUS && document.querySelector("#petMode select").value == PetMode.AGGRESSIVE && (talents.demonicSacrifice == 0 || document.querySelector("#sacrificePet select").value === "no")) {
    document.getElementById("lashOfPainUsage").style.display = ""
  } else {
    document.getElementById("lashOfPainUsage").style.display = "none"
  }

  if (talents.summonFelguard === 0) {
    document.querySelector("#petChoice option[value='4']").style.display = "none"
  } else {
    document.querySelector("#petChoice option[value='4']").style.display = ""
  }

  if (auras.curseOfTheElements) {
    document.getElementById("improvedCurseOfTheElements").style.display = ""
  } else {
    document.getElementById("improvedCurseOfTheElements").style.display = "none"
  }

  if (auras.prayerOfSpirit) {
    document.getElementById("improvedDivineSpirit").style.display = ""
  } else {
    document.getElementById("improvedDivineSpirit").style.display = "none"
  }

  /* if (talents.conflagrate > 0) {
    $('#conflagrateUse').show()
  } else {
    $('#conflagrateUse').hide()
  } */

  if (auras.powerOfTheGuardianMage) {
    document.getElementById("mageAtieshAmount").style.display = ""
  } else {
    document.getElementById("mageAtieshAmount").style.display = "none"
  }

  if (auras.ferociousInspiration) {
    document.getElementById("ferociousInspirationAmount").style.display = ""
  } else {
    document.getElementById("ferociousInspirationAmount").style.display = "none"
  }

  if (auras.powerOfTheGuardianWarlock) {
    document.getElementById("warlockAtieshAmount").style.display = ""
  } else {
    document.getElementById("warlockAtieshAmount").style.display = "none"
  }

  if (auras.powerInfusion) {
    document.getElementById("powerInfusionAmount").style.display = ""
  } else {
    document.getElementById("powerInfusionAmount").style.display = "none"
  }

  if (auras.bloodlust) {
    document.getElementById("bloodlustAmount").style.display = ""
  } else {
    document.getElementById("bloodlustAmount").style.display = "none"
  }

  if (auras.innervate) {
    document.getElementById("innervateAmount").style.display = ""
  } else {
    document.getElementById("innervateAmount").style.display = "none"
  }

  if (auras.totemOfWrath) {
    document.getElementById("totemOfWrathAmount").style.display = ""
  } else {
    document.getElementById("totemOfWrathAmount").style.display = "none"
  }

  if (auras.vampiricTouch) {
    document.getElementById("shadowPriestDps").style.display = ""
  } else {
    document.getElementById("shadowPriestDps").style.display = "none"
  }

  if (auras.bloodPact) {
    document.getElementById("improvedImp").style.display = ""
  } else {
    document.getElementById("improvedImp").style.display = "none"
  }

  if (document.getElementById("faerieFire").style.display === "" && auras.faerieFire) {
    document.getElementById("improvedFaerieFire").style.display = ""
  } else {
    document.getElementById("improvedFaerieFire").style.display = "none"
  }

  if (document.getElementById("exposeArmor").style.display === "" && auras.exposeArmor) {
    document.getElementById("improvedExposeArmor").style.display = ""
  } else {
    document.getElementById("improvedExposeArmor").style.display = "none"
  }

  if (document.getElementById("exposeWeakness").style.display === "" && auras.exposeWeakness) {
    document.getElementById("survivalHunterAgility").style.display = ""
    document.getElementById("exposeWeaknessUptime").style.display = ""
  } else {
    document.getElementById("survivalHunterAgility").style.display = "none"
    document.getElementById("exposeWeaknessUptime").style.display = "none"
  }

  if (document.querySelector("#customIsbUptime select").value === "yes") {
    document.getElementById("custom-isb-uptime-value").style.display = ""
  } else {
    document.getElementById("custom-isb-uptime-value").style.display = "none"
  }

  if (document.getElementById("fight-type").value === "singleTarget") {
    document.getElementById("enemy-amount").style.display = "none"
  } else {
    document.getElementById("enemy-amount").style.display = ""
  }

  if (selectedItems.neck == 34678) {
    document.getElementById("shattrathFaction").style.display = ""
    document.getElementById("shattrathFactionReputation").style.display = ""
  } else {
    document.getElementById("shattrathFaction").style.display = "none"
    document.getElementById("shattrathFactionReputation").style.display = "none"
  }

  if (auras.wrathOfAirTotem) {
    document.getElementById("improvedWrathOfAirTotem").style.display = ""
  } else {
    document.getElementById("improvedWrathOfAirTotem").style.display = "none"
  }
}