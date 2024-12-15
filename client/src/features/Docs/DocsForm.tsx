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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateDocument } from "./useCreateDocument";
import { useToast } from "@/hooks/use-toast";
import { useUpdateDocument } from "./useUpdateDocument";

type DocsFormProps = {
  docType: string;
  onClose: () => void; // New prop for closing the modal
  editData?: {
    title: string;
    description: string;
    id: string;
  };
};

function DocsForm({ docType, onClose, editData }: DocsFormProps) {
  const { toast } = useToast();
  const { addDocument, isPending } = useCreateDocument();
  const { editDocument, isPending: isEditPending } = useUpdateDocument();
  const isEditing = !!editData?.title && !!editData?.description;

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(5, {
      message: "Description must be at least 5 characters.",
    }),
    file: isEditing
      ? z.instanceof(FileList).optional() // File is optional when editing
      : z
          .instanceof(FileList)
          .refine((file) => file.length === 1, {
            message: "File is required.",
          })
          .refine(
            (file) => file.length === 1 && file[0].type === "application/pdf",
            {
              message: "Only PDF files are allowed.",
            }
          ), // File validation when creating,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: isEditing ? editData?.title : "",
      description: isEditing ? editData?.description : "",
    },
  });

  const { register, handleSubmit } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEditing) {
      editDocument(
        {
          documentId: editData?.id || "",
          data: {
            title: values.title,
            description: values.description,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: "Document updated",
              description: "Document updated successfully",
            });
            onClose(); // Close the modal on success
          },
        }
      );
      return;
    }
  
    addDocument(
      {
        docType: docType,
        title: values.title,
        description: values.description,
        file: values?.file && values.file.length > 0 ? values.file[0] : undefined,
      },
      {
        onSuccess: () => {
          form.reset();
          toast({
            title: "Document created",
            description: "Document created successfully",
          });
          onClose(); // Close the modal on success
        },
      }
    );
  }
  

  return (
    <div>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form {...form}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {isEditing ? "Edit " : "Create "}
                  {docType.slice(0, 1).toUpperCase() + docType.slice(1, 18)} Doc
                </CardTitle>
                <CardDescription>
                  Fill out the form below to create a new document.
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
                            className="w-full"
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
                          <Textarea className="min-h-32" {...field} />
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
                              className="w-full"
                              accept=".pdf"
                              {...register("file")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <div className="flex items-center justify-end">
                    <div className="flex gap-x-5">
                    
                      {isEditing ? (
                        <Button type="submit" disabled={isEditPending}>
                          <span className="ml-1">
                            {isEditPending ? "Updating..." : "Update"}
                          </span>
                        </Button>
                      ) : (
                        <Button type="submit" disabled={isPending}>
                          <span className="ml-1">
                            {isPending ? "Creating..." : "Create"}
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Form>
        </form>
      </section>
    </div>
  );
}

export default DocsForm;
