import { loadPageChunk } from "../data/notion";

test("check api call", async () => {
  const POST_PAGE_ID = "6a400436-ae73-464e-acbc-070fdf8d990f";

  const loaded = await loadPageChunk({ pageId: POST_PAGE_ID });

  expect(loaded.recordMap.block).toBeTruthy();
});
