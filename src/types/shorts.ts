export type Short = {
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export interface ShortMatter {
  content: string;
  data: Short;
  filePath: string;
}
