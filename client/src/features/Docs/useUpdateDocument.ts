import {
  DocumentData,
  updateDocument,
} from "@/services/api/document/documentApi";
import { queryClient } from "@/services/queryClient/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useUpdateDocument = () => {
  const {
    mutate: addDocument,
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
    },
  });

  return {
    addDocument,
    isPending,
    error,
  };
};
