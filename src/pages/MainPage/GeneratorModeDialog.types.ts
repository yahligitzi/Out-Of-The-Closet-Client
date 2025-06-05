export type GeneratorModeDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type OptionsType = 'store' | 'closet' | 'both';

export type Option = {
    title: string,
    description: string,
    type: OptionsType
}