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
import { Eye, Trash2, Calendar, Clock } from "lucide-react";
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

// Updated interface to match the actual data structure
interface DocsListProps {
  docs: {
    documents: Doc[];
  };
  onViewDetails?: (doc: Doc) => void;  // Made optional since it's not used
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

  const getStatusColor = (status: string) => {
    return status === "Expired"
      ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-200 dark:text-red-900 dark:border-red-300"
      : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-200 dark:text-emerald-900 dark:border-emerald-300";
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton
            className="h-44 rounded-lg bg-slate-100 dark:bg-slate-700"
            key={index}
          />
        ))}
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {docs?.documents?.map((doc, index) => (
        <Card
          key={index}
          className="group border-2 border-gray-100 rounded-lg bg-white overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-300 dark:border-gray-700 dark:bg-blue-800 dark:hover:border-blue-400"
        >
          <CardHeader className="space-y-2 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
                {doc?.title}
              </CardTitle>
              <Badge
                variant="outline"
                className={`${getStatusColor(doc.status)} text-xs`}
              >
                {doc?.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-3 pb-3">
            <div className="flex items-center text-xs gap-2">
              <Calendar size={14} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">Created:</span>
              <span className="font-medium dark:text-gray-100">
                {doc?.createdAt
                  ? new Date(doc?.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center text-xs gap-2">
              <Clock size={14} className="text-gray-500 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-300">Expires:</span>
              <span className="font-medium dark:text-gray-100">
                {doc?.expiryDate
                  ? new Date(doc?.expiryDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between items-center pt-3 border-t bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-blue-600 dark:text-blue-400"
              >
                <EditDoc
                  docType={doc?.docType}
                  title={doc?.title}
                  description={doc?.description}
                  id={doc?._id as unknown as string}
                />
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 dark:text-red-400"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-100">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Document</AlertDialogTitle>
                    <AlertDialogDescription>
                      Delete{" "}
                      <span className="font-medium">{doc.title}</span>?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="mt-0">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs dark:text-gray-300"
                  onClick={() => setSelectedDoc(doc)}
                >
                  <Eye size={14} className="mr-1" />
                  View
                </Button>
              </AlertDialogTrigger>
              {selectedDoc && selectedDoc._id === doc._id && (
                <AlertDialogContent className="sm:max-w-md dark:bg-gray-800 dark:text-gray-100">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Document Details</AlertDialogTitle>
                  </AlertDialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="text-sm text-gray-500 dark:text-gray-300">
                        Title
                      </h4>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedDoc.title}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm text-gray-500 dark:text-gray-300">
                        Description
                      </h4>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedDoc.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm text-gray-500 dark:text-gray-300">
                          Created
                        </h4>
                        <p className="text-gray-900 dark:text-gray-100">
                          {new Date(selectedDoc.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm text-gray-500 dark:text-gray-300">
                          Expires
                        </h4>
                        <p className="text-gray-900 dark:text-gray-100">
                          {new Date(selectedDoc.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <AlertDialogFooter className="gap-2">
                    <AlertDialogCancel className="mt-0">Close</AlertDialogCancel>
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
