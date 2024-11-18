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
      ) : null}
      <button onClick={() => setOpen(true)}>добавить запись</button>
    </>
  );
};

export default ModalSkelet;
