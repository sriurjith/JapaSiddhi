import { Request, Response } from 'express';
import ExcelJS from 'exceljs';

import reportRepository from '../report.repository';

export default async function festivalExcel(
  req: Request,
  res: Response,
) {

  const workbook =
    new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      'Festivals Report',
    );

  worksheet.columns = [

    {
      header: 'ID',
      key: 'id',
      width: 10,
    },

    {
      header: 'Festival Name',
      key: 'name',
      width: 30,
    },

    {
      header: 'Description',
      key: 'description',
      width: 40,
    },

    {
      header: 'Festival Date',
      key: 'festivalDate',
      width: 20,
    },

    {
      header: 'Country',
      key: 'country',
      width: 20,
    },

    {
      header: 'State',
      key: 'state',
      width: 20,
    },

    {
      header: 'City',
      key: 'city',
      width: 20,
    },

    {
      header: 'Active',
      key: 'isActive',
      width: 15,
    },

    {
      header: 'Created At',
      key: 'createdAt',
      width: 22,
    },

  ];

  const [rows] =
    await reportRepository.festivalReport(
      req.query as any,
    );
      rows.forEach(
    (row: any) => {

      worksheet.addRow({

        id: row.id,

        name: row.name,

        description: row.description,

        festivalDate: row.festivalDate,

        country: row.country,

        state: row.state,

        city: row.city,

        isActive: row.isActive,

        createdAt: row.createdAt,

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

    'attachment; filename=festivals-report.xlsx',

  );

  await workbook.xlsx.write(
    res,
  );

  res.end();

}