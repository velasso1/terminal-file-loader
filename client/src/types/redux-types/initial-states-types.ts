export interface ISubcategoryItem {
  id: number;
  image: string;
  name: string;
}

export interface ICategoriesItem {
  category: string;
  id: number;
  image: string | null;
  style: string;
  subcategory: ISubcategoryItem[];
}

export type TCategories = ICategoriesItem[];
