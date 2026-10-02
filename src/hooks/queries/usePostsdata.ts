import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import { useQuery } from "@tanstack/react-query";

export function usePostsData(authorId?: string) {
  const session = useSession();
  return useQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: () => fetchPosts({ userId: session!.user.id, authorId }),
    enabled: !!session,
  });
}
