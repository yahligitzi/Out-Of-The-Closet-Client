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
import { useNavigate } from "react-router-dom";
import itemsService from "../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import { AddCircleOutline, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import FilterBox from "./FilterBox";
import { PATHS } from "../../constants/routes";

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

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
  });

  const tagsByCategory = allItems?.flatMap(item => item.tags)
  const types = Array.from(
    new Map(tagsByCategory?.filter(tag => tag.categoryName === "Type")?.map(item => [item.tagId, item])).values()
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (allItems) setDisplayedItems(allItems);
  }, [allItems]);

  const handleFilter = (e) => {
    // TODO: support both search and filter component

    if (allItems?.length)
      setDisplayedItems(
        allItems.filter(({ tags }) =>
          tags.some((tag) => tag.name.includes(e.target.value))
        )
      );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 5,
      }}
    >
      <TextField
        onChange={handleFilter}
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >

        <FilterBox tagsByCategory={tagsByCategory} />
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <CircularProgress sx={{ marginTop: 10 }} />
          ) : (
            <>
              <IconButton
                sx={{ position: "absolute", right: 0 }}
                onClick={() => navigate(PATHS.UPLOAD_PHOTOS)}
              >
                <AddCircleOutline />
              </IconButton>
              <Box
                display="grid"
                gap={2}
                sx={{
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(auto-fit, minmax(250px, 1fr))",
                  },
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '45vw' }}>
                  <Tabs value={0} variant="scrollable" scrollButtons="auto">
                    {types.map(type => <Tab label={type.name} key={type.tagId} />)}
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
      {/* <ItemCard /> */}
      {/* <Button onClick={() => itemsService.getItems()}>משהוא</Button>
      <Button onClick={() => navigate(PATHS.UPLOAD_PHOTOS)}>
        העלה תמונה חדשה
      </Button> */}
    </div>
  );
};

export default MainPage;
