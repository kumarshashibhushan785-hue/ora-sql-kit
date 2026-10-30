export type QueryTemplate = {
  id: string;
  category: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  /** Code with {{PLACEHOLDER}} tokens — only these need changing */
  sql: string;
  tips?: string[];
};

export type CategoryTab = {
  id: string;
  labelHi: string;
  labelEn: string;
};
