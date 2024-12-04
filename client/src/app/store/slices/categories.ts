import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TCategories } from '../../../types/redux-types/initial-states-types';

interface IInitialState {
  categories: TCategories;
  status: {
    loading: boolean;
    error: boolean;
  };
}

const initialState: IInitialState = {
  categories: [],
  status: {
    loading: false,
    error: false,
  },
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

// Actions

// export const deleteSubcatergoryItem = (body: IDeleteBodyQuery) => {
//   return async (dispatch: AppDispatch): Promise<void> => {
//     try {
//       dispatch(changeLoadingStatus(true));
//       await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_DELETE_SUBCATEGORY, {
//         method: 'DELETE',
//         body: JSON.stringify(body),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }).then((resp) => resp.json().then(() => dispatch(changeLoadingStatus(false))));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// export const createSubcategory = (body: IAddFromState) => {
//   const formData = new FormData();
//   if (body.image !== null && body.video !== null) {
//     formData.append('name', body.name);
//     formData.append('image', body.image);
//     formData.append('video', body.video);
//     formData.append('id', body.id);
//   }

//   return async (): Promise<void> => {
//     try {
//       await fetch(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CREATE_SUBCATEGORY, {
//         method: 'POST',
//         body: formData,
//       }).then((resp) => console.log(resp));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

export const { categoriesReceived, changeLoadingStatus } = categoriesSlice.actions;
export default categoriesSlice.reducer;
