import { loadPageChunk } from "../../data/notion";

describe("notion api call", () => {
  test("check api call", async () => {
    const postId = "6a400436-ae73-464e-acbc-070fdf8d990f";

    const pageChunk = await loadPageChunk({ pageId: postId });

    expect(pageChunk).toBeTruthy();
  });
});
