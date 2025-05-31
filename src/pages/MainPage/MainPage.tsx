import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  ImageListItem,
  InputAdornment,
  TextField,
} from "@mui/material";
import itemsService from "../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import { AddCircleOutline, Clear, Search } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import styles from "./mainPage.style";
import { PATHS } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { Item, ItemTag } from "../../types/tag.type";
import FilterSlidingDrawer from "../../components/FilterSlidingDrawer";

const MainPage = () => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedFilterBox, setCheckedFilterBox] = useState<
    { tagId: string; categoryId: string }[]
  >([]);

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
    refetchOnReconnect: false,
  });

  const navigate = useNavigate();

  const tagsByCategory: ItemTag[] = useMemo(
    () => allItems?.flatMap((item) => item.tags) ?? [],
    [allItems]
  );

  useEffect(() => {
    if (allItems) setDisplayedItems(allItems);
  }, [allItems]);

  useEffect(() => handleFilter(), [searchValue, checkedFilterBox]);

  const handleFilter = () => {
    if (allItems?.length) {
      let itemsToDisplay = [...allItems];

      if (searchValue.length)
        itemsToDisplay = itemsToDisplay.filter(({ tags }) =>
          tags.some((tag: ItemTag) => tag.name.includes(searchValue))
        );

      if (checkedFilterBox.length !== 0) {
        const selectedFiltersByCategory: Record<string, string[]> = {};

        checkedFilterBox.forEach(({ tagId, categoryId }) => {
          if (!selectedFiltersByCategory[categoryId]) {
            selectedFiltersByCategory[categoryId] = [tagId];
          } else {
            selectedFiltersByCategory[categoryId].push(tagId);
          }
        });

        itemsToDisplay = itemsToDisplay.filter(({ tags }) =>
          tags.every((tag: ItemTag) => {
            const tagsInCategory = tags.filter(
              (currTag: ItemTag) => currTag.categoryId === tag.categoryId
            );

            return (
              !selectedFiltersByCategory[tag.categoryId] ||
              selectedFiltersByCategory[tag.categoryId].some((currTag) =>
                tagsInCategory
                  .map(({ tagId }: { tagId: string }) => tagId)
                  .includes(currTag)
              )
            );
          })
        );
      }

      setDisplayedItems(itemsToDisplay);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.upperBar}>
        <FilterSlidingDrawer
          tagsByCategory={tagsByCategory}
          checked={checkedFilterBox}
          setChecked={setCheckedFilterBox}
        />
        <TextField
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search"
          variant="outlined"
          sx={styles.searchBar}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  position="start"
                  onClick={() => setSearchValue(searchInput)}
                >
                  <Search />
                </InputAdornment>
              ),
              startAdornment: searchInput && (
                <InputAdornment
                  position="start"
                  onClick={() => {
                    setSearchInput("");
                    setSearchValue("");
                  }}
                >
                  <Clear />
                </InputAdornment>
              ),
            },
          }}
        />

        <IconButton onClick={() => navigate(PATHS.UPLOAD_PHOTOS)}>
          <AddCircleOutline />
        </IconButton>
      </Box>
      <Box sx={styles.mainContentWrapper}>
        <div style={styles.container as React.CSSProperties}>
          {isLoading ? (
            <CircularProgress sx={styles.loader} />
          ) : (
            <Box display="grid" gap={2} sx={styles.itemsGrid}>
              {displayedItems?.map(({ imageUrl }, i) => (
                <Card sx={styles.imageCard} key={imageUrl}>
                  <ImageListItem>
                    <img
                      src={imageUrl}
                      alt={`item-${i}`}
                      style={styles.image as React.CSSProperties}
                    />
                  </ImageListItem>
                </Card>
              ))}
            </Box>
          )}
        </div>
      </Box>
    </Box>
  );
};

export default MainPage;
