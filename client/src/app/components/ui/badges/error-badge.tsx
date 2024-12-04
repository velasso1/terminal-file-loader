import { FC, useState } from 'react';

interface IErrorBadgeProps {
  status: string | number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR';
  originalStatus: number | string;
  badgeType: 'ERROR' | 'SUCCESS';
}

const ErrorBadge: FC<IErrorBadgeProps> = ({ status, originalStatus, badgeType }) => {
  const [showBadge, setShowBadge] = useState<boolean>(true);

  setTimeout(() => {
    setShowBadge(false);
  }, 5000);

  return showBadge ? (
    <div className={`badge ${badgeType === 'ERROR' ? 'badge-danger' : 'badge-success'}`}>
      <div className="badge__header">{`${status}, Code: ${originalStatus}`}</div>
      <div className="badge__message">
        {(badgeType === 'ERROR' && 'Возникла ошибка, обратитесь к администратору') || (badgeType === 'SUCCESS' && 'Успешно')}
      </div>
    </div>
  ) : null;
};

export default ErrorBadge;
