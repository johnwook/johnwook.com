import postPageData from "../../data/loadPageChunk-post-response.json";
import homePageData from "../../data/loadPageChunk-home-response.json";
import { convertBlock } from "../../data/convert";

describe("convert notion api result to proper objects", () => {
  test("converts text type block", () => {
    // given
    const textBlockId = "aa15013c-ebd7-4dcc-813b-71c5dcf3b9fa";
    const textBlock = postPageData.recordMap.block[textBlockId];
    // when
    const result = convertBlock(textBlock);
    // then
    expect(result.type).toBe("text");
    expect(result.id).toBe(textBlockId);
    expect(typeof result.value).toBe("string");
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
