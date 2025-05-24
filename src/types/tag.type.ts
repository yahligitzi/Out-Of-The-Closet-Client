export type ItemTag = {
  name: string;
  tagId: string;
  categoryId: string;
  categoryName: string;
};

export type Item = {
  imageUrl: string;
  tags: ItemTag[];
};
