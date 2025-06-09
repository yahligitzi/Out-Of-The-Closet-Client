import { Box, IconButton } from "@mui/material";
import { AddCircleOutline, AutoAwesome } from "@mui/icons-material";
import { useState } from "react";
import UploadImageDialog from "../../components/UploadImageDialog/UploadImageDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import itemsService from "../../services/items.service";
import userItemsService from "../../services/userItems.service";
import ItemsPage from "../../components/ItemsPage";
import { Item } from "../../types/tag.type";
import { useSnackbar } from "../../contexts/SnackbarContext";
import styles from "./MainPage.style";

const MainPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { setSnackbar } = useSnackbar();

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
    refetchOnReconnect: false,
  });

  const handleGenerateClicked = () => {
    setIsOpenDialog(true);
  };

  const { mutate: deleteItem } = useMutation({
    mutationFn: userItemsService.deleteItemById,
    onSuccess: ({ data: deletedItemId }) => {
      queryClient.setQueryData<Item[]>(["initialData"], (prevItems) =>
        prevItems?.filter((item) => item.id !== deletedItemId)
      );

      setSnackbar({
        open: true,
        message: "Item deleted successfully",
        severity: "success",
      });
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        message: "Error deleting item. Please try again",
        severity: "error",
      });

      console.error("Error deleting item:", error);
    },
  });

  return (
    <>
      <Box sx={styles.root}>
        <ItemsPage
          allItems={allItems}
          isLoadingItems={isLoading}
          handleDeleteItem={deleteItem}
          setIsAddingItemsPopupOpen={setIsPopupOpen}
          isOpenDialog={isOpenDialog}
          setIsOpenDialog={setIsOpenDialog}
        >
          <IconButton onClick={() => setIsPopupOpen(true)}>
            <AddCircleOutline />
          </IconButton>
          <IconButton onClick={handleGenerateClicked}>
            <AutoAwesome />
          </IconButton>
        </ItemsPage>
      </Box>
      <UploadImageDialog
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
    </>
  );
};

export default MainPage;
