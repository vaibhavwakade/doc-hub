import {
  createDocument,
  DocumentData,
} from "@/services/api/document/documentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDocument = () => {
  const queryClient= useQueryClient()
  const {
    mutate: addDocument,
    isPending,
    error,
  } = useMutation({
    mutationFn: (data: DocumentData) => createDocument(data),
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
