import { supabase } from "@/lib/supabase";
import type { PostEntity } from "@/types";

// 게시물 목록 조회 + 각 게시물에 좋아요 정보(myLiked)를 조인해서 함께 가져옴
// myLiked: 이 게시물에 좋아요를 누른 기록들 (like 테이블에서 post_id가 같은 것만 붙여줌)

export async function fetchPosts({
  userId,
  authorId,
}: {
  userId: string;
  authorId?: string;
}) {
  const request = supabase
    .from("post")
    .select("*, author: profile!author_id (*), myLiked:like!post_id (*)")
    .eq("like.user_id", userId)
    .order("created_at", { ascending: false });

  if (authorId) request.eq("author_id", authorId);
  const { data, error } = await request;
  if (error) throw error;
  return data.map((post) => ({
    ...post,
    isLiked: post.myLiked && post.myLiked.length > 0,
  }));
}

export async function fetchPostsById({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author: profile!author_id (*), myLiked:like!post_id (*)")
    .eq("like.user_id", userId)
    .eq("id", postId)
    .single();
  if (error) throw error;
  return { ...data, isLiked: data.myLiked && data.myLiked.length > 0 };
}

export async function createPost(content: string) {
  const { data, error } = await supabase.from("post").insert({
    content,
  });

  if (error) throw error;
  return data;
}
export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function togglePostLike({
  postId,
  userId,
}: {
  postId: number;
  userId: string;
}) {
  const { data, error } = await supabase.rpc("toggle_post_like", {
    p_post_id: postId,
    p_user_id: userId,
  });
  if (error) throw error;
  return data;
}
