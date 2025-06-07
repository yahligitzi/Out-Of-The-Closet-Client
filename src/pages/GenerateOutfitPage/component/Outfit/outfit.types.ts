import { Item } from "../../../../types/tag.type";
import { Store } from "../Stores/store.types";

export type OutfitProps = {
  selectedItems: Item[];
  selectedStores: Store[];
};
