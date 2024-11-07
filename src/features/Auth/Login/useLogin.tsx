import { LoginApi } from "@/services/api/auth/authApis";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useLogin() {
  const {
    mutate: loginUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: LoginApi,
  });

  return {
    loginUser,
    isPending,
    error: error as AxiosError | null, 
  };
}
