import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DocsForm from "./DocsForm";
import { Edit3 } from "lucide-react";

function EditDoc({
  docType,
  title,
  description,
  id
}: {
  docType: string;
  title: string;
  description: string;
  id: string
}) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <div className="flex items-center">
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleOpenDialog}
              className="text-blue-600 hover:bg-blue-50"
            >
              <Edit3 size={18} />
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <DocsForm
              docType={docType}
              onClose={handleCloseDialog}
              editData={{
                title,
                description,
                id
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditDoc;
