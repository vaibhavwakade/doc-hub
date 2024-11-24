import LoginForm from "@/features/Auth/Login/LoginForm";

function Login() {
  return (
    <div className="flex h-screen">
      {/* Left Side: Image */}
      <div className="flex-1  md:block hidden ">
        <img
          src="/login.svg"
          alt="Login Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
