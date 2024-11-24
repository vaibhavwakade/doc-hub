import { AccordionItem, Accordion, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { financeDocuments } from "@/utils/financeSteps";

function FinanceSteps() {
  return (
    <div>
      <section className="flex justify-between items-center mb-4">
        <Breadcrumb>
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
      </section>

      <Accordion type="single" collapsible className="w-full">
        {/* Loop through the financeDocuments */}
        {Object.entries(financeDocuments).map(([documentType, { requiredDocuments, steps }]) => (
          <AccordionItem key={documentType} value={documentType}>
            <AccordionTrigger>
              <h2 className="text-base font-semibold">{documentType.toUpperCase()}</h2>
            </AccordionTrigger>
            <AccordionContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Required Documents:</h3>
                <ul className="list-disc pl-5">
                  {requiredDocuments.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Steps:</h3>
                {steps.map(({ step, action, details }) => (
                  <div key={step} className="mb-3">
                    <p className="font-medium">{`Step ${step}: ${action}`}</p>
                    <ul className="list-inside pl-5">
                      {details.map((detail, idx) => (
                        <li key={idx}>
                          {/* Convert URLs to anchor tags */}
                          {detail.includes("https://") ? (
                            <a href={detail.match(/https?:\/\/[^\s]+/g)[0]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                              {detail.replace(/https?:\/\/[^\s]+/g, (url) => "Click here")}
                            </a>
                          ) : (
                            detail
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FinanceSteps;
