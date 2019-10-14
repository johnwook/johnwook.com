import { loadPageChunk } from "./notion";
import { convertBlock, ConvertBlockOutput } from "./convert";

interface Input {
  pageId: string;
}

interface Output {
  title: string;
  createdTime: number;
  lastEditedTime: number;
  sections: Array<ConvertBlockOutput>;
}

export const getData = async ({ pageId }: Input): Promise<Output> => {
  const {
    recordMap: { block: blocks }
  } = await loadPageChunk({ pageId });

  const page = blocks[pageId];
  const title = page.value.properties.title[0][0];

  const contentIds: string[] = page.value.content;

  const availableType = ["image", "text", "header"];

  const sections = contentIds
    .map(id => blocks[id])
    .filter(block => availableType.indexOf(block.value.type) > -1)
    .map(convertBlock);

  return {
    createdTime: page.value.created_time,
    lastEditedTime: page.value.last_edited_time,
    title,
    sections
  };
};

export type PostData = Output;
