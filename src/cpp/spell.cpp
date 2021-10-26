#include "spell.h"
#include "player.h"
#include "common.h"
#include <iomanip>
#include "bindings.h"

Spell::Spell(Player* player, std::shared_ptr<Aura> aura, std::shared_ptr<DamageOverTime> dot) : player(player), auraEffect(aura), dotEffect(dot)
{
    modifier = 1;
    coefficient = 0;
    cooldown = 0;
    school = SpellSchool::NO_SCHOOL;
    isNonWarlockAbility = false;
    isDot = false;
    doesDamage = false;
    canCrit = false;
    isItem = false;
    isAura = false;
    onGcd = true;
    isProc = false;
    isFinisher = false;
    castTime = 0;
}

void Spell::reset()
{
    cooldownRemaining = 0;
    casting = false;
}

void Spell::setup()
{
    if (minDmg > 0 && maxDmg > 0)
    {
      dmg = (minDmg + maxDmg) / 2;
    }
    if (minMana > 0 && maxMana > 0)
    {
      avgManaValue = (minMana + maxMana) / 2;
    }
    if (player->combatLogBreakdown.count(name) == 0)
    {
        player->combatLogBreakdown.insert(std::make_pair(name, new CombatLogBreakdown(name)));
    }
}

double Spell::getCastTime()
{
    return round((castTime / player->getHastePercent()) * 10000) / 10000 + player->spellDelay;
}

bool Spell::canCast()
{
    return (!onGcd || isNonWarlockAbility || player->gcdRemaining <= 0) && (isProc || isNonWarlockAbility || player->castTimeRemaining <= 0) && cooldownRemaining <= 0;
}

bool Spell::hasEnoughMana()
{
    return manaCost * player->stats->manaCostModifier <= player->stats->mana;
}

bool Spell::ready()
{
    return canCast() && hasEnoughMana();
}

void Spell::startCast(double predictedDamage)
{
    if (onGcd)
    {
        // Error: Casting a spell while GCD is active
        if (player->gcdRemaining > 0)
        {
            player->throwError("Attempting to cast " + name + " while player's GCD is at " + std::to_string(player->gcdRemaining) + " seconds remaining");
        }
        player->gcdRemaining = player->getGcdValue(shared_from_this());
    }

    // Error: Starting to cast a spell while casting another spell
    if (player->castTimeRemaining > 0 && !isNonWarlockAbility && !isProc)
    {
        player->throwError("Attempting to cast " + name + " while player's cast time remaining is at " + std::to_string(player->castTimeRemaining) + " sec");
    }

    // Error: Casting a spell while it's on cooldown
    if (cooldown > 0 && cooldownRemaining > 0)
    {
        player->throwError("Attempting to cast " + name + " while it's still on cooldown (" + std::to_string(cooldownRemaining) + " seconds remaining)");
    }

    std::string combatLogMsg = "";
    if (castTime > 0)
    {
        casting = true;
        player->castTimeRemaining = getCastTime();
        if (!isProc && player->shouldWriteToCombatLog())
        {
            combatLogMsg.append("Started casting " + name + " - Cast time: " + truncateTrailingZeros(std::to_string(player->castTimeRemaining - player->spellDelay), 4) + " (" + truncateTrailingZeros(std::to_string((player->getHastePercent() - 1) * 100), 4) + "% haste at a base cast speed of " + truncateTrailingZeros(std::to_string(castTime), 2) + ")");
        }
    }
    else
    {
        if (!isProc && player->shouldWriteToCombatLog())
        {
            combatLogMsg.append("Cast " + name);
        }
        cast();
    }
    if (onGcd && !isNonWarlockAbility && player->shouldWriteToCombatLog())
    {
        combatLogMsg.append(" - Global cooldown: " + truncateTrailingZeros(std::to_string(player->gcdRemaining), 4));
    }
    if (predictedDamage > 0 && player->shouldWriteToCombatLog())
    {
        combatLogMsg.append(" - Estimated damage / Cast time: " + truncateTrailingZeros(std::to_string(round(predictedDamage))));
    }

    if (player->shouldWriteToCombatLog())
    {
        player->combatLog(combatLogMsg);
    }
}

