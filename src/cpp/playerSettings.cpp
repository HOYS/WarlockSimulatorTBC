#include "playerSettings.h"
#include "auras.h"
#include "talents.h"
#include "sets.h"
#include "characterStats.h"
#include "items.h"

PlayerSettings::PlayerSettings(Auras* auras, Talents* talents, Sets* sets, CharacterStats* stats, Items* items, int itemId, int metaGemId, bool recordingCombatLogBreakdown, bool simmingStamina, bool simmingIntellect, bool simmingSpirit, bool simmingSpellPower
    , bool simmingNaturePower, bool simmingFirePower, bool simmingHitRating, bool simmingCritRating, bool simmingHasteRating, bool simmingMp5, bool isAldor, int enemyLevel, int enemyNatureResist
    , int enemyFireResist, int mageAtieshAmount, int totemOfWrathAmount, bool sacrificingPet, bool petIsImp, bool petIsSuccubus, bool petIsFelguard, int ferociousInspirationAmount, int improvedCurseOfTheElements
    , bool usingCustomIsbUptime, int customIsbUptimeValue, int improvedDivineSpirit, int ancestralKnowledge, int shadowPriestDps, int warlockAtieshAmount, int improvedExposeArmor, bool isSingleTarget, int enemyAmount
    , bool isOrc, int powerInfusionAmount, int bloodlustAmount, int innervateAmount, int enemyArmor, int exposeWeaknessUptime, bool improvedFaerieFire, bool infinitePlayerMana, bool infinitePetMana
    , bool usingLashOfPainOnCooldown, bool petIsAggressive, bool prepopBlackBook, bool randomizeValues, bool simChoosingRotation, bool exaltedWithShattrathFaction, int survivalHunterAgility
    , bool hasImmolate, bool hasCorruption, bool hasSiphonLife, bool hasLightningBolt, bool hasCurseOfRecklessness
    , bool hasCurseOfTheElements, bool hasCurseOfAgony
    , bool hasElementalShamanT4Bonus)
  : auras(auras), talents(talents), sets(sets), stats(stats), items(items), itemId(itemId), metaGemId(metaGemId), recordingCombatLogBreakdown(recordingCombatLogBreakdown), simmingStamina(simmingStamina), simmingIntellect(simmingIntellect)
    , simmingSpirit(simmingSpirit), simmingSpellPower(simmingSpellPower), simmingNaturePower(simmingNaturePower), simmingFirePower(simmingFirePower), simmingHitRating(simmingHitRating), simmingCritRating(simmingCritRating)
    , simmingHasteRating(simmingHasteRating), simmingMp5(simmingMp5), isAldor(isAldor), enemyLevel(enemyLevel), enemyNatureResist(enemyNatureResist), enemyFireResist(enemyFireResist)
    , mageAtieshAmount(mageAtieshAmount), totemOfWrathAmount(totemOfWrathAmount), sacrificingPet(sacrificingPet), petIsImp(petIsImp), petIsSuccubus(petIsSuccubus), petIsFelguard(petIsFelguard)
    , ferociousInspirationAmount(ferociousInspirationAmount), improvedCurseOfTheElements(improvedCurseOfTheElements), usingCustomIsbUptime(usingCustomIsbUptime), customIsbUptimeValue(customIsbUptimeValue)
    , improvedDivineSpirit(improvedDivineSpirit), ancestralKnowledge(ancestralKnowledge), shadowPriestDps(shadowPriestDps), warlockAtieshAmount(warlockAtieshAmount), improvedExposeArmor(improvedExposeArmor)
    , isSingleTarget(isSingleTarget), enemyAmount(enemyAmount), isOrc(isOrc), powerInfusionAmount(powerInfusionAmount), bloodlustAmount(bloodlustAmount), innervateAmount(innervateAmount), enemyArmor(enemyArmor)
    ,exposeWeaknessUptime(exposeWeaknessUptime), improvedFaerieFire(improvedFaerieFire), infinitePlayerMana(infinitePlayerMana), infinitePetMana(infinitePetMana), usingLashOfPainOnCooldown(usingLashOfPainOnCooldown)
    , petIsAggressive(petIsAggressive), prepopBlackBook(prepopBlackBook), randomizeValues(randomizeValues), simChoosingRotation(simChoosingRotation), exaltedWithShattrathFaction(exaltedWithShattrathFaction)
    , survivalHunterAgility(survivalHunterAgility), hasImmolate(hasImmolate), hasCorruption(hasCorruption), hasSiphonLife(hasSiphonLife)
    , hasLightningBolt(hasLightningBolt), hasCurseOfRecklessness(hasCurseOfRecklessness), hasCurseOfTheElements(hasCurseOfTheElements)
    , hasCurseOfAgony(hasCurseOfAgony)
    , hasElementalShamanT4Bonus(hasElementalShamanT4Bonus) {}