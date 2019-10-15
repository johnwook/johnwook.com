import { loadPageChunk } from "./notion";
import { convertBlock, ConvertBlockOutput } from "./convert";

interface Input {
  pageId: string;
}

interface Output {
  id: string;
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
  const emoji = page.value.format.page_icon;
  const titleText = page.value.properties.title[0][0];

  const title = emoji ? emoji + " " + titleText : titleText;

  const contentIds: string[] = page.value.content;

  const availableType = ["image", "text", "header"];

  const sections = contentIds
    .map(id => blocks[id])
    .filter(block => availableType.indexOf(block.value.type) > -1)
    .map(convertBlock);

  return {
    createdTime: page.value.created_time,
    id: pageId,
    lastEditedTime: page.value.last_edited_time,
    title,
    sections
  };
};

export type PostData = Output;
