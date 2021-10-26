#pragma once

#include "spell.h"
#include <vector>

struct PlayerSpells
{
    std::shared_ptr<Spell> LifeTap;
    std::shared_ptr<Spell> LightningBolt;
    std::shared_ptr<Spell> Corruption;
    std::shared_ptr<Spell> SiphonLife;
    std::shared_ptr<Spell> FlameShock;
    std::shared_ptr<Spell> CurseOfAgony;
    std::shared_ptr<Spell> CurseOfTheElements;
    std::shared_ptr<Spell> CurseOfRecklessness;
    std::shared_ptr<Spell> DestructionPotion;
    std::shared_ptr<Spell> SuperManaPotion;
    std::shared_ptr<Spell> DemonicRune;
    std::shared_ptr<Spell> FlameCap;
    std::shared_ptr<Spell> BloodFury;
    std::shared_ptr<Spell> DrumsOfBattle;
    std::shared_ptr<Spell> DrumsOfWar;
    std::shared_ptr<Spell> DrumsOfRestoration;
    std::shared_ptr<Spell> BladeOfWizardry;
    std::shared_ptr<Spell> ShatteredSunPendantOfAcumen;
    std::shared_ptr<Spell> RobeOfTheElderScribes;
    std::shared_ptr<Spell> MysticalSkyfireDiamond;
    std::shared_ptr<Spell> InsightfulEarthstormDiamond;
    std::shared_ptr<Spell> TimbalsFocusingCrystal;
    std::shared_ptr<Spell> MarkOfDefiance;
    std::shared_ptr<Spell> TheLightningCapacitor;
    std::shared_ptr<Spell> QuagmirransEye;
    std::shared_ptr<Spell> ShiffarsNexusHorn;
    std::shared_ptr<Spell> SextantOfUnstableCurrents;
    std::shared_ptr<Spell> BandOfTheEternalSage;
    std::vector<std::shared_ptr<Spell>> PowerInfusion;
    std::vector<std::shared_ptr<Spell>> Bloodlust;
    std::vector<std::shared_ptr<Spell>> Innervate;
};