void Spell::tick(double t)
{
    if (cooldownRemaining > 0 && cooldownRemaining - t <= 0 && player->shouldWriteToCombatLog())
    {
        std::string combatLogEntry = name + " is off cooldown";
        player->combatLog(combatLogEntry);
    }
    cooldownRemaining -= t;

    if (casting && player->castTimeRemaining <= 0)
    {
        cast();
    }
}

void Spell::cast()
{
    int currentMana = player->stats->mana;
    bool isCrit = false;
    cooldownRemaining = cooldown;
    casting = false;

    if (!isAura)
    {
        player->combatLogBreakdown.at(name)->casts++;
    }

    if (manaCost > 0 && !player->settings->infinitePlayerMana)
    {
        player->stats->mana -= manaCost * player->stats->manaCostModifier;
        player->fiveSecondRuleTimer = 5;
    }

    if (castTime > 0 && player->shouldWriteToCombatLog())
    {
        std::string msg = "Finished casting " + name + " - Mana: " + truncateTrailingZeros(std::to_string(currentMana)) + " -> " + truncateTrailingZeros(std::to_string(player->stats->mana)) + " - Mana Cost: " + truncateTrailingZeros(std::to_string(round(manaCost))) + " - Mana Cost Modifier: " + truncateTrailingZeros(std::to_string(round(player->stats->manaCostModifier * 100))) + "%";
        player->combatLog(msg);
    }

    if (canCrit)
    {
        isCrit = player->isCrit(type, shared_from_this(), bonusCrit);
        if (isCrit)
        {
            // Increment the crit counter whether the spell hits or not so that the crit % on the damage breakdown is correct. Otherwise the crit % will be lower due to lost crits when the spell misses.
            player->combatLogBreakdown.at(name)->crits++;
        }
    }

    if (((!isItem && !isNonWarlockAbility && doesDamage) && !player->isHit(type)))
    {
        if (player->shouldWriteToCombatLog())
        {
            std::string msg = name + " *resist*";
            player->combatLog(msg);
        }
        player->combatLogBreakdown.at(name)->misses++;
        return;
    }

    if (isAura)
    {
        auraEffect->apply();
    }
    if (isDot)
    {
        dotEffect->apply();
    }

    if (doesDamage)
    {
        damage(isCrit);
    }

    // If it's an item such as mana potion, demonic rune, destruction potion, or if it's a proc with a hidden cooldown like Blade of Wizardry or Robe of the Elder Scribes then don't check for on-hit procs
    if (!isItem && !isProc && !isNonWarlockAbility)
    {
        onHitProcs();
    }
}

double Spell::getModifier()
{
    double dmgModifier = modifier;
    //to-do add damage mod for flameshock
    if (school == SpellSchool::NATURE)
    {
        dmgModifier *= player->stats->natureModifier;
    }
    else if (school == SpellSchool::FIRE)
    {
        dmgModifier *= player->stats->fireModifier;
    }

    return dmgModifier;
}

