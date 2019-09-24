import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../../data/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid }
  } = req;

  const pageId = Array.isArray(pid) ? pid[0] : pid;

  if (req.method !== "GET") {
    res.statusCode = 400;
    res.end();
  }

  const data = await getData({ pageId });

  res.status(200).json(data);
};
