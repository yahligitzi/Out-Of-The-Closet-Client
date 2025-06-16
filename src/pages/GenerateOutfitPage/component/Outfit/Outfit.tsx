import { FC, useEffect, useRef } from "react";
import { Box, Button, Card, IconButton, Skeleton } from "@mui/material";
import Header from "../../../../components/Header";
import itemsService from "../../../../services/items.service";
import styles from "./outfit.style";
import { useQuery } from "@tanstack/react-query";
import { OutfitProps } from "./outfit.types";
import { BufferToImageUrl } from "./Outfit.utils";
import { PATHS } from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';

const Outfit: FC<OutfitProps> = ({ selectedItems, selectedStores }) => {
  const prevSelectedItemsRef = useRef<string[]>(['315fde40-d833-4721-8511-ebcd7ec490ad']);
  const {
    isFetching,
    isLoading,
    data: generatedOutFitData,
    refetch
  } = useQuery({
    queryKey: ["generateOutfit"],
    queryFn: () =>
      itemsService.generateOutFit(
        selectedItems,
        selectedStores.map(({ name }) => name),
        prevSelectedItemsRef.current
      ),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (generatedOutFitData) {
      prevSelectedItemsRef.current = [...prevSelectedItemsRef.current, ...generatedOutFitData.items.map(item => item.id)];
    }
  }, [generatedOutFitData]);

  const navigate = useNavigate();

  const noOutfitGenerated =
    !isLoading && !isFetching && !generatedOutFitData?.items?.length;

  return (
    <div style={styles.root as React.CSSProperties}>
      <Box sx={styles.upperBar}>
        <Header />
      </Box>
      <Box sx={styles.outfitContainer}>
        <>
          <Box sx={styles.pageTitle}>
            {noOutfitGenerated
              ? "No Outfit Generated"
              : "Your Outfit is Ready!"}
          </Box>
          <Box sx={styles.pageSubtitle}>
            {noOutfitGenerated
              ? "Your selecton did not yield any outfit. Please try again with different items or stores."
              : `Here's your generated look, with all the pieces that make it
              up.`}
          </Box>
        </>

        {isFetching ? (
          <>
            <Box sx={styles.modelImageContainer}>
              <Skeleton variant="rectangular" width="100%" height="100%" />
            </Box>

            <Skeleton
              variant="text"
              width="200px"
              height={36}
              sx={{ alignSelf: "flex-start" }}
            />

            <Box sx={styles.itemsContainer}>
              {[...Array(4)].map((_, i) => (
                <Card key={`skeleton-${i}`} sx={styles.itemCard}>
                  <Skeleton
                    variant="rectangular"
                    width={60}
                    height={60}
                    sx={{ borderRadius: "8px" }}
                  />
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Skeleton variant="text" width="140px" height={24} />
                    <Skeleton variant="text" width="100px" height={21} />
                  </Box>
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={35}
                    sx={{ borderRadius: "8px" }}
                  />
                </Card>
              ))}
            </Box>
          </>
        ) : (
          !noOutfitGenerated && (
            <>
              {generatedOutFitData?.modelImage && (
                <Box sx={styles.modelImageContainer}>
                  <img
                    style={styles.modelImage}
                    src={BufferToImageUrl(generatedOutFitData.modelImage)}
                    alt="Generated Look"
                  />
                </Box>
              )}
              <Box sx={styles.sectionTitle}>What&apos;s Included</Box>
              <Box sx={styles.itemsContainer}>
                {generatedOutFitData?.items
                  ? generatedOutFitData.items.map(
                      ({ imageUrl, siteUrl, store, name }) => (
                        <Card key={imageUrl} sx={styles.itemCard}>
                          <Box sx={styles.itemThumb}>
                            <img
                              src={imageUrl}
                              style={styles.itemImage}
                              alt="Item"
                            />
                          </Box>
                          <Box sx={styles.itemDetails}>
                            <Box sx={styles.itemTitle}>
                              {siteUrl
                                ? name || "Store Item"
                                : "Item From Closet"}
                            </Box>
                            {store && <Box sx={styles.itemStore}>{store}</Box>}
                          </Box>
                          {siteUrl && (
                            <a
                              href={siteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={styles.buyButton as React.CSSProperties}
                            >
                              Buy Now
                            </a>
                          )}
                        </Card>
                      )
                    )
                  : null}
              </Box>
            </>
          )
        )}
        <Button
          variant="contained"
          color="primary"
          sx={styles.backButton}
          onClick={() => navigate(PATHS.MAIN)}
        >
          Back To Home Page
        </Button>
        <IconButton onClick={() => refetch()}>
          <RefreshIcon/>
        </IconButton>
      </Box>
    </div>
  );
};

export default Outfit;
