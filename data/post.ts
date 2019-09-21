import { loadPageChunk } from "./notion";

interface Input {
  pageId: string;
}

interface Output {
  title: string;
  body: Array<{
    id: string;
    type: string;
    value: string;
  }>;
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];
  const title = page.value.properties.title[0][0];

  const contentIds: string[] = page.value.content;

  const body = contentIds
    .map(id => blocks[id])
    .filter(block => {
      if (block.value.type !== "text") {
        return false;
      }

      if (!block.value.properties) {
        return false;
      }

      return true;
    })
    .map(block => ({
      id: block.value.id,
      type: block.value.type,
      value: block.value.properties.title[0][0]
    }));

  return {
    title,
    body
  };
};

export type PostData = Output;