void Spell::damage(bool isCrit)
{
    std::vector<double> constantDamage = getConstantDamage();
    double baseDamage = constantDamage[0];
    double totalDamage = constantDamage[1];
    double dmgModifier = constantDamage[2];
    double partialResistMultiplier = constantDamage[3];
    double spellPower = constantDamage[4];
    double critMultiplier = player->critMultiplier;
    
    if (isCrit)
    {
        critMultiplier = getCritMultiplier(critMultiplier);
        totalDamage *= critMultiplier;
        onCritProcs();
    }

    onDamageProcs();
    player->iterationDamage += totalDamage;

    // Combat Log
    player->addIterationDamageAndMana(name, 0, totalDamage);
    if (player->shouldWriteToCombatLog())
    {
        std::string msg = name + " ";
        if (isCrit)
        {
            msg += "*";
        }
        msg += truncateTrailingZeros(std::to_string(round(totalDamage)));
        if (isCrit)
        {
            msg += "*";
        }
        msg += " (" + truncateTrailingZeros(std::to_string(dmg), 1) + " Base Damage - " + truncateTrailingZeros(std::to_string(round(coefficient * 1000) / 1000), 3) + " Coefficient - " + truncateTrailingZeros(std::to_string(round(spellPower))) + " Spell Power - ";
        if (isCrit)
        {
            msg += truncateTrailingZeros(std::to_string(critMultiplier * 100), 3) + "% Crit Multiplier - ";
        }
        msg += truncateTrailingZeros(std::to_string(round(dmgModifier * 10000) / 100), 2) + "% Damage Modifier - " + truncateTrailingZeros(std::to_string(round(partialResistMultiplier * 1000) / 10)) + "% Partial Resist Multiplier)";
        player->combatLog(msg);
    }

    //T5 4pc
    // if (player->sets->t5 >= 4)
    // {
    //     if (player->spells->ShadowBolt != NULL && name == player->spells->ShadowBolt->name && player->auras->Corruption != NULL && player->auras->Corruption->active)
    //     {
    //         player->auras->Corruption->t5BonusModifier *= 1.1;
    //     }
    // }
}

// Returns the non-RNG damage of the spell (basically just the base damage + spell power + damage modifiers, no crit/miss etc.)
// todo: investigate this noRng variable
std::vector<double> Spell::getConstantDamage(bool noRng)
{
    double totalDmg = player->settings->randomizeValues && minDmg > 0 && maxDmg > 0 && !noRng ? random(minDmg, maxDmg) : dmg;
    double baseDamage = totalDmg;
    double spellPower = player->getSpellPower(school);
    double dmgModifier = getModifier();
    double partialResistMultiplier = player->getPartialResistMultiplier(school);

    // Add damage from Spell Power
    totalDmg += spellPower * coefficient;
    // Modifier & Partial Resist
    totalDmg *= dmgModifier;
    totalDmg *= partialResistMultiplier;

    return std::vector<double> {baseDamage, totalDmg  , dmgModifier, partialResistMultiplier, spellPower};
}

double Spell::getCritMultiplier(double critMult)
{
    double critMultiplier = critMult;

    // Chaotic Skyfire Diamond
    if (player->settings->metaGemId == 34220)
    {
        critMultiplier *= 1.03;
    }

    return critMultiplier;
}

double Spell::predictDamage()
{
    std::vector<double> constantDamage = getConstantDamage();
    double normalDamage = constantDamage[1];
    double critDamage = 0;
    double critChance = 0;
    double chanceToNotCrit = 0;

    if (canCrit)
    {
        critDamage = normalDamage * getCritMultiplier(player->critMultiplier);
        critChance = player->getCritChance(type, shared_from_this()) / 100;
        chanceToNotCrit = 1 - critChance;
    }

    double hitChance = player->getHitChance(type) / 100;
    double estimatedDamage = canCrit ? (normalDamage * chanceToNotCrit) + (critDamage * critChance) : normalDamage;

    // Add the predicted damage of the DoT over its full duration
    if (isDot)
    {
        estimatedDamage += dotEffect->predictDamage();
    }


    return (estimatedDamage * hitChance) / std::max(player->getGcdValue(shared_from_this()), getCastTime());
}

void Spell::onCritProcs()
{
    // The Lightning Capacitor
    if (player->spells->TheLightningCapacitor != NULL)
    {
        player->spells->TheLightningCapacitor->startCast();
    }
    // Sextant of Unstable Currents
    if (player->spells->SextantOfUnstableCurrents != NULL && player->spells->SextantOfUnstableCurrents->ready() && player->getRand() <= player->spells->SextantOfUnstableCurrents->procChance * player->critChanceMultiplier)
    {
        player->spells->SextantOfUnstableCurrents->startCast();
    }
    // Shiffar's Nexus-Horn
    if (player->spells->ShiffarsNexusHorn != NULL && player->spells->ShiffarsNexusHorn->ready() && player->getRand() <= player->spells->ShiffarsNexusHorn->procChance * player->critChanceMultiplier)
    {
        player->spells->ShiffarsNexusHorn->startCast();
    }
}

