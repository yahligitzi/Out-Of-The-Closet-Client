import { Option } from "../GenerateOutfitPage/GenerateOutfitPage";
import { DialogOption } from "./GeneratorModeDialog.types";

export const OPTIONS: DialogOption[] = [
    {
        title: "pick a store",
        description: "generate a full new outfit from a store you like",
        type: Option.OnlyStore
    },
    {
        title: "pick from my closet",
        description: "generate an outfit with specific items from your digital closet",
        type: Option.OnlyCloset
    },
    {
        title: "pick from both",
        description: "generate an outfit with items from your digital closet and a store you like",
        type: Option.Both
    }
]