import { useEffect, useMemo, useState } from "react";
import UserItems from "./component/UserItems";
import Stores from "./component/Stores";
import { Item } from "../../types/tag.type";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/routes";
import { Store } from "../../services/store.service";
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

enum Option {
  OnlyStore = "OnlyStore",
  OnlyCloset = "OnlyCloset",
  Both = "Both",
}

const GenerateOutfitPage = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedStores, setSelectedStores] = useState<Store[]>([]);
  const [currIndex, setCurrIndex] = useState<number>(-1);
  const [isBackPopupShown, setIsBackPopupShown] = useState<boolean>(false);

  const option = Option.Both;

  const navigate = useNavigate();

  const calcNextStep = () => {
    if (steps[currIndex + 1].isAvailable) {
      setCurrIndex((prev) => prev + 1);
    } else {
      setCurrIndex((prev) => prev + 2);
    }
  };

  useEffect(() => {
    // TODO - check, have i got option from navigation - if not throw to main

    if (option) {
      calcNextStep();
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
    { isAvailable: true, component: <Outfit /> },
  ];

  const isGoingBackPossible = useMemo(
    () =>
      [1, 2].some(
        (i) => currIndex - i >= 0 && steps[currIndex - i].isAvailable
      ),
    [currIndex, option]
  );

  const goBack = () => {
    if (steps[currIndex - 1].isAvailable) {
      setCurrIndex((prev) => prev - 1);
    } else {
      setCurrIndex((prev) => prev - 2);
    }
  };

  const handleClosePopup = () => setIsBackPopupShown(false);

  return (
    <>
      {currIndex >= 0 && (
        <Box sx={styles.root}>
          {steps[currIndex].component}
          <Box sx={styles.navigationLine}>
            <Button
              sx={styles.genericButton}
              onClick={() => {
                if (isGoingBackPossible) goBack();
                else setIsBackPopupShown(true);
              }}
            >
              Back
            </Button>
            <Button
              disabled={steps[currIndex].isContinueDisable}
              onClick={calcNextStep}
              sx={styles.nextButton}
            >
              Next
            </Button>
          </Box>
        </Box>
      )}

      {isBackPopupShown && (
        <Dialog open={isBackPopupShown} onClose={handleClosePopup}>
          <DialogTitle>
            Are you sure you want to exit generate outfit?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              By clicking exit you will jump back to main page
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleClosePopup();
                navigate(PATHS.MAIN);
              }}
              sx={styles.genericButton}
            >
              Exit
            </Button>
            <Button
              onClick={handleClosePopup}
              autoFocus
              sx={styles.genericButton}
            >
              Continue Generating
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default GenerateOutfitPage;
