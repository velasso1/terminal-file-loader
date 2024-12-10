import { FC, useState } from 'react';

import { ICreateCategoryQuery } from '../../../../types/redux-types/categories-fetch-types';
import { useCreateCategoryMutation } from '../../../store/api/museum-api';

import Loader from '../loader';

interface ICategoryModalProps {
  modalHandler: (arg: boolean) => void;
}

const initialState: ICreateCategoryQuery = {
  name: '',
  image: null,
};

const CreateNewCategory: FC<ICategoryModalProps> = ({ modalHandler }) => {
  const [state, setState] = useState<ICreateCategoryQuery>(initialState);

  const [createCategoryQuery, { data, isLoading, error }] = useCreateCategoryMutation();

  const validateState = async () => {
    for (const item in state) {
      if ((item === 'name' && state[item] === '') || item === 'null') {
        return;
      }
    }

    if (state.image !== null) {
      const formData = new FormData();

      formData.append('name', state.name);
      formData.append('image', state.image);

      await createCategoryQuery(formData);
      modalHandler(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="create-category">
        <div className="create-category__info">
          <label className="create-category__label" htmlFor="category-name">
            Введите название категории
          </label>
          <input
            type="text"
            id="category-name"
            placeholder="Введите название категории"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value.trim() })}
          />
        </div>

        <div className="create-category__info">
          <label className="create-category__label" htmlFor="category-image">
            Выберите заставку
          </label>
          <input
            type="file"
            id="category-image"
            alt="Выберите заставку"
            accept="image/jpeg,image/png"
            onChange={(e) =>
              setState({
                ...state,
                image: e.target.files !== null ? e.target.files[0] : null,
              })
            }
          />
        </div>
        <div className="create-category__buttons">
          <button className="category-button button" disabled={isLoading} onClick={() => validateState()}>
            Создать категорию
          </button>
          <button className="category-button button" disabled={isLoading} onClick={() => modalHandler(false)}>
            Отмена
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateNewCategory;
