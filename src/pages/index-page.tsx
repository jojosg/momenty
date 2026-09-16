import CreatePostButton from "@/components/post/CreatePostButton";
import PostFeed from "@/components/post/PostFeed";

export default function IndexPage() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <CreatePostButton />
      <PostFeed />
    </div>
  );
}
