import { Purches } from "@/services/api/document/documentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useorder = () => {
    const queryClient = useQueryClient();
  
    const {mutate:purchessus} = useMutation({
      mutationKey: ['sus'],
      mutationFn: Purches,
      
      onSuccess: () => {
      
        queryClient.invalidateQueries({
            queryKey: ["sus"],
          });
      },
      onError: (error) => {
       console.log(error);
       
      }
    });
  
    return { purchessus };
  };
