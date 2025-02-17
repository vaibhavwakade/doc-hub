import { toast } from "@/hooks/use-toast";
import {
  DocumentData,
  updateDocument,
} from "@/services/api/document/documentApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editDocument,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      documentId,
      data,
    }: {
      documentId: string;
      data: DocumentData;
    }) => updateDocument(documentId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-documents"],
      });
      toast({
        title: "Document updated",
        description: "Document updated successfully",
      });
    },
  });

  return {
    editDocument,
    isPending,
    error,
  };
};
