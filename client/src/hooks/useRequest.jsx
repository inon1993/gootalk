import useAxiosPrivate from "./useAxiosPrivate";

export const useRequest = ({endpoint}) => {
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();

  const getRequest = async () => {
    try {
      const postsArray = await axiosPrivate.get(
        endpoint,
        {
          signal: controller.signal,
        }
      );
      return postsArray.data;
    } catch (e) {
      throw new Error(e);
    }
  };
  return getRequest;
};

export default useRequest;
