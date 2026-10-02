import { signInWithPassword } from "@/api/auth";
import { generateErrorMessage } from "@/lib/error";
import type { useMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSignInWithPassword(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    //위 함수에서 에러 발생시
    onError: (error) => {
      const message = generateErrorMessage(error);
      console.error(error);
      toast.error(message, {
        position: "top-center",
      });
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
