import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

import reportRepository from '../report.repository';

export default async function donationPdf(
  req: Request,
  res: Response,
) {

  const [rows] =
    await reportRepository.donationReport(
      req.query as any,
    );

  const doc =
    new PDFDocument({
      margin: 40,
      size: 'A4',
    });

  res.setHeader(
    'Content-Type',
    'application/pdf',
  );

  res.setHeader(
    'Content-Disposition',
    'attachment; filename=donations-report.pdf',
  );

  doc.pipe(
    res,
  );

  doc
    .fontSize(18)
    .text(
      'Donations Report',
      {
        align: 'center',
      },
    );

  doc.moveDown();

  doc
    .fontSize(10);

  rows.forEach(
    (row: any) => {

      doc.text(
        `ID: ${row.id}`,
      );

      doc.text(
        `Donor: ${row.fullName}`,
      );

      doc.text(
        `Donation Type: ${row.donationType}`,
      );

      doc.text(
        `Amount: ${row.amount}`,
      );

      doc.text(
        `Payment Status: ${row.paymentStatus}`,
      );

      doc.text(
        `Transaction ID: ${row.transactionId}`,
      );

      doc.text(
        `Payment Method: ${row.paymentMethod}`,
      );

      doc.text(
        `Donated At: ${row.donatedAt}`,
      );

      doc.moveDown();

    },
  );
    doc.end();

}