import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const COUNT_LIKES_QUERY_KEY: QueryKey = ["count", "likes"];

function useLikeCount() {
  const queryClient = useQueryClient();

  const { isPending, data } = useQuery<number>({
    queryKey: COUNT_LIKES_QUERY_KEY,
    queryFn: async () =>
      Number(
        await (await fetch(import.meta.env.VITE_LIKES_COUNT_ENDPOINT)).json(),
      ),
  });

  const { mutateAsync: submitLike, isPending: isMutating } = useMutation({
    mutationFn: async () =>
      await (
        await fetch(import.meta.env.VITE_LIKES_COUNT_ENDPOINT, {
          method: "POST",
        })
      ).json(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: COUNT_LIKES_QUERY_KEY });
      const previousCount = queryClient.getQueryData(COUNT_LIKES_QUERY_KEY);
      queryClient.setQueryData(
        COUNT_LIKES_QUERY_KEY,
        (count: number) => count + 1,
      );
      return { previousCount };
    },
    onError: async (_error, _variables, context) => {
      queryClient.setQueryData([COUNT_LIKES_QUERY_KEY], context?.previousCount);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: COUNT_LIKES_QUERY_KEY });
    },
  });

  return {
    count: data,
    isLoading: isPending || isMutating,
    submitLike,
  };
}

export { useLikeCount };
