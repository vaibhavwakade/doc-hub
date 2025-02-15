import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  bonafideForSppu,
  degreeCertificate,
  digitalCertificatesAndMarksheets,
  ieltsCertificate,
  toeflCertificate,
} from "@/utils/educationSteps";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck, Book, BookOpen, FileText, Globe, Scroll } from "lucide-react";
interface BookmarkState {
  [certificateType: string]: {
    isBookmarked: boolean;
    timestamp: number;
    notes?: string;
  };
}
function EducationSteps() {
  const [bookmarks, setBookmarks] = useState<BookmarkState>({});

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('educationBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const toggleBookmark = (certificateType: string) => {
    const newBookmarks = {
      ...bookmarks,
      [certificateType]: {
        isBookmarked: !bookmarks[certificateType]?.isBookmarked,
        timestamp: Date.now(),
        notes: bookmarks[certificateType]?.notes || ""
      }
    };
    setBookmarks(newBookmarks);
    localStorage.setItem('educationBookmarks', JSON.stringify(newBookmarks));
  };
  const certificateIcons:any = {
    "Digital Certificates & Marksheets": <Globe className="mr-2 h-5 w-5 text-blue-500 dark:text-blue-300" />,
    "Bonafide Certificate": <FileText className="mr-2 h-5 w-5 text-green-500 dark:text-green-300" />,
    "Degree Certificate": <BookOpen className="mr-2 h-5 w-5 text-purple-500 dark:text-purple-300" />,
    "IELTS Certificate": <Book className="mr-2 h-5 w-5 text-red-500 dark:text-red-300" />,
    "TOEFL Certificate": <Scroll className="mr-2 h-5 w-5 text-orange-500 dark:text-orange-300" />
  };

  const renderCertificateSection = (title: string, content: any, sectionId: string) => (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800 dark:border-gray-700">
      <AccordionItem value={title.toLowerCase().replace(/\s+/g, '-')}>
        <AccordionTrigger className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {certificateIcons[title]}
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                {title} Application Process
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(title);
              }}
              className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              {bookmarks[title]?.isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-blue-500" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4 bg-white dark:bg-gray-800">
          <CardContent>
            {content.service && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Service</h3>
                <p className="text-gray-600 dark:text-gray-400">{content.service}</p>
              </div>
            )}

            {content.requiredDocuments && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Required Documents</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                  {content.requiredDocuments.map((document:any, index:any) => (
                    <li key={index}>{document}</li>
                  ))}
                </ul>
              </div>
            )}

            {content.steps && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Steps to Apply
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                  {content.steps.map((step:any, index:any) => (
                    <li key={index}>
                      {typeof step === 'string' ? (
                        step
                      ) : (
                        <>
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200">{step.action}</h4>
                          <ul className="list-disc pl-5">
                            {step.details.map((detail:any, idx:any) => (
                              <li key={idx}>{detail}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {content.usefulLinks && (
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Useful Links</h3>
                <ul className="list-disc pl-5 space-y-1 text-blue-600 dark:text-blue-400">
                  {content.usefulLinks.map((link:any, index:any) => (
                    <li key={index}>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
             {bookmarks[title]?.isBookmarked && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <textarea
                  placeholder="Add notes..."
                  className="w-full p-2 bg-white dark:bg-gray-800 border rounded-md"
                  value={bookmarks[title]?.notes || ""}
                  onChange={(e) => {
                    const newBookmarks = {
                      ...bookmarks,
                      [title]: {
                        ...bookmarks[title],
                        notes: e.target.value
                      }
                    };
                    setBookmarks(newBookmarks);
                    localStorage.setItem('educationBookmarks', JSON.stringify(newBookmarks));
                  }}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Bookmarked on: {new Date(bookmarks[title]?.timestamp).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </AccordionContent>
      </AccordionItem>
    </Card>
  );

  return (
    <div className="w-full mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <section className="mb-6">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/dashboard" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400 dark:text-gray-600">/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink 
                href="/dashboard/education" 
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Education
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-gray-400 dark:text-gray-600">/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-gray-800 dark:text-gray-200">
                Education Steps
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
         
        </Breadcrumb>
        <div className="text-sm text-gray-600 dark:text-gray-400">
            {Object.values(bookmarks).filter(b => b.isBookmarked).length} Bookmarks
          </div>
        </div>
      </section>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {renderCertificateSection(
          "Digital Certificates & Marksheets", 
          digitalCertificatesAndMarksheets,
          "digital-certificates"
        )}
        {renderCertificateSection(
          "Bonafide Certificate", 
          bonafideForSppu,
          "bonafide-certificate"
        )}
        {renderCertificateSection(
          "Degree Certificate", 
          { steps: degreeCertificate.steps },
          "degree-certificate"
        )}
        {renderCertificateSection(
          "IELTS Certificate", 
          ieltsCertificate,
          "ielts-certificate"
        )}
        {renderCertificateSection(
          "TOEFL Certificate", 
          toeflCertificate,
          "toefl-certificate"
        )}
      </Accordion>
    </div>
  );
}

export default EducationSteps;