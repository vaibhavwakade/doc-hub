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
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateDocument } from "./useCreateDocument";
import { useToast } from "@/hooks/use-toast";

type DocsFormProps = {
  docType: string;
  onClose: () => void; // New prop for closing the modal
};

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  file: z
  .instanceof(FileList)
  .refine((file) => file.length === 1, {
    message: "File is required.",
  })
  .refine(
    (file) =>
      file.length === 1 && file[0].type === "application/pdf",
    {
      message: "Only PDF files are allowed.",
    }
  ),
});

function DocsForm({ docType, onClose }: DocsFormProps) {
  const { toast } = useToast();
  const { addDocument, isPending, } = useCreateDocument();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { register, handleSubmit } = form;

  function onSubmit(values: z.infer<typeof formSchema>) {
    addDocument(
      {
        docType: docType,
        title: values.title,
        description: values.description,
        file: values.file[0],
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
                  Create a new{" "}
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
                  <div className="flex items-center justify-end">
                    <div className="flex gap-x-5">
                      <Link to={"/dashboard"}>
                        <Button variant={"outline"}>
                          <span className="ml-1">Cancel</span>
                        </Button>
                      </Link>
                      <Button type="submit">
                        {isPending ? "Saving..." : "Save"}
                      </Button>
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
