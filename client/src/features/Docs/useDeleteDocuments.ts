import { toast } from "@/hooks/use-toast";
import { deleteDocument } from "@/services/api/document/documentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  const {
    mutate: removeDocument,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: string) => deleteDocument(data),
    onSuccess: () => {
      toast({
        title: "Document deleted",
        description: "Document has been deleted successfully",
      });
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
