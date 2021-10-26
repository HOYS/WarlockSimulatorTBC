#pragma once

#include "auras.h"
#include "talents.h"
#include "sets.h"
#include "characterStats.h"
#include "items.h"

struct PlayerSettings
{
    Auras* auras;
    Talents* talents;
    Sets* sets;
    CharacterStats* stats;
    Items* items;
    int itemId;
    int metaGemId;
    bool recordingCombatLogBreakdown;
    bool simmingStamina;
    bool simmingIntellect;
    bool simmingSpirit;
    bool simmingSpellPower;
    bool simmingNaturePower;
    bool simmingFirePower;
    bool simmingHitRating;
    bool simmingCritRating;
    bool simmingHasteRating;
    bool simmingMp5;
    bool isAldor;
    int enemyLevel;
    int enemyNatureResist;
    int enemyFireResist;
    int mageAtieshAmount;
    int totemOfWrathAmount;
    int ferociousInspirationAmount;
    int improvedCurseOfTheElements;
    bool usingCustomIsbUptime;
    int customIsbUptimeValue;
    int improvedDivineSpirit;
    int ancestralKnowledge;
    int shadowPriestDps;
    int warlockAtieshAmount;
    int improvedExposeArmor;
    bool isSingleTarget;
    int enemyAmount;
    bool isOrc;
    int powerInfusionAmount;
    int bloodlustAmount;
    int innervateAmount;
    int enemyArmor;
    int exposeWeaknessUptime;
    bool improvedFaerieFire;
    bool infinitePlayerMana;
    bool usingLashOfPainOnCooldown;
    bool randomizeValues;
    bool simChoosingRotation;
    bool exaltedWithShattrathFaction;
    int survivalHunterAgility;
    bool hasFlameShock;
    bool hasCorruption;
    bool hasSiphonLife;
    bool hasLightningBolt;
    bool hasCurseOfRecklessness;
    bool hasCurseOfTheElements;
    bool hasCurseOfAgony;
    bool hasElementalShamanT4Bonus;

    PlayerSettings(Auras* auras, Talents* talents, Sets* sets, CharacterStats* stats, Items* items, int itemId, int metaGemId, bool recordingCombatLogBreakdown, bool simmingStamina, bool simmingIntellect, bool simmingSpirit, bool simmingSpellPower
        , bool simmingNaturePower, bool simmingFirePower, bool simmingHitRating, bool simmingCritRating, bool simmingHasteRating, bool simmingMp5, bool isAldor, int enemyLevel, int enemyNatureResist
        , int enemyFireResist, int mageAtieshAmount, int totemOfWrathAmount, int ferociousInspirationAmount, int improvedCurseOfTheElements
        , bool usingCustomIsbUptime, int customIsbUptimeValue, int improvedDivineSpirit, int ancestralKnowledge, int shadowPriestDps, int warlockAtieshAmount, int improvedExposeArmor, bool isSingleTarget, int enemyAmount
        , bool isOrc, int powerInfusionAmount, int bloodlustAmount, int innervateAmount, int enemyArmor, int exposeWeaknessUptime, bool improvedFaerieFire, bool infinitePlayerMana
        , bool usingLashOfPainOnCooldown, bool randomizeValues, bool simChoosingRotation, bool exaltedWithShattrathFaction, int survivalHunterAgility
        , bool hasFlameShock, bool hasCorruption, bool hasSiphonLife, bool hasLightningBolt, bool hasCurseOfRecklessness
        , bool hasCurseOfTheElements, bool hasCurseOfAgony
        , bool hasElementalShamanT4Bonus);
};