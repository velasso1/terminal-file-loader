import { FC, useState } from 'react';

interface IAddFromState {
  name: string;
  image: string;
  video: string;
}

const AddItemForm: FC = () => {
  const [state, setState] = useState<IAddFromState>({
    name: '',
    image: '',
    video: '',
  });

  return (
    <div className="subcategory__form">
      <div className="">
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

      <div className="">
        <label className="subcategory__label" htmlFor="ubcategory-image">
          Выберите заставку
        </label>
        <input
          type="file"
          id="subcategory-image"
          alt="Выберите заставку"
          accept="image/jpeg,image/png"
          value={state.image}
          onChange={(e) => setState({ ...state, image: e.target.value })}
        />
      </div>

      <div className="">
        <label className="subcategory__label" htmlFor="subcategory-video">
          Выберите видеозапись
        </label>
        <input
          type="file"
          id="subcategory-video"
          alt="Выберите файл"
          accept="video/mp4"
          value={state.video}
          onChange={(e) => setState({ ...state, image: e.target.value })}
        />
      </div>

      <button onClick={() => console.log(state)}>Создать запись</button>
    </div>
  );
};

export default AddItemForm;
