import { getUserDocumentsByType } from "@/services/api/document/documentApi";
import { useQuery } from "@tanstack/react-query";

export function useDocuments(type: string) {
  const {
    data: allDocsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-documents",type],
    queryFn: () => getUserDocumentsByType(type),
  });

  return { allDocsData, isLoading, error };
}
