import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TCategories } from '../../../types/redux-types/initial-states-types';

export const museumApi = createApi({
  reducerPath: 'museumApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  endpoints: (build) => ({
    getCategories: build.query<TCategories, void>({
      query: () => `${import.meta.env.VITE_GET_EVENTS}`,
    }),

    createSubcategory: build.mutation<string, object>({
      query: (formData) => ({
        url: `${import.meta.env.VITE_CREATE_SUBCATEGORY}`,
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateSubcategoryMutation } = museumApi;
