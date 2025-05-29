import { ArrowBackIos, ArrowForwardIos, Tune } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
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
import { colors } from "../../constants/styles";
import { ItemTag } from "../../types/tag.type";
import SlidingDrawerCategoryPage from "../SlidingDrawerCategoryPage";

const Puller = styled("div")(() => ({
  width: 30,
  height: 6,
  backgroundColor: colors.lightGray,
  borderRadius: 3,
  marginTop: 8,
}));

// const Something = (
//   <Box
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       zIndex: 100,
//     }}
//   >
//     <Box
//       sx={{
//         position: "sticky",
//         top: 0,
//         zIndex: 10,
//         background: "white",
//         // alignSelf: "center",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 1,
//       }}
//     >
//       <Puller />
//       <Typography variant="h6">Sort By</Typography>
//       <Divider sx={{ width: "100%" }} />
//     </Box>
//     <Box
//       sx={{
//         flex: 1,
//         padding: "20px",
//         // height: "100%",
//         // boxSizing: "border-box",
//       }}
//     >
//       <h1>Page Content</h1>
//       <p>Scroll down to see the sticky button at the bottom.</p>
//       <p>Additional content...</p>
//       <p>More content here...</p>
//       <p>Even more content...</p>
//       <p>Keep scrolling...</p>
//       <h1>Page Content</h1>
//       <p>Scroll down to see the sticky button at the bottom.</p>
//       <p>Additional content...</p>
//       <p>More content here...</p>
//       <p>Even more content...</p>
//       <p>Keep scrolling...</p>
//       <h1>Page Content</h1>
//     </Box>
//     <Box
//       sx={{
//         position: "sticky",
//         bottom: -1,
//         zIndex: 10,
//         display: "flex",
//       }}
//     >
//       <Button
//         sx={{
//           textTransform: "none",
//           flex: 1,
//           color: colors.darkGray,
//           background: "white",
//           borderRadius: 0,
//         }}
//         variant="text"
//       >
//         Clear
//       </Button>
//       <Button
//         sx={{
//           textTransform: "none",
//           flex: 2,
//           color: colors.darkGray,
//           background: "pink",
//           borderRadius: 0,
//         }}
//         variant="text"
//       >
//         Show Results
//       </Button>
//     </Box>
//   </Box>
// );

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
        slotProps={{
          paper: {
            sx: {
              height: "60vh",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
          },
        }}
      >
        {selectedCategoryId ? (
          <>
            <SlidingDrawerCategoryPage
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
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  {categories.map(({ categoryId, categoryName }) => (
                    <>
                      <ListItem
                        key={categoryId}
                        onClick={() => setSelectedCategoryId(categoryId)}
                        sx={{ background: colors.white, padding: 1 }}
                      >
                        <ListItemText
                          sx={{
                            gap: 10,
                          }}
                          slotProps={{
                            primary: {
                              fontWeight: 600,
                              gap: 10,
                            },
                          }}
                          primary={categoryName}
                        />
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
                  onClick={() => setChecked([])}
                >
                  Clear All
                </Button>
                <Button
                  sx={{
                    textTransform: "none",
                    flex: 2,
                    color: colors.darkGray,
                    background: "#71c9e5",
                    borderRadius: 0,
                  }}
                  variant="text"
                  onClick={() => setIsDrawerOpen(false)}
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
