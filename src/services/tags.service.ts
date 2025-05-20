import { Tag } from "../types/tag.type";
import apiClient from "./axiosInstance";

const baseUrl = "/tags";

export default {
    getTagByCategory: async (userId: string): Promise<{
        categoryName: string | null;
        name: string;
        tagId: string;
        categoryId: string;
    }[]> =>
        (await apiClient.get(`${baseUrl}/category`, {
            params: { userId }
        })).data,
};
