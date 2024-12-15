import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface Doc {
  id: number;
  title: string;
  date: Date;
  expiryDate: Date;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  teamId: string;
  fileUrl: string;
}

interface DocsListProps {
  docs: Doc[];
  onViewDetails: (doc: Doc) => void;
  loading: boolean;
}

const DocsList: React.FC<DocsListProps> = ({
  docs,
  onViewDetails,
  loading,
}) => {
  const isExpired = (expiryDate: Date) => {
    const currentDate = new Date();
    return new Date(expiryDate) < currentDate;
  };

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row  justify-between items-center flex-wrap">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton
            className=" h-[195px] mt-10 min-w-[95%] md:min-w-96  rounded-xl bg-slate-300"
            key={index}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="docs-container grid gap-4 md:grid-cols-4 mt-8">
      {docs?.map((doc, index) => (
        <Card
          key={index}
          className="transition-transform transform hover:scale-105 shadow-sm hover:shadow-lg border border-gray-200 rounded-3xl bg-white min-w-[250px]"
        >
          <CardHeader className="bg-red-200">
            <CardTitle className="text-sm font-semibold text-gray-800">
              {doc?.title}
            </CardTitle>
          </CardHeader>
          <hr />
          <CardContent className="mt-4">
            <p className="text-base text-gray-500">
              <span className="text-gray-800 font-semibold">Date :</span>{" "}
              {doc?.createdAt
                ? new Date(doc?.createdAt).toLocaleString()
                : "N/A"}
            </p>
            <p className="text-sm mt-3 text-gray-500">
              <span className="text-gray-800 font-semibold">Expiry Date :</span>{" "}
              {doc?.expiryDate
                ? new Date(doc?.expiryDate).toLocaleString()
                : "N/A"}
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 md:text-base text-[12px]"
                  onClick={() => onViewDetails(doc)}
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
                    {doc?.createdAt
                      ? new Date(doc?.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Expiry Date: </span>
                    {doc.expiryDate
                      ? new Date(doc.expiryDate).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Status: </span>
                    {doc?.status}
                  </p>
                  {/* Conditionally render the Download button */}
                  {!isExpired(doc.expiryDate) && (
                    <Button
                      onClick={() => window.open(doc?.fileUrl, "_blank")}
                      className="w-full bg-blue-500 text-white hover:bg-blue-600 mt-4"
                    >
                      Download
                    </Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default DocsList;
