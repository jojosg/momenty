import { PlusIcon } from "lucide-react";
import { useState } from "react";
import PostEditorModal from "@/components/modal/PostEditorModal";

export default function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 모바일: FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-colors hover:bg-green-600 sm:hidden"
      >
        <PlusIcon size={24} />
      </button>

      {/* 데스크탑: 피드 상단 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden cursor-pointer items-center gap-2 self-end rounded-lg bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600 sm:flex"
      >
        <PlusIcon size={16} />
        게시물 등록하기
      </button>

      <PostEditorModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
