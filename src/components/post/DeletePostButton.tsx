import { useDeletePost } from "@/hooks/mutations/useDeletePost";
import { Button } from "../ui/Button";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: number }) {
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onError: (error) => {
      toast.error("포스트 삭제 실패", { position: "top-center" });
    },
  });
  const handleDeleteClick = () => {
    deletePost(id);
  };
  return (
    <Button
      disabled={isDeletePostPending}
      onClick={handleDeleteClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      삭제
    </Button>
  );
}
