import { FC } from 'react';

const Footer: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__content">{`© Информационный центр МосУ МВД России им. В.Я. Кикотя, ${year} г.`}</div>
    </footer>
  );
};

export default Footer;
