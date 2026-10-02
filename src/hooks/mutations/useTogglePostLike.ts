import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { type Post, type useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.post.list });

      const prevPosts = queryClient.getQueryData<Post[]>(QUERY_KEYS.post.list);

      queryClient.setQueryData<Post[]>(QUERY_KEYS.post.list, (posts) =>
        posts?.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                like_count: post.isLiked
                  ? post.like_count - 1
                  : post.like_count + 1,
              }
            : post,
        ),
      );

      return { prevPosts };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      if (context?.prevPosts) {
        queryClient.setQueryData(QUERY_KEYS.post.list, context.prevPosts);
      }
      console.error(error);
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
