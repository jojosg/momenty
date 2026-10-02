import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";
import { useCreatePost } from "@/hooks/mutations/useCreatePost";
import { toast } from "sonner";
import { usePostEditorModal } from "@/store/PostEditorModal";
import { useUpdatePost } from "@/hooks/mutations/useUpdatePost";
import PostFeed from "../post/PostFeed";

type PostEditorModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PostEditorModal({
  open,
  onOpenChange,
}: PostEditorModalProps) {
  const postEditorModal = usePostEditorModal();
  const [content, setContent] = useState("");
  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      console.error(error);
      toast.error("포스트 생성 실패", {
        position: "top-center",
      });
    },
  });

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("포스트 수정 실패", {
        position: "top-center",
      });
    },
  });
  const handleSavePostClick = () => {
    if (content.trim() === "") return;
    //supabase에 post생성 요청
    if (!postEditorModal.isOpen) return;
    if (postEditorModal.type === "CREATE") {
      createPost(content);
    } else {
      if (content === postEditorModal.content) return;
      updatePost({
        id: postEditorModal.postId,
        content: content,
      });
    }
  };

  useEffect(() => {
    if (postEditorModal.type === "CREATE") {
      setContent("");
    } else {
      setContent(postEditorModal.content);
    }
  }, [postEditorModal.isOpen]);
  return (
    <Dialog open={postEditorModal.isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="p-12">
        <DialogTitle className="text-2xl">포스트 작성</DialogTitle>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="무슨 일이 있었나요?"
          className="max-h-125 min-h-25 focus:outline-none"
        />
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSavePostClick}
            disabled={isCreatePostPending}
            className="cursor-pointer"
          >
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
