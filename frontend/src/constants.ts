export interface PresetCombination {
  name: string;
  oil: string;
  egg: string;
  acid: string;
  mustard: string;
  extras?: string[];
}

export const PRESET_COMBINATIONS: PresetCombination[] = [
  {
    name: "Classic Mayo",
    oil: "Canola Oil",
    egg: "Whole Egg",
    acid: "White Vinegar",
    mustard: "Yellow Mustard"
  },
  {
    name: "Spicy Aioli",
    oil: "Olive Oil",
    egg: "Egg Yolk",
    acid: "Lemon Juice",
    mustard: "Dijon Mustard",
    extras: ["Garlic", "Chili Flakes"]
  },
  {
    name: "Herb Mayo",
    oil: "Avocado Oil",
    egg: "Whole Egg",
    acid: "White Wine Vinegar",
    mustard: "Dijon Mustard",
    extras: ["Fresh Herbs"]
  },
  {
    name: "Truffle Mayo",
    oil: "Olive Oil",
    egg: "Egg Yolk",
    acid: "White Vinegar",
    mustard: "Dijon Mustard",
    extras: ["Truffle Oil"]
  },
  {
    name: "Wasabi Mayo",
    oil: "Grapeseed Oil",
    egg: "Whole Egg",
    acid: "Rice Vinegar",
    mustard: "Hot Mustard",
    extras: ["Wasabi"]
  }
];