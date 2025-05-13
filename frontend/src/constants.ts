
export const PUBLIC_API_URL = "https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws";

export type PresetCombination = {
  name: string;
  oil: string;
  egg: string;
  acid: string;
  mustard: string;
};

export const PRESET_COMBINATIONS: PresetCombination[] = [
  {
    name: "Classic Mayo",
    oil: "Canola oil",
    egg: "Egg yolks",
    acid: "White vinegar",
    mustard: "Dijon mustard",
  },
  {
    name: "Spicy Aioli",
    oil: "Olive oil",
    egg: "Whole eggs",
    acid: "Lemon juice",
    mustard: "Spicy mustard",
  },
  {
    name: "Herb Mayo",
    oil: "Avocado oil",
    egg: "Egg yolks",
    acid: "Apple cider vinegar",
    mustard: "Yellow mustard",
  },
  {
    name: "Truffle Mayo",
    oil: "Truffle oil",
    egg: "Egg yolks",
    acid: "Champagne vinegar",
    mustard: "Dijon mustard",
  },
  {
    name: "Citrus Mayo",
    oil: "Sunflower oil",
    egg: "Egg whites",
    acid: "Lime juice",
    mustard: "Honey mustard",
  }
];
