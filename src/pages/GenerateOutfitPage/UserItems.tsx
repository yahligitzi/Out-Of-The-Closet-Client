import { Box } from "@mui/material";
import itemsService from "../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../../types/tag.type";
import SelectButton from "../../components/SelectButton";
import ItemsPage from "../../components/ItemsPage";

type UserItemsProps = {
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const UserItems = ({ selectedItems, setSelectedItems }: UserItemsProps) => {
  const { isLoading, data: allItems } = useQuery({
    queryKey: ["initialItems"],
    queryFn: itemsService.getItems,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <ItemsPage
          isAbleToDelete={false}
          isLoadingItems={isLoading}
          onClickItem={({ imageUrl, id, tags }) => {
            const isSelected = selectedItems.find((item) => item.id === id);

            if (isSelected) {
              setSelectedItems((prev) => prev.filter((item) => item.id !== id));
            } else {
              setSelectedItems((prev) => prev.concat({ imageUrl, id, tags }));
            }
          }}
          allItems={allItems}
          selectedItems={selectedItems}
          isSelectedStyle={{
            border: "1px solid #1976d2",
            transform: "scale(1.05)",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <SelectButton
            areAllSelected={selectedItems.length === allItems?.length}
            selectAllFunc={() => allItems?.length && setSelectedItems(allItems)}
            clearFunc={() => setSelectedItems([])}
          />
        </ItemsPage>
      </Box>
    </Box>
  );
};

export default UserItems;
