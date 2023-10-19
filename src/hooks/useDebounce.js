import { useEffect, useState } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value); // 검색어를 누적하는 State
  useEffect(() => {
    // setTimeout() 호출되는 도중에 value or delay가 바뀌어서 다시 호출되면
    // cleanup 함수 패턴을 이용하여 기존의 timer를 없애줌
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }; // timer 초기화
  }, [value, delay]);

  return debouncedValue;
};
