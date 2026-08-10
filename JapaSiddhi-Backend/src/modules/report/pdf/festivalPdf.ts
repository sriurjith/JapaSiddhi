import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

import reportRepository from '../report.repository';

export default async function festivalPdf(
  req: Request,
  res: Response,
) {

  const [rows] =
    await reportRepository.festivalReport(
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
    'attachment; filename=festivals-report.pdf',
  );

  doc.pipe(
    res,
  );

  doc
    .fontSize(18)
    .text(
      'Festivals Report',
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
        `Festival ID: ${row.id}`,
      );

      doc.text(
        `Name: ${row.name}`,
      );

      doc.text(
        `Description: ${row.description}`,
      );

      doc.text(
        `Festival Date: ${row.festivalDate}`,
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
        `Active: ${row.isActive}`,
      );

      doc.text(
        `Created At: ${row.createdAt}`,
      );

      doc.moveDown();

    },
  );

  doc.end();

}