import itemsService from "../../../../services/items.service";
import { useQuery } from "@tanstack/react-query";
import { Item } from "../../../../types/tag.type";
import SelectButton from "../../../../components/SelectButton";
import ItemsPage from "../../../../components/ItemsPage";
import styles from "./userItems.style";

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

  const handleClickOnItem = ({ imageUrl, id, tags }: Item) => {
    const isSelected = selectedItems.find((item) => item.id === id);

    if (isSelected)
      setSelectedItems((prev) => prev.filter((item) => item.id !== id));
    else setSelectedItems((prev) => prev.concat({ imageUrl, id, tags }));
  };

  return (
    <ItemsPage
      isAbleToDelete={false}
      isLoadingItems={isLoading}
      onClickItem={handleClickOnItem}
      allItems={allItems}
      selectedItems={selectedItems}
      isSelectedStyle={styles.selectedItemStyle}
    >
      <SelectButton
        areAllSelected={selectedItems.length === allItems?.length}
        selectAllFunc={() => allItems?.length && setSelectedItems(allItems)}
        clearFunc={() => setSelectedItems([])}
      />
    </ItemsPage>
  );
};

export default UserItems;
