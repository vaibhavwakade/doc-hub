import { deleteDocument } from "@/services/api/document/documentApi";
import { queryClient } from "@/services/queryClient/queryClient";
import { useMutation } from "@tanstack/react-query";

export function useDeleteDocument() {
  const {
    mutate: removeDocument,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: string) => deleteDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-documents"],
      });
    },
  });

  return {
    removeDocument,
    isPending,
    error,
  };
}
