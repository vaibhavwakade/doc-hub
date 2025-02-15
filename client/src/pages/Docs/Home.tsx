import { useState } from "react";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  PlusCircle, 
  CreditCard, 
  BarChart2,
  FileCheck
} from "lucide-react";

import DocsForm from "@/features/Docs/DocsForm";
import DocsFormProps from "@/types/DocsType";
import { useDocuments } from "@/features/Docs/useDocuments";
import DocsList from "@/features/Docs/DocList";
import Chatbot from "./ChatBoat";

function BankingDashboard({ docType }: DocsFormProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { allDocsData, isLoading } = useDocuments(docType);


  const subscriptionInfo = allDocsData?.subscriptionInfo


  const documentsUsed = subscriptionInfo?.documentsUsed || 0;
  const documentsLimit = subscriptionInfo?.documentsLimit || 1; 

  const handleViewDetails = (doc: unknown) => {
    console.log("Viewing details for doc:", doc);
  };

  const quickActionCards = [
    {
      icon: <FileText className="h-6 w-6 text-blue-500 dark:text-blue-400" />,
      title: "New Document",
      description: "Add a new banking document",
      action: () => setDialogOpen(true)
    },
    {
      icon: <CreditCard className="h-6 w-6 text-green-500 dark:text-green-400" />,
      title: "Account Summary",
      description: "View recent account activities",
      action: () => {}
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-purple-500 dark:text-purple-400" />,
      title: "Financial Reports",
      description: "Generate financial reports",
      action: () => {}
    }
  ];

  return (
    <div className="p-4 space-y-6 dark:bg-gray-900">
      {/* Header Section */}
      <section className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="dark:text-gray-300">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="dark:text-gray-100">Banking</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700">
              <PlusCircle className="mr-2" />
              Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-gray-100">Add New Document</DialogTitle>
            </DialogHeader>
            <DocsForm 
              docType={docType} 
              onClose={() => setDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </section>

      {/* Subscription Info Card */}
      <Card className="bg-gray-50 dark:bg-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            <CardTitle className="text-lg dark:text-gray-100">Subscription Usage</CardTitle>
          </div>
          <div className="text-sm font-medium dark:text-gray-300">
            {subscriptionInfo?.type.charAt(0).toUpperCase() + subscriptionInfo?.type.slice(1)} Plan
          </div>
        </CardHeader>
        <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{documentsUsed} of {documentsLimit} documents used</span>
          <span>{subscriptionInfo?.remainingDocuments || 0} remaining</span>
        </div>
        
      </div>
    </CardContent>
      </Card>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActionCards?.map((card, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              {card.icon}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={card.action}
                className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Action
              </Button>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold dark:text-gray-100">{card.title}</div>
              <p className="text-xs text-muted-foreground dark:text-gray-400">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Documents Section */}
      <Tabs defaultValue="recent" className="dark:text-gray-100">
        <TabsList className="grid w-full grid-cols-2 dark:bg-gray-800">
          <TabsTrigger value="recent" className="dark:data-[state=active]:bg-gray-700">Recent Documents</TabsTrigger>
          <TabsTrigger value="all" className="dark:data-[state=active]:bg-gray-700">All Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Recent Banking Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <DocsList 
                docs={allDocsData?.documents?.slice(0, 5) || []} 
                onViewDetails={handleViewDetails} 
                loading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">All Banking Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <DocsList 
                docs={allDocsData} 
                onViewDetails={handleViewDetails} 
                loading={isLoading}
              />
            </CardContent>
          </Card>
        </TabsContent>
          <Chatbot/>
      </Tabs>
    </div>
  );
}

export default BankingDashboard;
