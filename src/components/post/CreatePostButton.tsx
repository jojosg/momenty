import { PlusIcon } from "lucide-react";
import { useState } from "react";
import PostEditorModal from "@/components/modal/PostEditorModal";

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="px6 cursor-pointer rounded-xl bg-green-500 py-4 text-white"
      >
        <div className="flex justify-center gap-2 text-center">
          <div>
            <PlusIcon />
          </div>
          <span>게시물 등록하기</span>
        </div>
      </div>
      <PostEditorModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