void Spell::onDamageProcs()
{
    // Confirm that this procs on dealing damage
    // Shattered Sun Pendant of Acumen
    if (player->settings->exaltedWithShattrathFaction && player->spells->ShatteredSunPendantOfAcumen != NULL && player->spells->ShatteredSunPendantOfAcumen->cooldownRemaining <= 0 && player->getRand() <= player->spells->ShatteredSunPendantOfAcumen->procChance * player->critChanceMultiplier)
    {
        player->spells->ShatteredSunPendantOfAcumen->startCast();
    }
}

void Spell::onHitProcs()
{
    // Judgement of Wisdom (50% proc rate)
    if (player->selectedAuras->judgementOfWisdom && player->getRand() <= 50 * player->critChanceMultiplier)
    {
        int manaVal = 74;
        int currentMana = player->stats->mana;
        int manaGained = std::min(player->stats->maxMana - currentMana, manaVal);
        player->stats->mana += manaGained;
        player->combatLogBreakdown.at("Judgement of Wisdom")->casts++;
        player->addIterationDamageAndMana("Judgement of Wisdom", manaGained, 0);
        if (player->shouldWriteToCombatLog())
        {
            player->combatLog("Player gains " + std::to_string(manaGained) + " mana from Judgement of Wisdom (" + std::to_string(currentMana) + " -> " + std::to_string(player->stats->mana) + ")");
        }
    }
    // T4 2pc
    if (player->sets->t4 >= 2 && (school == SpellSchool::SHADOW || school == SpellSchool::FIRE) && player->getRand() <= player->auras->Flameshadow->procChance * player->critChanceMultiplier)
    {
        if (school == SpellSchool::SHADOW)
        {
            player->auras->Flameshadow->apply();
        }
        else if (school == SpellSchool::FIRE)
        {
            player->auras->Shadowflame->apply();
        }
    }
    // Spellstrike
    if (player->sets->spellstrike == 2 && player->getRand() <= player->auras->Spellstrike->procChance * player->critChanceMultiplier)
    {
        player->auras->Spellstrike->apply();
    }
    // Quagmirran's Eye
    if (player->spells->QuagmirransEye != NULL && player->spells->QuagmirransEye->ready() && player->getRand() <= player->spells->QuagmirransEye->procChance * player->critChanceMultiplier)
    {
        player->spells->QuagmirransEye->startCast();
    }
    // Mana-Etched Regalia 4pc
    if (player->sets->manaEtched >= 4 && player->getRand() <= player->auras->ManaEtched4Set->procChance * player->critChanceMultiplier)
    {
        player->auras->ManaEtched4Set->apply();
    }
    // Lightning Overload
    if (player->auras->LightningOverloadAura != NULL && player->getRand() <= player->auras->LightningOverloadAura->procChance * player->critChanceMultiplier)
    {
        player->spells->LightningOverload->startCast();
    }
    // Mark of Defiance
    if (player->spells->MarkOfDefiance != NULL && player->spells->MarkOfDefiance->ready() && player->getRand() <= player->spells->MarkOfDefiance->procChance * player->critChanceMultiplier)
    {
        player->spells->MarkOfDefiance->startCast();
    }
    // Darkmoon Card: Crusade
    if (player->auras->DarkmoonCardCrusade != NULL)
    {
        player->auras->DarkmoonCardCrusade->apply();
    }
    // Band of the Eternal Sage
    if (player->spells->BandOfTheEternalSage != NULL && player->spells->BandOfTheEternalSage->ready() && player->getRand() <= player->spells->BandOfTheEternalSage->procChance * player->critChanceMultiplier)
    {
        player->spells->BandOfTheEternalSage->startCast();
    }
    // Blade of Wizardry
    if (player->spells->BladeOfWizardry != NULL && player->spells->BladeOfWizardry->ready() && player->getRand() <= player->auras->BladeOfWizardry->procChance * player->critChanceMultiplier)
    {
        player->spells->BladeOfWizardry->startCast();
    }
    // Mystical Skyfire Diamond
    if (player->spells->MysticalSkyfireDiamond != NULL && player->spells->MysticalSkyfireDiamond->ready() && player->getRand() <= player->spells->MysticalSkyfireDiamond->procChance * player->critChanceMultiplier)
    {
        player->spells->MysticalSkyfireDiamond->startCast();
    }
    // Robe of the Elder Scribes
    if (player->spells->RobeOfTheElderScribes != NULL && player->spells->RobeOfTheElderScribes->ready() && player->getRand() <= player->spells->RobeOfTheElderScribes->procChance * player->critChanceMultiplier)
    {
        player->spells->RobeOfTheElderScribes->startCast();
    }
    // Insightful Earthstorm Diamond
    if (player->spells->InsightfulEarthstormDiamond != NULL && player->spells->InsightfulEarthstormDiamond->ready() && player->getRand() <= player->spells->InsightfulEarthstormDiamond->procChance * player->critChanceMultiplier)
    {
        player->spells->InsightfulEarthstormDiamond->startCast();
    }
    // Wrath of Cenarius
    if (player->auras->WrathOfCenarius != NULL && player->getRand() <= player->auras->WrathOfCenarius->procChance * player->critChanceMultiplier)
    {
        player->auras->WrathOfCenarius->apply();
    }
}

