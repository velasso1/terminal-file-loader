import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../store';

import { routes } from '../../utils/routes/routes';

const CategoriesList: FC = () => {
  const navigate = useNavigate();

  const { categories } = useAppSelector((state) => state.categoriesSlice);

  if (!categories) {
    return <p>...loading</p>;
  }

  return categories.map((item) => {
    return (
      <div
        onClick={() => navigate(`${routes.currentCategory}${item.id}`)}
        key={item.id}
      >
        {item.category}
      </div>
    );
  });
};

export default CategoriesList;
