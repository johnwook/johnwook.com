import { loadPageChunk } from "./notion";

interface Output {
  body: Array<{
    id: string;
    type: string;
    value: string;
  }>;
}

const pageId = "e740a8ab-2c00-4ea7-8fa0-54c678d40075";

export const getData = async (): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];

  const contentIds: string[] = page.value.content;

  const body = contentIds
    .map(id => blocks[id])
    .filter(block => {
      if (block.value.type === "image") {
        return true;
      }
      return false;
    })
    .map(block => ({
      id: block.value.id,
      type: block.value.type,
      value: block.value.properties.title[0][0]
    }));

  return {
    body
  };
};

export type HomeData = Output;
