import { User } from "../../../types/User";
import { api } from "../axios";
interface LoginData {
  email: string;
  password: string;
}
interface RegisterData extends LoginData {
  mobile: number;
  name: string;
}

interface authResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
export const LoginApi = async (data: LoginData): Promise<authResponse> => {
  const response = await api.post("/api/v1/user/logins", data);
  return response.data;
};

export const registerApi = async (
  data: RegisterData
): Promise<authResponse> => {
  const response = await api.post("/api/v1/user/registers", data);
  return response.data;
};
