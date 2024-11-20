import { FC } from 'react';

import { BeatLoader } from 'react-spinners';

interface ILoaderProps {
  color?: string;
}

const Loader: FC<ILoaderProps> = ({ color = '#000000' }) => {
  return (
    <div className="loader">
      <div className="loader__layout"></div>
      <div className="loader__spinner">
        <BeatLoader color={color} />
      </div>
    </div>
  );
};

export default Loader;
