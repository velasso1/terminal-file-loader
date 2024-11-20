import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../store';

import Image from './ui/image';
import Loader from './ui/loader';

import { routes } from '../../utils/routes/routes';

const CategoriesList: FC = () => {
  const navigate = useNavigate();

  const { categories, status } = useAppSelector(
    (state) => state.categoriesSlice
  );

  return (
    <>
      {status.loading && <Loader />}
      <div className="categories">
        <div className="categories__list">
          {categories.map((item) => {
            return (
              <div
                className="categories__item"
                onClick={() => navigate(`${routes.currentCategory}${item.id}`)}
                key={item.id}
              >
                <div className="categories__name">{item.category}</div>
                <div className="categories__image">
                  <Image src={item.style} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CategoriesList;
