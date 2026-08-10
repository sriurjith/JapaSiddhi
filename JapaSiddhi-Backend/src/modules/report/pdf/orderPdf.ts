import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

import reportRepository from '../report.repository';

export default async function orderPdf(
  req: Request,
  res: Response,
) {

  const [rows] =
    await reportRepository.orderReport(
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
    'attachment; filename=orders-report.pdf',
  );

  doc.pipe(
    res,
  );

  doc
    .fontSize(18)
    .text(
      'Orders Report',
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
        `Order ID: ${row.id}`,
      );

      doc.text(
        `Order Number: ${row.orderNumber}`,
      );

      doc.text(
        `Customer: ${row.fullName}`,
      );

      doc.text(
        `Order Type: ${row.orderType}`,
      );

      doc.text(
        `Order Source: ${row.orderSource}`,
      );

      doc.text(
        `Order Status: ${row.orderStatus}`,
      );

      doc.text(
        `Payment Status: ${row.paymentStatus}`,
      );

      doc.text(
        `Amount: ${row.amount}`,
      );

      doc.text(
        `Created At: ${row.createdAt}`,
      );

      doc.moveDown();

    },
  );
    doc.end();

}