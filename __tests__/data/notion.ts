import { loadPageChunk, queryCollection } from "../../data/notion";

describe.skip("notion api call", () => {
  test("check loadPageChunk api call", async () => {
    const postId = "5a071643-2313-45b6-80bb-f1896c655951";

    const pageChunk = await loadPageChunk({ pageId: postId });

    expect(pageChunk).toBeTruthy();
  });

  test("check queryCollection api call", async () => {
    const collectionId = "7226e9a0-9a13-454b-866c-03ba71fcb423";
    const collectionViewId = "e34c69b8-2bba-42f0-bcea-e581cc6f18ff";

    const collection = await queryCollection({
      collectionId,
      collectionViewId,
      query: {}
    });

    expect(collection).toBeTruthy();
  });
});
