import type { ReactNode } from "react";
import { usePostEditorModal } from "@/store/PostEditorModal";
import PostEditorModal from "@/components/modal/PostEditorModal";

export default function ModalProvider({ children }: { children: ReactNode }) {
  const postEditorModal = usePostEditorModal();

  return (
    <>
      {children}
      <PostEditorModal
        open={postEditorModal.isOpen}
        onOpenChange={(next) => {
          if (!next) postEditorModal.actions.close();
        }}
      />
    </>
  );
}
