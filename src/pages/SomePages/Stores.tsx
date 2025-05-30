import React, { useMemo, useState } from "react";
import storeService, { Store } from "../../services/store.service";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  ImageList,
  ImageListItem,
  Skeleton,
  Typography,
} from "@mui/material";
import styles from "./styles";

type StoresProps = {
  selectedStores: Store[];
  setSelectedStores: React.Dispatch<React.SetStateAction<Store[]>>;
  isContinueDisable: boolean;
  onContinue: () => void;
};

const Stores = ({
  selectedStores,
  setSelectedStores,
  isContinueDisable,
  onContinue,
}: StoresProps) => {
  const { isLoading, data } = useQuery({
    queryKey: ["initialStores"],
    queryFn: storeService.getStores,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const selectBtn = useMemo(() => {
    if (selectedStores.length === data?.length)
      return (
        <Button
          onClick={() => {
            setSelectedStores([]);
          }}
        >
          Clear
        </Button>
      );

    return (
      <Button
        onClick={() => {
          if (data?.length) setSelectedStores(data);
        }}
      >
        Select all
      </Button>
    );
  }, [data, selectedStores]);

  return (
    <div style={styles.root as React.CSSProperties}>
      <Typography variant="h4" component="h1" sx={styles.title}>
        Choose Stores
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
            {data ? (
              data.map(({ logoUrl, name }) => {
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
            {selectBtn}
            <Button onClick={onContinue} disabled={isContinueDisable}>
              continue
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Stores;
