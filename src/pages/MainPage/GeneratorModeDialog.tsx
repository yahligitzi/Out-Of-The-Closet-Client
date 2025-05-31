import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import styles from "./GeneratorModelDialog.style";

type GeneratorModeDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type OptionsTypes = 'store' | 'closet' | 'both';

type Option = {
    title: string,
    description: string,
    type: OptionsTypes
}

const OPTIONS: Option[] = [
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

const GeneratorModeDialog = ({ open, setOpen }: GeneratorModeDialogProps) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle sx={styles.title}>
                {"Generate An Outfit"}
            </DialogTitle>
            <DialogContent sx={styles.dialogContent}>
                {OPTIONS.map(option =>
                    <Button sx={styles.optionBox} onClick={() => console.log("use " + option.type)} key={option.type}>
                        <Typography sx={styles.optionTitle}>{option.title}</Typography>
                        <Typography sx={styles.description}>{option.description}</Typography>
                    </Button>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default GeneratorModeDialog;