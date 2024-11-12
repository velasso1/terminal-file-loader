import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TCategories } from '../../../types/redux-types/initial-states-types';
import { AppDispatch } from '..';

interface IInitialState {
  categories: TCategories;
}

const initialState: IInitialState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesReceived(state, action: PayloadAction<TCategories>) {
      state.categories = action.payload;
    },
  },
});

// Actions

export const getCategories = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      fetch(`${import.meta.env.VITE_BASE_URL}/events`).then((resp) =>
        resp.json().then((data) => dispatch(categoriesReceived(data)))
      );
    } catch (error) {
      console.error(error);
    }
  };
};

// export const deleteSubcatergoryItem = () => {
//   return async (dispatch: AppDispatch): Promise<void> => {
//     try {

//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

export const { categoriesReceived } = categoriesSlice.actions;
export default categoriesSlice.reducer;
