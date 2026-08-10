import { Request, Response } from 'express';
import ExcelJS from 'exceljs';

import reportRepository from '../report.repository';

export default async function japaExcel(
  req: Request,
  res: Response,
) {

  const workbook =
    new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      'Japa Report',
    );

  worksheet.columns = [

    {
      header: 'User',
      key: 'fullName',
      width: 30,
    },

    {
      header: 'Mantra',
      key: 'mantra',
      width: 35,
    },

    {
      header: 'Tap Japa',
      key: 'tapCount',
      width: 18,
    },

    {
      header: 'Voice Japa',
      key: 'voiceCount',
      width: 18,
    },

    {
      header: 'Total Japa',
      key: 'totalCount',
      width: 18,
    },

  ];

  const [rows] =
    await reportRepository.japaReport(
      req.query as any,
    );
      rows.forEach(
    (row: any) => {

      worksheet.addRow({

        fullName: row.fullName,

        mantra: row.mantra,

        tapCount: row.tapCount,

        voiceCount: row.voiceCount,

        totalCount: row.totalCount,

      });

    },
  );

  worksheet.getRow(1).font = {

    bold: true,

  };

  worksheet.columns.forEach(

    column => {

      column.alignment = {

        vertical: 'middle',

        horizontal: 'center',

      };

    },

  );

  res.setHeader(

    'Content-Type',

    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  );

  res.setHeader(

    'Content-Disposition',

    'attachment; filename=japa-report.xlsx',

  );

  await workbook.xlsx.write(
    res,
  );

  res.end();

}