LightningBolt::LightningBolt(Player* player) : Spell(player)
{
    castTime = calculateCastTime();
    manaCost = 300 * (1 - 0.02 * player->talents->convection);
    coefficient = (3 / 3.5);
    minDmg = 571;
    maxDmg = 652;
    name = "Lightning Bolt";
    doesDamage = true;
    canCrit = true;
    school = SpellSchool::NATURE;
    type = SpellType::ELEMENTAL;
    setup();

    // T6 4pc bonus
    // if (player->sets->t6 >= 4)
    // {
    //   modifier *= 1.06;
    // }
}

void LightningBolt::startCast(double predictedDamage = 0)
{
    // bool hasShadowTrance = player->auras->ShadowTrance != NULL;

    // if (hasShadowTrance && player->auras->ShadowTrance->active)
    // {
    //     castTime = 0;
    // }

    Spell::startCast();
    
    // if (hasShadowTrance && player->auras->ShadowTrance->active)
    // {
    //     castTime = calculateCastTime();
    //     player->auras->ShadowTrance->fade();
    // }
}


double LightningBolt::calculateCastTime()
{
    return 2.5 - (0.1 * player->talents->lightningMastery);
}

LightningOverload::LightningOverload(Player* player) : Spell(player)
{
    castTime = 0;
    manaCost = 0;
    coefficient = (3 / 3.5);
    minDmg = 285;
    maxDmg = 326;
    name = "Lightning Bolt - Overload";
    doesDamage = true;
    canCrit = true;
    school = SpellSchool::NATURE;
    type = SpellType::ELEMENTAL;
    setup();
    
}

void LightningOverload::cast()
{
    Spell::startCast();   
}

LifeTap::LifeTap(Player* player) : Spell(player)
{
    name = "Life Tap";
    manaReturn = 582;
    coefficient = 0.8;
    modifier = 1 * (1 + 0.1 * player->talents->callOfFlame);
    setup();
}

int LifeTap::manaGain()
{
    return (manaReturn + ((player->getSpellPower() + player->stats->naturePower) * coefficient)) * modifier;
}

void LifeTap::cast()
{
    const int manaGain = this->manaGain();
    player->combatLogBreakdown.at(name)->casts++;
    player->addIterationDamageAndMana(name, manaGain, 0);
    
    if (player->shouldWriteToCombatLog() && player->stats->mana + manaGain > player->stats->maxMana)
    {
        player->combatLog("Life Tap used at too high mana (mana wasted)");
    }
    player->stats->mana = std::min(player->stats->maxMana, player->stats->mana + manaGain);
}


