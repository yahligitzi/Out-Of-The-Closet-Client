import { Option } from "../GenerateOutfitPage/GenerateOutfitPage";
import { DialogOption } from "./GeneratorModeDialog.types";

export const OPTIONS: DialogOption[] = [
  {
    title: "Pick a store",
    description: "Generate a full new look from the stores you like",
    type: Option.OnlyStore,
  },
  {
    title: "Pick from my closet",
    description:
      "Generate an outfit with specific items from your digital closet",
    type: Option.OnlyCloset,
  },
  {
    title: "Pick from both",
    description:
      "Generate an outfit based on an item from your digital closet combined with the stores you like",
    type: Option.Both,
  },
];
