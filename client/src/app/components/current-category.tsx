import { FC, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../store';

import { ISubcategoryItem } from '../../types/redux-types/initial-states-types';

import { routes } from '../../utils/routes/routes';

const CurrentCategory: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { categories } = useAppSelector((state) => state.categoriesSlice);

  useEffect(() => {
    if (categories.length === 0) {
      navigate(routes.categoriesList);
    }
  }, [categories]);

  if (!categories || !params.id) {
    return <div>...loading</div>;
  }

  const subcategory: ISubcategoryItem[] = JSON.parse(
    categories[+params.id - 1].subcategory
  );

  return (
    <div className="subcategory">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>image</th>
            <th>name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {subcategory.map((item) => {
            console.log(item);

            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <img src={item.image} alt="" style={{ width: '150px' }} />
                </td>
                <td>{item.name}</td>
                <td>удалить | редактировать</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CurrentCategory;
