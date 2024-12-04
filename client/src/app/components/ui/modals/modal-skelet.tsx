import { FC, useState } from 'react';

import cross from '../../../../assets/cross.svg';
import { useNavigate } from 'react-router-dom';

import AddItemForm from '../forms/add-item';

interface IModalSkeletProps {
  children: React.ReactElement;
}

const ModalSkelet: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open ? (
        <div>
          <div className="modal-wrapper" onClick={() => setOpen(false)}></div>
          <div className="modal">
            <div className="modal__image">
              <img className="modal__cross" src={cross} alt="close modal" onClick={() => setOpen(false)} />
            </div>
            <div className="modal__body">
              <AddItemForm setOpen={setOpen} />
            </div>
          </div>
        </div>
      ) : null}
      <div className="buttons">
        <button className="button" onClick={() => navigate(-1)}>
          {'<= Назазд'}
        </button>
        <button className="button" onClick={() => setOpen(true)}>
          Добавить запись
        </button>
      </div>
    </>
  );
};

export default ModalSkelet;
