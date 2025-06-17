import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import styles from "./GeneratorModelDialog.style";
import { GeneratorModeDialogProps } from "./GeneratorModeDialog.types";
import { OPTIONS } from "./GeneratorModeDialog.consts";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/routes";
import { ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";
import { Option } from "../GenerateOutfitPage/GenerateOutfitPage";

const GeneratorModeDialog = ({ open, setOpen }: GeneratorModeDialogProps) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const navigate = useNavigate();

  const handleClose = () => {
    setSelectedOption(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={styles.title}>{"Generate An Outfit"}</DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        {OPTIONS.map((option) => (
          <Accordion
            onChange={(_, isExpanded) =>
              setSelectedOption(isExpanded ? option.type : null)
            }
            expanded={option.type === selectedOption}
            key={option.type}
            sx={{
              ...styles.accordion,
              ...(selectedOption === option.type
                ? styles.selectedAccordion
                : {}),
            }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDown />}
              sx={styles.accordionSummary}
            >
              <Typography sx={styles.optionTitle}>{option.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={styles.description}>
                {option.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={styles.closeButton}
        >
          Close
        </Button>
        <Button
          disabled={!selectedOption}
          variant="outlined"
          onClick={() =>
            navigate(PATHS.GENERATE_OUTFIT, {
              state: { option: selectedOption },
            })
          }
          sx={styles.continueButton}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GeneratorModeDialog;
