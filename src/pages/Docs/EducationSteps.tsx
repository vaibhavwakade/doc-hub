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

function EducationSteps() {
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
              <BreadcrumbLink href="/dashboard/education">
                Education
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Education Steps</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>

      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="digital-certificates">
            <AccordionTrigger>
              Digital Certificates & Marksheets Process
            </AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{digitalCertificatesAndMarksheets.service}</p>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {digitalCertificatesAndMarksheets.requiredDocuments.map(
                  (document, index) => (
                    <li key={index}>{document}</li>
                  )
                )}
              </ul>

              {/* Steps to Access Documents */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Access Digital Certificates
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {digitalCertificatesAndMarksheets.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>

              {/* Useful Links */}
              <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
              <ul className="list-disc ml-4">
                {digitalCertificatesAndMarksheets.usefulLinks.map(
                  (link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.name}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="bonafide-certificate">
            <AccordionTrigger>
              Bonafide Certificate Application Process
            </AccordionTrigger>
            <AccordionContent>
              {/* Service */}
              <h3 className="text-lg font-semibold mb-2">Service</h3>
              <p className="mb-4">{bonafideForSppu.service}</p>

              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {bonafideForSppu.requiredDocuments.map((document, index) => (
                  <li key={index}>{document}</li>
                ))}
              </ul>

              {/* Steps to Apply for Bonafide Certificate */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Apply for Bonafide Certificate
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {bonafideForSppu.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="degree-certificate">
            <AccordionTrigger>
              Degree Certificate Application Process
            </AccordionTrigger>
            <AccordionContent>
              {/* Steps to Apply for Degree Certificate */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Apply for Degree Certificate
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {degreeCertificate.steps.map((step, index) => (
                  <li key={index} className="mb-4">
                    <h4 className="font-semibold">{step.action}</h4>
                    <ul className="list-disc ml-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ielts-certificate">
            <AccordionTrigger>
              IELTS Certificate Application Process
            </AccordionTrigger>
            <AccordionContent>
              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {ieltsCertificate.requiredDocuments.map((document, index) => (
                  <li key={index}>{document}</li>
                ))}
              </ul>

              {/* Steps to Apply for IELTS Certificate */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Apply for IELTS Certificate
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {ieltsCertificate.steps.map((step, index) => (
                  <li key={index}>
                    <h4 className="font-semibold">{step.action}</h4>
                    <ul className="list-disc ml-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="toefl-certificate">
            <AccordionTrigger>
              TOEFL Certificate Application Process
            </AccordionTrigger>
            <AccordionContent>
              {/* Required Documents */}
              <h3 className="text-lg font-semibold mb-2">Required Documents</h3>
              <ul className="list-disc ml-4 mb-4">
                {toeflCertificate.requiredDocuments.map((document, index) => (
                  <li key={index}>{document}</li>
                ))}
              </ul>

              {/* Steps to Apply for TOEFL Certificate */}
              <h3 className="text-lg font-semibold mb-2">
                Steps to Apply for TOEFL Certificate
              </h3>
              <ol className="list-decimal ml-4 mb-4">
                {toeflCertificate.steps.map((step, index) => (
                  <li key={index}>
                    <h4 className="font-semibold">{step.action}</h4>
                    <ul className="list-disc ml-4">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default EducationSteps;
