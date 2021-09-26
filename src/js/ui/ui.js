// Maximum amount of web workers that should be run concurrently
const maxWorkers = navigator.hardwareConcurrency || 8
// Object with all the gems the user has equipped on any item, including items that are not equipped. Each key is the item's name and the value is an array with the ID of the gems equipped in that item.
var selectedGems = localStorage.selectedGems ? JSON.parse(localStorage.selectedGems) : {}
// Key: Item slot. Value: Equipped item's ID
var selectedItems = localStorage.selectedItems ? JSON.parse(localStorage.selectedItems) : {}
// Key: Talent's name. Value: Talent's point amount
var talents = localStorage.talents ? JSON.parse(localStorage.talents) : {}
// Key: Aura's name. Value: Boolean
var auras = localStorage.auras ? JSON.parse(localStorage.auras) : {}
var rotation = localStorage.rotation ? JSON.parse(localStorage.rotation) : {}
var selectedEnchants = localStorage.selectedEnchants ? JSON.parse(localStorage.selectedEnchants) : {}
// Key: Item ID. Value: Item's saved DPS from previous simulations.
var savedItemDps = localStorage.savedItemDps ? JSON.parse(localStorage.savedItemDps) : {}
var settings = localStorage.settings ? JSON.parse(localStorage.settings) : {}
var sources = localStorage.sources ? JSON.parse(localStorage.sources) : { phase: { 0: true, 1: true } }
var profiles = localStorage.profiles ? JSON.parse(localStorage.profiles) : {}
var gemPreferences = localStorage.gemPreferences ? JSON.parse(localStorage.gemPreferences) : { hidden: [], favorites: [] }
var hiddenItems = localStorage.hiddenItems ? JSON.parse(localStorage.hiddenItems) : []
var changingItemVisibility = false // True when hiding / showing items in the item table

