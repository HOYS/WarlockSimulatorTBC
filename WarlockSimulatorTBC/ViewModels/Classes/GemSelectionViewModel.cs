using Blazored.LocalStorage;
using Microsoft.Toolkit.Mvvm.ComponentModel;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using WarlockSimulatorTBC.Shared.Classes.UI;

namespace WarlockSimulatorTBC.ViewModels.Classes
{
    public class GemSelectionViewModel : BaseViewModel
    {
        private readonly ILocalStorageService _localStorage;

        public GemSelectionViewModel(ILocalStorageService localStorage)
        {
            _localStorage = localStorage;
        }

        private bool _showWindow = false;
        public bool ShowWindow
        {
            get => _showWindow;
            set => SetProperty(ref _showWindow, value);
        }

        private ObservableCollection<int> _favoriteGems = new ObservableCollection<int>();
        public ObservableCollection<int> FavoriteGems
        {
            get => _favoriteGems;
            set => SetProperty(ref _favoriteGems, value);
        }

        private ObservableCollection<int> _hiddenGems = new ObservableCollection<int>();
        public ObservableCollection<int> HiddenGems
        {
            get => _hiddenGems;
            set => SetProperty(ref _hiddenGems, value);
        }


        public void GemClickHandler(int gemId)
        {

        }

        public async Task FavoriteGem(int gemId)
        {
            if (FavoriteGems.Contains(gemId))
            {
                FavoriteGems.Remove(gemId);
                Gems.gemPreferences["favorites"].Remove(gemId);
            }
            else
            {
                FavoriteGems.Add(gemId);
                Gems.gemPreferences["favorites"].Add(gemId);
            }

            await SaveGemPreferences();

        }

        public async Task HideGem(int gemId)
        {
            if (HiddenGems.Contains(gemId))
            {
                HiddenGems.Remove(gemId);
                Gems.gemPreferences["hidden"].Remove(gemId);
            }
            else
            {
                HiddenGems.Add(gemId);
                Gems.gemPreferences["hidden"].Add(gemId);
            }

            await SaveGemPreferences();
        }

        public async Task SaveGemPreferences()
        {
            await _localStorage.SetItemAsync("gemPreferences", Gems.gemPreferences);
        }


        public async Task InitializeViewModel()
        {
            if (await _localStorage.ContainKeyAsync("gemPreferences"))
            {
                Gems.gemPreferences = await _localStorage.GetItemAsync<Dictionary<string, List<int>>>("gemPreferences");
                FavoriteGems = new ObservableCollection<int>(Gems.gemPreferences["favorites"]);
                HiddenGems = new ObservableCollection<int>(Gems.gemPreferences["hidden"]);
            }
        }
    }
}
