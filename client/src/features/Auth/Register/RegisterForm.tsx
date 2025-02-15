import { useState } from "react";
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
import { useRegister } from "./useRegister";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const { registerUser, isPending } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      formData.name &&
      formData.email &&
      formData.mobile &&
      formData.password
    ) {
      registerUser({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile ? +formData.mobile : 0,
        password: formData.password,
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4 dark:bg-gray-900">
      <Card className="mx-auto w-full max-w-md shadow-none border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">
            Register
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Example: Yogita Shete"
                required
                value={formData.name}
                onChange={handleChange}
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile" className="text-gray-900 dark:text-gray-100">
                Mobile
              </Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                required
                maxLength={10}
                minLength={10}
                pattern="[0-9]*"
                title="Please enter a valid mobile number"
                value={formData.mobile}
                onChange={handleChange}
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-900 dark:text-gray-100">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
              disabled={isPending}
            >
              {isPending ? "Signing up..." : "Signup"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
