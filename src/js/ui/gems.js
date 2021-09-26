document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("click", function(e) {
    // User clicks on a star next to a gem to favorite it
    if (e.target && e.target.matches('.gem-favorite-star')) {
      const favorited = e.target.dataset.favorited == 'true'
      const gemId = parseInt(e.target.closest("tr").dataset.id)
      const favoritesArrayIndex = gemPreferences.favorites.indexOf(gemId)
      // Toggle the favorited data value
      e.target.dataset.favorited = !favorited

      // Remove or add the gem to the favorite gem array
      if (favorited && favoritesArrayIndex > -1) {
        gemPreferences.favorites.splice(favoritesArrayIndex, 1)
      } else if (!favorited && favoritesArrayIndex < 0) {
        gemPreferences.favorites.push(gemId)
      }
      localStorage.gemPreferences = JSON.stringify(gemPreferences)
    }
    // User clicks on the X next to a gem to hide it
    else if (e.target && e.target.matches(".gem-hide")) {
      const tr = e.target.closest("tr")
      const hidden = e.target.dataset.hidden == 'true'
      const gemId = parseInt(tr.dataset.id)
      const hiddenArrayIndex = gemPreferences.hidden.indexOf(gemId)
      e.target.dataset.hidden = !hidden

      if (hidden && hiddenArrayIndex > -1) {
        gemPreferences.hidden.splice(hiddenArrayIndex, 1)
        tr.dataset.hidden = 'false'
        if (gemPreferences.hidden.length == 0) {
          document.getElementById("show-hidden-gems-button").closest("tr").style.display = "none"
          document.getElementById("show-hidden-gems-button").dataset.enabled = 'false'
        }
      } else if (!hidden && hiddenArrayIndex < 0) {
        gemPreferences.hidden.push(gemId)
        tr.dataset.hidden = 'true'
        if (document.getElementById("show-hidden-gems-button").dataset.enabled == 'false') {
          tr.style.display = "none"
        }
        if (gemPreferences.hidden.length > 0) {
          document.getElementById("show-hidden-gems-button").closest("tr").style.display = ""
        }
      }
      localStorage.gemPreferences = JSON.stringify(gemPreferences)
    }
    // User clicks on a gem in the gem selection table
    else if (e.target && e.target.matches(".gem-name, .gem-name a")) {
      const tr = e.target.closest("tr")
      const itemId = document.getElementById("gem-selection-table").dataset.itemid
      const itemSlot = document.querySelector('.item-row[data-wowheadid="' + itemId + '"]').dataset.slot
      const gemColor = tr.dataset.color
      const gemId = tr.dataset.id
      const socket = document.querySelector('.item-row[data-wowheadid="' + itemId + '"] .gem:nth-child(' + (parseInt(document.getElementById("gem-selection-table").dataset.socketslot) + 1) + ')')
      const socketColor = e.target.closest("#gem-selection-table").dataset.color
      const socketSlot = document.getElementById("gem-selection-table").dataset.socketslot
      let gemIconName = null
      let href = null
      selectedGems[itemSlot] = selectedGems[itemSlot] || {}

      if (!selectedGems[itemSlot][itemId]) {
        // The amount of sockets in the item
        const socketAmount = $('.item-row[data-wowheadid="' + itemId + '"]').find('.gem').last().data('order') + 1
        if (socketAmount > 0) {
          selectedGems[itemSlot][itemId] = Array(socketAmount).fill(null)
        }
      }

      // Check whether the user chose a gem or the option to remove the current gem
      if (gemId == '0') {
        gemIconName = socketInfo[gemColor].iconName + '.jpg'
        href = ''
      } else {
        gemIconName = gems[gemColor][gemId].iconName + '.jpg'
        href = 'https://tbc.wowhead.com/item=' + gemId
      }

      // Check if the socket that was changed was on an equipped item
      if (socket.closest('tr').dataset.wowheadid == selectedItems[itemSlot]) {
        // Remove stats from old gem if equipped
        if (selectedGems[itemSlot][itemId][socketSlot]) {
          modifyStatsFromGem(selectedGems[itemSlot][itemId][socketSlot][1], 'remove')
          if (document.querySelector(".item-row[data-wowheadid='" + itemId + "']").dataset.socketbonusactive == 'true') {
            modifyStatsFromItemSocketBonus(itemId, 'remove')
          }
        }
        // Add stats from new gem
        if (gemId) {
          modifyStatsFromGem(gemId, 'add')
        }
      }


      if (document.querySelector(".item-row[data-wowheadid='" + itemId + "']").dataset.socketbonusactive == 'true') {
        document.querySelector(".item-row[data-wowheadid='" + itemId + "']").dataset.socketbonusactive == 'false'
      }

      if (gemId == 0) {
        selectedGems[itemSlot][itemId][socketSlot] = null
      } else {
        selectedGems[itemSlot][itemId][socketSlot] = [socketColor, gemId]
      }
      if (itemMeetsSocketRequirements(itemId)) {
        // Only add the socket bonus if the player has the item equipped
        if (socket.closest('tr').dataset.wowheadid == selectedItems[itemSlot]) {
          modifyStatsFromItemSocketBonus(itemId, 'add')
        }
        document.querySelector(".item-row[data-wowheadid='" + itemId + "']").dataset.socketbonusactive = 'true'
      }
      socket.setAttribute('src', 'img/' + gemIconName)
      socket.closest('a').setAttribute('href', href)
      localStorage.selectedGems = JSON.stringify(selectedGems)
      document.getElementById("gem-selection-table").style.display = "none"
      refreshCharacterStats()
      e.preventDefault()
    }
    // User clicks on the "Toggle Hidden Gems" button in the gem selection table
    else if (e.target && e.target.matches("#show-hidden-gems-button")) {
      const enabled = e.target.dataset.enabled == 'true'
      e.target.dataset.enabled = !enabled

      // Hide/show all the hidden gems
      Array.from(document.querySelectorAll(".gem-row[data-hidden='true']")).forEach(element => {
        element.style.display = enabled ? "none" : ""
      })
      e.preventDefault()
    }
    // "Fill Item Sockets" button clicked
    else if (e.target && e.target.matches('#gem-options-button')) {
      // Toggle the visibility of the gem options window
      document.getElementById("gem-options-window").style.display = document.getElementById("gem-options-window").style.display == "none" ? "" : "none"

      if (document.getElementById("gem-options-window").style.display == "") {
        const selectedSocketColor = document.querySelector('#gem-options-window-socket-selection input[type="radio"]:checked').value
        refreshGemOptionsGems(selectedSocketColor)
      }
    }
  })
  document.addEventListener("contextmenu", function(e) {
    // Remove gem from item socket if user right clicks on the socket
    if (e.target && e.target.matches("#item-selection-table tbody .gem")) {
      // Check whether there is a gem in the socket or not
      if (e.target.closest("a").getAttribute("href") !== '') {
        const tr = e.target.closest("tr")
        const socketColor = e.target.dataset.color
        const itemSlot = tr.dataset.slot
        const itemId = tr.dataset.wowheadid
        const socketOrder = e.target.dataset.order

        if (document.querySelector(".item-row[data-wowheadid='" + itemId + "']").dataset.socketbonusactive == 'true') {
          if (selectedItems[itemSlot] == itemId) {
            modifyStatsFromItemSocketBonus(itemId, 'remove')
          }
          document.querySelector(".item-row[data-wowheadid='" + itemId + "']").dataset.socketbonusactive = 'false'
        }

        if (selectedItems[itemSlot] == itemId) {
          modifyStatsFromGem(selectedGems[itemSlot][itemId][socketOrder][1], 'remove')
        }
        e.target.setAttribute("src", 'img/' + socketInfo[socketColor].iconName + '.jpg')
        e.target.closest("a").setAttribute("href", "")
        selectedGems[itemSlot][itemId][socketOrder][1] = null
        localStorage.selectedGems = JSON.stringify(selectedGems)
        refreshCharacterStats()
      }

      e.preventDefault()
    }
  })
})

