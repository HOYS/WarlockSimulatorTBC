# Warlock Simulator TBC
 
 Warlock simulator for WoW TBCC written in C++ & Javascript

 ## TODO
 * Remove all Warlock spells
 * Change to Shaman Talents - Done-ish, mana stuff
 * Change to shaman spells
 * add shaman procs (clearcasting)
 * add shaman gear pieces 
 * calculate totem dropping effect on GCD?
 * add shaman consumables
 * remove pet logic (refactor to fire ele?) - Done-ish, pets don't appear in sim
 * add consumable rotation logic (e.g. destro first pot CD, mana 2nd)
 
    bugs I've made:
    * fix racial base stats, can't find a good source
    * figure out totem of wrath talent deselection bug
    * player goes oom, sim stops
    * elemental mastery might apply the crit chance to lightning cap and wont be consumed by it? 
    * elemental mastery raises crit chance about 100%, shouldn't matter though?
    * elemental mastery does nothing to remove mana cost right now
    * clearcasting does nothing to remove mana right now

    questions I have
    * can TLC proc clearcasting?

 ## Building Locally
 ### Requirements:  
 [Emscripten SDK to compile the C++ code with Makefile](https://emscripten.org/docs/getting_started/downloads.html)    
 `npm install`  
 `npm install -g gulp`
 ### Run
 Run Frontend: `gulp`  
 Compile C++: `make`
 
 https://kristoferhh.github.io/WarlockSimulatorTBC/
 ![image](https://user-images.githubusercontent.com/12117382/136641237-61653b35-7b94-4fcb-bca5-243eba96e8f8.png)
