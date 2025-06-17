import { GenerateItem, Item } from "../../../../types/tag.type";
import { Option } from "../../GenerateOutfitPage";
import { Store } from "../Stores/store.types";

export type OutfitProps = {
  selectedItems: Item[];
  selectedStores: Store[];
  option: Option;
};

export type BufferFromServer = { type: "Buffer"; data: number[] };
export interface GenerateOutFitRes {
  items: GenerateItem[];
  modelImage: BufferFromServer | null;
}
