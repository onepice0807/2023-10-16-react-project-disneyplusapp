import { useLocation } from 'react-router-dom';

export const useGetParamValue = (param) => {
  const useQuery = () => {
    // URLSearchParams 객체 : URL주소에서 uri와 querystring을 가지고 있는 객체
    // useLocation : URL 주소창의 uri와 querystring을 반환해주는 react Hook
    return new URLSearchParams(useLocation().search);
  };

  const queryString = useQuery();

  return queryString.get(param);
};
