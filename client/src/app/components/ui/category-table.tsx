import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../store';
import { useDeleteSubcategoryMutation } from '../../store/api/museum-api';
import { useUpdateSubcategoryMutation } from '../../store/api/museum-api';
import { ISubcategoryItem } from '../../../types/redux-types/initial-states-types';

import ErrorBadge from './badges/error-badge';

import { routes } from '../../../utils/routes/routes';

// import editBtn from '../../../assets/edit-btn.svg';
import Loader from './loader';

const CategoryTable: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [deleteSubcategory, { data, isLoading, error }] = useDeleteSubcategoryMutation();
  const [updateSubcategory, { data: updateData, isLoading: updateLoading, error: updateError }] = useUpdateSubcategoryMutation();

  const [subcategories, setSubcategories] = useState<ISubcategoryItem[]>();

  const { categories } = useAppSelector((state) => state.categoriesSlice);

  useEffect(() => {
    if (categories.length === 0) {
      navigate(routes.categoriesList);
      return;
    }

    if (params.id && categories) {
      categories.map((item) => {
        // @ts-ignore
        if (item.id === +params.id) {
          // @ts-ignore
          setSubcategories(JSON.parse(item.subcategory));
        }
      });
    }
  }, [categories, params.id]);

  const changeSubcategory = async (item: ISubcategoryItem) => {
    await updateSubcategory({ id: item.id });
  };

  return (
    <>
      {(isLoading || updateLoading || !subcategories) && <Loader />}
      {(error || updateError) && 'status' && 'originalStatus' in error && (
        <ErrorBadge status={error.status} originalStatus={error.originalStatus} badgeType="ERROR" />
      )}
      {data && <ErrorBadge status={data.message} originalStatus={data.status} badgeType="SUCCESS" />}
      <div className="subcategory">
        {subcategories && subcategories.length > 0 ? (
          subcategories?.map((item) => {
            return (
              <div className="subcategory__item" key={crypto.randomUUID()}>
                <div className="subcategory__image">
                  <div className="subcategory__info">ID: {item.id}</div>
                  <img src={item.image} alt="" />
                </div>
                <div className="subcategory__action">
                  <button
                    className="button"
                    onClick={async () => {
                      if (item.id <= 195) {
                        return;
                      }
                      await deleteSubcategory({
                        ...item,
                        paramsId: params.id ? params.id : '',
                      });
                    }}
                  >
                    удалить
                  </button>
                  <button className="button" onClick={() => changeSubcategory(item)}>
                    изменить
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div>События не добавлены</div>
        )}
      </div>
    </>
  );
};

export default CategoryTable;
