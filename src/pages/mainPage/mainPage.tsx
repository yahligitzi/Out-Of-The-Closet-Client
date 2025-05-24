import {
  Box,
  Card,
  CircularProgress,
  IconButton,
  ImageListItem,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import itemsService from "../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import { AddCircleOutline, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import FilterBox from "./FilterBox";
import styles from "./mainPage.style";

export type ItemTag = {
  name: string;
  tagId: string;
  categoryId: string;
  categoryName: string;
};

export type Item = {
  imageUrl: string;
  tags: ItemTag[];
};

const MainPage = () => {
  const [displayedItems, setDisplayedItems] = useState<Item[]>([]);
  const [tabSelection, setTabSelection] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [checkedFilterBox, setCheckedFilterBox] = useState<
    { tagId: string; categoryId: string }[]
  >([]);

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
  });

  const tagsByCategory = allItems?.flatMap((item) => item.tags);
  const types = tagsByCategory?.filter((tag) => tag.categoryName === "Type");
  // const navigate = useNavigate();

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
          tags.some((tag) => tag.tagId === tabSelection)
        );

      if (searchValue.length)
        itemsToDisplay = itemsToDisplay.filter(({ tags }) =>
          tags.some((tag) => tag.name.includes(searchValue))
        );

      if (checkedFilterBox.length !== 0) {
        const filtersByCategory: Record<string, string[]> = {};

        checkedFilterBox.forEach(({ tagId, categoryId }) => {
          if (!filtersByCategory[categoryId]) {
            filtersByCategory[categoryId] = [tagId];
          } else {
            filtersByCategory[categoryId].push(tagId);
          }
        });

        itemsToDisplay = itemsToDisplay.filter(({ tags }) =>
          tags.every((tag) => {
            if (filtersByCategory[tag.categoryId])
              return filtersByCategory[tag.categoryId].includes(tag.tagId);
            return true;
          })
        );
      }

      setDisplayedItems(itemsToDisplay);
    }
  };

  return (
    <div style={styles.root}>
      <TextField
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search"
        variant="outlined"
        sx={{
          ".MuiOutlinedInput-root": {
            borderRadius: 5,
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
      <div style={styles.itemAndFiltersContainer}>
        <FilterBox
          tagsByCategory={tagsByCategory}
          setChecked={setCheckedFilterBox}
        />
        <div style={styles.container}>
          {isLoading ? (
            <CircularProgress sx={{ marginTop: 10 }} />
          ) : (
            <>
              <IconButton
                sx={{ position: "absolute", right: 0 }}
                // onClick={() => navigate(PATHS.UPLOAD_PHOTOS)}
              >
                <AddCircleOutline />
              </IconButton>
              <Box
                display="grid"
                gap={2}
                sx={{
                  ...styles.itemsGrid,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(auto-fit, minmax(250px, 1fr))",
                  },
                }}
              >
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
                {displayedItems?.map(({ imageUrl }, i) => (
                  <Card sx={{ maxWidth: "50%" }} key={imageUrl}>
                    <ImageListItem>
                      <img src={imageUrl} alt={`item-${i}`} />
                    </ImageListItem>
                  </Card>
                ))}
              </Box>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
