import { loadPageChunk } from "./notion";

interface Input {
  pageId: string;
}

export const getData = async ({ pageId }: Input) => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  console.log(blocks);

  return [Object.keys(blocks)];
};
