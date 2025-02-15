import {
  BankAccountOpening,
  BankStatementRequest,
  CreditCardApplication,
  FixedDeposit,
  LoanApplication,
  MinorToAdultBankAccount,
} from "@/utils/bankingStep";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  PiggyBank,
  CreditCard,
  FileText,
  BanknoteIcon as Bank,
  Receipt,
  UserPlus,
  Bookmark,
} from "lucide-react";
import { useEffect, useState } from "react";

interface UsefulLink {
  name: string;
  url: string;
}

interface BankingData {
  service: string;
  types?: string[];
  required_documents:
    | string[]
    | {
        [key: string]: string[];
      };
  steps: string[];
  useful_links?: UsefulLink[];
}

interface BankingStepContentProps {
  data: BankingData;
}

function BankingStepContent({ data }: BankingStepContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Service
        </h3>
        <p className="text-gray-700 dark:text-gray-300">{data.service}</p>
      </div>

      {data.types && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Types of {data.service}
          </h3>
          <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
            {data.types.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Required Documents
        </h3>
        {Array.isArray(data.required_documents) ? (
          <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
            {data.required_documents.map((document, index) => (
              <li key={index}>{document}</li>
            ))}
          </ul>
        ) : (
          <div className="ml-6">
            {Object.entries(data.required_documents).map(
              ([category, documents], index) => (
                <div key={index} className="mb-3">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    {category
                      .replace(/_/g, " ")
                      .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase())}
                  </h4>
                  <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
                    {documents.map((document, docIndex) => (
                      <li key={docIndex}>{document}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Steps
        </h3>
        <ol className="ml-6 list-decimal text-gray-700 dark:text-gray-300">
          {data.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      {data.useful_links && (
        <div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Useful Links
          </h3>
          <ul className="ml-6 list-disc text-gray-700 dark:text-gray-300">
            {data.useful_links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const BankingSteps = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [bookmarkedStepsData, setBookmarkedStepsData] = useState<BankingData[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bankingBookmarks');
    const savedStepsData = localStorage.getItem('bookmarkedStepsData');
    
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    if (savedStepsData) {
      setBookmarkedStepsData(JSON.parse(savedStepsData));
    }
  }, []);

  const toggleBookmark = (stepId: string, stepData: BankingData) => {
    const newBookmarks = bookmarks.includes(stepId)
      ? bookmarks.filter(id => id !== stepId)
      : [...bookmarks, stepId];
    
    const newBookmarkedData = newBookmarks.includes(stepId)
      ? [...bookmarkedStepsData, stepData]
      : bookmarkedStepsData.filter(data => data.service !== stepData.service);
    
    setBookmarks(newBookmarks);
    setBookmarkedStepsData(newBookmarkedData);
    
    localStorage.setItem('bankingBookmarks', JSON.stringify(newBookmarks));
    localStorage.setItem('bookmarkedStepsData', JSON.stringify(newBookmarkedData));
  };

  const stepConfigs = [
    {
      id: 'bank-account-opening',
      icon: Bank,
      iconColor: 'text-blue-600 dark:text-blue-400',
      title: 'Bank Account Opening Details',
      data: BankAccountOpening
    },
    {
      id: 'loan-application',
      icon: PiggyBank,
      iconColor: 'text-green-600 dark:text-green-400',
      title: 'Loan Application Details',
      data: LoanApplication
    },
    {
      id: 'credit-card-application',
      icon: CreditCard,
      iconColor: 'text-purple-600 dark:text-purple-400',
      title: 'Credit Card Application Details',
      data: CreditCardApplication
    },
    {
      id: 'fixed-deposit',
      icon: Receipt,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      title: 'Fixed Deposit (FD) Details',
      data: FixedDeposit
    },
    {
      id: 'bank-statement-request',
      icon: FileText,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      title: 'Bank Statement Request Details',
      data: BankStatementRequest
    },
    {
      id: 'minor-to-adult-account-conversion',
      icon: UserPlus,
      iconColor: 'text-red-600 dark:text-red-400',
      title: 'Minor to Adult Bank Account Conversion',
      data: MinorToAdultBankAccount
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Bank className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Banking Steps
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {bookmarks.length} Bookmarks
            </span>
          </div>
        </header>

        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="dark:text-gray-300">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="dark:text-gray-300">
                Banking Steps
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Accordion type="single" collapsible className="space-y-4">
          {stepConfigs.map((config) => (
            <AccordionItem
              key={config.id}
              value={config.id}
              className="rounded-lg bg-white dark:bg-gray-800 shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <config.icon className={`h-6 w-6 ${config.iconColor}`} />
                    <span className="text-lg font-semibold dark:text-gray-100">
                      {config.title}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(config.id, config.data);
                    }}
                    className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <Bookmark
                      className={`h-5 w-5 ${
                        bookmarks.includes(config.id)
                          ? 'fill-current text-yellow-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 dark:text-gray-300">
                <BankingStepContent data={config.data} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default BankingSteps;