// When one of the socket selection radio buttons gets changed in the "Fill Item Sockets"
$('#gem-options-window-socket-selection').change(function () {
  const selectedSocketColor = $('#gem-options-window-socket-selection input[type="radio"]:checked').val()
  refreshGemOptionsGems(selectedSocketColor)
})

// A gem in the "Fill Item Sockets" options gets clicked
$(document).on('click', '.gem-options-gem', function () {
  $('.gem-options-gem').attr('data-checked', 'false')
  $(this).attr('data-checked', 'true')
  return false
})

// "Apply" button in the "Fill item sockets" options is clicked
$('#gem-options-apply-button').click(function () {
  const selectedGemId = Number($('.gem-options-gem[data-checked="true"]').attr('data-gem-id'))

  if (selectedGemId) {
    const fillAllSockets = $('#gem-options-window-replacement-options input[type="radio"]:checked').val() == 'allSockets'
    const allItems = $('#gem-options-window-item-slot input[type="radio"]:checked').val() == 'allItems'
    const selectedSocketColor = $('#gem-options-window-socket-selection input[type="radio"]:checked').val()

    // Loop through all items
    for (const itemSlot in items) {
      if (allItems || localStorage.selectedItemSlot == itemSlot) {
        // Create an object for this item slot if it doesn't already exist in the selectedGems object
        if (!selectedGems[itemSlot]) {
          selectedGems[itemSlot] = {}
        }
        for (const item in items[itemSlot]) {
          const i = items[itemSlot][item]
          // Check if item has the socket color
          if (items[itemSlot][item].hasOwnProperty(selectedSocketColor)) {
            // Create the gem array for the item if it doesn't have one already
            if (!selectedGems[itemSlot][i.id]) {
              selectedGems[itemSlot][i.id] = []

              // Loop through the item's sockets and for each socket, create an array where the first index is the socket color and 2nd index is the gem id (null for now)
              for (const socketColor in socketInfo) {
                if (i.hasOwnProperty(socketColor)) {
                  // Create an x amount of sockets for the item where x is the amount of sockets the item has of the color 'socketColor'
                  for (let j = 0; j < i[socketColor]; j++) {
                    selectedGems[itemSlot][i.id].push([socketColor, null])
                  }
                }
              }
            }
            // Fill the item's socket(s)
            for (const socket in selectedGems[itemSlot][i.id]) {
              let s = selectedGems[itemSlot][i.id][socket]
              // Checks if the socket is the color that the user chose to fill
              if (s && s[0] == selectedSocketColor && (s[1] == null || fillAllSockets)) {
                s[1] = selectedGemId
              }
            }
          }
        }
      }
    }
    // Save the selectedGems object in the localStorage and reload the page
    localStorage.selectedGems = JSON.stringify(selectedGems)
    location.reload()
  }
})

