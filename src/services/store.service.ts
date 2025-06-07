import { Store } from "../pages/GenerateOutfitPage/component/Stores/store.types";
import apiClient from "./axiosInstance";

const baseUrl = "/store";

export default {
  getStores: async (): Promise<Store[]> => (await apiClient.get(baseUrl)).data,
};
