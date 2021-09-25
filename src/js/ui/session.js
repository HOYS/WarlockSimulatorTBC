document.addEventListener("DOMContentLoaded", function() {
  // Load saved simulation settings
  Array.from(document.querySelectorAll("#sim-settings select, #sim-settings input")).forEach(element => {
    let elementName = element.getAttribute("name")

    if (settings[elementName]) {
      if (element.getAttribute("type") == "radio") {
        // Set the radio button to checked if its value is the saved settings value
        element.checked = element.value == settings[elementName]
      } else {
        element.value = settings[elementName]
      }
    } else {
      // If the setting is not initialized in the settings object then set it to its default value
      settings[elementName] = element.value
    }
  })

  // Load checked items sources
  Array.from(document.querySelectorAll("#source-filters ul li")).forEach(element => {
    const s = element.dataset.source
    const val = element.dataset.value
    element.dataset.checked = sources[s] && sources[s][val] || false
  })

  // Add the stats from all the items the user has equipped from previous sessions
  for (const itemSlot in selectedItems) {
    for (const slot in items) {
      for (const item in items[slot]) {
        if (items[slot][item].id == selectedItems[itemSlot]) {
          modifyStatsFromItem(items[slot][item], 'add')
          break
        }
      }
    }
  }

  // Same as above but for enchants
  for (const itemSlot in selectedEnchants) {
    for (const slot in enchants) {
      for (const enchant in enchants[slot]) {
        if (enchants[slot][enchant].id == selectedEnchants[itemSlot]) {
          modifyStatsFromEnchant(enchants[slot][enchant].id, 'add')
          break
        }
      }
    }
  }

  // Add stats from gems in equipped items
  for (itemSlot in selectedItems) {
    const itemId = selectedItems[itemSlot]
    if (selectedGems[itemSlot] && selectedGems[itemSlot][itemId]) {
      for (gem in selectedGems[itemSlot][itemId]) {
        const gemArray = selectedGems[itemSlot][itemId][gem]
        if (gemArray) {
          modifyStatsFromGem(gemArray[1], 'add')
        }
      }
      // Add stats from the socket bonus if the gem colors match the socket colors
      if (itemMeetsSocketRequirements(itemId)) {
        modifyStatsFromItemSocketBonus(itemId, 'add')
      }
    }
  }

  // Add stats from the player's selected race
  const currentRace = document.getElementById("race-dropdown-list").value
  for (const stat in raceStats[currentRace]) {
    if (characterStats.hasOwnProperty(stat)) {
      // Check if the buff is a modifier to know whether to add/subtract or multiply/divide the stat
      if (stat.toLowerCase().search('modifier') !== -1) {
        characterStats[stat] *= raceStats[currentRace][stat]
      } else {
        characterStats[stat] += raceStats[currentRace][stat]
      }
    }
  }

  // Add stats from selected auras
  for (const auraType in _auras) {
    for (const aura in _auras[auraType].auras) {
      if (auras[aura]) {
        modifyStatsFromAura(_auras[auraType].auras[aura], false)
      }
    }
  }

  // Use previous simulation's result on the sidebar
  document.getElementById("avg-dps").innerHTML = localStorage.medianDps || ''
  document.getElementById("min-dps").innerHTML = localStorage.minDps || ''
  document.getElementById("max-dps").innerHTML = localStorage.maxDps || ''
  if (localStorage.simulationDuration) {
    document.getElementById("sim-length-result").innerHTML = Math.round(localStorage.simulationDuration * 10000) / 10000 + 's'
  }

  // Add buttons for the saved settings selection
  drawProfileButtons()
  // Show the Save/Delete/Rename buttons if a profile is selected
  if (localStorage.selectedProfile) {
    Array.from(document.querySelectorAll("#update-profile-div button")).forEach(element => {
      element.style.display = ""
    })
  }

  document.getElementById("race-dropdown-list").dataset.currentRace = currentRace // Store the currently selected race to know the user's previous race when changing in the dropdown list.
  document.getElementById("race").innerHTML = document.querySelector("#race-dropdown-list option:checked").innerHTML // Set the player's race at the top of the sidebar (just a visual description)
  // Initialize tablesorter on the item list and breakdown tables
  $('#item-selection-table').tablesorter()
  $('#damage-breakdown-table').tablesorter()
  $('#aura-breakdown-table').tablesorter()
  $('#mana-gain-breakdown-table').tablesorter()
  loadItemsBySlot(localStorage.selectedItemSlot, localStorage.selectedItemSubSlot)
  let newItemSelector = "#item-slot-selection-list li[data-slot='" + (localStorage.selectedItemSlot || 'mainhand') + "']"
  if (localStorage.selectedItemSubSlot) newItemSelector += "[data-subslot='" + localStorage.selectedItemSubSlot + "']"
  document.querySelector(newItemSelector).dataset.selected = true
  refreshCharacterStats()
  updateSimulationSettingsVisibility()
  updateSetBonuses()
})