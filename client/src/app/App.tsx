import { FC, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import CategoriesList from './components/categories-list';
import CurrentCategory from './components/current-category';

import { getCategories } from './store/slices/categories';
import { useAppDispatch } from './store';

import { routes } from '../utils/routes/routes';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <Routes>
      <Route path={routes.categoriesList} element={<CategoriesList />} />
      <Route
        path={`${routes.currentCategory}:id`}
        element={<CurrentCategory />}
      />
      <Route path="*" element={<Navigate to={routes.categoriesList} />} />
    </Routes>
  );
};

export default App;
