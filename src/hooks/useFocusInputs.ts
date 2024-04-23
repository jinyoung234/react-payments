import { useRef } from 'react';

const useFocusInputs = (focusCount: number) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>(Array.from({ length: focusCount }, () => null));

  const focusInputByIndex = (index: number) => {
    const inputElement = inputsRef.current[index];

    if (index >= focusCount || index < 0) return;
    if (!inputElement) return;

    inputElement.focus();
  };

  return {
    inputsRef,
    focusInputByIndex,
  };
};

export default useFocusInputs;
