import { FC, useState } from 'react';

interface IImageProps {
  src: string;
  alt?: string;
}

const Image: FC<IImageProps> = ({ src, alt = 'none' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <img
      src={imageLoaded ? src : '/images/default.webp'}
      onLoad={() => setImageLoaded(true)}
      alt={alt}
    />
  );
};

export default Image;