SoulFire::SoulFire(Player* player) : Spell(player)
{
    name = "Soul Fire";
    castTime = 6 - (0.4 * player->talents->lightningMastery);
    manaCost = 250 * (1 - 0.02 * player->talents->convection);
    coefficient = 1.15;
    minDmg = 1003;
    maxDmg = 1257;
    doesDamage = true;
    canCrit = true;
    school = SpellSchool::FIRE;
    type = SpellType::DESTRUCTION;
    setup();
};


Corruption::Corruption(Player* player, std::shared_ptr<Aura> aura, std::shared_ptr<DamageOverTime> dot) : Spell(player, aura, dot)
{
    name = "Corruption";
    manaCost = 370;
    castTime = round((2 - (0.4 * player->talents->concussion)) * 100) / 100.0;
    isDot = true;
    school = SpellSchool::SHADOW;
    type = SpellType::AFFLICTION;
    setup();
}

SiphonLife::SiphonLife(Player* player, std::shared_ptr<Aura> aura, std::shared_ptr<DamageOverTime> dot) : Spell(player, aura, dot)
{
    name = "Siphon Life";
    manaCost = 410;
    isDot = true;
    school = SpellSchool::SHADOW;
    type = SpellType::AFFLICTION;
    setup();
}

FlameShock::FlameShock(Player* player, std::shared_ptr<Aura> aura, std::shared_ptr<DamageOverTime> dot) : Spell(player, aura, dot)
{
    name = "Flame Shock";
    //to-do add mentalQuickness
    manaCost = 500 * (1 - 0.02 * player->talents->convection);
    castTime = 0;
    isDot = true;
    doesDamage = true;
    canCrit = true;
    dmg = 377 * (1 - 0.1 * player->talents->concussion);
    coefficient = 0.2;
    school = SpellSchool::FIRE;
    type = SpellType::ELEMENTAL;
    setup();
}

double FlameShock::getModifier()
{
    double modifier = Spell::getModifier();
    return modifier;
}

CurseOfAgony::CurseOfAgony(Player* player, std::shared_ptr<Aura> aura, std::shared_ptr<DamageOverTime> dot) : Spell(player, aura, dot)
{
    name = "Curse of Agony";
    manaCost = 265;
    isDot = true;
    school = SpellSchool::SHADOW;
    type = SpellType::AFFLICTION;
    setup();
}

CurseOfTheElements::CurseOfTheElements(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Curse of the Elements";
    manaCost = 260;
    type = SpellType::AFFLICTION;
    isAura = true;
    setup();
}

CurseOfRecklessness::CurseOfRecklessness(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Curse of Recklessness";
    manaCost = 160;
    type = SpellType::AFFLICTION;
    isAura = true;
    setup();
}

DestructionPotion::DestructionPotion(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Destruction Potion";
    cooldown = 120;
    isItem = true;
    isAura = true;
    onGcd = false;
    setup();
}

SuperManaPotion::SuperManaPotion(Player* player) : Spell(player)
{
    name = "Super Mana Potion";
    cooldown = 120;
    isItem = true;
    minMana = 1800;
    maxMana = 3000;
    onGcd = false;
    setup();
}

void SuperManaPotion::cast()
{
    Spell::cast();
    const int currentPlayerMana = player->stats->mana;
    //todo check for the randomize values option
    const int manaGain = random(minMana, maxMana);
    player->addIterationDamageAndMana(name, manaGain, 0);
    player->stats->mana = std::min(player->stats->maxMana, currentPlayerMana + manaGain);
    if (player->shouldWriteToCombatLog())
    {
        std::string msg = "Player gains " + truncateTrailingZeros(std::to_string(round(player->stats->mana - currentPlayerMana))) + " mana from " + name + " (" + truncateTrailingZeros(std::to_string(round(currentPlayerMana))) + " -> " + truncateTrailingZeros(std::to_string(round(player->stats->mana))) + ")";
        player->combatLog(msg);
    }
}

