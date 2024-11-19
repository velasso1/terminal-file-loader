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
    [key: string]: [IFleItem];
    image: [IFleItem];
    video: [IFleItem];
  };
}

interface IFleItem {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: unknown;
  size: number;
}
