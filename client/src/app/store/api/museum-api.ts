import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IAddFromState } from '../../components/ui/forms/add-item';
import { IDeleteBodyQuery } from '../../../types/redux-types/categories-fetch-types';

import { TCategories } from '../../../types/redux-types/initial-states-types';
import { IOperationResponse } from '../../../types/redux-types/operation-types';

export const museumApi = createApi({
  reducerPath: 'museumApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  tagTypes: ['Categories'],
  endpoints: (build) => ({
    getCategories: build.query<TCategories, void>({
      query: () => `${import.meta.env.VITE_GET_EVENTS}`,
      providesTags: (result, error, arg) =>
        result ? [...result.map(({ id }) => ({ type: 'Categories' as const, id })), 'Categories'] : ['Categories'],
    }),

    createSubcategory: build.mutation<IOperationResponse, IAddFromState>({
      query: (formData) => ({
        url: `${import.meta.env.VITE_CREATE_SUBCATEGORY}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Categories'],
    }),

    deleteSubcategory: build.mutation<IOperationResponse, IDeleteBodyQuery>({
      query: (body) => ({
        url: `${import.meta.env.VITE_DELETE_SUBCATEGORY}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['Categories'],
    }),

    updateSubcategory: build.mutation<void, { id: number }>({
      query: (body) => ({
        url: `${import.meta.env.VITE_UPDATE_SUBCATEGORY}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const { useGetCategoriesQuery, useCreateSubcategoryMutation, useDeleteSubcategoryMutation, useUpdateSubcategoryMutation } = museumApi;
