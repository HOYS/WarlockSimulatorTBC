import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemSlotToItemSlotKey } from "./Common";
import { Auras } from "./Data/Auras";
import { Enchants } from "./Data/Enchants";
import { Items } from "./Data/Items";
import { Races } from "./Data/Races";
import { modifyPlayerStat } from "./PlayerSlice";
import { RootState } from "./Store";
import { ItemSlot, Stat } from "./Types";


export default function Session() {
  const playerStore = useSelector((state: RootState) => state.player);
  const dispatch = useDispatch();

  useEffect(() => {
    addRaceStats();
    addAuraStats();
    addItemStats();
    addEnchantStats();

    function addRaceStats() {
      const selectedRace = Races.find(e => e.varName === playerStore.settings.race);

      if (selectedRace != null) {
        Object.entries(selectedRace.stats).forEach(([key, val]) => dispatch(modifyPlayerStat({
          stat: key as Stat,
          value: val,
          action: 'add'
        })));
      }
    }

    function addAuraStats() {
      Auras.forEach((auraGroup) => {
        auraGroup.auras.forEach((aura) => {
          if (playerStore.auras[aura.varName] === true) {
            for (const stat in aura.stats) {
              dispatch(modifyPlayerStat({
                stat: stat as Stat,
                value: aura.stats[stat as Stat]!!,
                action: 'add'
              }));
            }
          }
        });
      })
    }

    function addItemStats() {
      for (const [itemSlot, itemId] of Object.entries(playerStore.selectedItems)) {
        if (itemId !== 0) {
          for (const [stat, value] of Object.entries(Items[ItemSlotToItemSlotKey(itemSlot as ItemSlot)].find(e => e.id === itemId)!!)) {
            if (playerStore.stats.hasOwnProperty(stat)) {
              dispatch(modifyPlayerStat({
                stat: stat as Stat,
                value: value,
                action: 'add'
              }))
            }
          }
        }
      }
    }

    function addEnchantStats() {
      for (const [itemSlot, enchantId] of Object.entries(playerStore.selectedEnchants)) {
        if (enchantId !== 0) {
          const enchantObj = Enchants[ItemSlotToItemSlotKey(itemSlot as ItemSlot)].find(e => e.id === enchantId);
          
          if (enchantObj) {
            for (const [stat, value] of Object.entries(enchantObj)) {
              if (playerStore.stats.hasOwnProperty(stat)) {
                dispatch(modifyPlayerStat({
                  stat: stat as Stat,
                  value: value,
                  action: 'add'
                }))
              }
            }
          }
        }
      }
    }
  }, []);

  return(<div></div>);
}