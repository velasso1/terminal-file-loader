import { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { useAppDispatch } from './store';
import { categoriesReceived } from './store/slices/categories';
import { useGetCategoriesQuery } from './store/api/museum-api';

import Loader from './components/ui/loader';
import Header from './components/ui/header';
import Footer from './components/ui/footer';
import CategoriesList from './components/categories-list';
import ErrorBadge from './components/ui/badges/error-badge';
import CurrentCategory from './components/current-category';

import { routes } from '../utils/routes/routes';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useGetCategoriesQuery();

  useEffect(() => {
    if (data) {
      dispatch(categoriesReceived(data));
    }
  }, [data]);

  return (
    <>
      {isLoading && <Loader />}
      {error && 'status' && 'originalStatus' in error && <ErrorBadge status={error.status} originalStatus={error.originalStatus} badgeType="ERROR" />}
      <Header />
      <Routes>
        <Route path={routes.categoriesList} element={<CategoriesList />} />
        <Route path={`${routes.currentCategory}:id`} element={<CurrentCategory />} />
        <Route path="*" element={<Navigate to={routes.categoriesList} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
