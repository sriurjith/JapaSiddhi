import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

import reportRepository from '../report.repository';

export default async function userPdf(
  req: Request,
  res: Response,
) {

  const [rows] =
    await reportRepository.userReport(
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
    'attachment; filename=users-report.pdf',
  );

  doc.pipe(
    res,
  );

  doc
    .fontSize(18)
    .text(
      'Users Report',
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
        `Name: ${row.fullName}`,
      );

      doc.text(
        `Email: ${row.email}`,
      );

      doc.text(
        `Mobile: ${row.mobile}`,
      );

      doc.text(
        `Country: ${row.country}`,
      );

      doc.text(
        `State: ${row.state}`,
      );

      doc.text(
        `City: ${row.city}`,
      );

      doc.text(
        `Joined: ${row.joinedDate}`,
      );

      doc.text(
        `Total Japa: ${row.totalJapa}`,
      );

      doc.text(
        `Total Donations: ${row.totalDonations}`,
      );

      doc.text(
        `Total Orders: ${row.totalOrders}`,
      );

      doc.moveDown();

    },
  );
    doc.end();

}