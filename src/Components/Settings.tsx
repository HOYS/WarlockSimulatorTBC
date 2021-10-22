

export default function Settings() {
  return(
    <section id="sim-settings">
      <fieldset>
        <legend>Rotation Options</legend>
        <input type='radio' name='rotationOption' value='simChooses' checked />
        <label htmlFor='simChooses'>Simulation chooses spells for me</label>
        <br/>
        <input type='radio' name='rotationOption' value='userChooses'/>
        <label htmlFor='userChooses'>Choose spells myself</label>
      </fieldset>
      <ul>
        <li>
          <span className="settings-left">Race</span>
          <select name="race" id="race-dropdown-list" className="settings-right">
            <option value="gnome">Gnome</option>
            <option value="human">Human</option>
            <option value="orc">Orc</option>
            <option value="undead">Undead</option>
            <option value="bloodElf">Blood Elf</option>
          </select>
        </li>
        <li>
          <span className="settings-left">Iterations</span>
          <input id="iterations" value="10000" step='1000' min="1000" type="number" name="iterations" className="settings-right" />
        </li>
        <li>
          <span className="settings-left">Min Fight Length</span>
          <input id="min-fight-length" value="150" type="number" name="min-fight-length" className="settings-right" />
        </li>
        <li>
          <span className="settings-left">Max Fight Length</span>
          <input id="max-fight-length" value="210" type="number" name="max-fight-length" className="settings-right" />
        </li>
        <li>
          <span className="settings-left">Target Level</span>
          <input id="target-level" value="73" type="number" name="target-level" className="settings-right" />
        </li>
        <li>
          <span className="settings-left">Target Shadow Resistance</span>
          <input id="target-shadow-resistance" value="0" type="number" name="target-shadow-resistance" className="settings-right" />
        </li>
        <li>
          <span className="settings-left">Target Fire Resistance</span>
          <input id="target-fire-resistance" value="0" type="number" name="target-fire-resistance" className="settings-right" />
        </li>
        <li>
          <span className="settings-left">Fight Type</span>
          <select name="fightType" id="fight-type" className="settings-right">
            <option value="singleTarget">Single Target</option>
            <option value="aoe">AoE (Seed of Corruption)</option>
          </select>
        </li>
        <li id="enemy-amount" title="Including the target you're casting Seed of Corruption on">
          <span className="settings-left">Enemy Amount</span>
          <input name="enemyAmount" className="settings-right" value="5" step="1" min="1" type="number" />
        </li>
        <li id='automatically-open-sim-details'>
          <label className="settings-left" htmlFor="automatically-open-sim-details">Show Damage & Aura Tables</label>
          <select className="settings-right" name="automatically-open-sim-details">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </li>
        <li id='randomizeValues' title="Chooses a random value between a minimum and a maximum value instead of taking the average of the two.">
          <label className="settings-left" htmlFor="randomizeValues">Randomize instead of averaging</label>
          <select className="settings-right" name="randomizeValues">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </li>
        <li id="infinitePlayerMana">
          <label className="settings-left" htmlFor="infinitePlayerMana">Infinite player mana?</label>
          <select className="settings-right" name="infinitePlayerMana">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </li>
        <li id="infinitePetMana">
          <label className="settings-left" htmlFor="infinitePetMana">Infinite pet mana?</label>
          <select className="settings-right" name="infinitePetMana">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </li>
        <li id='petChoice'>
          <label className="settings-left" htmlFor="petChoice">Pet</label>
          <select className="settings-right" name="petChoice">
            <option value="0">Imp</option>
            <option value="2">Succubus</option>
            <option value="4">Felguard</option>
          </select>
        </li>
        <li id="sacrificePet">
          <label className="settings-left" htmlFor="sacrificePet">Sacrifice pet?</label>
          <select className="settings-right" name="sacrificePet">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </li>
        <li id="petMode">
          <label className="settings-left" htmlFor="petMode">Pet mode</label>
          <select className="settings-right" name="petMode">
            <option value="0">Passive</option>
            <option value="1">Aggressive</option>
          </select>
        </li>
        <li id="prepopBlackBook">
          <label className="settings-left" htmlFor="prepopBlackBook">Prepop Black Book?</label>
          <select className="settings-right" name="prepopBlackBook">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </li>
        <li id="shattrathFaction">
          <label className="settings-left" htmlFor="shattrathFaction">Shattrath Faction</label>
          <select className="settings-right" name="shattrathFaction">
            <option value="Aldor">Aldor</option>
            <option value="Scryers">Scryers</option>
          </select>
        </li>
        <li id="shattrathFactionReputation">
          <label className="settings-left" htmlFor="shattrathFactionReputation">Exalted with Shattrath Faction</label>
          <select className="settings-right" name="shattrathFactionReputation">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </li>
        <li id="lashOfPainUsage">
          <label className='settings-left' htmlFor='lashOfPainUsage'>When to use Lash of Pain?</label>
          <select className='settings-right' name='lashOfPainUsage'>
            <option value='noISB'>When ISB is not up</option>
            <option value='onCooldown'>On Cooldown</option>
          </select>
        </li>
        <li id="enemyArmor">
          <label className="settings-left" htmlFor="enemyArmor">Enemy Armor</label>
          <input className="settings-right" value="7700" type="number" min='0' max='10000' name="enemyArmor" />
        </li>
        <li id="improvedCurseOfTheElements">
          <label className="settings-left">Malediction?</label>
          <select className="settings-right" name="improvedCurseOfTheElements">
            <option value='0'>No</option>
            <option value='1'>1/3</option>
            <option value='2'>2/3</option>
            <option value='3'>3/3</option>
          </select>
        </li>
        <li id="powerInfusionAmount">
          <label className="settings-left" htmlFor="powerInfusionAmount">Power Infusion amount</label>
          <select className="settings-right" name="powerInfusionAmount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </li>
        <li id="bloodlustAmount">
          <label className="settings-left" htmlFor="bloodlustAmount">Bloodlust amount</label>
          <select className="settings-right" name="bloodlustAmount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </li>
        <li id="innervateAmount">
          <label className="settings-left" htmlFor="innervateAmount">Innervate amount</label>
          <select className="settings-right" name="innervateAmount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
          </select>
        </li>
        <li id="improvedDivineSpirit">
          <label className="settings-left" htmlFor="improvedDivineSpirit">Improved Divine Spirit?</label>
          <select className="settings-right" name="improvedDivineSpirit">
            <option value="0">No</option>
            <option value="1">1/2</option>
            <option value="2">2/2</option>
          </select>
        </li>
        {/*<li id="conflagrateUse">
          <label className="settings-left" htmlFor="conflagrateUse">When to use Conflagrate?</label>
          <select className="settings-right" name="conflagrateUse">
            <option value="onCooldown">As soon as it's ready</option>
            <option value="immolateAlmostOut">When Immolate has almost run out</option>
          </select>
        </li>*/}
        <li id="mageAtieshAmount">
          <label className="settings-left" htmlFor="mageAtieshAmount">Mage Atiesh amount</label>
          <select className="settings-right" name="mageAtieshAmount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </li>
        <li id="warlockAtieshAmount">
          <label className="settings-left" htmlFor="warlockAtieshAmount">Warlock Atiesh amount</label>
          <select className="settings-right" name="warlockAtieshAmount">
            <option disabled={true} value="0">{'>> Do not count your own Atiesh <<'}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </li>
        <li id="totemOfWrathAmount">
          <label className="settings-left" htmlFor="totemOfWrathAmount">Totem of Wrath amount</label>
          <select className="settings-right" name="totemOfWrathAmount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </li>
        <li id="ferociousInspirationAmount">
          <label className="settings-left" htmlFor="ferociousInspirationAmount">Ferocious Inspiration amount</label>
          <select className="settings-right" name="ferociousInspirationAmount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </li>
        <li id="improvedWrathOfAirTotem">
          <label className="settings-left" htmlFor="improvedWrathOfAirTotem">Elemental Shaman T4 2pc bonus?</label>
          <select className="settings-right" name="improvedWrathOfAirTotem">
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </li>
        <li id='shadowPriestDps'>
          <label className="settings-left" htmlFor="shadowPriestDps">Shadow Priest Dps</label>
          <input className='settings-right' value="1000" type="number" min='0' name="shadowPriestDps" />
        </li>
        <li id='improvedImpSetting'>
          <label className='settings-left' htmlFor="improvedImpSetting">Improved Imp?</label>
          <select className='settings-right' name='improvedImpSetting'>
            <option value='0'>No</option>
            <option value='1'>1/3</option>
            <option value='2'>2/3</option>
            <option value='3'>3/3</option>
          </select>
        </li>
        <li id='improvedFaerieFire'>
          <label className='settings-left' htmlFor="improvedFaerieFire">Improved Faerie Fire?</label>
          <select className='settings-right' name='improvedFaerieFire'>
            <option value='no'>No</option>
            <option value='yes'>Yes</option>
          </select>
        </li>
        <li id='improvedExposeArmor'>
          <label className='settings-left' htmlFor="improvedExposeArmor">Improved Expose Armor?</label>
          <select className='settings-right' name='improvedExposeArmor'>
            <option value='0'>No</option>
            <option value='1'>1/2</option>
            <option value='2'>2/2</option>
          </select>
        </li>
        <li id='survivalHunterAgility'>
          <label className="settings-left" htmlFor="survivalHunterAgility">Survival Hunter Agility</label>
          <input className='settings-right' value="1000" type="number" min='0' name="survivalHunterAgility" />
        </li>
        <li id='exposeWeaknessUptime'>
          <label className="settings-left" htmlFor="exposeWeaknessUptime">Expose Weakness Uptime %</label>
          <input className='settings-right' value="90" type="number" min='0' name="exposeWeaknessUptime" />
        </li>
        <li id="customIsbUptime">
          <label className="settings-left" htmlFor="customIsbUptime">Use custom ISB uptime %?</label>
          <select className="settings-right" name="customIsbUptime">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </li>
        <li id="custom-isb-uptime-value">
          <span className="settings-left">Custom ISB Uptime %</span>
          <input id="customIsbUptimeValue" value="70" type="number" name="customIsbUptimeValue" className="settings-right" />
        </li>
      </ul>
    </section>
  )
}