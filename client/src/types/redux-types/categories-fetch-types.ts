export interface IDeleteBodyQuery {
  id: number;
  image: string;
  name: string;
  paramsId: string;
}

export interface ICreateCategoryQuery {
  name: string;
  image: File | null;
}
