// Array of consumables whose clicks we want to track.
const consumableTypesToTrack = ['.drums', '.weapon-oil', '.battle-elixir', '.guardian-elixir', '.food-buff', '.potion', '.demonic-rune', '.alcohol']

document.addEventListener("DOMContentLoaded", function() {
  // When a buff/debuff/consumable is clicked
  document.addEventListener("click", function(e) {
    if (e.target && e.target.matches(".aura img")) {
      const li = e.target.closest("li")
      const auraType = li.dataset.auraType
      const auraName = li.getAttribute("name")
      const checkedVal = li.dataset.checked === "true"

      li.dataset.checked = !checkedVal
      auras[li.getAttribute("name")] = !checkedVal
      
      if (auraName == 'wrathOfAirTotem' || auraName == 'bloodPact' || auraName == 'innervate' || auraName == 'powerInfusion' || auraName == 'ferociousInspiration' || auraName == 'faerieFire' || auraName == 'vampiricTouch' || auraName == 'exposeArmor' || auraName == 'exposeWeakness' || auraName == 'totemOfWrath' || auraName == 'curseOfTheElements' || auraName == 'prayerOfSpirit' || auraName == 'powerOfTheGuardianWarlock' || auraName == 'powerOfTheGuardianMage' || auraName == 'drumsOfBattle' || auraName == 'drumsOfWar' || auraName == 'drumsOfRestoration' || auraName == 'bloodlust') {
        updateSimulationSettingsVisibility()
      }
      if (!li.classList.contains("petBuff")) {
        modifyStatsFromAura(_auras[auraType].auras[auraName], checkedVal)
        refreshCharacterStats()
      }
      localStorage.auras = JSON.stringify(auras)
      event.preventDefault()
    }
    // When a consumable is clicked, uncheck all other types of that consumable since we can only have one at a time (e.g. disable all other weapon oils if a weapon oil is clicked).
    if (e.target && e.target.matches(consumableTypesToTrack.join(','))) {
      const li = e.target.closest("li")
      const clickedConsumableName = li.getAttribute("name")
      const consumableTypes = []

      // Loop through the consumable types we're tracking and check if the consumable that got clicked has any of those consumables as a class.
      for (let i = 0; i < consumableTypesToTrack.length; i++) {
        if ($(this).hasClass(consumableTypesToTrack[i].substring(1))) {
          consumableTypes.push(consumableTypesToTrack[i])
        }
      }
      
      // Loop through the consumable classes we found in the previous loop and uncheck all childs of those classes aside from the consumable that just got clicked
      $(consumableTypes.join(',')).each(function () {
        const consumableName = $(this).attr('name')
      
        if (consumableName !== clickedConsumableName) {
          if (li.dataset.checked === "true") {
            li.dataset.checked = false
            auras[consumableName] = false
      
            for (const stat in _auras.consumables.auras[consumableName]) {
              if (characterStats.hasOwnProperty(stat)) {
                characterStats[stat] -= _auras.consumables.auras[consumableName][stat]
              }
            }
          }
        }
      })
      
      localStorage.auras = JSON.stringify(auras)
      refreshCharacterStats()
      event.preventDefault()
    }
  })
})

function modifyStatsFromAura (auraObject, checked) {
  for (const stat in auraObject) {
    if (characterStats.hasOwnProperty(stat)) {
      // Check if the buff is a modifier to know whether to add/subtract or multiply/divide the stat
      if (stat.toLowerCase().search('modifier') !== -1) {
        if (checked) {
          characterStats[stat] /= auraObject[stat]
        } else {
          characterStats[stat] *= auraObject[stat]
        }
      } else {
        if (checked) {
          characterStats[stat] -= auraObject[stat]
        } else {
          characterStats[stat] += auraObject[stat]
        }
      }
    }
  }
}