export const banking = {
  bank_services: [],
};

export const BankAccountOpening = {
  service: "Bank Account Opening",
  required_documents: [
    "Identification Proof (Government-issued ID like passport, driver’s license, or national ID)",
    "Address Proof (Utility bills, rental agreement, or bank statement)",
    "PAN Card (for India) or Tax Identification Number (for other countries)",
    "Passport-size Photograph",
  ],
  steps: [
    "Choose the bank and type of account (savings, current, etc.)",
    "Visit the bank’s branch or its official website",
    "Fill out the application form online or in person",
    "Submit documents for KYC (Know Your Customer) verification",
    "Deposit initial funds, if required",
  ],
  useful_links: [
    {
      name: "State Bank of India Account Opening",
      url: "State Bank of India Account Opening",
    },
  ],
};

export const LoanApplication = {
  service: "Loan Application",
  types: ["Personal", "Home", "Car Loan"],
  required_documents: [
    "Income Proof (Salary slips, bank statements, tax returns)",
    "Identification Proof (passport, driver’s license, etc.)",
    "Address Proof",
    "Credit Report (if applicable)",
    "Employment Proof (employment letter, business registration, etc.)",
  ],
  steps: [
    "Compare loan offers from different banks and choose the one that suits you",
    "Submit an online application or visit the bank branch",
    "Provide required documents and undergo credit assessment",
    "Await approval and finalize loan terms",
    "Sign loan agreement and receive funds",
  ],
  useful_links: [
    {
      name: "Citibank Loan Application",
      url: "Citibank Loan Application",
    },
    {
      name: "HDFC Bank Loan Application",
      url: "HDFC Bank Loan Application",
    },
  ],
};

export const CreditCardApplication = {
  service: "Credit Card Application",
  required_documents: [
    "Identification Proof",
    "Address Proof",
    "Income Proof (recent salary slips, tax returns, or bank statements)",
  ],
  steps: [
    "Choose the credit card type based on benefits (cashback, travel rewards, etc.)",
    "Submit the application form online or at a bank branch",
    "Provide KYC documents and income details",
    "Wait for approval, which may require a credit score check",
    "Upon approval, receive the card and activate it",
  ],
  useful_links: [
    {
      name: "Axis Bank Credit Card Application",
      url: "Axis Bank Credit Card Application",
    },
  ],
};

export const FixedDeposit = {
  service: "Fixed Deposit (FD) or Certificate of Deposit (CD)",
  required_documents: [
    "Identification Proof",
    "Address Proof",
    "PAN Card (for tax purposes in some countries)",
  ],
  steps: [
    "Visit the bank’s website or branch",
    "Choose the deposit tenure and interest plan",
    "Submit identification documents and complete KYC verification",
    "Deposit funds to start the FD or CD account",
    "Receive a certificate or account confirmation",
  ],
  useful_links: [
    {
      name: "ICICI Bank Fixed Deposit",
      url: "ICICI Bank Fixed Deposit",
    },
  ],
};

export const BankStatementRequest = {
  service: "Bank Statement Request",
  required_documents: [
    "Identification Proof (in some cases, not always required online)",
  ],
  steps: [
    "Log in to your online banking portal or mobile banking app",
    "Navigate to the statement request section",
    "Choose the statement period and download or request a mailed copy",
  ],
};

export const MinorToAdultBankAccount = {
  service: "Minor to Adult Bank Account Conversion",
  required_documents: {
    proof_of_identity: [
      "Aadhaar Card",
      "PAN Card",
      "Passport (if available)",
      "Driving License (if applicable)",
    ],
    proof_of_age: [
      "Birth Certificate",
      "School or College ID (for verification, if acceptable)",
    ],
    parent_guardian_kyc_documents: [
      "Identity proof of the parent/guardian",
      "Address proof of the parent/guardian (Aadhaar, Passport, Utility Bill, etc.)",
    ],
    proof_of_address: [
      "Aadhaar Card",
      "Voter ID (if applicable)",
      "Driving License",
    ],
    existing_passbook_or_account_information: [
      "The minor account passbook or account statement",
      "Account number and other related information",
    ],
  },
  steps: [
    "Visit the Bank Branch: Both the account holder (now adult) and the parent/guardian (if required) should visit the branch where the account is held",
    "Complete the Account Conversion Form: Banks generally have a specific form for converting a minor account to an adult account. Fill in the required details",
    "Submit Required Documents: Attach copies of identity, age, and address proofs along with the account conversion form. Show originals for verification",
    "KYC Verification: The bank will conduct a KYC (Know Your Customer) verification to ensure the documents are correct and up to date",
    "Update Signature and Contact Details: Provide a fresh signature specimen if necessary, and update contact details such as phone number and email address",
    "Receive Confirmation: After processing, the bank may issue a new passbook, debit card, and/or checkbook linked to the converted adult account",
  ],
  useful_links: [
    {
      name: "State Bank of India (SBI) Minor to Adult Account",
      url: "SBI Minor to Adult Account",
    },
    {
      name: "HDFC Bank Minor to Major Account",
      url: "HDFC Minor to Major Account",
    },
    {
      name: "ICICI Bank Minor Account Conversion",
      url: "ICICI Minor Account Conversion",
    },
    {
      name: "Axis Bank Minor Account Services",
      url: "Axis Minor Account Services",
    },
  ]
}
