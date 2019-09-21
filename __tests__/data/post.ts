import { getData } from "../../data/post";

describe("generate data for post page", () => {
  test("returns title", async () => {
    const pageId = "6a400436-ae73-464e-acbc-070fdf8d990f";
    const result = await getData({ pageId });

    expect(result.title).toBe("The goal, 치아 교정");
  });
});
