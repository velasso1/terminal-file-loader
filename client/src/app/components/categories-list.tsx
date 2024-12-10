import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../store';

import Image from './ui/image';
import Loader from './ui/loader';

import { routes } from '../../utils/routes/routes';
// import ModalSkelet from './ui/modals/modal-skelet';
import CreateNewCategory from './ui/forms/create-new-category';

const CategoriesList: FC = () => {
  const [categoryModal, setCategoryModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const { categories, status } = useAppSelector((state) => state.categoriesSlice);

  return (
    <>
      {status.loading && <Loader />}

      <div className="categories">
        <div className="categories__list">
          {categories.map((item) => {
            return (
              <div className="categories__item" onClick={() => navigate(`${routes.currentCategory}${item.id}`)} key={item.id}>
                <div className="categories__name">{item.category}</div>
                <div className="categories__image">
                  <Image src={item.style} />
                </div>
              </div>
            );
          })}
          <div className="categories__item item-create" onClick={() => setCategoryModal(true)}>
            <div className="categories__name"></div>
            <div className="categories__image">Создать категорию</div>
          </div>
        </div>
      </div>
      {categoryModal && (
        <>
          <div className="modal-wrapper" onClick={() => setCategoryModal(false)}></div>
          <div className="modal">
            <div className="modal__body">
              <CreateNewCategory modalHandler={setCategoryModal} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoriesList;
