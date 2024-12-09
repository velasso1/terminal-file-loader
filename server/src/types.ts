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
