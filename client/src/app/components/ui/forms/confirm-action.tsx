import { FC, useState, useEffect } from 'react';

import { useDeleteCategoryMutation } from '../../../store/api/museum-api';
import { useParams } from 'react-router-dom';

import Loader from '../loader';
import { IInitialState } from '../modals/modal-skelet';

interface IConfirmModalProps<T> {
  modalHandler: (arg: T) => void;
  modalsState: T;
}

const ConfirmAction: FC<IConfirmModalProps<IInitialState>> = ({ modalHandler, modalsState }) => {
  const params = useParams<{ id: string }>();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [deleteCategoryQuery, { data, isLoading, error }] = useDeleteCategoryMutation();

  useEffect(() => {
    if (!buttonDisabled) {
      clearTimeout(timeout);
    }
  }, [buttonDisabled]);

  const timeout = setTimeout(() => {
    setButtonDisabled(false);
  }, 5000);

  const deleteCategory = () => {
    if (params.id) {
      deleteCategoryQuery({ id: params.id });
    }
    modalHandler({ ...modalsState, deleteCategory: false });
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="confirm">
        <div className="confirm__content">
          <p className="confirm__attention">внимание</p>
          <p className="confirm__question">Вы уверены что хотите удалить этот элемент?</p>
          <p className="confirm__question">
            Данное действие будет <span className="confirm__emphasis">невозможно</span> отменить
          </p>

          <div className="confirm__actions">
            <button className="button confirm__approve" disabled={buttonDisabled} onClick={() => deleteCategory()}>
              Удалить
            </button>
            <button className="button confirm__reject" onClick={() => modalHandler({ ...modalsState, deleteCategory: false })}>
              Отменить
            </button>
          </div>
          <div className="confirm__timer">{`Кнопка удаления будет доступна через 5 секунд`}</div>
        </div>
      </div>
    </>
  );
};

export default ConfirmAction;
