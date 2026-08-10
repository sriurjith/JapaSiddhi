import { Request, Response } from 'express';
import ExcelJS from 'exceljs';

import reportRepository from '../report.repository';

export default async function challengeExcel(
  req: Request,
  res: Response,
) {

  const workbook =
    new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      'Challenges Report',
    );

  worksheet.columns = [

    {
      header: 'ID',
      key: 'id',
      width: 10,
    },

    {
      header: 'Title',
      key: 'title',
      width: 35,
    },

    {
      header: 'Challenge Type',
      key: 'challengeType',
      width: 20,
    },

    {
      header: 'Reward Type',
      key: 'rewardType',
      width: 20,
    },

    {
      header: 'Reward Name',
      key: 'rewardName',
      width: 25,
    },

    {
      header: 'Reward Quantity',
      key: 'rewardQuantity',
      width: 18,
    },

    {
      header: 'Start Date',
      key: 'startDate',
      width: 20,
    },

    {
      header: 'End Date',
      key: 'endDate',
      width: 20,
    },

    {
      header: 'Participants',
      key: 'participants',
      width: 18,
    },

    {
      header: 'Completed',
      key: 'completed',
      width: 18,
    },

    {
      header: 'Rewards Given',
      key: 'rewardsGiven',
      width: 18,
    },

  ];

  const [rows] =
    await reportRepository.challengeReport(
      req.query as any,
    );
      rows.forEach(
    (row: any) => {

      worksheet.addRow({

        id: row.id,

        title: row.title,

        challengeType: row.challengeType,

        rewardType: row.rewardType,

        rewardName: row.rewardName,

        rewardQuantity: row.rewardQuantity,

        startDate: row.startDate,

        endDate: row.endDate,

        participants: row.participants,

        completed: row.completed,

        rewardsGiven: row.rewardsGiven,

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

    'attachment; filename=challenges-report.xlsx',

  );

  await workbook.xlsx.write(
    res,
  );

  res.end();

}