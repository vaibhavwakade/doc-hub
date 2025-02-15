/* eslint-disable @typescript-eslint/no-unused-vars */
// Banking.tsx
import  { useState } from "react";
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
import { useDocuments } from "@/features/Docs/useDocuments";
import { useNavigate } from "react-router-dom";
import DocsList from "@/features/Docs/DocList";
import { PlusCircle } from "lucide-react";

function Finance({ docType }: DocsFormProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { allDocsData, isLoading } = useDocuments(docType); // Fetch documents based on docType
  const navigate = useNavigate();

  const handleViewDetails = (doc: unknown) => {
    // Logic for handling "View Info" button click
    console.log("Viewing details for doc:", doc);
  };

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
          <div className="flex items-center">
            <Button
              onClick={() => {
                navigate("/dashboard/finance-steps");
              }}
              className="bg-blue-500 text-white hover:bg-blue-600 mr-4  md:text-base text-[12px]"
            >
            <span>Finance Steps</span>
            </Button>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 text-white hover:bg-blue-600  md:text-base text-[12px]">
                <PlusCircle />
                <span className="hidden md:block">Add Document</span>
              </Button>
            </DialogTrigger>
          </div>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <DocsForm
                docType={docType}
                onClose={() => setDialogOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Pass docType prop to DocsList */}
      <DocsList docs={allDocsData} onViewDetails={handleViewDetails} loading={isLoading}/>
    </div>
  );
}

export default Finance; 
