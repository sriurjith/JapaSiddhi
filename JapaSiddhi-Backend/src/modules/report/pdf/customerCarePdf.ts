import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

import reportRepository from '../report.repository';

export default async function customerCarePdf(
  req: Request,
  res: Response,
) {

  const [rows] =
    await reportRepository.customerCareReport(
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
    'attachment; filename=customer-care-report.pdf',
  );

  doc.pipe(
    res,
  );

  doc
    .fontSize(18)
    .text(
      'Customer Care Report',
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
        `Ticket ID: ${row.id}`,
      );

      doc.text(
        `Customer Name: ${row.fullName}`,
      );

      doc.text(
        `Mobile: ${row.mobile}`,
      );

      doc.text(
        `Email: ${row.email}`,
      );

      doc.text(
        `Subject: ${row.subject}`,
      );

      doc.text(
        `Category: ${row.category}`,
      );

      doc.text(
        `Priority: ${row.priority}`,
      );

      doc.text(
        `Status: ${row.status}`,
      );

      doc.text(
        `Created At: ${row.createdAt}`,
      );

      doc.text(
        `Updated At: ${row.updatedAt}`,
      );

      doc.moveDown();

    },
  );

  doc.end();

}