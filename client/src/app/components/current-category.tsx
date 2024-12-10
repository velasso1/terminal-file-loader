import { FC, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';

import CategoryTable from './ui/category-table';
import ModalSkelet from './ui/modals/modal-skelet';

import { routes } from '../../utils/routes/routes';

const CurrentCategory: FC = () => {
  const navigate = useNavigate();

  const { categories } = useAppSelector((state) => state.categoriesSlice);

  useEffect(() => {
    if (categories.length === 0) {
      navigate(routes.categoriesList);
    }
  }, [categories]);

  return (
    <div className="subcategories">
      <ModalSkelet />
      <CategoryTable />
    </div>
  );
};

export default CurrentCategory;
