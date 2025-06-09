import { FC } from "react";
import { Box, Card, Skeleton } from "@mui/material";
import Header from "../../../../components/Header";
import itemsService from "../../../../services/items.service";
import styles from "./outfit.style";
import { useQuery } from "@tanstack/react-query";
import { OutfitProps } from "./outfit.types";
import { BufferToImageUrl } from "./Outfit.utils";

const Outfit: FC<OutfitProps> = ({ selectedItems, selectedStores }) => {
  const { isFetching, data: generatedOutFitData } = useQuery({
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
      {isFetching ? (
        <Box sx={styles.outfitContainer}>
          <Skeleton variant="rectangular" width={"100%"} height={"40vw"} />
          <Skeleton
            variant="text"
            width={300}
            height={300}
            sx={{ fontSize: "1.5rem" }}
          />
          <Box sx={styles.itemsContainer}>
            {[...Array(4)].map((_, i) => (
              <Card key={`skeleton-${i}`} sx={styles.itemCard}>
                <Box sx={{ flex: 1 }}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"40vw"}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" height={30} />
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Box sx={styles.outfitContainer}>
          {generatedOutFitData?.modelImage && (
            <Box sx={styles.modelImageContainer}>
              <img
                style={styles.modelImage}
                src={BufferToImageUrl(generatedOutFitData.modelImage)}
                alt="Model"
              />
            </Box>
          )}
          <Box sx={styles.outfitTitle}>Outfit Items</Box>
          <Box sx={styles.itemsContainer}>
            {generatedOutFitData?.items ? (
              generatedOutFitData.items.map(({ imageUrl, siteUrl }) => (
                <Card key={imageUrl} sx={styles.itemCard}>
                  <Box sx={styles.itemImageContainer}>
                    <img
                      src={imageUrl}
                      style={styles.itemImage}
                      alt="Outfit item"
                    />
                  </Box>
                  <Box sx={styles.itemUrlContainer}>
                    {siteUrl ? (
                      <a
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {siteUrl}
                      </a>
                    ) : (
                      <Box>My Closet</Box>
                    )}
                  </Box>
                </Card>
              ))
            ) : (
              <></>
            )}
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Outfit;
