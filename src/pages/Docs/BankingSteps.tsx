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

function BankingSteps() {
  return (
    <>
      <section className="flex justify-between items-center mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/banking">Banking</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Banking Steps</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="bank-account-opening">
            <AccordionTrigger>1. Bank Account Opening Details</AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{BankAccountOpening.service}</p>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {BankAccountOpening.required_documents.map(
                  (document, index) => (
                    <li key={index}>{document}</li>
                  )
                )}
              </ul>

              {/* Steps to Open an Account */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Open an Account
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {BankAccountOpening.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {/* Useful Links */}
              <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
              <ul className="list-disc ml-4">
                {BankAccountOpening.useful_links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="loan-application">
            <AccordionTrigger>2. Loan Application Details</AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{LoanApplication.service}</p>

              {/* Loan Types */}
              <h3 className="text-lg font-semibold mb-2">Types of Loans</h3>
              <ul className="list-disc ml-4 mb-4">
                {LoanApplication.types.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {LoanApplication.required_documents.map((document, index) => (
                  <li key={index}>{document}</li>
                ))}
              </ul>

              {/* Steps to Apply for a Loan */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Apply for a Loan
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {LoanApplication.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {/* Useful Links */}
              <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
              <ul className="list-disc ml-4">
                {LoanApplication.useful_links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="credit-card-application">
            <AccordionTrigger>
              3. Credit Card Application Details
            </AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{CreditCardApplication.service}</p>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {CreditCardApplication.required_documents.map(
                  (document, index) => (
                    <li key={index}>{document}</li>
                  )
                )}
              </ul>

              {/* Steps to Apply for a Credit Card */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Apply for a Credit Card
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {CreditCardApplication.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {/* Useful Links */}
              <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
              <ul className="list-disc ml-4">
                {CreditCardApplication.useful_links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="fixed-deposit">
            <AccordionTrigger>4. Fixed Deposit (FD) Details</AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{FixedDeposit.service}</p>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {FixedDeposit.required_documents.map((document, index) => (
                  <li key={index}>{document}</li>
                ))}
              </ul>

              {/* Steps to Open a Fixed Deposit */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Open a Fixed Deposit
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {FixedDeposit.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {/* Useful Links */}
              <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
              <ul className="list-disc ml-4">
                {FixedDeposit.useful_links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="bank-statement-request">
            <AccordionTrigger>
              5. Bank Statement Request Details
            </AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{BankStatementRequest.service}</p>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {BankStatementRequest.required_documents.map(
                  (document, index) => (
                    <li key={index}>{document}</li>
                  )
                )}
              </ul>

              {/* Steps to Request a Bank Statement */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Request a Bank Statement
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {BankStatementRequest.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="minor-to-adult-account-conversion">
            <AccordionTrigger>
              6. Minor to Adult Bank Account Conversion
            </AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{MinorToAdultBankAccount.service}</p>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <div className="ml-4 mb-4">
                {Object.entries(MinorToAdultBankAccount.required_documents).map(
                  ([category, documents], index) => (
                    <div key={index} className="mb-3">
                      <h4 className="font-medium">
                        {category
                          .replace(/_/g, " ")
                          .replace(/(^|\s)\S/g, (letter) =>
                            letter.toUpperCase()
                          )}
                      </h4>
                      <ul className="list-disc ml-4">
                        {documents.map((document, docIndex) => (
                          <li key={docIndex}>{document}</li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </div>

              {/* Steps to Convert Account */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Convert Account
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {MinorToAdultBankAccount.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {/* Useful Links */}
              <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
              <ul className="list-disc ml-4">
                {MinorToAdultBankAccount.useful_links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default BankingSteps;
