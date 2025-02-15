import { checksus } from "@/services/api/document/documentApi";
import { useQuery } from "@tanstack/react-query";

export function useStatus() {
  const {
    data: status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sus"],
    queryFn: () => checksus(),
  });

  return { status, isLoading, error };
}
