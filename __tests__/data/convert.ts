import postPageData from "../../data/loadPageChunk-post-response.json";
import convert from "../../data/convert";

describe("convert notion api result to proper objects", () => {
  test("converts text type block", () => {
    // given
    const textBlockId = "aa15013c-ebd7-4dcc-813b-71c5dcf3b9fa";
    const textBlock = postPageData.recordMap.block[textBlockId];
    // when
    const result = convert(textBlock);
    // then
    expect(result.type).toBe("text");
    expect(result.id).toBe(textBlockId);
    expect(typeof result.value).toBe("string");
  });
});
