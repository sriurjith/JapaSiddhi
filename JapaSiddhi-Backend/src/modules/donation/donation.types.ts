export interface CreateDonationRequest {

  donationType:
    | 'MONTHLY'
    | 'GENERAL';

  amount: number;

  paymentMethod:
    | 'UPI'
    | 'GOOGLE_PAY'
    | 'PHONEPE'
    | 'PAYTM'
    | 'BANK'
    | 'OTHER';

  transactionId?: string | null;

  paymentReference?: string | null;

  remarks?: string | null;

}


export interface DonationResponse {

  id: number;

  userId: number;

  donationType:
    | 'MONTHLY'
    | 'GENERAL';

  amount: number;

  paymentMethod: string;

  transactionId: string | null;

  paymentReference: string | null;

  donationStatus:
    | 'PENDING'
    | 'SUCCESS'
    | 'FAILED';

  donatedAt: Date;

}


export interface MonthlyDonationStatus {

  isDonated: boolean;

  amount: number;

  month: string;

  lastDonationDate: string | null;

}


export interface DonationPaymentDetails {

  upiId: string | null;

  googlePayNumber: string | null;

  phonePeNumber: string | null;

  paytmNumber: string | null;

  qrCode: string | null;

  bankName: string | null;

  accountHolderName: string | null;

  accountNumber: string | null;

  ifscCode: string | null;

}