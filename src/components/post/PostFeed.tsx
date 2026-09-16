import PostItem from "@/components/post/PostItem";

const samplePosts = [
  {
    id: 1,
    content: "오늘의 순간을 기록합니다.",
    createdAt: new Date().toISOString(),
    imageUrls: [] as string[],
    user: { nickname: "닉네임" },
  },
  {
    id: 2,
    content: "게시물 내용이 들어갑니다.",
    createdAt: new Date().toISOString(),
    imageUrls: [] as string[],
    user: { nickname: "닉네임" },
  },
];

export default function PostFeed() {
  return (
    <div>
      {samplePosts.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </div>
  );
}
