import { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CategoriesList from './components/categories-list';
import CurrentCategory from './components/current-category';

import { useAppDispatch } from './store';
import { categoriesReceived } from './store/slices/categories';
import { useGetCategoriesQuery } from './store/api/museum-api';

import Loader from './components/ui/loader';

import { routes } from '../utils/routes/routes';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetCategoriesQuery();

  useEffect(() => {
    if (data) {
      dispatch(categoriesReceived(data));
    }
  });

  return (
    <>
      {isLoading && <Loader />}
      <Routes>
        <Route path={routes.categoriesList} element={<CategoriesList />} />
        <Route
          path={`${routes.currentCategory}:id`}
          element={<CurrentCategory />}
        />
        <Route path="*" element={<Navigate to={routes.categoriesList} />} />
      </Routes>
    </>
  );
};

export default App;
