import { Box, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import UploadImageDialog from "../../components/UploadImageDialog/UploadImageDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import itemsService from "../../services/items.service";
import ItemsPage from "../../components/ItemsPage";
import { Item } from "../../types/tag.type";
import { useSnackbar } from "../../contexts/SnackbarContext";

const MainPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const { setSnackbar } = useSnackbar();

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
    refetchOnReconnect: false,
  });

  const { mutate: deleteItem } = useMutation({
    mutationFn: itemsService.deleteItemById,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <ItemsPage
          isAbleToDelete={true}
          allItems={allItems}
          isLoadingItems={isLoading}
          handleDeleteItem={deleteItem}
          setIsAddingItemsPopupOpen={setIsPopupOpen}
        >
          <IconButton onClick={() => setIsPopupOpen(true)}>
            <AddCircleOutline />
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
