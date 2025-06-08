import { Option } from "../GenerateOutfitPage/GenerateOutfitPage";
import { DialogOption } from "./GeneratorModeDialog.types";

export const OPTIONS: DialogOption[] = [
  {
    title: "Pick a store",
    description: "generate a full new outfit from a store you like",
    type: Option.OnlyStore,
  },
  {
    title: "Pick from my closet",
    description:
      "generate an outfit with specific items from your digital closet",
    type: Option.OnlyCloset,
  },
  {
    title: "Pick from both",
    description:
      "generate an outfit with items from your digital closet and a store you like",
    type: Option.Both,
  },
];
