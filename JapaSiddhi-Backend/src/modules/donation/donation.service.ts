import {
  CreateDonationRequest,
  MonthlyDonationStatus,
  DonationPaymentDetails,
} from './donation.types';

import donationRepository from './donation.repository';



class DonationService {


  async create(
    userId: number,
    data: CreateDonationRequest,
  ) {


    const id =
      await donationRepository.create({

        userId,

        donationType:
          data.donationType,

        amount:
          data.amount,

        paymentMethod:
          data.paymentMethod,

        transactionId:
          data.transactionId ?? null,

        paymentReference:
          data.paymentReference ?? null,

        remarks:
          data.remarks ?? null,

      });


    return {

      id,

    };

  }



  async getHistory(
    userId: number,
  ) {


    return donationRepository.getHistory(
      userId,
    );

  }



  async getMonthlyStatus(
    userId: number,
  ): Promise<MonthlyDonationStatus> {


    const donation =
      await donationRepository.getMonthlyStatus(
        userId,
      );


    return {

      isDonated:
        !!donation,

      amount:
        donation?.amount ?? 200,

      month:
        new Date()
          .toISOString()
          .slice(0, 7),

      lastDonationDate:
        donation?.donated_at ?? null,

    };

  }



  async getPaymentDetails(): Promise<DonationPaymentDetails> {


    const settings =
      await donationRepository.getPaymentSettings();


    const details: any = {

      upiId: null,

      googlePayNumber: null,

      phonePeNumber: null,

      paytmNumber: null,

      qrCode: null,

      bankName: null,

      accountHolderName: null,

      accountNumber: null,

      ifscCode: null,

    };


    settings.forEach((item) => {

      switch(item.setting_key) {

        case 'upi_id':
          details.upiId = item.setting_value;
          break;

        case 'google_pay_number':
          details.googlePayNumber = item.setting_value;
          break;

        case 'phonepe_number':
          details.phonePeNumber = item.setting_value;
          break;

        case 'paytm_number':
          details.paytmNumber = item.setting_value;
          break;

        case 'donation_qr_code':
          details.qrCode = item.setting_value;
          break;

        case 'bank_name':
          details.bankName = item.setting_value;
          break;

        case 'account_holder_name':
          details.accountHolderName = item.setting_value;
          break;

        case 'account_number':
          details.accountNumber = item.setting_value;
          break;

        case 'ifsc_code':
          details.ifscCode = item.setting_value;
          break;

      }

    });


    return details;

  }


}


export default new DonationService();