import PostFeed from "@/components/post/PostFeed";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Navigate, useParams } from "react-router";

export default function ProfileDetailPage() {
  const parmas = useParams();
  const userId = parmas.userId;

  if (!userId) return <Navigate to={"/"} replace />;
  return (
    <div className="flex flex-col gap-10">
      <ProfileInfo userId={userId} />
      <div className="border-b"></div>
      <PostFeed authorId={userId} />
    </div>
  );
}
