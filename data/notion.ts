import fetch from "cross-fetch";

const rpc = async (fnName: string, body: object = {}) => {
  const res = await fetch(`https://www.notion.so/api/v3/${fnName}`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(await getError(res));
  }
};

const getError = async (res: Response) => {
  return `Notion API error (${res.status}) \n${getJSONHeaders(
    res
  )}\n ${await getBodyOrNull(res)}`;
};

const getJSONHeaders = (res: Response) => {
  return JSON.stringify(res.headers);
};

const getBodyOrNull = (res: Response) => {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
};

const loadPageChunk = ({
  pageId,
  limit = 100,
  cursor = { stack: [] },
  chunkNumber = 0,
  verticalColumns = false
}) =>
  rpc("loadPageChunk", {
    pageId,
    limit,
    cursor,
    chunkNumber,
    verticalColumns
  });

export { loadPageChunk };
