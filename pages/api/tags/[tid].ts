import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../../data/tag";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { tid }
  } = req;

  const tag = Array.isArray(tid) ? tid[0] : tid;

  if (req.method !== "GET") {
    res.statusCode = 400;
    res.end();
  }

  const data = await getData({ tid: tag });

  res.status(200).json(data);
};
