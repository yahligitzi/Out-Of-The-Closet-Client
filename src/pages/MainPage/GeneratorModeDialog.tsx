import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import styles from "./GeneratorModelDialog.style";
import { GeneratorModeDialogProps } from "./GeneratorModeDialog.types";
import { OPTIONS } from "./GeneratorModeDialog.consts";

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
                //ToDo add fuction after option pick 
                    <Button sx={styles.optionBox} onClick={() => ""} key={option.type}>
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