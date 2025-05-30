import { useEffect, useMemo, useState } from "react";
import Items from "./items";
import Stores from "./Stores";
import { Item } from "../../types/tag.type";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/routes";
import { Store } from "../../services/store.service";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { colors } from "../../constants/styles";

enum Option {
  OnlyStore = "OnlyStore",
  OnlyCloset = "OnlyCloset",
  Both = "Both",
}

const SomePages = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [selectedStores, setSelectedStores] = useState<Store[]>([]);
  const [currIndex, setCurrIndex] = useState<number>(-1);

  const option = Option.Both;

  const calcNextStep = () => {
    if (steps[currIndex + 1].isAvailable) {
      setCurrIndex((prev) => prev + 1);
    } else {
      setCurrIndex((prev) => prev + 2);
    }
  };

  const steps = [
    {
      isAvailable: option !== Option.OnlyStore,
      component: (
        <Items
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          isContinueDisable={!selectedItems.length}
          onContinue={calcNextStep}
        />
      ),
    },
    {
      isAvailable: option !== Option.OnlyCloset,
      component: (
        <Stores
          selectedStores={selectedStores}
          setSelectedStores={setSelectedStores}
          isContinueDisable={!selectedStores.length}
          onContinue={calcNextStep}
        />
      ),
    },
    { isAvailable: true, component: <></> },
  ];

  const navigate = useNavigate();

  const isBackBtnDisabled = useMemo(
    () =>
      ![1, 2].some(
        (i) => currIndex - i >= 0 && steps[currIndex - i].isAvailable
      ),
    [currIndex, option]
  );

  useEffect(() => {
    // TODO - check, have i got option from navigation - if not throw to main

    if (option) {
      calcNextStep();
    } else {
      navigate(PATHS.MAIN);
    }
  }, []);

  const goBack = () => {
    if (steps[currIndex - 1].isAvailable) {
      setCurrIndex((prev) => prev - 1);
    } else {
      setCurrIndex((prev) => prev - 2);
    }
  };

  return (
    <>
      <IconButton
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          "&:disabled": {
            color: colors.lightGray,
          },
        }}
        onClick={goBack}
        disabled={isBackBtnDisabled}
      >
        <ArrowBack />
      </IconButton>

      {currIndex >= 0 && steps[currIndex].component}
    </>
  );
};

export default SomePages;
