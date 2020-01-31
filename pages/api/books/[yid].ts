import { NextApiRequest, NextApiResponse } from "next";

import { queryCollection } from "../../../data/notion";

const yearCollection = {
  2020: {
    collectionId: "5c468154-8207-4665-a2a4-0775a1d02417",
    collectionViewId: "9473e15b-23ab-4c8a-ac30-060ecedf323d",
    query: {
      sort: [
        {
          direction: "descending",
          property: "DuYA"
        }
      ]
    }
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { yid }
  } = req;

  const yearId = Array.isArray(yid) ? yid[0] : yid;

  if (req.method !== "GET" || !yearCollection[yearId]) {
    res.statusCode = 400;
    res.end();
  }

  const data = await queryCollection(yearCollection[yearId]);

  const bookRefs = data.result.blockIds;

  const books = bookRefs.map((ref: string) => {
    const block = data.recordMap.block[ref];

    return {
      id: ref,
      title: block.value.properties.title[0][0],
      author: block.value.properties["e+(@"][0][0],
      start: block.value.properties.DuYA[0][1][0][1].start_date,
      end: block.value.properties["O!e;"]
        ? block.value.properties["O!e;"][0][1][0][1].start_date
        : "",
      note:
        data.recordMap.block[block.value.content[0]].value.properties
          .title[0][0]
    };
  });

  res.status(200).json(books);
};
