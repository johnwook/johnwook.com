import { loadPageChunk } from "./notion";

interface Input {
  pageId: string;
}

interface Output {
  title: string;
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];

  return {
    title: page.value.properties.title[0][0]
  };
};