DemonicRune::DemonicRune(Player* player) : Spell(player)
{
    name = "Demonic Rune";
    cooldown = 120;
    isItem = true;
    minMana = 900;
    maxMana = 1500;
    onGcd = false;
    setup();
}

void DemonicRune::cast()
{
    Spell::cast();
    const int currentPlayerMana = player->stats->mana;
    //todo check for the randomize values option
    const int manaGain = random(minMana, maxMana);
    player->addIterationDamageAndMana(name, manaGain, 0);
    player->stats->mana = std::min(player->stats->maxMana, currentPlayerMana + manaGain);
    if (player->shouldWriteToCombatLog())
    {
        std::string msg = "Player gains " + truncateTrailingZeros(std::to_string(round(player->stats->mana - currentPlayerMana))) + " mana from " + name + " (" + truncateTrailingZeros(std::to_string(round(currentPlayerMana))) + " -> " + truncateTrailingZeros(std::to_string(round(player->stats->mana))) + ")";
        player->combatLog(msg);
    }
}

FlameCap::FlameCap(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Flame Cap";
    cooldown = 180;
    isItem = true;
    isAura = true;
    onGcd = false;
    setup();
}

BloodFury::BloodFury(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Blood Fury";
    cooldown = 120;
    isAura = true;
    onGcd = false;
    setup();
}

Bloodlust::Bloodlust(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Bloodlust";
    cooldown = 600;
    isItem = true;
    isAura = true;
    onGcd = false;
    isNonWarlockAbility = true;
    setup();
}

DrumsOfBattle::DrumsOfBattle(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Drums of Battle";
    cooldown = 120;
    isAura = true;
    onGcd = false;
    isNonWarlockAbility = true;
    isItem = true;
    setup();
}

bool DrumsOfBattle::ready()
{
    return cooldownRemaining <= 0;
}

DrumsOfWar::DrumsOfWar(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Drums of War";
    cooldown = 120;
    isAura = true;
    onGcd = false;
    isNonWarlockAbility = true;
    isItem = true;
    setup();
}

bool DrumsOfWar::ready()
{
    return cooldownRemaining <= 0;
}

DrumsOfRestoration::DrumsOfRestoration(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Drums of Restoration";
    cooldown = 120;
    isAura = true;
    onGcd = false;
    isNonWarlockAbility = true;
    isItem = true;
    setup();
}

bool DrumsOfRestoration::ready()
{
    return cooldownRemaining <= 0;
}

TimbalsFocusingCrystal::TimbalsFocusingCrystal(Player* player) : Spell(player)
{
    name = "Timbal's Focusing Crystal";
    cooldown = 15;
    onGcd = false;
    procChance = 10;
    minDmg = 285;
    maxDmg = 475;
    doesDamage = true;
    isProc = true;
    school = SpellSchool::SHADOW;
    canCrit = true;
    setup();
}

MarkOfDefiance::MarkOfDefiance(Player* player) : Spell(player)
{
    name = "Mark of Defiance";
    cooldown = 17;
    procChance = 15;
    onGcd = false;
    minMana = 128;
    maxMana = 172;
    setup();
}

void MarkOfDefiance::cast()
{
    if (cooldownRemaining <= 0)
    {
        const int currentPlayerMana = player->stats->mana;
        player->stats->mana = std::min(static_cast<double>(player->stats->maxMana), currentPlayerMana + avgManaValue);
        if (player->shouldWriteToCombatLog())
        {
            std::string msg = "Player gains " + truncateTrailingZeros(std::to_string(round(player->stats->mana - currentPlayerMana))) + " mana from " + name + " (" + truncateTrailingZeros(std::to_string(round(currentPlayerMana))) + " -> " + truncateTrailingZeros(std::to_string(round(player->stats->mana))) + ")";
            player->combatLog(msg);
        }
        cooldownRemaining = cooldown;
    }
}

