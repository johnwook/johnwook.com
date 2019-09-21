import { getData } from "../../data/post";

describe.only("generate data for post page", () => {
  test("returns title", async () => {
    const pageId = "6a400436-ae73-464e-acbc-070fdf8d990f";
    const result = await getData({ pageId });

    expect(result.title).toBe("The goal, 치아 교정");
  });

  test("returns body which is array of data", async () => {
    const pageId = "6a400436-ae73-464e-acbc-070fdf8d990f";
    const result = await getData({ pageId });

    expect(result.body.length).toBe(5);
    expect(result.body[0].type).toBe("text");
  });
});
