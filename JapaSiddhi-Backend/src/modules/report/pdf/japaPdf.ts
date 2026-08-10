import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

import reportRepository from '../report.repository';

export default async function japaPdf(
  req: Request,
  res: Response,
) {

  const [rows] =
    await reportRepository.japaReport(
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
    'attachment; filename=japa-report.pdf',
  );

  doc.pipe(
    res,
  );

  doc
    .fontSize(18)
    .text(
      'Japa Report',
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
        `User: ${row.fullName}`,
      );

      doc.text(
        `Mantra: ${row.mantra}`,
      );

      doc.text(
        `Tap Japa: ${row.tapCount}`,
      );

      doc.text(
        `Voice Japa: ${row.voiceCount}`,
      );

      doc.text(
        `Total Japa: ${row.totalCount}`,
      );

      doc.moveDown();

    },
  );

  doc.end();

}