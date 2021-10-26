#include "petStats.h"

#include "player.h"

PetStats::PetStats(Player* player)
    : player(player), damageModifier(1), staminaModifier(1), intellectModifier(1), strengthModifier(1), agilityModifier(1), spiritModifier(1), attackPowerModifier(1), hastePercent(1)
{
    staminaModifier *=1;
    intellectModifier *= 1;
    damageModifier *= 1;
}