TheLightningCapacitor::TheLightningCapacitor(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "The Lightning Capacitor";
    cooldown = 2.5;
    minDmg = 694;
    maxDmg = 806;
    doesDamage = true;
    canCrit = true;
    onGcd = false;
    setup();
}

void TheLightningCapacitor::startCast(double predictedDamage)
{
    if (cooldownRemaining <= 0)
    {
        player->auras->TheLightningCapacitor->apply();
        if (player->auras->TheLightningCapacitor->stacks == 3)
        {
            Spell::startCast();
            cooldownRemaining = cooldown;
            player->auras->TheLightningCapacitor->fade();
        }
    }
}

BladeOfWizardry::BladeOfWizardry(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Blade of Wizardry";
    cooldown = 50;
    onGcd = false;
    isItem = true;
    isProc = true;
    isAura = true;
    setup();
}

ShatteredSunPendantOfAcumen::ShatteredSunPendantOfAcumen(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Shattered Sun Pendant of Acumen";
    cooldown = 45;
    procChance = 15;
    onGcd = false;
    isItem = true;
    if (player->settings->isAldor)
    {
        this->isProc = true;
        this->isAura = true;
    }
    else
    {
        this->doesDamage = true;
        this->canCrit = true;
        this->dmg = 333; // confirm
    }
    setup();
}

RobeOfTheElderScribes::RobeOfTheElderScribes(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Robe of the Elder Scribes";
    cooldown = 50;
    procChance = 20;
    onGcd = false;
    isItem = true;
    isProc = true;
    isAura = true;
    setup();
}

QuagmirransEye::QuagmirransEye(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Quagmirran's Eye";
    cooldown = 45;
    procChance = 10;
    onGcd = false;
    isItem = true;
    isAura = true;
    setup();
}

ShiffarsNexusHorn::ShiffarsNexusHorn(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Shiffar's Nexus-Horn";
    cooldown = 45;
    procChance = 20;
    onGcd = false;
    isItem = true;
    isAura = true;
    setup();
}

SextantOfUnstableCurrents::SextantOfUnstableCurrents(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Sextant of Unstable Currents";
    cooldown = 45;
    procChance = 20;
    onGcd = false;
    isItem = true;
    isAura = true;
    setup();
}

BandOfTheEternalSage::BandOfTheEternalSage(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Band of the Eternal Sage";
    cooldown = 60;
    procChance = 10;
    onGcd = false;
    isItem = true;
    isAura = true;
    setup();
}

MysticalSkyfireDiamond::MysticalSkyfireDiamond(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Mystical Skyfire Diamond";
    cooldown = 35;
    procChance = 15;
    onGcd = false;
    isProc = true;
    isItem = true;
    isAura = true;
    setup();
}

InsightfulEarthstormDiamond::InsightfulEarthstormDiamond(Player* player) : Spell(player)
{
    name = "Insightful Earthstorm Diamond";
    cooldown = 15;
    procChance = 5;
    onGcd = false;
    isProc = true;
    isItem = true;
    manaGain = 300;
    setup();
}

void InsightfulEarthstormDiamond::cast()
{
    Spell::cast();
    const int currentPlayerMana = player->stats->mana;
    player->stats->mana = std::min(static_cast<double>(player->stats->maxMana), currentPlayerMana + manaGain);
    if (player->shouldWriteToCombatLog())
    {
        std::string msg = "Player gains " + std::to_string(round(player->stats->mana - currentPlayerMana)) + " mana from " + name + " (" + std::to_string(round(currentPlayerMana)) + " -> " + std::to_string(round(player->stats->mana)) + ")";
        player->combatLog(msg);
    }
}

PowerInfusion::PowerInfusion(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Power Infusion";
    cooldown = 180;
    isAura = true;
    onGcd = false;
    isNonWarlockAbility = true;
    setup();
}

Innervate::Innervate(Player* player, std::shared_ptr<Aura> aura) : Spell(player, aura)
{
    name = "Innervate";
    cooldown = 360;
    isAura = true;
    onGcd = false;
    isNonWarlockAbility = true;
    setup();
}