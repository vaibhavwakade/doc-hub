import { useState, useEffect } from "react";
import { AccordionItem, Accordion, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Bookmark, BookmarkCheck, FileText } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { financeDocuments } from "@/utils/financeSteps";

interface BookmarkState {
  [documentType: string]: boolean;
}


function FinanceSteps() {
  const [bookmarks, setBookmarks] = useState<BookmarkState>({});
  const [bookmarkedStepsData, setBookmarkedStepsData] = useState<any[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('financeBookmarks');
    const savedStepsData = localStorage.getItem('bookmarkedFinanceData');
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    if (savedStepsData) {
      setBookmarkedStepsData(JSON.parse(savedStepsData));
    }
  }, []);

  const toggleBookmark = (documentType: string, stepData: any) => {
    const newBookmarks = {
      ...bookmarks,
      [documentType]: !bookmarks[documentType],
    };
    
    const newBookmarkedData = newBookmarks[documentType]
      ? [...bookmarkedStepsData, stepData]
      : bookmarkedStepsData.filter(data => data.documentType !== documentType);
    
    setBookmarks(newBookmarks);
    setBookmarkedStepsData(newBookmarkedData);
    
    localStorage.setItem('financeBookmarks', JSON.stringify(newBookmarks));
    localStorage.setItem('bookmarkedFinanceData', JSON.stringify(newBookmarkedData));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Finance Steps
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Object.values(bookmarks).filter(Boolean).length} Bookmarks
            </span>
          </div>
        </header>

        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/finance">Finance</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Finance Steps</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Accordion type="single" collapsible className="space-y-4">
          {Object.entries(financeDocuments).map(([documentType, data]) => (
            <AccordionItem
              key={documentType}
              value={documentType}
              className="rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-lg font-semibold dark:text-gray-100">
                      {documentType.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(documentType, { documentType, ...data });
                    }}
                    className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    {bookmarks[documentType] ? (
                      <BookmarkCheck className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Bookmark className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 dark:text-gray-300">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Required Documents:</h3>
                    <ul className="ml-6 list-disc">
                      {data.requiredDocuments.map((doc: string, index: number) => (
                        <li key={index}>{doc}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Steps:</h3>
                    {data.steps.map((step: any) => (
                      <div key={step.step} className="mb-3">
                        <p className="font-medium">{`Step ${step.step}: ${step.action}`}</p>
                        <ul className="ml-6 list-disc">
                          {step.details.map((detail: string, idx: number) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FinanceSteps;
