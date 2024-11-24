import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/userStore";
import { useLogout } from "./features/Auth/useLogout";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { logoutUser, isPending } = useLogout();
  return (
    <>
      <nav className="flex justify-between items-center py-5 bg-white z-[9999] sticky top-0 shadow-xl h-20 px-5">
        <div className=" justify-center flex items-center">
          <img
            src="/logo.jpeg"
            className="text-4xl bg-slate-50 h-14 rounded-lg"
          />
        </div>
        <div>
          {user ? (
            <Button
              disabled={isPending}
              onClick={() => logoutUser()}
              className="px-6 py-2 bg-white text-blue-500 font-bold rounded-full shadow hover:bg-gray-50"
            >
              {isPending ? "Logging out..." : "Logout"}
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/auth/login")}
              className="px-6 py-2 bg-white text-blue-500 font-bold rounded-full shadow hover:bg-gray-50"
            >
              Login
            </Button>
          )}
        </div>
      </nav>
      <div className="md:max-w-[1780px] w-[95%] mx-auto   min-h-screen md:px-3">
        {/* Header Section */}
        <header
          style={{
            backgroundImage: "url(/hero-bg.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="relative bg-gradient-to-r mt-4 from-blue-500 to-purple-600 text-gray-800 py-16 text-center rounded-lg shadow-md mb-8 h-screen flex flex-col justify-center items-center"
        >
          {/* Glass black layer */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg"></div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-white">
            <h1 className="text-5xl font-extrabold mb-4 ">
              Welcome to Docs Navigator
            </h1>
            <p className="text-xl md:text-2xl mt-4">
              Your ultimate document management solution to stay organized,
              collaborate, and access your files from anywhere.
            </p>
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => {
                  navigate("/dashboard/finance");
                }}
                className="px-6 py-3 bg-white text-blue-500 font-bold rounded-full shadow hover:bg-gray-200 transition-all"
              >
                Get Started
              </Button>
              <Button
                onClick={() => {
                  navigate("/learn-more");
                }}
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full shadow hover:bg-white hover:text-blue-500 transition-all"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="relative z-10 flex flex-wrap gap-8 mt-12 justify-center items-center">
            <div className="flex items-center">
              <svg
                className="w-10 h-10 mr-2 text-white animate-bounce"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21l3-3m-3 3L6 18m6-12H3m0 0L6 6m0 0l3 3m3-3h8M9 21v-9"
                />
              </svg>
              <p className="text-lg font-semibold text-white">
                Easy Document Organization
              </p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-10 h-10 mr-2 text-white animate-bounce"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H3m5-6H3m13 6h5m-5-6h5m-4-3a2 2 0 012 2v6m0 4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m0-6a2 2 0 012-2m8-3a2 2 0 00-2-2H9m0 0a2 2 0 00-2-2m7 2H6m0 12h12m-7-2v-4m4 4v-4"
                />
              </svg>
              <p className="text-lg font-semibold text-white">
                Real-time Collaboration
              </p>
            </div>
            <div className="flex items-center">
              <svg
                className="w-10 h-10 mr-2 text-white animate-bounce"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 21V7a1 1 0 00-.7-.95L12 3.76l-7.3 2.29A1 1 0 004 7v14m0-4h16m-8 0v4"
                />
              </svg>
              <p className="text-lg font-semibold text-white">
                Secure Cloud Storage
              </p>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-5 gap-8 my-10">
          <div className="bg-blue-100 p-6 rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-2">Organize Efficiently</h2>
            <p className="text-gray-600">
              Easily categorize, sort, and search through all your documents.
            </p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">Collaborate Seamlessly</h2>
            <p className="text-gray-600">
              Share documents and collaborate in real-time with team members.
            </p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">Access Anytime</h2>
            <p className="text-gray-600">
              Keep your documents secure and accessible from anywhere, anytime.
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">Stay Organized</h2>
            <p className="text-gray-600">
              {" "}
              Keep your documents organized and organized with Doc Navigator.
            </p>
          </div>
          <div className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">Efficient Workflow</h2>
            <p className="text-gray-600">
              {" "}
              Streamline your workflow with Doc Navigator.
            </p>
          </div>
        </section>

        <section className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <blockquote className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-700 italic">
                "Doc Navigator has transformed our workflow. It's fast,
                reliable, and easy to use!"
              </p>
              <div className="flex justify-center gap-3 mt-3 ">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
              </div>
              <footer className="mt-4 text-blue-500 font-semibold">
                - Alex J.
              </footer>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-700 italic">
                "Highly recommend for anyone looking to manage documents
                efficiently."
              </p>
              <div className="flex justify-center gap-3 mt-3 ">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
              </div>
              <footer className="mt-4 text-blue-500 font-semibold">
                - Sarah K.
              </footer>
            </blockquote>
            <blockquote className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <p className="text-gray-700 italic">
                "Collaboration has never been easier with Docs Navigator's
                real-time features."
              </p>
              {/* add stars */}
              <div className="flex justify-center gap-3 mt-3 ">
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
                <Star className="text-yellow-500" />
              </div>

              <footer className="mt-4 text-blue-500 font-semibold">
                - David L.
              </footer>
            </blockquote>
          </div>
        </section>

        <footer className="text-center mt-16">
          <Button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-700">
            Join Now
          </Button>
          <p className="mt-4 text-gray-600">
            Start organizing your documents today!
          </p>
        </footer>
      </div>
    </>
  );
}
