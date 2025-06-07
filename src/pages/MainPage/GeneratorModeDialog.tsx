import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import styles from "./GeneratorModelDialog.style";
import { GeneratorModeDialogProps } from "./GeneratorModeDialog.types";
import { OPTIONS } from "./GeneratorModeDialog.consts";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/routes";

const GeneratorModeDialog = ({ open, setOpen }: GeneratorModeDialogProps) => {
    const navigate = useNavigate();
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
                    <Button sx={styles.optionBox} onClick={() => navigate(PATHS.GENERATE_OUTFIT, {state: {option: option.type}})} key={option.type}>
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