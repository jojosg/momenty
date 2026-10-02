import { HeartIcon, MessageCircle } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";
import { Button } from "@/components/ui/Button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import EditPostItemButton from "./EditPostItemButton";
import DeletePostButton from "./DeletePostButton";
import { useSession } from "@/store/session";
import LikePostButton from "./LikePostButton";
import { Link } from "react-router";

type PostItemProps = {
  id: number;
  content: string;
  createdAt: string;
  imageUrls?: string[];
  authorId: string;
  likeCount: number;
  isLiked: boolean;
  user: {
    nickname: string;
    avatarUrl?: string;
  };
};

export default function PostItem({
  id,
  content,
  createdAt,
  imageUrls,
  isLiked,
  authorId,
  likeCount,
  user,
}: PostItemProps) {
  const session = useSession();
  const userId = session?.user.id;
  const isMine = authorId === userId;
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm">
      {/* 1. 유저 정보, 수정/삭제 버튼 */}
      <div className="flex justify-between">
        {/* 1-1. 유저 정보 */}
        <div className="flex items-start gap-4">
          <Link to={`profile/${authorId}`}>
            <img
              src={user.avatarUrl || defaultAvatar}
              alt={`${user.nickname}의 프로필 이미지`}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="font-bold hover:underline">{user.nickname}</div>
            <div className="text-muted-foreground text-sm whitespace-nowrap">
              {new Date(createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* 1-2. 수정/삭제 버튼 */}
        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              {" "}
              <EditPostItemButton id={id} content={content} />
              <DeletePostButton id={id} />
            </>
          )}
        </div>
      </div>

      {/* 2. 컨텐츠, 이미지 캐러셀 */}
      <div className="flex cursor-pointer flex-col gap-5">
        {/* 2-1. 컨텐츠 */}
        <div className="line-clamp-2 break-words whitespace-pre-wrap">
          {content}
        </div>

        {/* 2-2. 이미지 캐러셀 */}
        <Carousel>
          <CarouselContent>
            {imageUrls?.map((url, index) => (
              <CarouselItem className="basis-4/5 sm:basis-3/5" key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    className="h-full max-h-[350px] w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 3. 좋아요, 댓글 버튼 */}
      <div className="flex gap-2">
        {/* 3-1. 좋아요 버튼 */}
        <LikePostButton id={id} likeCount={likeCount} isLiked={isLiked} />

        {/* 3-2. 댓글 버튼 */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>댓글 달기</span>
        </div>
      </div>
    </div>
  );
}
