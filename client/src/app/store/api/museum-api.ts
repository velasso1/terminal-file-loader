import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TCategories } from '../../../types/redux-types/initial-states-types';

export const museumApi = createApi({
  reducerPath: 'museumApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  endpoints: (builder) => ({
    getCategories: builder.query<TCategories, void>({
      query: () => `${import.meta.env.VITE_GET_EVENTS}`,
    }),
  }),
});

export const { useGetCategoriesQuery } = museumApi;
