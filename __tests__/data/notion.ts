import { loadPageChunk, queryCollection } from "../../data/notion";

describe.skip("notion api call", () => {
  test("check loadPageChunk api call", async () => {
    const postId = "6a400436-ae73-464e-acbc-070fdf8d990f";

    const pageChunk = await loadPageChunk({ pageId: postId });

    expect(pageChunk).toBeTruthy();
  });

  test("check queryCollection api call", async () => {
    const collectionId = "7226e9a0-9a13-454b-866c-03ba71fcb423";
    const collectionViewId = "e34c69b8-2bba-42f0-bcea-e581cc6f18ff";

    const collection = await queryCollection({
      collectionId,
      collectionViewId
    });

    expect(collection).toBeTruthy();
  });
});
