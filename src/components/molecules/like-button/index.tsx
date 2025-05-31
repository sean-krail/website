import { IconThumbUp, IconThumbUpFilled } from "@tabler/icons-react";
import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FunctionComponent, useState } from "react";
import Button from "../../atoms/button";

const COUNT_LIKES_QUERY_KEY: QueryKey = ["count", "likes"];

const LikeButton: FunctionComponent = () => {
  const [disabled, setDisabled] = useState(false);

  const queryClient = useQueryClient();

  const { isPending, error, data, isFetching } = useQuery<number>({
    queryKey: COUNT_LIKES_QUERY_KEY,
    queryFn: async () =>
      Number(
        await (await fetch(import.meta.env.VITE_LIKES_COUNT_ENDPOINT)).json(),
      ),
  });

  // TODO: testing - remove
  console.log({ isPending, error, data, isFetching });

  const { mutateAsync } = useMutation({
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

  return (
    <Button
      disabled={false}
      onClick={async () => {
        setDisabled(true);
        await mutateAsync();
      }}
    >
      {!disabled ? <IconThumbUp stroke={2} /> : <IconThumbUpFilled />}
      &nbsp;&nbsp;&nbsp;
      <span>{data}</span>
    </Button>
  );
};

export default LikeButton;
