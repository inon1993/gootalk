import useAxiosPrivate from "./useAxiosPrivate";

export const useRequest = (endpoint, method, data) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const getRequest = async () => {
    try {
      const result = await axiosPrivate({
        url: endpoint,
        method,
        data,
        signal: controller.signal,
      });
      return result.data;
    } catch (e) {
      throw e;
    }
  };
  return getRequest;
};

export default useRequest;
