import {
  ArrowBack,
  ArrowBackIos,
  ArrowForward,
  ArrowForwardIos,
  CheckBox,
  Send,
  Tune,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { colors } from "../constants/styles";
import { grey } from "@mui/material/colors";
import { ItemTag } from "../types/tag.type";
import SelectButton from "./SelectButton";

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: colors.lightGray,
  borderRadius: 3,
  //   position: "absolute",
  marginTop: 8,
  //   left: "calc(50% - 15px)",
}));

const Something = (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      zIndex: 100,
    }}
  >
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "white",
        // alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Puller />
      <Typography variant="h6">Sort By</Typography>
      <Divider sx={{ width: "100%" }} />
    </Box>
    <Box
      sx={{
        flex: 1,
        padding: "20px",
        // height: "100%",
        // boxSizing: "border-box",
      }}
    >
      <h1>Page Content</h1>
      <p>Scroll down to see the sticky button at the bottom.</p>
      <p>Additional content...</p>
      <p>More content here...</p>
      <p>Even more content...</p>
      <p>Keep scrolling...</p>
      <h1>Page Content</h1>
      <p>Scroll down to see the sticky button at the bottom.</p>
      <p>Additional content...</p>
      <p>More content here...</p>
      <p>Even more content...</p>
      <p>Keep scrolling...</p>
      <h1>Page Content</h1>
    </Box>
    <Box
      sx={{
        position: "sticky",
        bottom: -1,
        zIndex: 10,
        display: "flex",
      }}
    >
      <Button
        sx={{
          textTransform: "none",
          flex: 1,
          color: colors.darkGray,
          background: "white",
          borderRadius: 0,
        }}
        variant="text"
      >
        Clear
      </Button>
      <Button
        sx={{
          textTransform: "none",
          flex: 2,
          color: colors.darkGray,
          background: "pink",
          borderRadius: 0,
        }}
        variant="text"
      >
        Show Results
      </Button>
    </Box>
  </Box>
);

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

  useEffect(() => {
    if (!isDrawerOpen) setSelectedCategoryId(null);
  }, [isDrawerOpen]);

  const categories = useMemo(() => {
    const seenCategories = new Set<string>();
    return tagsByCategory.filter((tag) => {
      if (!seenCategories.has(tag.categoryId)) {
        seenCategories.add(tag.categoryId);
        return true;
      }
    });
  }, [tagsByCategory]);

  const labels = useMemo(() => {
    if (selectedCategoryId) {
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
    }

    return [];
  }, [selectedCategoryId]);

  const isAllFromCategorySelected = useMemo(() => {
    const amount = checked.filter(
      (x) => x.categoryId === selectedCategoryId
    ).length;

    return amount === labels.length;
  }, [checked, selectedCategoryId]);

  const handleSelectAll = () => {
    const toSelect = labels.filter(
      (x) => !checked.find(({ tagId }) => x.tagId === tagId)
    );

    setChecked((prev) => prev.concat(toSelect));
  };

  return (
    <>
      <Button
        endIcon={
          <Badge
            badgeContent={checked.length}
            invisible={!checked.length}
            sx={{
              "& .MuiBadge-badge": {
                color: colors.darkGray,
                backgroundColor: "white",
              },
            }}
          >
            <Tune />
          </Badge>
        }
        onClick={() => setIsDrawerOpen(true)}
        sx={{
          textTransform: "none",
          color: "white",
          borderColor: "white",
          borderRadius: 10,
          background: colors.darkGray,
        }}
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
        PaperProps={{
          sx: {
            height: "75vh",
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            // overflow: "visible",
          },
        }}
      >
        {selectedCategoryId ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                zIndex: 100,
              }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  background: "white",
                  // alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Puller />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <IconButton>
                    <ArrowBackIos />
                  </IconButton>
                  <Typography variant="h6">Sort By</Typography>
                  <SelectButton
                    isAllSelected={isAllFromCategorySelected}
                    clearFunc={() =>
                      setChecked((prev) =>
                        prev.filter((x) => x.categoryId !== selectedCategoryId)
                      )
                    }
                    selectAllFunc={handleSelectAll}
                  />
                  {/* <Button
                    sx={{
                      textTransform: "none",
                      borderRadius: 10,
                      borderColor: colors.lightGray,
                      color: "white",
                      background: colors.darkGray,
                    }}
                    variant="outlined"
                  >
                    Select All
                  </Button> */}
                </Box>
                <Divider sx={{ width: "100%" }} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  padding: "20px",
                  // height: "100%",
                  // boxSizing: "border-box",
                }}
              >
                <List
                  sx={{
                    // width: "90%",
                    // marginTop: "56px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    // background: colors.lightGray,
                  }}
                >
                  {labels.map((tag) => (
                    <>
                      <FormControlLabel
                        key={tag.tagId}
                        control={
                          <Checkbox
                            key={tag.name}
                            checked={
                              !!checked.find(({ tagId }) => tagId === tag.tagId)
                            }
                            sx={{
                              "&.Mui-checked": {
                                color: "black",
                              },
                            }}
                            onChange={(_, checked) => {
                              if (checked)
                                setChecked((prev) =>
                                  prev.concat({
                                    tagId: tag.tagId,
                                    categoryId: tag.categoryId,
                                  })
                                );
                              else
                                setChecked((prev) =>
                                  prev.filter(
                                    ({ tagId }) => tagId !== tag.tagId
                                  )
                                );
                            }}
                          />
                        }
                        label={tag.name}
                      />
                    </>
                  ))}
                </List>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                zIndex: 100,
              }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  background: "white",
                  // alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Puller />
                <Typography variant="h6">Sort By</Typography>
                <Divider sx={{ width: "100%" }} />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  padding: "20px",
                  // height: "100%",
                  // boxSizing: "border-box",
                }}
              >
                <List
                  sx={{
                    // width: "90%",
                    // marginTop: "56px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    // background: colors.lightGray,
                  }}
                >
                  {categories.map(({ categoryId, categoryName }) => (
                    <>
                      <ListItem
                        key={categoryId}
                        onClick={() => setSelectedCategoryId(categoryId)}
                        sx={{ background: colors.white, padding: 1 }}
                      >
                        <ListItemText>{categoryName}</ListItemText>
                        <ListItemIcon>
                          <ArrowForwardIos />
                        </ListItemIcon>
                      </ListItem>
                      <Divider
                        sx={{
                          width: "100%",
                        }}
                      />
                    </>
                  ))}
                </List>
              </Box>
              <Box
                sx={{
                  position: "sticky",
                  bottom: -1,
                  zIndex: 10,
                  display: "flex",
                }}
              >
                <Button
                  sx={{
                    textTransform: "none",
                    flex: 1,
                    color: colors.darkGray,
                    background: "white",
                    borderRadius: 0,
                  }}
                  variant="text"
                >
                  Clear
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    flex: 2,
                    color: colors.darkGray,
                    background: "pink",
                    borderRadius: 0,
                  }}
                  variant="text"
                >
                  Show Results
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
