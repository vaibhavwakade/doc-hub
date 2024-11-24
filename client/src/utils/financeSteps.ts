export const financeDocuments = {
    itr: {
      requiredDocuments: [
        "PAN Card and Aadhaar Card (linked)",
        "Bank Account Details (including IFSC code for refund, if any)",
        "Form 16 (from employer) – shows income and TDS deducted",
        "Form 26AS (tax credit statement) – available on the e-Filing portal",
        "Investment and Expense Proofs (for deductions) – e.g., life insurance, mutual funds, donations, medical insurance, etc.",
        "Details of Income from Other Sources – e.g., interest on savings accounts, FD, rental income, etc.",
        "Home Loan Interest Certificate (if applicable)"
      ],
      steps: [
        {
          step: 1,
          action: "Visit the Income Tax e-Filing Portal",
          details: [
            "Go to https://www.incometax.gov.in and click on 'Login' if you already have an account, or 'Register' if you’re a new user."
          ]
        },
        {
          step: 2,
          action: "Log In",
          details: [
            "Log in using your PAN as the User ID, date of birth, and password.",
            "Complete the login verification by entering the OTP sent to your registered mobile number or email."
          ]
        },
        {
          step: 3,
          action: "Choose the 'File Income Tax Return' Option",
          details: [
            "Go to 'e-File' on the top menu and select 'File Income Tax Return'."
          ]
        },
        {
          step: 4,
          action: "Select Assessment Year and Filing Mode",
          details: [
            "Choose the assessment year and select 'Online' as the filing mode."
          ]
        },
        {
          step: 5,
          action: "Select ITR Form",
          details: [
            "Choose the appropriate ITR form based on your income source (ITR-1, ITR-2, ITR-3, or ITR-4)."
          ]
        },
        {
          step: 6,
          action: "Fill in Details in the ITR Form",
          details: [
            "Enter personal details, income from various sources, deductions, and tax paid."
          ]
        },
        {
          step: 7,
          action: "Verify and Preview the Form",
          details: [
            "Review all details and click 'Preview' to see a summary of the return."
          ]
        },
        {
          step: 8,
          action: "Submit the ITR",
          details: [
            "After verifying, submit the ITR. You will receive an acknowledgment number and a confirmation email."
          ]
        },
        {
          step: 9,
          action: "E-Verify Your ITR",
          details: [
            "Verify the ITR using Aadhaar OTP, Net Banking, or EVC within 120 days."
          ]
        }
      ]
    },
    form26as: {
      requiredDocuments: [
        "PAN Card",
        "Aadhaar Card (optional but recommended)",
        "Income Tax Portal Login Credentials",
        "Net Banking Credentials (optional)"
      ],
      steps: [
        {
          step: 1,
          action: "Visit the Income Tax e-Filing Portal",
          details: [
            "Go to https://www.incometax.gov.in and click on 'Login' if you already have an account or 'Register' if it’s your first time."
          ]
        },
        {
          step: 2,
          action: "Log in to Your Account",
          details: [
            "Enter your PAN as the User ID, followed by your password and date of birth.",
            "Complete OTP verification using the OTP sent to your registered mobile number."
          ]
        },
        {
          step: 3,
          action: "Navigate to the 'View Form 26AS' Option",
          details: [
            "Go to 'e-File' in the main menu and select 'View Form 26AS'."
          ]
        },
        {
          step: 4,
          action: "Proceed to TRACES Portal",
          details: [
            "You will be redirected to the TRACES portal. Accept the disclaimer to continue."
          ]
        },
        {
          step: 5,
          action: "View and Download Form 26AS",
          details: [
            "Select the assessment year and choose the format (HTML or PDF). Click on 'View/Download' to generate the form."
          ]
        },
        {
          step: 6,
          action: "Password for PDF (if applicable)",
          details: [
            "If downloaded as a PDF, use your date of birth in 'DDMMYYYY' format as the password to open the file."
          ]
        }
      ]
    },
    epfPassbook: {
      requiredDocuments: [
        "Universal Account Number (UAN)",
        "Password for EPFO Member e-Sewa Portal",
        "Linked Mobile Number"
      ],
      steps: [
        {
          step: 1,
          action: "Go to the EPFO Member e-Sewa Portal",
          details: [
            "Visit the official website: https://passbook.epfindia.gov.in/MemberPassBook/Login."
          ]
        },
        {
          step: 2,
          action: "Log In Using UAN and Password",
          details: [
            "Enter your UAN and password, and complete the CAPTCHA verification."
          ]
        },
        {
          step: 3,
          action: "Navigate to 'Download/View Passbook'",
          details: [
            "Click on 'Download/View Passbook' from the dashboard."
          ]
        },
        {
          step: 4,
          action: "Select EPF Account",
          details: [
            "Choose the relevant EPF member ID linked to your UAN."
          ]
        },
        {
          step: 5,
          action: "View and Download the Passbook",
          details: [
            "View your contribution history and click on 'Download Passbook' to get the PDF."
          ]
        }
      ]
    }
  };
  