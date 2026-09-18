import { DialogTitle } from "@radix-ui/react-dialog";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

type PostEditorModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PostEditorModal({
  open,
  onOpenChange,
}: PostEditorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-12">
        <DialogTitle className="text-2xl">포스트 작성</DialogTitle>
        <textarea
          placeholder="무슨 일이 있었나요?"
          className="min-h-25 max-h-125 focus:outline-none"
        />
        <div className="flex flex-col gap-2">
          <Button className="cursor-pointer">저장</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
