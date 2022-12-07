import data from "../../../data";
import { NextApiRequest, NextApiResponse } from "next";
import { RowItemType } from "../../ts-types/dataTypes";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).json({
      data,
    });
  }

  if (req.method === "POST") {
    data.row.unshift(req.body as RowItemType);
    return res.status(201).json({ data });
  }
};

export default handler;