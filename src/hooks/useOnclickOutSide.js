import { useEffect } from 'react';

export default function useOnclickOutSide(ref, modalCloseHandler) {
  useEffect(() => {
    const listener = (evt) => {
      console.log('이벤트 발생', ref);
      // 클릭(터치) 된 곳이 모달창 밖인지 아닌지 구분
      if (!ref.current || ref.current.contains(evt.target)) {
        // 모달창의 안에서 클릭 or 터치됨
        return;
      } else {
        modalCloseHandler();
      }
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, modalCloseHandler]);
}
