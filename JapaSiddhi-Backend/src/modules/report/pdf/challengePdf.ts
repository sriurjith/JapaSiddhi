import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';

import reportRepository from '../report.repository';

export default async function challengePdf(
  req: Request,
  res: Response,
) {

  const [rows] =
    await reportRepository.challengeReport(
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
    'attachment; filename=challenges-report.pdf',
  );

  doc.pipe(
    res,
  );

  doc
    .fontSize(18)
    .text(
      'Challenges Report',
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
        `Challenge ID: ${row.id}`,
      );

      doc.text(
        `Title: ${row.title}`,
      );

      doc.text(
        `Challenge Type: ${row.challengeType}`,
      );

      doc.text(
        `Reward Type: ${row.rewardType}`,
      );

      doc.text(
        `Reward Name: ${row.rewardName}`,
      );

      doc.text(
        `Reward Quantity: ${row.rewardQuantity}`,
      );

      doc.text(
        `Start Date: ${row.startDate}`,
      );

      doc.text(
        `End Date: ${row.endDate}`,
      );

      doc.text(
        `Participants: ${row.participants}`,
      );

      doc.text(
        `Completed: ${row.completed}`,
      );

      doc.text(
        `Rewards Given: ${row.rewardsGiven}`,
      );

      doc.moveDown();

    },
  );

  doc.end();

}