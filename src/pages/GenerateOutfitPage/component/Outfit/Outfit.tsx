import { FC, useMemo } from "react";
import { Box, Button, Card, Skeleton } from "@mui/material";
import Header from "../../../../components/Header";
import itemsService from "../../../../services/items.service";
import styles from "./outfit.style";
import { useQuery } from "@tanstack/react-query";
import { OutfitProps } from "./outfit.types";
import { BufferToImageUrl } from "./Outfit.utils";
import { PATHS } from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";

const Outfit: FC<OutfitProps> = ({ selectedItems, selectedStores }) => {
  const {
    isFetching,
    isLoading,
    data: generatedOutFitData,
  } = useQuery({
    queryKey: ["generateOutfit"],
    queryFn: () =>
      itemsService.generateOutFit(
        selectedItems,
        selectedStores.map(({ name }) => name)
      ),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const navigate = useNavigate();

  const noOutfitGenerated =
    !isLoading && !isFetching && !generatedOutFitData?.items?.length;

  const pageTitle = useMemo(() => {
    if (isFetching) return "Getting Your Outfit Ready..";
    if (noOutfitGenerated) return "No Outfit Generated";

    return "Your Outfit is Ready!";
  }, [noOutfitGenerated, isFetching]);

  const pageSubTitle = useMemo(() => {
    if (isFetching) return "We’re styling something just for you!";
    if (noOutfitGenerated)
      return "Your selecton did not yield any outfit. Please try again with different items or stores.";

    return `Here's your generated look, with all the pieces that make it
              up.`;
  }, [noOutfitGenerated, isFetching]);

  return (
    <div style={styles.root as React.CSSProperties}>
      <Box sx={styles.upperBar}>
        <Header />
      </Box>
      <Box sx={styles.outfitContainer}>
        <>
          <Box sx={styles.pageTitle}>{pageTitle}</Box>
          <Box sx={styles.pageSubtitle}>{pageSubTitle}</Box>
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
      </Box>
    </div>
  );
};

export default Outfit;
