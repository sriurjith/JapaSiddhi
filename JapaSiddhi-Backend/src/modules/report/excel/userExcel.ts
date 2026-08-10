import { Request, Response } from 'express';
import ExcelJS from 'exceljs';

import reportRepository from '../report.repository';

export default async function userExcel(
  req: Request,
  res: Response,
) {

  const workbook =
    new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      'Users Report',
    );

  worksheet.columns = [

    {
      header: 'ID',
      key: 'id',
      width: 10,
    },

    {
      header: 'Full Name',
      key: 'fullName',
      width: 30,
    },

    {
      header: 'Email',
      key: 'email',
      width: 35,
    },

    {
      header: 'Mobile',
      key: 'mobile',
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
      header: 'Joined Date',
      key: 'joinedDate',
      width: 22,
    },

    {
      header: 'Total Japa',
      key: 'totalJapa',
      width: 18,
    },

    {
      header: 'Total Donations',
      key: 'totalDonations',
      width: 18,
    },

    {
      header: 'Total Orders',
      key: 'totalOrders',
      width: 18,
    },

  ];

  const [rows] =
    await reportRepository.userReport(
      req.query as any,
    );
      rows.forEach(
    (row: any) => {

      worksheet.addRow({

        id: row.id,

        fullName: row.fullName,

        email: row.email,

        mobile: row.mobile,

        country: row.country,

        state: row.state,

        city: row.city,

        joinedDate: row.joinedDate,

        totalJapa: row.totalJapa,

        totalDonations: row.totalDonations,

        totalOrders: row.totalOrders,

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

    'attachment; filename=users-report.xlsx',

  );

  await workbook.xlsx.write(
    res,
  );

  res.end();

}
