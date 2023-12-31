import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import axios, {AxiosError} from '@/config/axios';

/**
 * @description usePut is a custom hook that wraps around react-query's useMutation hook. It is used to make a **PUT** request to the backend.
 * @param endpoint - the endpoint to make the request to
 * @param options - the options to be passed to the useMutation hook
 * @param params - the query params to be sent with the request
 */
function usePut<Req extends {id?: number} = any, Res = any>(
  endpoint: string,
  options: UseMutationOptions<Res, AxiosError, Req> | null = null,
  params: any = null,
) {
  const queryClient = useQueryClient();
  const key = endpoint.split('/')[1];

  return useMutation({
    ...options,
    mutationFn: async newData => {
      const requestEndpoint = newData.id
        ? `${endpoint}/${newData.id}`
        : endpoint;
      const res = await axios.put<Res>(requestEndpoint, newData, {
        params,
      });
      return res.data;
    },
    onSuccess: (...props) => {
      queryClient.invalidateQueries({queryKey: [key]});
      options?.onSuccess && options.onSuccess(...props);
    },
  });
}

export default usePut;
