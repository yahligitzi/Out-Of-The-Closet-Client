import {
  Box,
  Card,
  TextField,
  IconButton,
  ImageListItem,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Clear, Close, Search } from "@mui/icons-material";
import React, { useEffect, useMemo, useState } from "react";
import styles from "./itemsPage.style";
import { Item, ItemTag } from "../../types/tag.type";
import FilterSlidingDrawer from "../../components/FilterSlidingDrawer";
import ItemsEmptyState from "../ItemsEmptyState/ItemsEmptyState";
import Header from "../Header";
import GeneratorModeDialog from "../../pages/MainPage/GeneratorModeDialog";

type ItemsPageProps = {
  onItemClick?: (itemTag: Item) => void;
  setIsAddingItemsPopupOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  allItems: Item[] | undefined;
  isLoadingItems: boolean;
  isOpenDialog: boolean;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  selectedItems?: Item[];
  selectedStyle?: React.CSSProperties;
  handleDeleteItem?: (id: string) => void;
};

const ItemsPage = ({
  setIsAddingItemsPopupOpen,
  onItemClick,
  children,
  allItems,
  isLoadingItems,
  isOpenDialog,
  setIsOpenDialog,
  selectedItems = [],
  selectedStyle = {},
  handleDeleteItem,
}: ItemsPageProps) => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedFilterBox, setCheckedFilterBox] = useState<
    { tagId: string; categoryId: string }[]
  >([]);
  const [deleteItem, setDeleteItem] = useState<string | null>(null);

  const tagsByCategory: ItemTag[] = useMemo(
    () => allItems?.flatMap((item) => item.tags) ?? [],
    [allItems]
  );

  useEffect(() => {
    if (allItems) {
      if (displayedItems?.length) {
        handleFilter();
      } else {
        setDisplayedItems(allItems);
      }
    }
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
    <>
      <Box sx={styles.upperBar}>
        <Header />

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
          {children}
        </div>
      </Box>
      <Box sx={styles.mainContentWrapper}>
        <div style={styles.container as React.CSSProperties}>
          {isLoadingItems || !displayedItems ? (
            <CircularProgress sx={styles.loader} />
          ) : (
            <>
              <GeneratorModeDialog
                open={isOpenDialog}
                setOpen={setIsOpenDialog}
              />
              {displayedItems?.length ? (
                <Box display="grid" gap={2} sx={styles.itemsGrid}>
                  {displayedItems?.map(({ imageUrl, id, tags }) => {
                    const isSelected = selectedItems.find(
                      (item) => item.id === id
                    );

                    return (
                      <Card
                        sx={{
                          ...styles.imageCard,
                          ...(isSelected ? selectedStyle : {}),
                        }}
                        key={id}
                        onClick={() =>
                          onItemClick && onItemClick({ imageUrl, id, tags })
                        }
                      >
                        {handleDeleteItem && (
                          <IconButton
                            size="small"
                            sx={styles.deleteButton}
                            onClick={() => setDeleteItem(id)}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        )}
                        <ImageListItem>
                          <img
                            src={imageUrl}
                            style={styles.image as React.CSSProperties}
                          />
                        </ImageListItem>
                      </Card>
                    );
                  })}
                </Box>
              ) : (
                <ItemsEmptyState setIsPopupOpen={setIsAddingItemsPopupOpen} />
              )}
            </>
          )}
        </div>
        <Dialog open={!!deleteItem} onClose={() => setDeleteItem(null)}>
          <DialogTitle sx={styles.dialogText}>
            {"Got tired with of item?"}
          </DialogTitle>
          <DialogContent sx={styles.dialogText}>
            are you sure you want to delete this item? this action cant be
            undone
          </DialogContent>
          <DialogActions sx={styles.dialogActions}>
            <Button
              variant="outlined"
              sx={styles.dialogButton}
              onClick={() => setDeleteItem(null)}
            >
              no
            </Button>
            <Button
              sx={styles.dialogButton}
              variant="contained"
              onClick={() => {
                if (deleteItem) {
                  handleDeleteItem?.(deleteItem);
                }

                setDeleteItem(null);
              }}
            >
              yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ItemsPage;
