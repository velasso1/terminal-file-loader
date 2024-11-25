import { FC, useState, useEffect } from 'react';

import { useAppDispatch } from '../../../store';
import { createSubcategory } from '../../../store/slices/categories';
import { useParams } from 'react-router-dom';

export interface IAddFromState {
  [key: string]: string | File | null;
  name: string;
  id: string;
  image: File | null;
  video: File | null;
}

const AddItemForm: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const [state, setState] = useState<IAddFromState>({
    name: '',
    id: '',
    image: null,
    video: null,
  });

  useEffect(() => {
    setState({ ...state, id: id ? id : '' });
  }, [id]);

  const [queryState, setQueryState] = useState<{ empty: boolean }>({
    empty: false,
  });

  const validateState = () => {
    setQueryState({ empty: false });

    for (const item in state) {
      if (
        (typeof state[item] === 'string' && state[item].length === 0) ||
        state[item] === null
      ) {
        setQueryState({ empty: true });
        return;
      }
    }

    dispatch(createSubcategory(state));
  };

  return (
    <>
      {queryState.empty && (
        <div className="error">Убедитесь в правильности заполнения полей</div>
      )}

      <div className="subcategory__form">
        <div className="subcategory__info">
          <label className="subcategory__label" htmlFor="subcategory-name">
            Введите название записи
          </label>
          <input
            type="text"
            id="subcategory-name"
            placeholder="Введите название записи"
            value={state.name}
            onChange={(e) =>
              setState({ ...state, name: e.target.value.trim() })
            }
          />
        </div>

        <div className="subcategory__info">
          <label className="subcategory__label" htmlFor="ubcategory-image">
            Выберите заставку
          </label>
          <input
            type="file"
            id="subcategory-image"
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

        <div className="subcategory__info">
          <label className="subcategory__label" htmlFor="subcategory-video">
            Выберите видеозапись
          </label>
          <input
            type="file"
            id="subcategory-video"
            alt="Выберите файл"
            accept="video/mp4"
            onChange={(e) =>
              setState({
                ...state,
                video: e.target.files !== null ? e.target.files[0] : null,
              })
            }
          />
        </div>

        <button
          className="subcategory-button button"
          onClick={() => validateState()}
        >
          Создать запись
        </button>
        {/* button for clear value of input */}
      </div>
    </>
  );
};

export default AddItemForm;
