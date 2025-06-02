import {
  Avatar,
  Box,
  Card,
  TextField,
  IconButton,
  ImageListItem,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import itemsService from "../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import { AddCircleOutline, Clear, Logout, Search } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import styles from "./mainPage.style";
import { Item, ItemTag } from "../../types/tag.type";
import FilterSlidingDrawer from "../../components/FilterSlidingDrawer";
import { removeAuthHeader } from "../../services/axiosInstance";
import { useUser } from "../../contexts/UserContext";
import UploadImageDialog from "../../components/UploadImageDialog/UploadImageDialog";
import ItemsEmptyState from "../../components/ItemsEmptyState/ItemsEmptyState";

const MainPage = () => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [checkedFilterBox, setCheckedFilterBox] = useState<
    { tagId: string; categoryId: string }[]
  >([]);

  const { setUser } = useUser();

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
    refetchOnReconnect: false,
  });

  const tagsByCategory: ItemTag[] = useMemo(
    () => allItems?.flatMap((item) => item.tags) ?? [],
    [allItems]
  );

  useEffect(() => {
    if (allItems) setDisplayedItems(allItems);
  }, [allItems]);

  useEffect(() => handleFilter(), [searchValue, checkedFilterBox]);

  const handleLogout = () => {
    removeAuthHeader();
    localStorage.removeItem("token");
    setUser(null);
  };

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

        itemsToDisplay = itemsToDisplay.filter(({ tags }) => {
          const uniqueValidCategories = new Set();

          tags.forEach((tag: ItemTag) => {
            const tagsInCategory = tags.filter(
              (currTag: ItemTag) => currTag.categoryId === tag.categoryId
            );

            const isValid =
              !selectedFiltersByCategory[tag.categoryId] ||
              selectedFiltersByCategory[tag.categoryId].some((currTag) =>
                tagsInCategory
                  .map(({ tagId }: { tagId: string }) => tagId)
                  .includes(currTag)
              );

            if (selectedFiltersByCategory[tag.categoryId] && isValid)
              uniqueValidCategories.add(tag.categoryId);

            return isValid;
          });

          return (
            uniqueValidCategories.size ===
            Object.keys(selectedFiltersByCategory).length
          );
        });
      }

      setDisplayedItems(itemsToDisplay);
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.upperBar}>
        <div style={styles.headerLine}>
          <Avatar src={"logo.jpg"} sx={styles.logo} />
          <IconButton onClick={handleLogout} sx={styles.logoutBtn}>
            <Logout />
          </IconButton>
        </div>

        <div style={styles.actionsLine}>
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
            size="small"
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

          <IconButton onClick={() => setIsPopupOpen(true)}>
            <AddCircleOutline />
          </IconButton>
        </div>
      </Box>
      <Box sx={styles.mainContentWrapper}>
        <div style={styles.container as React.CSSProperties}>
          {isLoading || !displayedItems ? (
            <CircularProgress sx={styles.loader} />
          ) : (
            <>
              {displayedItems?.length ? (
                <Box display="grid" gap={2} sx={styles.itemsGrid}>
                  {displayedItems?.map(({ imageUrl, id }) => (
                    <Card sx={styles.imageCard} key={id}>
                      <ImageListItem>
                        <img
                          src={imageUrl}
                          style={styles.image as React.CSSProperties}
                        />
                      </ImageListItem>
                    </Card>
                  ))}
                </Box>
              ) : (
                <ItemsEmptyState setIsPopupOpen={setIsPopupOpen} />
              )}
            </>
          )}
          <UploadImageDialog
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
          />
        </div>
      </Box>
    </Box>
  );
};

export default MainPage;
