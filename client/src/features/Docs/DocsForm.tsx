import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useCreateDocument } from "./useCreateDocument";
import { useToast } from "@/hooks/use-toast";
import { useUpdateDocument } from "./useUpdateDocument";
import { UpgradeModal } from "../UpgradeModalProps";

// Define the form schema type
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  expiryDate: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Please provide a valid expiry date.",
    }),
  file: z.instanceof(FileList).optional(),
});

// Define types for the component props
interface DocsFormProps {
  docType: string;
  onClose: () => void;
  editData?: {
    title: string;
    description: string;
    id: string;
    expireDate?: string;
  };
}

// Define the form values type
type FormValues = z.infer<typeof formSchema>;

function DocsForm({ docType, onClose, editData }: DocsFormProps) {
  const { toast } = useToast();
  const { addDocument, isPending, showUpgradeModal, setShowUpgradeModal } = useCreateDocument();
  const { editDocument, isPending: isEditPending } = useUpdateDocument();
  const isEditing = !!editData?.title && !!editData?.description;

  const form = useForm<FormValues>({
    defaultValues: {
      title: editData?.title || "",
      description: editData?.description || "",
      expiryDate: editData?.expireDate || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (isEditing && editData) {
      editDocument(
        {
          documentId: editData.id,
          data: {
            title: values.title,
            description: values.description,
            expiryDate: values.expiryDate,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: "Document updated",
              description: "Document updated successfully",
            });
            onClose();
          },
        }
      );
      return;
    }

    addDocument(
      {
        docType,
        title: values.title,
        description: values.description,
        expiryDate: values.expiryDate,
        file: values.file?.[0],
      },
      {
        onSuccess: () => {
          form.reset();
          toast({
            title: "Document created",
            description: "Document created successfully",
          });
          onClose();
        },
      }
    );
  };

  return (
    <div>
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <CardHeader>
                <CardTitle>
                  {isEditing ? "Edit " : "Create "}
                  {docType.slice(0, 1).toUpperCase() + docType.slice(1)} Doc
                </CardTitle>
                <CardDescription>
                  Fill out the form below to {isEditing ? "edit" : "create"} a document.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            placeholder="Title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-32 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!isEditing && (
                    <FormField
                      control={form.control}
                      name="file"
                      render={() => (
                        <FormItem>
                          <FormLabel>Upload PDF</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              className="w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              accept=".pdf"
                              {...form.register("file")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <div className="flex items-center justify-end">
                    <div className="flex gap-x-5">
                      <Button type="submit" disabled={isEditing ? isEditPending : isPending}>
                        {isEditing
                          ? isEditPending
                            ? "Updating..."
                            : "Update"
                          : isPending
                          ? "Creating..."
                          : "Create"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </section>
      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </div>
  );
}

export default DocsForm;
