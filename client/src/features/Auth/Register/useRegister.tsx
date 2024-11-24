import { useToast } from "@/hooks/use-toast";
import { registerApi } from "@/services/api/auth/authApis";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/User";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();
  const setUser = useUserStore((user) => user.setUser);
  const { toast } = useToast();
  const {
    mutate: registerUser,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerApi,
    onSuccess: (data: { user: User }) => {
      toast({
        title: "Registered Successfully",
        description: "You have successfully registered.",
        variant: "default",
      });
      setUser(data?.user as User);
      navigate("/dashboard");
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === 400) {
        toast({
          title: "Error",
          description: "User already exists with this email.",
        });
      }
    },
  });
  return {
    registerUser,
    isPending,
    error: error as AxiosError | null,
  };
}
