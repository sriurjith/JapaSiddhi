import { Request, Response } from 'express';
import ExcelJS from 'exceljs';

import reportRepository from '../report.repository';

export default async function customerCareExcel(
  req: Request,
  res: Response,
) {

  const workbook =
    new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      'Customer Care Report',
    );

  worksheet.columns = [

    {
      header: 'Ticket ID',
      key: 'id',
      width: 12,
    },

    {
      header: 'Customer Name',
      key: 'fullName',
      width: 30,
    },

    {
      header: 'Mobile',
      key: 'mobile',
      width: 18,
    },

    {
      header: 'Email',
      key: 'email',
      width: 35,
    },

    {
      header: 'Subject',
      key: 'subject',
      width: 35,
    },

    {
      header: 'Category',
      key: 'category',
      width: 20,
    },

    {
      header: 'Priority',
      key: 'priority',
      width: 15,
    },

    {
      header: 'Status',
      key: 'status',
      width: 18,
    },

    {
      header: 'Created At',
      key: 'createdAt',
      width: 22,
    },

    {
      header: 'Updated At',
      key: 'updatedAt',
      width: 22,
    },

  ];

  const [rows] =
    await reportRepository.customerCareReport(
      req.query as any,
    );
      rows.forEach(
    (row: any) => {

      worksheet.addRow({

        id: row.id,

        fullName: row.fullName,

        mobile: row.mobile,

        email: row.email,

        subject: row.subject,

        category: row.category,

        priority: row.priority,

        status: row.status,

        createdAt: row.createdAt,

        updatedAt: row.updatedAt,

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

    'attachment; filename=customer-care-report.xlsx',

  );

  await workbook.xlsx.write(
    res,
  );

  res.end();

}