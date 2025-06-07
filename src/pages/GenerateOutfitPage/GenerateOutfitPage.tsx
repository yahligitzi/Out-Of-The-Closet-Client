import { useEffect, useMemo, useState } from "react";
import UserItems from "./component/UserItems";
import Stores from "./component/Stores";
import { Item } from "../../types/tag.type";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/routes";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Outfit from "./component/Outfit";
import styles from "./GenerateOutfitPage.style";
import { Store } from "./component/Stores/store.types";

export enum Option {
  OnlyStore = "OnlyStore",
  OnlyCloset = "OnlyCloset",
  Both = "Both",
}

const GenerateOutfitPage = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedStores, setSelectedStores] = useState<Store[]>([]);
  const [currIndex, setCurrIndex] = useState<number>(-1);
  const [isBackPopupShown, setIsBackPopupShown] = useState<boolean>(false);
  const location = useLocation();

  const option = location.state.option || Option.Both;

  const navigate = useNavigate();

  const changeStep = (direction: 1 | -1) => {
    const nextIndex = currIndex + direction;

    if (steps[nextIndex]?.isAvailable) setCurrIndex(nextIndex);
    else {
      const skipIndex = currIndex + 2 * direction;
      if (steps[skipIndex]?.isAvailable) setCurrIndex(skipIndex);
    }
  };

  useEffect(() => {
    if (option) {
      changeStep(1);
    } else {
      navigate(PATHS.MAIN);
    }
  }, []);

  const steps = [
    {
      isAvailable: option !== Option.OnlyStore,
      component: (
        <UserItems
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      ),

      isContinueDisable: !selectedItems.length,
    },
    {
      isAvailable: option !== Option.OnlyCloset,
      component: (
        <Stores
          selectedStores={selectedStores}
          setSelectedStores={setSelectedStores}
        />
      ),
      isContinueDisable: !selectedStores.length,
    },
    {
      isAvailable: true,
      component: (
        <Outfit selectedItems={selectedItems} selectedStores={selectedStores} />
      ),
    },
  ];

  const isGoingBackPossible = useMemo(() => {
    const backwardsRange = [1, 2];

    return backwardsRange.some(
      (i) => currIndex - i >= 0 && steps[currIndex - i].isAvailable
    );
  }, [currIndex, option]);

  const handleClosePopup = () => setIsBackPopupShown(false);

  const exitGenerateMode = () => navigate(PATHS.MAIN);

  return (
    <>
      {currIndex >= 0 && (
        <Box sx={styles.root}>
          {steps[currIndex].component}
          <Box sx={styles.navigationLine}>
            <Button
              variant="outlined"
              sx={styles.backButton}
              onClick={() => {
                if (isGoingBackPossible) changeStep(-1);
                else setIsBackPopupShown(true);
              }}
            >
              Back
            </Button>
            <Button
              disabled={steps[currIndex].isContinueDisable}
              onClick={() =>
                currIndex === steps.length - 1
                  ? exitGenerateMode()
                  : changeStep(1)
              }
              sx={styles.nextButton}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {isBackPopupShown && (
        <Dialog
          open={isBackPopupShown}
          onClose={handleClosePopup}
          sx={styles.dialogRoot}
        >
          <DialogTitle>
            Are you sure you want to exit generate outfit?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              By clicking exit you will jump back to main page
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={styles.dialogActions}>
            <Button
              onClick={() => {
                handleClosePopup();
                navigate(PATHS.MAIN);
              }}
              sx={styles.backButton}
              variant="outlined"
            >
              Exit
            </Button>
            <Button onClick={handleClosePopup} sx={styles.nextButton}>
              Continue Generating
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default GenerateOutfitPage;
