import { NextApiRequest, NextApiResponse } from "next";
import { getData } from "../../data/home";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.statusCode = 400;
    res.end();
  }

  const data = await getData();

  res.status(200).json(data);
};
