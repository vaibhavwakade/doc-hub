import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import DocsForm from "@/features/Docs/DocsForm";
import DocsFormProps from "@/types/DocsType";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

function Banking({ docType }: DocsFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate =useNavigate()
  const [docs] = useState([
    {
      id: 1,
      title: "Document 1",
      date: "2024-10-01",
      expired_in_time: "2024-12-01",
      status: "Expired",
    },
    {
      id: 2,
      title: "Document 2",
      date: "2024-09-15",
      expired_in_time: "2024-11-30",
      status: "Expired",
    },
    {
      id: 3,
      title: "Document 3",
      date: "2024-07-23",
      expired_in_time: "2024-09-23",
      status: "Active",
    },
  ]);
  return (
    <div>
      <section className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Home</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Dialog>
          <div>
            <Button onClick={() => {
              navigate('/dashboard/banking-steps')
              
            }} className="bg-blue-500 text-white hover:bg-blue-600 mr-4">
              Banking Steps
            </Button>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Add Document
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <DocsForm docType={docType} onClose={() => setDialogOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <section className="docs-container grid gap-4 md:grid-cols-6 mt-8">
        {docs.map((doc) => (
          <Card
            key={doc.id}
            className="transition-transform transform hover:scale-105 shadow-sm hover:shadow-lg border border-gray-200 rounded-3xl bg-white"
          >
            <CardHeader className="bg-red-200">
              <CardTitle className="text-sm font-semibold text-gray-800">
                {doc.title}
              </CardTitle>
            </CardHeader>
            <hr />
            <CardContent className="mt-4">
              <p className="text-base text-gray-500">
                <span className="text-gray-800 font-semibold">Date :</span>{" "}
                {doc.date}
              </p>
              <p className="text-sm mt-3 text-gray-500">
                <span className="text-gray-800 font-semibold">
                  Expiry Date :
                </span>{" "}
                {doc.expired_in_time}
              </p>
              <Badge
                variant="destructive"
                className={`mt-3 ${
                  doc.status === "Expired" ? "bg-red-100" : "bg-green-100"
                } text-black`}
              >
                {doc.status}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Dialog onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 text-xs"
                  >
                    View Info
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>{doc.title} - Details</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-2 p-4">
                    <p>
                      <span className="font-semibold">Date: </span>
                      {doc.date}
                    </p>
                    <p>
                      <span className="font-semibold">Expiry Date: </span>
                      {doc.expired_in_time}
                    </p>
                    <p>
                      <span className="font-semibold">Status: </span>
                      {doc.status}
                    </p>
                    {/* Add other details as needed */}
                    <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 mt-4">
                      Download
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}

export default Banking;
