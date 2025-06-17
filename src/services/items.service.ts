import { GenerateOutFitRes } from "../pages/GenerateOutfitPage/component/Outfit/outfit.types";
import { Option } from "../pages/GenerateOutfitPage/GenerateOutfitPage";
import { Item } from "../types/tag.type";
import apiClient from "./axiosInstance";

const baseUrl = "/items";

export default {
  addItems: async (formData: FormData) => {
    await apiClient.post(`${baseUrl}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getItems: async (): Promise<Item[]> =>
    (await apiClient.post(`${baseUrl}/by-user`)).data,

  generateOutFit: async (
    items: Item[],
    stores: string[],
    mode: Option
  ): Promise<GenerateOutFitRes> => {
    const { data } = await apiClient.post(`${baseUrl}/outfit`, {
      items,
      stores,
      mode,
    });
    return data;
  },

  addItemsByUrl: async (urls: string[]) => {
    await apiClient.post("scraper/scrape-by-link", { urls });
  },
};