// Adds gems to the "Fill Item Sockets" window
function refreshGemOptionsGems (socketColor) {
  // Remove all currently listed gems
  $('.gem-options-gem').remove()

  for (const socket in gems) {
    // If the socket is a meta gem socket then only show meta gems, otherwise show all non-meta gems
    if ((socketColor === 'meta' && socket === 'meta') || (socketColor !== 'meta' && socket !== 'meta')) {
      for (const gem in gems[socket]) {
        const g = gems[socket][gem]
        if (!gemPreferences.hidden.includes(Number(gem))) {
          $('#gem-options-gem-list').append('<div class="gem-options-gem" data-gem-id="' + gem + '"><img src="img/' + g.iconName + '.jpg"><a href="https://tbc.wowhead.com/item=' + gem +'">' + g.name + '</a></div>')
        }
      }
    }
  }
}

function modifyStatsFromGem (gemId, action) {
  for (const color in gems) {
    if (gems[color][gemId]) {
      for (const property in gems[color][gemId]) {
        if (characterStats.hasOwnProperty(property)) {
          if (action == 'add') {
            // Check whether the stat is a modifier or not. If it's a modifier then multiply/divide rather than add/substract
            if (property.toLowerCase().search('modifier') !== -1) { 
              characterStats[property] *= gems[color][gemId][property]
            } else {
              characterStats[property] += gems[color][gemId][property]
            }
          } else if (action == 'remove') {
            if (property.toLowerCase().search('modifier') !== -1) { 
              characterStats[property] /= gems[color][gemId][property]
            } else {
              characterStats[property] -= gems[color][gemId][property]
            }
          }
        }
      }
      return
    }
  }
}