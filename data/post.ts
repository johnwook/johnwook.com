import { loadPageChunk } from "./notion";

interface Input {
  pageId: string;
}

interface Output {
  title: string;
  body: any[];
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];
  const title = page.value.properties.title[0][0];

  const contentIds: string[] = page.value.content;

  const body = contentIds.map(id => blocks[id]);

  return {
    title,
    body
  };
};
