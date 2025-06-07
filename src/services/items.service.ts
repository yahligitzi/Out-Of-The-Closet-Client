import { GenerateItem, Item } from "../types/tag.type";
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
    stores: string[]
  ): Promise<{ items: GenerateItem[] }> => {
    const { data } = await apiClient.post(`${baseUrl}/outfit`, {
      items,
      stores,
    });
    return data;
  },

  addItemsByUrl: async (urls: string[]) => {
    await apiClient.post("scraper/scrape-by-link", { urls });
  },
};
