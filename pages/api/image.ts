import fetch from "node-fetch";
import { parse } from "url";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { url }
  } = parse(req.url, true);
  const r = await fetch(
    `https://www.notion.so/image/${encodeURIComponent(url as string)}`
  );
  res.setHeader("content-type", r.headers.get("content-type"));
  r.body.pipe(res);
};
