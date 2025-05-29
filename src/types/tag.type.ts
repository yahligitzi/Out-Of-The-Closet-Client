export type ItemTag = {
  name: string;
  tagId: string;
  categoryId: string;
  categoryName: string;
};

export type Item = {
  id: string;
  imageUrl: string;
  tags: ItemTag[];
};
