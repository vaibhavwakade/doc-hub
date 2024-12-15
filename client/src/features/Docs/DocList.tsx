import React, { useState } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteDocument } from "./useDeleteDocuments";
import EditDoc from "./EditDoc";
interface Doc {
  description: string;
  docType: string;
  _id: number;
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

const DocsList: React.FC<DocsListProps> = ({ docs, loading }) => {
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const { removeDocument, isPending } = useDeleteDocument();
  const canDownload = (createdAt: string, expiryDate: Date) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(expiryDate);

    return currentDate >= createdDate && currentDate <= expirationDate;
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
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              {doc?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="">
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
              {doc?.status}
            </Badge>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="flex space-x-2">
              {/* Edit Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {}}
                className="text-blue-600 hover:bg-blue-50"
              >
                <EditDoc
                  docType={doc?.docType}
                  title={doc?.title}
                  description={doc?.description}
                  id={doc?._id as unknown as string}
                />
              </Button>
              {/* Delete Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      <span className="font-semibold"> {doc.title}</span>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      disabled={isPending}
                      onClick={() => {
                        removeDocument(doc?._id as unknown as string);
                        setSelectedDoc(null);
                      }}
                    >
                      {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            {/* View Details Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 md:text-base text-[12px]"
                  onClick={() => setSelectedDoc(doc)}
                >
                  View Info
                </Button>
              </AlertDialogTrigger>
              {selectedDoc && selectedDoc._id === doc._id && (
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Document Details</AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription className="prose space-y-4">
                    <p>
                      <span className="font-semibold">Title : </span>
                      {selectedDoc.title}
                    </p>

                    <p>
                      <span className="font-semibold">Title : </span>
                      {selectedDoc.description}
                    </p>
                    <p>
                      <span className="font-semibold">Date : </span>
                      {new Date(selectedDoc.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Expiry Date : </span>
                      {new Date(selectedDoc.expiryDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold">Status : </span>
                      {selectedDoc.status}
                    </p>
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    {canDownload(
                      selectedDoc.createdAt,
                      selectedDoc.expiryDate
                    ) && (
                      <AlertDialogAction
                        onClick={() =>
                          window.open(selectedDoc.fileUrl, "_blank")
                        }
                      >
                        Download
                      </AlertDialogAction>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              )}
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
};

export default DocsList;
