import { GenerateItem, Item } from "../../../../types/tag.type";
import { Store } from "../Stores/store.types";

export type OutfitProps = {
  selectedItems: Item[];
  selectedStores: Store[];
};

export type BufferFromServer = { type: "Buffer"; data: number[] };
export interface GenerateOutFitRes {
  items: GenerateItem[];
  modelImage: BufferFromServer | null;
}
