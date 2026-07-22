export const scamSamples = {
  digitalArrest: `Hello, this is Inspector Sharma from CBI Cyber Cell. Your Aadhaar and PAN have been used for money laundering and international drug trafficking. An arrest warrant has been issued under Section 420 and IT Act. Do not disconnect this video call. Do not speak to anyone including your family. You must transfer ₹4,50,000 immediately to the court linked account we will share for verification of your innocence. If you hang up, local police will arrest you within 30 minutes.`,

  safeBank: `Dear customer, your SBI account ending 4821 has been credited with ₹12,500 via NEFT from ACME Corp. For any discrepancy call the number on the back of your debit card or visit your branch. Never share OTP with anyone.`,

  kycPhishing: `URGENT: Your UPI KYC is expiring today. Click https://rbi-kyc-verify-secure[.]com/login and upload Aadhaar + selfie within 2 hours or your account will be permanently blocked by RBI. Reply YES to proceed.`,

  investment: `Bro join our private Telegram trading group guaranteed 40% returns in 7 days on crypto. Admin will send you a deposit UPI. After first profit you can withdraw anytime. Only 12 slots left. Send ₹25,000 now.`,
};

export const currencySamples = {
  genuine500: {
    denomination: "₹500",
    serial: "4AB 938271",
    microprint: true,
    securityThread: true,
    watermark: true,
    seeThrough: true,
    uvFeature: true,
    bleedThrough: false,
    printNoise: 0.12,
    edgeSharpness: 0.91,
  },
  fake500: {
    denomination: "₹500",
    serial: "4AB 938271",
    microprint: false,
    securityThread: false,
    watermark: true,
    seeThrough: false,
    uvFeature: false,
    bleedThrough: true,
    printNoise: 0.68,
    edgeSharpness: 0.41,
  },
  suspect2000: {
    denomination: "₹2000 (withdrawn)",
    serial: "9FK 112098",
    microprint: true,
    securityThread: true,
    watermark: false,
    seeThrough: true,
    uvFeature: false,
    bleedThrough: false,
    printNoise: 0.44,
    edgeSharpness: 0.55,
  },
};
