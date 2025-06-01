import {
  Box,
  Tab,
  Tabs,
  Card,
  TextField,
  IconButton,
  ImageListItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import FilterBox from "./FilterBox";
import styles from "./mainPage.style";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Item, ItemTag } from "../../types/tag.type";
import itemsService from "../../services/items.service";
import { AddCircleOutline, Clear, Search } from "@mui/icons-material";
import UploadImageDialog from "../../components/UploadImageDialog/UploadImageDialog";

const MainPage = () => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [tabSelection, setTabSelection] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [checkedFilterBox, setCheckedFilterBox] = useState<
    { tagId: string; categoryId: string }[]
  >([]);

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
    refetchOnReconnect: false,
  });

  const tagsByCategory: ItemTag[] = useMemo(
    () => allItems?.flatMap((item) => item.tags) ?? [],
    [allItems]
  );

  const types = useMemo(() => {
    const seenTags = new Set<string>();
    return tagsByCategory.filter((tag) => {
      if (tag.categoryName === "Type" && !seenTags.has(tag.tagId)) {
        seenTags.add(tag.tagId);
        return true;
      }
    });
  }, [tagsByCategory]);

  useEffect(() => {
    if (allItems) setDisplayedItems(allItems);
  }, [allItems]);

  useEffect(
    () => handleFilter(),
    [searchValue, tabSelection, checkedFilterBox]
  );

  const handleFilter = () => {
    if (allItems?.length) {
      let itemsToDisplay = [...allItems];
      if (tabSelection)
        itemsToDisplay = itemsToDisplay.filter(({ tags }) =>
          tags.some((tag: ItemTag) => tag.tagId === tabSelection)
        );

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
    <div style={styles.root as React.CSSProperties}>
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
      <div style={styles.itemAndFiltersContainer as React.CSSProperties}>
        <FilterBox
          tagsByCategory={tagsByCategory}
          setChecked={setCheckedFilterBox}
        />
        <div style={styles.container as React.CSSProperties}>
          {isLoading ? (
            <CircularProgress sx={{ marginTop: 10 }} />
          ) : (
            <>
              <IconButton
                sx={styles.uploadPhotosBtn}
                onClick={() => setIsPopupOpen(true)}
              >
                <AddCircleOutline />
              </IconButton>
              <Box sx={styles.tabWrapper}>
                <Tabs
                  value={tabSelection ?? false}
                  variant="scrollable"
                  scrollButtons="auto"
                  onChange={(e, newValue) => {
                    e.stopPropagation();
                    setTabSelection(newValue);
                  }}
                  onClick={() => setTabSelection(null)}
                >
                  {types?.map((type) => (
                    <Tab
                      label={type.name}
                      key={type.tagId}
                      value={type.tagId}
                    />
                  ))}
                </Tabs>
              </Box>
              <Box display="grid" gap={2} sx={styles.itemsGrid}>
                {displayedItems?.map(({ imageUrl }, i) => (
                  <Card sx={{ maxWidth: "50%" }} key={imageUrl}>
                    <ImageListItem>
                      <img src={imageUrl} alt={`item-${i}`} />
                    </ImageListItem>
                  </Card>
                ))}
              </Box>
              <UploadImageDialog
                isPopupOpen={isPopupOpen}
                setIsPopupOpen={setIsPopupOpen}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
