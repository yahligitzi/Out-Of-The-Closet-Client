import { Box, Card, ImageList, ImageListItem, Skeleton } from "@mui/material";
import { Item } from "../../../../types/tag.type";
import { Store } from "../Stores/store.types";
import Header from "../../../../components/Header";
import itemsService from "../../../../services/items.service";
import styles from "./outfit.style";
import { useQuery } from "@tanstack/react-query";

type OutfitProps = {
  selectedItems: Item[];
  selectedStores: Store[];
};

const Outfit = ({ selectedItems, selectedStores }: OutfitProps) => {
  const { isLoading, data: itemsForOutfits } = useQuery({
    queryKey: ["generateOutfit"],
    queryFn: () =>
      itemsService.generateOutFit(
        selectedItems,
        selectedStores.map(({ name }) => name)
      ),
    refetchOnReconnect: false,
  });

  return (
    <div style={styles.root as React.CSSProperties}>
      <Box sx={styles.upperBar}>
        <Header />
      </Box>
      {isLoading ? (
        <Box display="grid" sx={styles.skeletonContainer}>
          {[...Array(4)].map((_, i) => (
            <Skeleton
              variant="rectangular"
              width="90%"
              height={100}
              key={`skleton-${i}`}
              sx={{ margin: 2 }}
            />
          ))}
        </Box>
      ) : (
        <>
          <ImageList sx={styles.imageListContianer} gap={10}>
            {itemsForOutfits?.items ? (
              itemsForOutfits.items.map((url) => (
                <Card key={url} sx={styles.imageCard}>
                  <ImageListItem>
                    <img src={url} />
                  </ImageListItem>
                </Card>
              ))
            ) : (
              <></>
            )}
          </ImageList>
        </>
      )}
    </div>
  );
};

export default Outfit;
