import { Box, Button, Card, ImageListItem } from "@mui/material";
import itemsService from "../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Item } from "../../types/tag.type";
import { Tune } from "@mui/icons-material";
import { colors } from "../../constants/styles";

type ItemProps = {
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const Items = ({ selectedItems, setSelectedItems }: ItemProps) => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);

  const { data: allItems } = useQuery({
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
          Clear
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "white",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          gap: 1,
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
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: "20px",
          // height: "100%",
          // boxSizing: "border-box",
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
    </Box>
  );
};

export default Items;
