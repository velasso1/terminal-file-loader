import { FC, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../store';

import CategoryTable from './ui/category-table';
import ModalSkelet from './ui/modals/modal-skelet';
import AddItemForm from './ui/forms/add-item';
// import AddItemForm from './ui/modals/modal-skelet';

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

  return (
    <div className="subcategory">
      <CategoryTable />
      {/* <AddItemForm />
       */}
      <ModalSkelet children={<AddItemForm />} />
    </div>
  );
};

export default CurrentCategory;
