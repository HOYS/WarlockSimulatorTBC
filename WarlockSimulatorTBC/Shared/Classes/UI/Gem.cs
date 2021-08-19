using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarlockSimulatorTBC.Shared.Classes.UI
{
	public class SocketInfo
	{
		public string iconName;
		public string[] gems;
	}

	public class Gem
	{
        public int phase;
        public int spellPower;
        public int spellPenetration;
        public int spellHitRating;
        public int spellCritRating;
        public int stamina;
        public string name;
        public string iconName;
	}

	public static class Sockets
	{
		public static readonly Dictionary<string, SocketInfo> sockets = new Dictionary<string, SocketInfo>
		{
			{
				SocketColor.META, new SocketInfo
				{
					iconName = "UI-EmptySocket-Meta.jpg",
					gems = new string[] {"meta"}
				}
			},
			{
				SocketColor.RED, new SocketInfo
				{
					iconName = "UI-EmptySocket-Red.jpg",
					gems = new string[] {"red", "orange", "purple"}
				}
			},
			{
				SocketColor.YELLOW, new SocketInfo
				{
					iconName = "UI-EmptySocket-Yellow.jpg",
					gems = new string[] {"yellow", "orange", "green"}
				}
			},
			{
				SocketColor.BLUE, new SocketInfo
				{
					iconName = "UI-EmptySocket-Blue.jpg",
					gems = new string[] {"blue", "green", "purple"}
				}
			}
		};
	}

	public static class SocketColor
	{
		public static string META = "meta";
		public static string RED = "red";
		public static string BLUE = "blue";
		public static string YELLOW = "yellow";
	}

	public static class GemColor
	{
		public static string META = "meta";
		public static string RED = "red";
		public static string BLUE = "blue";
		public static string YELLOW = "yellow";
		public static string ORANGE = "orange";
		public static string PURPLE = "purple";
		public static string GREEN = "green";
	}

	public static class Gems
	{
        public static Dictionary<string, List<int>> gemPreferences = new Dictionary<string, List<int>>()
        {
            { "hidden", new List<int>() },
            { "favorites", new List<int>() }
        };

        public static readonly Dictionary<string, Dictionary<int, Gem>> gems = new Dictionary<string, Dictionary<int, Gem>>
        {
            {
                GemColor.META, new Dictionary<int, Gem>
                {
                    {
                        34220, new Gem
                        {
                            name = "Chaotic Skyfire Diamond",
                            iconName = "inv_misc_gem_diamond_07.jpg",
                            phase = 1,
                            spellPower = 12
                        }
                    }
                }
            },
			{
				GemColor.RED, new Dictionary<int, Gem>
				{
					{
						24030, new Gem
						{
							name = "Runed Living Ruby",
							iconName = "inv_jewelcrafting_livingruby_03.jpg",
							phase = 1,
							spellPower = 9
						}
					}
				}
			},
            {
                GemColor.BLUE, new Dictionary<int, Gem>
                {
                    {
                        24039, new Gem
                        {
                            name = "Stormy Star of Elune",
                            iconName = "inv_jewelcrafting_starofelune_03.jpg",
                            phase = 1,
                            spellPenetration = 10
                        }
                    }
                }
            },
            {
                GemColor.YELLOW, new Dictionary<int, Gem>
                {
                    {
                        31861, new Gem
                        {
                            name = "Great Dawnstone",
                            iconName = "inv_jewelcrafting_dawnstone_03.jpg",
                            phase = 1,
                            spellHitRating = 8
                        }
                    }
                }
            },
            {
                GemColor.ORANGE, new Dictionary<int, Gem>
                {
                    {
                        31867, new Gem
                        {
                            name = "Veiled Noble Topaz",
                            iconName = "inv_jewelcrafting_nobletopaz_03.jpg",
                            phase = 1,
                            spellHitRating = 4,
                            spellPower = 5
                        }
                    }
                }
            },
            {
                GemColor.PURPLE, new Dictionary<int, Gem>
                {
                    {
                        24056, new Gem
                        {
                            name = "Glowing Nightseye",
                            iconName = "inv_jewelcrafting_nightseye_03.jpg",
                            phase = 1,
                            spellPower = 5,
                            stamina = 6
                        }
                    }
                }
            },
            {
                GemColor.GREEN, new Dictionary<int, Gem>
                {
                    {
                        30605, new Gem
                        {
                            name = "Vivid Chyroprase",
                            iconName = "inv_jewelcrafting_talasite_03.jpg",
                            phase = 1,
                            spellHitRating = 5,
                            stamina = 6
                        }
                    }
                }
            }
		};
	}
}
