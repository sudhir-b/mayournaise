export interface PresetCombination {
  name: string;
  oil: string;
  egg: string;
  acid: string;
  mustard: string;
}

export const PRESET_COMBINATIONS: PresetCombination[] = [
  {
    name: "Classic Mayo",
    oil: "Canola Oil",
    egg: "Whole Egg",
    acid: "Lemon Juice",
    mustard: "Dijon Mustard",
  },
  {
    name: "Spicy Aioli",
    oil: "Olive Oil",
    egg: "Whole Egg",
    acid: "Lemon Juice",
    mustard: "Spicy Mustard",
  },
  {
    name: "Zesty Mayo",
    oil: "Sunflower Oil",
    egg: "Whole Egg",
    acid: "Apple Cider Vinegar",
    mustard: "Whole Grain Mustard",
  },
];

export const PUBLIC_API_URL = "https://eo2rkpwkcqr36lclwmighanldm0xuzpx.lambda-url.eu-west-1.on.aws";
