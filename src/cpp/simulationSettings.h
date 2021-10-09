#pragma once

#include <iostream>

struct SimulationSettings
{
    int iterations;
    int minTime;
    int maxTime;
    unsigned int* randomSeeds;
    bool multiItemSimulation;
    int startingIteration;

    SimulationSettings(int iterations, int minTime, int maxTime, unsigned int* randomSeeds, bool multiItemSimulation, int startingIteration);
};