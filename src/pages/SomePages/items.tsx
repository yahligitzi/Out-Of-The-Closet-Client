import { Box, Button, Card, ImageListItem } from "@mui/material";
import itemsService from "../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import styles from "./styles";
import { useEffect, useMemo, useState } from "react";
import { Item } from "../../types/tag.type";
import { Tune } from "@mui/icons-material";
import { colors } from "../../constants/styles";

type ItemProps = {
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
  isContinueDisable: boolean;
  onContinue: () => void;
};

const Items = ({
  selectedItems,
  setSelectedItems,
  isContinueDisable,
  onContinue,
}: ItemProps) => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialItems"],
    queryFn: itemsService.getItems,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (allItems?.length) setDisplayedItems([...allItems]);
  }, [allItems]);

  const selectBtn = useMemo(() => {
    if (selectedItems.length === allItems?.length)
      return (
        <Button
          sx={{
            textTransform: "none",
            borderRadius: 10,
            color: "white",
            borderColor: colors.lightGray,
            background: colors.darkGray,
          }}
          variant="outlined"
          onClick={() => {
            setSelectedItems([]);
          }}
        >
          Unselect all
        </Button>
      );

    return (
      <Button
        sx={{
          textTransform: "none",
          borderRadius: 10,
          color: "white",
          borderColor: colors.lightGray,
          background: colors.darkGray,
        }}
        variant="outlined"
        onClick={() => {
          if (allItems?.length) setSelectedItems(allItems);
        }}
      >
        Select all
      </Button>
    );
  }, [allItems, selectedItems]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          sx={{
            textTransform: "none",
            borderRadius: 10,
            color: "white",
            borderColor: colors.lightGray,
            background: colors.darkGray,
          }}
          endIcon={<Tune />}
          variant="outlined"
        >
          Filter By
        </Button>
        {selectBtn}
      </div>
      <Box
        sx={{
          overflowY: "auto",
          height: "calc(100% - 75px)",
        }}
      >
        <Box
          display="grid"
          gap={2}
          sx={{
            justifyItems: "center",
            alignItems: "center",
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
            },
          }}
        >
          {displayedItems?.map(({ imageUrl, id, tags }, i) => {
            const isSelected = selectedItems.find((item) => item.id === id);
            return (
              <Card
                sx={{
                  maxWidth: "50%",
                  ...(isSelected
                    ? { border: "2px solid gray", transform: "scale(1.02)" }
                    : {}),
                }}
                key={id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedItems((prev) =>
                      prev.filter((item) => item.id !== id)
                    );
                  } else {
                    setSelectedItems((prev) =>
                      prev.concat({ imageUrl, id, tags })
                    );
                  }
                }}
              >
                <ImageListItem>
                  <img src={imageUrl} alt={`item-${i}`} />
                </ImageListItem>
              </Card>
            );
          })}
          {displayedItems?.map(({ imageUrl, id, tags }, i) => {
            const isSelected = selectedItems.find((item) => item.id === id);
            return (
              <Card
                sx={{
                  maxWidth: "50%",
                  ...(isSelected
                    ? { border: "2px solid gray", transform: "scale(1.02)" }
                    : {}),
                }}
                key={id}
                onClick={() => {
                  if (isSelected) {
                    setSelectedItems((prev) =>
                      prev.filter((item) => item.id !== id)
                    );
                  } else {
                    setSelectedItems((prev) =>
                      prev.concat({ imageUrl, id, tags })
                    );
                  }
                }}
              >
                <ImageListItem>
                  <img src={imageUrl} alt={`item-${i}`} />
                </ImageListItem>
              </Card>
            );
          })}
        </Box>
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            textTransform: "none",
            color: "white",
            borderRadius: 10,
            borderColor: colors.lightGray,
            background: colors.darkGray,
            "&:disabled": {
              color: "white",
              background: colors.lightGray,
            },
          }}
          disabled={isContinueDisable}
          onClick={onContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Items;
