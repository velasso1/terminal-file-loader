import { FC, useState } from 'react';

interface IImageProps {
  src: string;
  alt?: string;
}

const Image: FC<IImageProps> = ({ src, alt = 'none' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return <img className="card-image" src={imageLoaded ? src : '/images/default.webp'} onLoad={() => setImageLoaded(true)} alt={alt} />;
};

export default Image;