document.addEventListener("DOMContentLoaded", function() {
  // Buffs, debuffs, consumables, and pet buffs
  for (const auraType in _auras) {
    const lowerAuraType = auraType.toLowerCase().split(' ').join('-')
    document.getElementById("buffs-and-debuffs-section").innerHTML += "<h3 id='" + auraType + "-heading'>" + _auras[auraType].heading + "</h3><ul id='" + lowerAuraType + "-list'></ul>"
    for (const aura in _auras[auraType].auras) {
      const a = _auras[auraType].auras[aura]
      document.getElementById(lowerAuraType + "-list").innerHTML += "<li data-aura-type='" + auraType + "' data-checked='" + (auras[aura] || false) + "' name='" + aura + "' id='" + aura + "' class='" + (a.drums ? 'drums ' : '') + (a.alcohol ? 'alcohol ' : '') + (a.stats ? 'stats ' : '') + (a.potion ? 'potion ' : '') + (a.battleElixir ? 'battle-elixir ' : '') + (a.guardianElixir ? 'guardian-elixir ' : '') + (a.weaponOil ? 'weapon-oil ' : '') + (a.foodBuff ? 'food-buff ' : '') + (a.demonicRune ? 'demonic-rune ' : '') + (a.petOnly ? 'petBuff ' : '') + (a.forPet ? 'petDebuff ' : '') + auraType + " aura'><a href='https://tbc.wowhead.com/" + _auras[auraType].type + '=' + a.id + "'><img alt='" + a.name + "' src='img/" + a.iconName + ".jpg'></a></li>"
    }
  }

  // Spell Selection
  for (const type in _spellSelection) {
    const rotationList = document.getElementById("rotation-list")
    let str = '<div id="rotation-' + _spellSelection[type].header.toLowerCase() + '"><h4>' + _spellSelection[type].header + '</h4>'
    for (const spell in _spellSelection[type].spells) {
      rotation[type] = rotation[type] || {}
      str += "<li data-type='" + type + "' data-name='" + spell + "' class='rotation-" + type + "' data-checked='" + (rotation[type][spell] || false) + "' id='" + type + '-' + spell + "'><a href=https://tbc.wowhead.com/spell=" + _spellSelection[type].spells[spell].id + "><img src='img/" + _spellSelection[type].spells[spell].iconName + ".jpg' alt='" + _spellSelection[type].spells[spell].name + "'></a></li>"
    }
    str += '</div>'
    rotationList.innerHTML += str
  }

  // Talent trees
  for (const tree in _talents) {
    if (_talents.hasOwnProperty(tree)) {
      document.getElementById("talents-section").innerHTML += "<div class='talent-tree-div'><table data-name='" + tree + "' background='img/talent_tree_background_" + tree + ".jpg' id='talent-table-" + tree + "' class='talent-tree-table'></table><div class='talent-tree-name'><h3 style='display: inline-block;' data-name='" + tree + "'>" + tree.charAt(0).toUpperCase() + tree.slice(1) + "</h3><span class='clear-talent-tree'>&#10060;</span></div></div>"
      document.getElementById("talent-table-" + tree).innerHTML += "<tbody></tbody>"
      document.getElementById("talent-table-" + tree).dataset.points = 0
      document.querySelectorAll("#talent-table-" + tree + " tbody")[0].innerHTML += "<tr class='" + tree + "-tree-row'></tr>"
      let lastRow = document.querySelectorAll("#talent-table-" + tree + " tbody tr:last-child")[0]
      let currentCol = 1

      for (const talent in _talents[tree]) {
        const t = _talents[tree][talent]
        talents[talent] = talents[talent] || 0
        talentPointsRemaining -= talents[talent]
        document.getElementById("talent-table-" + tree).dataset.points = parseInt(document.getElementById("talent-table-" + tree).dataset.points) + talents[talent]

        // Check if the current talent should be in the next row below and create a new row if true
        if (t.row > document.getElementsByClassName(tree + "-tree-row").length) {
          $('#talent-table-' + tree + ' tbody').append($("<tr class='" + tree + "-tree-row'></tr>"))
          lastRow = document.querySelectorAll("#talent-table-" + tree + " tbody tr:last-child")[0]
          currentCol = 1
        }

        // Create empty cells between talents if skipping a number (e.g. going from column 1 straight to column 4)
        while (currentCol < t.column) {
          lastRow.innerHTML += "<td></td>"
          currentCol++
        }

        lastRow.innerHTML += "<td><div data-maxpoints='" + t.rankIDs.length + "' data-points='" + talents[talent] + "' class='talent-icon' data-tree='" + tree + "' id='" + talent + "'><a href='https://tbc.wowhead.com/spell=" + t.rankIDs[Math.max(0, talents[talent] - 1)] + "'><img src='img/" + t.iconName + ".jpg' alt='" + t.name + "'><span id='" + talent + "-point-amount' class='talent-point-amount'>" + talents[talent] + '</span></a></div></td>'

        // Check if the text displaying the talent point amount should be hidden or colored (for maxed out talents)
        const pointAmount = document.querySelectorAll("#" + talent + "-point-amount")[0]
        if (pointAmount && pointAmount.innerHTML <= 0) {
          pointAmount.style.display = "none"
        } else if (pointAmount.innerHTML == t.rankIDs.length) {
          pointAmount.style.color = "#ffcd45"
        } else {
          pointAmount.style.color = "#7FFF00"
        }
        currentCol++
      }

      updateTalentTreeNames()
    }
  }

  // When the user clicks anywhere on the webpage
  document.addEventListener("click", function(e) {
    // Hide the gem selection table if the user clicks outside of it.
    if (e.target.id !== 'gem-selection-table' && !e.target.className.split(' ').includes('gem-info') && e.target.id != 'show-hidden-gems-button') {
      document.getElementById("gem-selection-table").style.display = "none"
    }
  })

  // User clicks on the X on a section to hide it
  Array.from(document.querySelectorAll(".close, #export-close-button")).forEach(element => {
    element.addEventListener("click", function() {
      element.closest(".close-button-target").style.display = "none"
      return false
    })
  })

  // "Import/Export" button in the Profile Options fieldset
  document.getElementById("import-export-button").addEventListener("click", function() {
    document.querySelectorAll("#import-export-window textarea")[0].value = ""
    document.getElementById("import-export-window").style.display = ""
  })

  // Importing settings
  document.getElementById("import-button").addEventListener("click", function() {
    const data = JSON.parse(document.querySelectorAll("#import-export-window textarea")[0].value)
    if (data.auras) localStorage.auras = JSON.stringify(data.auras)
    if (data.selectedGems) localStorage.selectedGems = JSON.stringify(data.selectedGems)
    if (data.selectedItems) localStorage.selectedItems = JSON.stringify(data.selectedItems)
    if (data.talents) localStorage.talents = JSON.stringify(data.talents)
    if (data.rotation) localStorage.rotation = JSON.stringify(data.rotation)
    if (data.selectedEnchants) localStorage.selectedEnchants = JSON.stringify(data.selectedEnchants)
    if (data.settings) localStorage.settings = JSON.stringify(data.settings)
    location.reload()
  })

  // Exporting settings
  document.getElementById("export-button").addEventListener("click", function() {
    const data =
    {
      auras: auras,
      selectedGems: selectedGems,
      selectedItems: selectedItems,
      talents: talents,
      rotation: rotation,
      selectedEnchants: selectedEnchants,
      settings: settings
    }
    document.querySelectorAll("#import-export-window textarea")[0].value = JSON.stringify(data)
    document.querySelectorAll("#import-export-window textarea")[0].select()
  })
})

function updateSetBonuses () {
  Array.from(document.getElementsByClassName("sidebar-set-bonus")).forEach(element => {
    element.parentNode.removeChild(element)
  })
  const setBonusCounter = {}

  for (let itemSlot in selectedItems) {
    const itemId = selectedItems[itemSlot]
    if (itemId) {
      if (itemSlot == 'ring1' || itemSlot == 'ring2' || itemSlot == 'trinket1' || itemSlot == 'trinket2') {
        itemSlot = itemSlot.substring(0, itemSlot.length - 1)
      }
      for (const item in items[itemSlot]) {
        if (items[itemSlot][item].id === itemId) {
          const setID = items[itemSlot][item].setId
          if (setID) {
            setBonusCounter[setID] = setBonusCounter[setID] + 1 || 1
            break
          }
        }
      }
    }
  }

  for (set in setBonusCounter) {
    // Check if the item's set has actually been implemented
    if (sets[set]) {
      for (let i = sets[set].bonuses.length - 1; i >= 0; i--) {
        if (sets[set].bonuses[i] <= setBonusCounter[set]) {
          document.getElementById("sidebar-sets").innerHTML += "<li class='sidebar-set-bonus'><a href='https://tbc.wowhead.com/item-set=" + set + "'>" + sets[set].name + ' (' + setBonusCounter[set] + ')</a></li>'
          break
        }
      }
    }
  }

  localStorage.setBonuses = JSON.stringify(setBonusCounter)
}