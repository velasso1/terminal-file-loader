import { FC, useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from '../../store';
import { ISubcategoryItem } from '../../../types/redux-types/initial-states-types';

import { routes } from '../../../utils/routes/routes';
import editBtn from '../../../assets/edit-btn.svg';

const CategoryTable: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const [subcategories, setSubcategories] = useState<ISubcategoryItem[]>();

  const { categories } = useAppSelector((state) => state.categoriesSlice);

  useEffect(() => {
    if (categories.length === 0) {
      navigate(routes.categoriesList);
      return;
    }

    setSubcategories(JSON.parse(categories[+params.id - 1].subcategory));
  }, [categories, navigate, params.id]);

  return (
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
        {subcategories?.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <img src={item.image} alt="" style={{ width: '150px' }} />
              </td>
              <td>{item.name}</td>
              <td>
                <button onClick={() => console.log('deleting', item.id)}>
                  удалить
                </button>
                <button className="editbtn">
                  <img src={editBtn} alt="" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default CategoryTable;
