import { useOpenEditPostModal } from "@/store/PostEditorModal";
import { Button } from "../ui/Button";

type Props = {
  id: number;
  content: string;
};

export default function EditPostItemButton({ id, content }: Props) {
  const openEditPostModal = useOpenEditPostModal();
  const handleButtonClick = () => {
    openEditPostModal({
      type: "EDIT",
      postId: id,
      content: content,
    });
  };

  return (
    <Button
      onClick={handleButtonClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      수정
    </Button>
  );
}
