import {
  createDocument,
  DocumentData,
} from "@/services/api/document/documentApi";
import { queryClient } from "@/services/queryClient/queryClient";
import { useMutation } from "@tanstack/react-query";

export const useCreateDocument = () => {
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
