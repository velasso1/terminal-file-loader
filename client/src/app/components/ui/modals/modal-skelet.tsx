import { FC, useState } from 'react';

import cross from '../../../../assets/cross.svg';

interface IModalSkeletProps {
  children: React.ReactElement;
}

const ModalSkelet: FC<IModalSkeletProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open ? (
        <div>
          <div className="modal-wrapper" onClick={() => setOpen(false)}></div>
          <div className="modal subcategory">
            <div className="modal__image">
              <img
                className="modal__cross"
                src={cross}
                alt="close modal"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="modal__body">{children}</div>
          </div>
        </div>
      ) : null}
      <button className="button" onClick={() => setOpen(true)}>
        Добавить запись
      </button>
    </>
  );
};

export default ModalSkelet;
