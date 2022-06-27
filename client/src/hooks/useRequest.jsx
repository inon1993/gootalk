import useAxiosPrivate from "./useAxiosPrivate";

export const useRequest = (endpoint,method, payload) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const getRequest = async () => {
    try {
      const result = await axiosPrivate({url: endpoint, method, payload, signal: controller.signal});
      return result.data;
    } catch (e) {
      throw new Error(e);
    }
  };
  return getRequest;
};

export default useRequest;
