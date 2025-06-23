export type ItemTag = {
  name: string;
  tagId: string;
  categoryId: string;
  categoryName: string;
};

export type Item = {
  id: string;
  imageUrl: string;
  siteUrl?: string;
  tags: ItemTag[];
};

export type GenerateItem = {
  id: string;
  imageUrl: string;
  siteUrl?: string;
  name?: string;
  store?: string;
};
