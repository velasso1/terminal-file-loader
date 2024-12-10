import { FC, useState } from 'react';

import cross from '../../../../assets/cross.svg';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../store';

import AddItemForm from '../forms/add-item';
import ConfirmAction from '../forms/confirm-action';
import CreateNewCategory from '../forms/create-new-category';

export interface IInitialState {
  openAddItem: boolean;
  openCreateCategory: boolean;
  deleteCategory: boolean;
}

const initialState: IInitialState = {
  openAddItem: false,
  openCreateCategory: false,
  deleteCategory: false,
};

const ModalSkelet: FC<{ buttons?: boolean }> = ({ buttons = true }) => {
  const navigate = useNavigate();

  const { createCategoryModal } = useAppSelector((state) => state.categoriesSlice);

  const [modalsState, setModalsState] = useState<IInitialState>(initialState);

  return (
    <>
      {modalsState.openAddItem || modalsState.deleteCategory || createCategoryModal ? (
        <div>
          <div
            className="modal-wrapper"
            onClick={() => {
              setModalsState(initialState);
            }}
          ></div>
          <div className="modal">
            <div className="modal__image">
              <img className="modal__cross" src={cross} alt="close modal" onClick={() => setModalsState(initialState)} />
            </div>
            <div className="modal__body">
              {modalsState.openAddItem && <AddItemForm modalHandler={setModalsState} modalsState={modalsState} />}
              {modalsState.deleteCategory && <ConfirmAction modalHandler={setModalsState} modalsState={modalsState} />}
            </div>
          </div>
        </div>
      ) : null}
      {buttons && (
        <div className="buttons">
          <button className="button" onClick={() => navigate(-1)}>
            {'<= Назад'}
          </button>
          <button className="button" onClick={() => setModalsState({ ...modalsState, openAddItem: true })}>
            Добавить запись
          </button>
          <button
            className="button category-delete"
            onClick={() => {
              setModalsState({ ...modalsState, deleteCategory: true });
            }}
          >
            Удалить категорию
          </button>
        </div>
      )}
    </>
  );
};

export default ModalSkelet;
