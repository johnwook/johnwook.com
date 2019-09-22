import { loadPageChunk } from "./notion";
import { convertBlock, ConvertBlockOutput } from "./convert";

interface Input {
  pageId: string;
}

interface Output {
  title: string;
  sections: Array<ConvertBlockOutput>;
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];
  const title = page.value.properties.title[0][0];

  const contentIds: string[] = page.value.content;

  const sections = contentIds
    .map(id => blocks[id])
    .filter(block => {
      if (block.value.type === "text" && block.value.properties) {
        return true;
      }

      return false;
    })
    .map(convertBlock);

  return {
    title,
    sections
  };
};

export type PostData = Output;
