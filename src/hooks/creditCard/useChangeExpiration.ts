import { validateExpirationDate } from '@utils/expiration';
import { useState } from 'react';

export const initialExpiration = { month: '', year: '' };

const useChangeExpiration = () => {
  const [expiration, setExpiration] = useState(initialExpiration);
  const [expirationError, setExpirationError] = useState({ isError: false, errorMessage: '' });

  const handleExpirationChange = (field: 'month' | 'year', value: string) => {
    if (/\D/.test(value)) {
      setExpirationError({ isError: true, errorMessage: '월은 01에서 12 사이의 숫자여야 합니다.' });
      return;
    }

    const newExpiration = { ...expiration, [field]: value };
    const error = validateExpirationDate(newExpiration.month, newExpiration.year);

    setExpiration(newExpiration);
    setExpirationError(error);
  };

  return { expiration, expirationError, handleExpirationChange };
};

export default useChangeExpiration;
