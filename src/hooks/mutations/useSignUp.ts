import { signUp } from "@/api/auth";
import { generateErrorMessage } from "@/lib/error";
import type { useMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSignUp(callbacks?: useMutationCallback) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message, {
        position: "top-center",
      });
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
