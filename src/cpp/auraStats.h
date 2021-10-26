#pragma once

struct AuraStats
{
    int spellPower;
    int hasteRating;
    int naturePower;
    int firePower;
    double hastePercent;
    double manaCostModifier;

    AuraStats(int spellPower, int naturePower, int firePower, int hasteRating, double hastePercent, double manaCostModifier);
};