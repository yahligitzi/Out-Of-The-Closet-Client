import { FC } from "react";
import { Box, Card, ImageList, ImageListItem, Skeleton } from "@mui/material";
import Header from "../../../../components/Header";
import itemsService from "../../../../services/items.service";
import styles from "./outfit.style";
import { useQuery } from "@tanstack/react-query";
import { OutfitProps } from "./outfit.types";

const Outfit: FC<OutfitProps> = ({ selectedItems, selectedStores }) => {
  const { isLoading, data: itemsForOutfits } = useQuery({
    queryKey: ["generateOutfit"],
    queryFn: () =>
      itemsService.generateOutFit(
        selectedItems,
        selectedStores.map(({ name }) => name)
      ),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
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
              itemsForOutfits.items.map(({ imageUrl }) => (
                <Card key={imageUrl} sx={styles.imageCard}>
                  <ImageListItem>
                    <img src={imageUrl} />
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
