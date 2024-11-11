import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminDashboard from "./layouts/DashboardLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Button } from "./components/ui/button";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Docs/Home";
import Education from "./pages/Docs/Education";
import Medical from "./pages/Docs/Medical";
import GovDocs from "./pages/Docs/GovDocs";
import Finance from "./pages/Docs/Finance";
import MutualFund from "./pages/Docs/MutualFund";
import Banking from "./pages/Docs/Banking";
import { DocType } from "./types/DocsType";
import BankingSteps from "./pages/Docs/BankingSteps";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "home",
        element: <Home docType={DocType.Home} />,
      },
      {
        path: "education",
        element: <Education docType={DocType.Education} />,
      },
      {
        path: "medical",
        element: <Medical docType={DocType.Medical} />,
      },
      {
        path: "gov-documents",
        element: <GovDocs docType={DocType.GovDocuments} />,
      },
      {
        path: "finance",
        element: <Finance docType={DocType.Finance} />,
      },
      {
        path: "mutual-funds",
        element: <MutualFund docType={DocType.MutualFunds} />,
      },
      {
        path: "banking",
        element: <Banking docType={DocType.Banking} />,
      },
      {
        path:"banking-steps",
        element:<BankingSteps/>
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: (
      <div className=" h-screen  flex  justify-center items-center flex-col gap-4">
        <h1 className="text-3xl text-gray-800 font-semibold">
          Page Not Found 404
        </h1>
        <Button variant={"outline"} onClick={() => window.history.back()}>
          {" "}
          Go Back
        </Button>
      </div>
    ),
  },
]);

export default router;
