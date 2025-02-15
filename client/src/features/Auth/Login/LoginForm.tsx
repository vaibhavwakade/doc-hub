import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import { Loader } from "lucide-react";

// Zod schema for validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Define the form values type using Zod
type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { isPending, loginUser } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // Integrate Zod with React Hook Form
  });

  const onSubmit = (data: LoginFormValues) => {
    loginUser(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 dark:bg-gray-900">
      <Card className="mx-auto w-full max-w-md shadow-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
            Login to <span className="text-blue-600">Doc Navigator</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-900 dark:text-gray-100">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? (
                <Loader className="mr-2 h-4 w-4 animate-spin size-8" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
