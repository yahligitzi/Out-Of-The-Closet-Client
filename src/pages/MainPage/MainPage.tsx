import { IconButton } from "@mui/material";
import ItemsPage from "./ItemsPage";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import UploadImageDialog from "../../components/UploadImageDialog/UploadImageDialog";
import { useQuery } from "@tanstack/react-query";
import itemsService from "../../services/items.service";

const MainPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialData"],
    queryFn: itemsService.getItems,
    refetchOnReconnect: false,
  });

  return (
    <>
      <ItemsPage
        isAbleToDelete={true}
        allItems={allItems}
        isLoadingItems={isLoading}
      >
        <IconButton onClick={() => setIsPopupOpen(true)}>
          <AddCircleOutline />
        </IconButton>
      </ItemsPage>
      <UploadImageDialog
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
    </>
  );
};

export default MainPage;
