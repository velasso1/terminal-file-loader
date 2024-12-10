import { FC, useState } from 'react';

interface IErrorBadgeProps {
  status: string | number | 'FETCH_ERROR' | 'PARSING_ERROR' | 'TIMEOUT_ERROR' | 'CUSTOM_ERROR';
  originalStatus: number | string;
  badgeType: 'ERROR' | 'SUCCESS';
  timer?: boolean;
}

const ErrorBadge: FC<IErrorBadgeProps> = ({ status, originalStatus, badgeType, timer = true }) => {
  const [showBadge, setShowBadge] = useState<boolean>(true);

  setTimeout(() => {
    if (timer) {
      setShowBadge(false);
    }
  }, 5000);

  return showBadge ? (
    <div className={`badge ${badgeType === 'ERROR' ? 'badge-danger' : 'badge-success'}`}>
      <div className="badge__header">{`${status}, Code: ${originalStatus}`}</div>
      <div className="badge__message">
        {(badgeType === 'ERROR' && 'Возникла ошибка, обратитесь к администратору или подождите') ||
          (badgeType === 'SUCCESS' && 'Операция прошла успешно')}
      </div>
    </div>
  ) : null;
};

export default ErrorBadge;
