import postPageData from "../../data/loadPageChunk-post-response.json";
import homePageData from "../../data/loadPageChunk-home-response.json";
import queryCollectionData from "../../data/queryCollection-table-response.json";
import { convertBlock, convertCollection } from "../../data/convert";

describe("convert notion's loadPageChunk api result block to proper objects", () => {
  test("converts text type block", () => {
    // given
    const textBlockId = "b59fe833-cd62-449f-9094-7c2bb66ae65b";
    const textBlock = postPageData.recordMap.block[textBlockId];
    // when
    const result = convertBlock(textBlock);
    // then
    expect(result.type).toBe("text");
    expect(result.id).toBe(textBlockId);
    expect(typeof result.value).toBe("object");
  });

  test("converts image type block", () => {
    // given
    const imageBlockId = "0f199378-952f-45d3-a829-4027ff009261";
    const imageBlock = homePageData.recordMap.block[imageBlockId];
    // when
    const result = convertBlock(imageBlock);
    // then
    expect(result.type).toBe("image");
    expect(result.id).toBe(imageBlockId);
    expect(result.value).toMatch("/api/image?");
  });
});

describe("convert notion's queryCollection api result to proper list", () => {
  test("converts queryCollection table block", () => {
    // given
    const collectionData = queryCollectionData;
    // when
    const result = convertCollection(collectionData);
    // then
    expect(result.length).toBeGreaterThan(0);
  });
});
