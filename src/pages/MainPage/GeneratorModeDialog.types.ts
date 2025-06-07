import { Option } from "../GenerateOutfitPage/GenerateOutfitPage";

export type GeneratorModeDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type DialogOption = {
    title: string,
    description: string,
    type: Option
}