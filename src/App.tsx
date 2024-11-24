import { Button } from "@/components/ui/button";
import { Container, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between items-center py-5 bg-white z-[9999] sticky top-0 shadow-xl h-20 px-5">
        <div className=" justify-center flex items-center">
          <Container
            scale={20}
            size={40}
            className="text-4xl bg-slate-50 rounded-full p-1"
          />
          <h1 className="font-bold text-2xl ml-2">Docs Navigator</h1>
        </div>
        <div>
          <Button className="px-6 py-2 bg-white text-blue-500 font-bold rounded-full shadow hover:bg-gray-50">
            Logout
          </Button>
        </div>
      </nav>
      <div className="md:max-w-[1780px] w-[95%] mx-auto   min-h-screen md:px-3">
        {/* Header Section */}
        <header className="bg-gradient-to-r mt-4 from-blue-500 to-purple-600 text-white py-12 text-center rounded-lg shadow-md mb-8">
          <h1 className="text-5xl font-extrabold">Welcome to Docs Navigator</h1>
          <p className="text-[18px] md:text-xl mt-4">
            Your ultimate document management solution
          </p>
          <Button
            onClick={() => {
              navigate("/dashboard/finance");
            }}
            className="mt-6 px-6 py-2 bg-white text-blue-500 font-bold rounded-full shadow hover:bg-gray-200"
          >
            Get Started
          </Button>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 my-10">
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
