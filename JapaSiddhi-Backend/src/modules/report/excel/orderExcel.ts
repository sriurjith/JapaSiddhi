import { Request, Response } from 'express';
import ExcelJS from 'exceljs';

import reportRepository from '../report.repository';

export default async function orderExcel(
  req: Request,
  res: Response,
) {

  const workbook =
    new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      'Orders Report',
    );

  worksheet.columns = [

    {
      header: 'ID',
      key: 'id',
      width: 10,
    },

    {
      header: 'Order Number',
      key: 'orderNumber',
      width: 25,
    },

    {
      header: 'Customer Name',
      key: 'fullName',
      width: 30,
    },

    {
      header: 'Order Type',
      key: 'orderType',
      width: 20,
    },

    {
      header: 'Order Source',
      key: 'orderSource',
      width: 20,
    },

    {
      header: 'Order Status',
      key: 'orderStatus',
      width: 20,
    },

    {
      header: 'Payment Status',
      key: 'paymentStatus',
      width: 20,
    },

    {
      header: 'Amount',
      key: 'amount',
      width: 18,
    },

    {
      header: 'Created At',
      key: 'createdAt',
      width: 25,
    },

  ];

  const [rows] =
    await reportRepository.orderReport(
      req.query as any,
    );
      rows.forEach(
    (row: any) => {

      worksheet.addRow({

        id: row.id,

        orderNumber: row.orderNumber,

        fullName: row.fullName,

        orderType: row.orderType,

        orderSource: row.orderSource,

        orderStatus: row.orderStatus,

        paymentStatus: row.paymentStatus,

        amount: row.amount,

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

    'attachment; filename=orders-report.xlsx',

  );

  await workbook.xlsx.write(
    res,
  );

  res.end();

}