import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Card,
  ImageList,
  ImageListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import storeService, { Store } from "../../../../services/store.service";
import SelectButton from "../../../../components/SelectButton";
import { colors } from "../../../../constants/styles";
import styles from "./stores.style";

type StoresProps = {
  selectedStores: Store[];
  setSelectedStores: React.Dispatch<React.SetStateAction<Store[]>>;
};

const Stores = ({ selectedStores, setSelectedStores }: StoresProps) => {
  const { isLoading, data: stores } = useQuery({
    queryKey: ["initialStores"],
    queryFn: storeService.getStores,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return (
    <div style={styles.root as React.CSSProperties}>
      <Typography variant="h4" component="h1" sx={styles.title}>
        Choose Stores
      </Typography>
      <Typography variant="body1" sx={styles.text}>
        Choosing a store lets our algorithm combine items from the store’s
        collection to create personalized outfit suggestions
      </Typography>
      {isLoading ? (
        <Box display="grid" sx={styles.skeletonContainer}>
          {[...Array(4)].map(() => (
            <Skeleton
              variant="rectangular"
              width="90%"
              height={100}
              sx={{ margin: 2 }}
            />
          ))}
        </Box>
      ) : (
        <>
          <ImageList sx={styles.imageListContianer} gap={10}>
            {stores ? (
              stores.map(({ logoUrl, name }) => {
                const isSelected = !!selectedStores.find(
                  (store) => store.name === name
                );

                return (
                  <Card
                    key={name}
                    sx={{
                      ...styles.imageCard,
                      ...(isSelected ? styles.selectedImageCard : {}),
                    }}
                    onClick={() =>
                      setSelectedStores((prev) =>
                        isSelected
                          ? prev.filter((store) => store.name !== name)
                          : prev.concat({ name, logoUrl })
                      )
                    }
                  >
                    <ImageListItem>
                      <img src={logoUrl} alt={name} />
                    </ImageListItem>
                  </Card>
                );
              })
            ) : (
              <></>
            )}
          </ImageList>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <SelectButton
              areAllSelected={selectedStores.length === stores?.length}
              clearFunc={() => setSelectedStores([])}
              selectAllFunc={() => stores?.length && setSelectedStores(stores)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Stores;
