import { loadPageChunk } from "./notion";
import convert, { ConvertOutput } from "./convert";

interface Output {
  sections: Array<ConvertOutput>;
}

const pageId = "e740a8ab-2c00-4ea7-8fa0-54c678d40075";

export const getData = async (): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];

  const contentIds: string[] = page.value.content;

  const sections = contentIds
    .map(id => blocks[id])
    .filter(block => {
      if (block.value.type === "image") {
        return true;
      }
      return false;
    })
    .map(convert);

  return {
    sections
  };
};

export type HomeData = Output;
