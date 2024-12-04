import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../store';
import { useDeleteSubcategoryMutation } from '../../store/api/museum-api';
import { ISubcategoryItem } from '../../../types/redux-types/initial-states-types';

import ErrorBadge from './badges/error-badge';

import { routes } from '../../../utils/routes/routes';

// import editBtn from '../../../assets/edit-btn.svg';
import Loader from './loader';

const CategoryTable: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [deleteSubcategory, { data, isLoading, error }] = useDeleteSubcategoryMutation();

  const [subcategories, setSubcategories] = useState<ISubcategoryItem[]>();

  const { categories } = useAppSelector((state) => state.categoriesSlice);

  useEffect(() => {
    if (categories.length === 0) {
      navigate(routes.categoriesList);
      return;
    }

    if (params.id) {
      setSubcategories(JSON.parse(categories[+params.id - 1].subcategory));
    }
  }, [categories, navigate, params.id]);

  return (
    <>
      {isLoading && <Loader />}
      {error && 'status' && 'originalStatus' in error && <ErrorBadge status={error.status} originalStatus={error.originalStatus} badgeType="ERROR" />}
      <div className="subcategory">
        {subcategories?.map((item) => {
          return (
            <div className="subcategory__item" key={crypto.randomUUID()}>
              <div className="subcategory__image">
                <div className="subcategory__info">ID: {item.id}</div>
                <img src={item.image} alt="" style={{ width: '400px' }} />
              </div>
              <div className="subcategory__action">
                <button
                  className="button"
                  onClick={async () => {
                    await deleteSubcategory({
                      ...item,
                      paramsId: params.id ? params.id : '',
                    });
                  }}
                >
                  удалить
                </button>
                <button
                  className="button"
                  onClick={() => {
                    console.log({
                      paramsId: params.id ? params.id : '',
                    });
                  }}
                >
                  изменить
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CategoryTable;
