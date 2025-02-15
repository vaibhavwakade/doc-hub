import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { createDocument, DocumentData } from "@/services/api/document/documentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateDocument = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const queryClient = useQueryClient();

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
      toast({
        title: "Document created",
        description: "Document created successfully",
      });
    },
    onError: (error: any) => {
      if (error?.response?.data?.message?.includes("Free tier document limit")) {
        setShowUpgradeModal(true);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create document. Please try again.",
        });
      }
    },
  });

  return {
    addDocument,
    isPending,
    error,
    showUpgradeModal,
    setShowUpgradeModal,
  };
};
