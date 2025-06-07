import { ArrowForwardIos, Tune } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { colors } from "../../constants/styles";
import { ItemTag } from "../../types/tag.type";
import TagsSelectionDrawer from "../TagsSelectionDrawer";
import styles from "./FilterSlidingDrawer.style";

type FilterSlidingDrawerProps = {
  tagsByCategory: ItemTag[];
  checked: { tagId: string; categoryId: string }[];
  setChecked: React.Dispatch<
    React.SetStateAction<{ tagId: string; categoryId: string }[]>
  >;
};
const FilterSlidingDrawer = ({
  tagsByCategory,
  setChecked,
  checked,
}: FilterSlidingDrawerProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const relevantTags = useMemo(() => {
    if (!selectedCategoryId) return [];

    const seenTagsIds = new Set<string>();

    return tagsByCategory.filter((tag) => {
      if (
        tag.categoryId === selectedCategoryId &&
        !seenTagsIds.has(tag.tagId)
      ) {
        seenTagsIds.add(tag.tagId);
        return true;
      }
    });
  }, [selectedCategoryId]);

  const categories = useMemo(() => {
    const seenCategories = new Set<string>();
    return tagsByCategory.filter((tag) => {
      if (!seenCategories.has(tag.categoryId)) {
        seenCategories.add(tag.categoryId);
        return true;
      }
    });
  }, [tagsByCategory]);

  useEffect(() => {
    if (!isDrawerOpen) setSelectedCategoryId(null);
  }, [isDrawerOpen]);

  return (
    <>
      <Button
        endIcon={
          <Badge
            badgeContent={checked.length}
            invisible={!checked.length}
            sx={styles.filterCount}
          >
            <Tune />
          </Badge>
        }
        onClick={() => setIsDrawerOpen(true)}
        sx={styles.filterBtn}
        variant="outlined"
      >
        Filter
      </Button>

      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
        swipeAreaWidth={56}
        disableSwipeToOpen={false}
        keepMounted
        slotProps={{
          paper: {
            sx: styles.drawerPaper,
          },
        }}
      >
        {selectedCategoryId ? (
          <>
            <TagsSelectionDrawer
              handleGoBack={() => setSelectedCategoryId(null)}
              selectedCategoryId={selectedCategoryId}
              setChecked={setChecked}
              checked={checked}
              tags={relevantTags}
              title={
                tagsByCategory.find(
                  ({ categoryId }) => selectedCategoryId === categoryId
                )?.categoryName ?? ""
              }
            />
          </>
        ) : (
          <>
            <Box sx={styles.drawerContainer}>
              <Box sx={styles.upperBar}>
                <div style={styles.puller} />
                <Typography variant="h6">Sort By</Typography>
                <Divider sx={styles.divider} />
              </Box>
              <Box sx={styles.listContainer}>
                <List sx={styles.list}>
                  {categories.map(({ categoryId, categoryName }) => (
                    <div key={categoryId}>
                      <ListItem
                        onClick={() => setSelectedCategoryId(categoryId)}
                        sx={{ background: colors.white, padding: 1 }}
                      >
                        <ListItemText
                          sx={styles.listItemText}
                          slotProps={{
                            primary: styles.categoryNameTitle,
                          }}
                          primary={categoryName}
                        />
                        <ListItemIcon>
                          <ArrowForwardIos />
                        </ListItemIcon>
                      </ListItem>
                      <Divider sx={styles.divider} />
                    </div>
                  ))}
                </List>
              </Box>
              <Box sx={styles.bottomButtonsContainer}>
                <Button
                  sx={styles.clearAllBtn}
                  variant="text"
                  onClick={() => setChecked([])}
                >
                  Clear All
                </Button>
                <Button
                  sx={styles.showResultsBtn}
                  variant="text"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Apply Filters
                </Button>
              </Box>
            </Box>
          </>
        )}
      </SwipeableDrawer>
    </>
  );
};

export default FilterSlidingDrawer;
