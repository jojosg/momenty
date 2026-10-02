import PostItem from "@/components/post/PostItem";
import { usePostsData } from "@/hooks/queries/usePostsdata";
import Fallback from "../Fallback";
import Loader from "../Loader";
import { useSession, useSetSession } from "@/store/session";

export default function PostFeed({ authorId }: { authorId?: string }) {
  const session = useSession();
  const { data, error, isPending } = usePostsData(authorId);
  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      {data.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          content={post.content}
          authorId={post.author_id}
          createdAt={post.created_at}
          isLiked={post.isLiked}
          likeCount={post.like_count}
          imageUrls={post.image_urls ?? undefined}
          user={{
            nickname: post.author.nickname,
            avatarUrl: post.author.avatar_url ?? undefined,
          }}
        />
      ))}
    </div>
  );
}
