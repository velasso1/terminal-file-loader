// export interface IEventsResult {}
import { TCategories } from '../../client/src/types/redux-types/initial-states-types';
export { TCategories };

export interface ICreateSubcategoryRequest {
  name: string;
  id: string;
  body: {
    [key: string]: string;
  };
  file: {};
  files: {
    [key: string]: [IFileItem];
    image: [IFileItem];
    video: [IFileItem];
  };
}

export interface IFileItem {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: unknown;
  size: number;
}

export interface IPatchRequest {
  body: {
    id: number;
  };
}

export interface IDeleteCategoryResult {
  id: number;
  category: string;
  subcategory: ISubcategory;
  style: string;
}

export interface ISubcategory {
  id: number;
  name: string;
  image: string;
}
