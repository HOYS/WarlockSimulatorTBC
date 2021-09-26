document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("click", function(e) {
    // User clicks on an enchant
    if (e.target && e.target.matches("#enchant-selection-table tbody tr td, #enchant-selection-table tbody tr td a")) {
      const tr = e.target.closest("tr")
      const itemSlot = tr.dataset.slot
      const subSlot = tr.dataset.subSlot || ''
      const enchantId = tr.dataset.wowheadid

      // Toggle the enchant's selected data boolean.
      const equipped = tr.dataset.selected == 'true' && selectedEnchants[itemSlot + subSlot] && selectedEnchants[itemSlot + subSlot] == enchantId
      tr.dataset.selected = !equipped

      // Check if the user already has an enchant equipped in this slot and unequip it if so
      if (selectedEnchants[itemSlot + subSlot]) {
        document.querySelector("#enchant-selection-table tr[data-wowheadid='" + selectedEnchants[itemSlot + subSlot] + "']").dataset.selected = false
        modifyStatsFromEnchant(selectedEnchants[itemSlot + subSlot], 'remove')
        selectedEnchants[itemSlot + subSlot] = null
      }

      if (!equipped) {
        modifyStatsFromEnchant(enchantId, 'add')
        selectedEnchants[itemSlot + subSlot] = enchantId
      }
      localStorage.selectedEnchants = JSON.stringify(selectedEnchants)
      refreshCharacterStats()
      e.preventDefault()
    }
  })
})

// Adds or removes an enchant's stats from the player
function modifyStatsFromEnchant (enchantId, action) {
  for (const itemSlot in enchants) {
    for (const enchant in enchants[itemSlot]) {
      if (enchants[itemSlot][enchant].id == enchantId) {
        const enchantObj = enchants[itemSlot][enchant]

        if (action == 'remove') {
          for (const stat in enchantObj) {
            if (characterStats.hasOwnProperty(stat)) {
              characterStats[stat] -= enchantObj[stat]
            }
          }
        } else if (action == 'add') {
          for (const stat in enchantObj) {
            if (characterStats.hasOwnProperty(stat)) {
              characterStats[stat] += enchantObj[stat]
            }
          }
        }
        return
      }
    }
  }
}

function loadEnchantsBySlot (itemSlot, subSlot = null) {
  if (itemSlot == 'mainhand' || itemSlot == 'twohand') {
    itemSlot = 'weapon'
  }

  if (enchants[itemSlot]) {
    Array.from(document.getElementsByClassName("enchant-row")).forEach(element => {
      element.parentNode.removeChild(element)
    })
    const tableBody = document.querySelector("#enchant-selection-table tbody")

    for (const enchant of Object.keys(enchants[itemSlot])) {
      const e = enchants[itemSlot][enchant]
      tableBody.innerHTML += "<tr data-slot='" + itemSlot + "' data-subSlot='" + (subSlot || '') + "' data-name='" + enchant + "' data-selected='" + (selectedEnchants[itemSlot + (subSlot || '')] == e.id || 'false') + "' class='enchant-row' data-wowheadid='" + e.id + "'><td><a href='https://tbc.wowhead.com/spell=" + e.id + "'>" + e.name + '</a></td><td>' + (e.spellPower || '') + '</td><td>' + (e.shadowPower || '') + '</td><td>' + (e.firePower || '') + '</td><td>' + (e.hitRating || '') + '</td><td>' + (e.critRating || '') + '</td><td>' + (e.stamina || '') + '</td><td>' + (e.intellect || '') + '</td><td>' + (e.mp5 || '') + '</td><td>' + (e.spellPen || '') + '</td><td>' + (localStorage[enchant + 'Dps'] || '') + '</td></tr>'
    }

    document.getElementById("enchant-selection-table").style.display = ""
  } else {
    document.getElementById("enchant-selection-table").style.display = "none"
  }

  refreshCharacterStats()
}