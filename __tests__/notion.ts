import { loadPageChunk } from "../data/notion";
import fs from "fs";

test("check api call", async () => {
  const POST_PAGE_ID = "6a400436-ae73-464e-acbc-070fdf8d990f";

  const loaded = await loadPageChunk({ pageId: POST_PAGE_ID });

  fs.writeFileSync(
    "./loadChunk_api_response.json",
    JSON.stringify(loaded, null, 2)
  );

  expect(loaded).toBeTruthy();
});
