import { Option } from "./GeneratorModeDialog.types";

export const OPTIONS: Option[] = [
    {
        title: "pick a store",
        description: "generate a full new outfit from a store you like",
        type: 'store'
    },
    {
        title: "pick from my closet",
        description: "generate an outfit with specific items from your digital closet",
        type: 'closet'
    },
    {
        title: "pick from both",
        description: "generate an outfit with items from your digital closet and a store you like",
        type: 'both'
    }
]