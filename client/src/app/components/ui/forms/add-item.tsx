import { FC, useState, useEffect } from 'react';

import { useCreateSubcategoryMutation } from '../../../store/api/museum-api';
import { useParams } from 'react-router-dom';

import Loader from '../loader';
import ErrorBadge from '../badges/error-badge';

export interface IAddFromState {
  [key: string]: string | File | null;
  name: string;
  id: string;
  image: File | null;
  video: File | null;
}

const AddItemForm: FC<{ setOpen: (arg: boolean) => void }> = ({ setOpen }) => {
  const { id } = useParams<{ id: string }>();

  const [createSubcategory, { data, isLoading, error }] = useCreateSubcategoryMutation();

  const [queryState, setQueryState] = useState<{ empty: boolean }>({
    empty: false,
  });
  const [state, setState] = useState<IAddFromState>({
    name: '',
    id: '',
    image: null,
    video: null,
  });

  useEffect(() => {
    setState({ ...state, id: id ? id : '' });
  }, [id]);

  useEffect(() => {
    if (data?.status === 200) {
      setOpen(false);
    }
  }, [data]);

  const validateState = async () => {
    setQueryState({ empty: false });

    for (const item in state) {
      if ((typeof state[item] === 'string' && state[item].length === 0) || state[item] === null) {
        setQueryState({ empty: true });
        return;
      }
    }

    const formData = new FormData();
    if (state.image !== null && state.video !== null) {
      formData.append('name', state.name);
      formData.append('image', state.image);
      formData.append('video', state.video);
      formData.append('id', state.id);
    }

    await createSubcategory(formData);
  };

  return (
    <>
      {data?.status === 200 ? <ErrorBadge status={data?.status} originalStatus={data?.message} badgeType="SUCCESS" /> : null}
      {error && 'status' && 'originalStatus' in error && <ErrorBadge status={error.status} originalStatus={error.originalStatus} badgeType="ERROR" />}
      {isLoading && <Loader />}
      {queryState.empty && <div className="error">Убедитесь в правильности заполнения полей</div>}

      <div className="subcategory__form">
        <div className="subcategory__modal__info">
          <label className="subcategory__label" htmlFor="subcategory-name">
            Введите название записи
          </label>
          <input
            type="text"
            id="subcategory-name"
            placeholder="Введите название записи"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value.trim() })}
          />
        </div>

        <div className="subcategory__modal__info">
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

        <div className="subcategory__modal__info">
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

        <button className="subcategory-button button" disabled={isLoading} onClick={() => validateState()}>
          Создать запись
        </button>
      </div>
    </>
  );
};

export default AddItemForm;
