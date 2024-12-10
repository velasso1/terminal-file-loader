import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TCategories } from '../../../types/redux-types/initial-states-types';

interface IInitialState {
  categories: TCategories;
  status: {
    loading: boolean;
    error: boolean;
  };
  createCategoryModal: boolean;
}

const initialState: IInitialState = {
  categories: [],
  status: {
    loading: false,
    error: false,
  },
  createCategoryModal: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesReceived(state, action: PayloadAction<TCategories>) {
      state.categories = action.payload;
    },

    changeLoadingStatus(state, action: PayloadAction<boolean>) {
      state.status.loading = action.payload;
    },
  },
});

export const { categoriesReceived, changeLoadingStatus } = categoriesSlice.actions;
export default categoriesSlice.reducer;
