import { extractPid, getData } from "../../data/post";

describe("generate data for post page", () => {
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

describe("extractPid", () => {
  test("extracts uuid part from page slug", () => {
    const slug = "The-goal-6a400436ae73464eacbc070fdf8d990f";

    expect(extractPid(slug)).toBe("6a400436-ae73-464e-acbc-070fdf8d990f");
  });
});
